import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Public snapshots have no relationship to the development repository's Git history.
const sourceRoot = fileURLToPath(new URL('../', import.meta.url));
const args = process.argv.slice(2);
if (args.length && !(args.length === 2 && args[0] === '--out')) {
  throw new Error('Usage: node scripts/export-public.mjs [--out EMPTY_DIRECTORY]');
}
const destination = args.length
  ? path.resolve(args[1])
  : await fs.mkdtemp(path.join(tmpdir(), 'history-soul-public-'));
const relativeDestination = path.relative(sourceRoot, destination);
if (!relativeDestination || (!relativeDestination.startsWith('..' + path.sep) && relativeDestination !== '..' && !path.isAbsolute(relativeDestination))) {
  throw new Error('The export directory must be outside the source project.');
}
try {
  const stat = await fs.lstat(destination);
  if (!stat.isDirectory() || stat.isSymbolicLink() || (await fs.readdir(destination)).length) {
    throw new Error('The export destination must be a new or empty real directory.');
  }
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
  await fs.mkdir(destination, { recursive: true });
}

const publicRootFiles = ['package.json', 'README.md', 'LICENSE', 'ASSETS.md'];
const publicScripts = ['scripts/export-public.mjs', 'scripts/generate-art.mjs'];
const webExtensions = new Set(['.html', '.css', '.js', '.json', '.svg', '.webp', '.ico']);
const textExtensions = new Set(['.html', '.css', '.js', '.mjs', '.json', '.svg', '.md']);
const excludedSegments = new Set(['.git', '.openai', '.agents', '.codex', 'node_modules', 'art', 'qa']);
const findings = [];
const files = [];
const skipped = [];
const secretPatterns = [
  ['personal absolute path', /(?:\/(?:Users|home)\/[\w.-]+\/|[A-Z]:\\Users\\[^\\\s]+\\)/i],
  ['private key', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ['service credential', /(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9_-]{20,})/],
  ['embedded URL password', /https?:\/\/[^/\s:@]+:[^@\s/]+@/],
  ['assigned secret', /(?:api[_-]?key|access[_-]?token|secret|password)\s*[:=]\s*["'][A-Za-z0-9_+/=.-]{16,}["']/i],
];

function checkWebP(buffer, relative) {
  if (buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WEBP') {
    findings.push(`${relative}: invalid WebP header`);
    return;
  }
  for (let offset = 12; offset + 8 <= buffer.length;) {
    const kind = buffer.toString('ascii', offset, offset + 4);
    const size = buffer.readUInt32LE(offset + 4);
    if (offset + 8 + size > buffer.length) {
      findings.push(`${relative}: invalid WebP chunk`);
      break;
    }
    if (kind === 'EXIF' || kind === 'XMP ') findings.push(`${relative}: metadata needs manual review (${kind.trim()})`);
    offset += 8 + size + (size % 2);
  }
}

async function inspect(relative) {
  const normalized = relative.split(path.sep).join('/');
  const segments = normalized.split('/');
  if (segments.some(s => excludedSegments.has(s) || s.startsWith('.') || s.startsWith('sites-'))) {
    throw new Error(`Unexpected private path in allowlist: ${normalized}`);
  }
  const fullPath = path.join(sourceRoot, relative);
  const stat = await fs.lstat(fullPath);
  if (!stat.isFile() || stat.isSymbolicLink()) throw new Error(`Only real regular files can be exported: ${normalized}`);
  if (stat.size > 50 * 1024 * 1024) throw new Error(`Review large file before export: ${normalized}`);
  const content = await fs.readFile(fullPath);
  const extension = path.extname(relative);
  if (textExtensions.has(extension) || relative === 'LICENSE') {
    const text = content.toString('utf8');
    for (const [label, pattern] of secretPatterns) if (pattern.test(text)) findings.push(`${normalized}: ${label}`);
  }
  if (extension === '.webp') checkWebP(content, normalized);
  files.push({ relative: normalized, bytes: content.length, sha256: createHash('sha256').update(content).digest('hex'), content });
}

async function visitWeb(relative) {
  const directory = path.join(sourceRoot, relative);
  const dirStat = await fs.lstat(directory);
  if (!dirStat.isDirectory() || dirStat.isSymbolicLink()) throw new Error(`Refusing linked directory: ${relative}`);
  for (const entry of (await fs.readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const next = path.join(relative, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Refusing symbolic link: ${next}`);
    if (entry.name.startsWith('.') || excludedSegments.has(entry.name)) { skipped.push(next); continue; }
    if (entry.isDirectory()) await visitWeb(next);
    else if (entry.isFile() && webExtensions.has(path.extname(entry.name))) await inspect(next);
    else skipped.push(next);
  }
}

for (const relative of publicRootFiles) await inspect(relative);
for (const entry of (await fs.readdir(sourceRoot)).filter(name => /^tests[^/]*\.mjs$/.test(name)).sort()) await inspect(entry);
for (const relative of publicScripts) {
  try { await fs.access(path.join(sourceRoot, relative)); } catch (error) { if (error.code === 'ENOENT') continue; throw error; }
  await inspect(relative);
}
await visitWeb('dist');
if (findings.length) throw new Error(`Export stopped before copying:\n${findings.join('\n')}`);

for (const file of files) {
  const target = path.join(destination, file.relative);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, file.content, { flag: 'wx' });
}
const ignore = `.DS_Store\nnode_modules/\n.env\n.env.*\n!.env.example\n.openai/\n.sites*/\n.codex/\n.agents/\nqa/\nart/\n*.log\n*.tar.gz\n*.tgz\n*.zip\n`;
await fs.writeFile(path.join(destination, '.gitignore'), ignore, { flag: 'wx' });
console.log(JSON.stringify({
  destination,
  status: 'prepared-only-not-uploaded',
  files: files.map(({ content, ...details }) => details),
  generatedFiles: ['.gitignore'],
  totalBytes: files.reduce((sum, file) => sum + file.bytes, Buffer.byteLength(ignore)),
  skipped,
  checks: ['allowlist', 'no-symlinks', 'common-secrets-and-personal-paths', 'no-WebP-EXIF-or-XMP'],
}, null, 2));
