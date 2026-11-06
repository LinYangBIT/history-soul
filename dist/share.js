import {portraitURL} from './artwork.js?v=4';
import { characters } from './data.js?v=4';

const FONT = '"PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif';
const INK = '#2e2946';
const PURPLE = '#7460b4';
const DIMENSIONS = [
  ['O', '好奇探索'], ['C', '计划行动'], ['E', '社交能量'],
  ['A', '相处方式'], ['S', '压力恢复'],
];

function roundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function panel(ctx, x, y, width, height, radius, fill, stroke) {
  roundedRect(ctx, x, y, width, height, radius);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 2; ctx.stroke(); }
}

function text(ctx, value, x, y, size, weight = 500, color = INK, align = 'left') {
  ctx.font = `${weight} ${size}px ${FONT}`;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(String(value ?? ''), x, y);
}

function fittedText(ctx, value, x, y, size, width, weight = 700, color = INK, align = 'center') {
  let content = String(value ?? '');
  let current = size;
  const minimum = Math.min(20, Math.floor(size * .8));
  ctx.font = `${weight} ${current}px ${FONT}`;
  while (ctx.measureText(content).width > width && current > minimum) {
    current -= 1;
    ctx.font = `${weight} ${current}px ${FONT}`;
  }
  if (ctx.measureText(content).width > width) {
    const chars = Array.from(content);
    while (chars.length && ctx.measureText(chars.join('') + '…').width > width) chars.pop();
    content = chars.join('') + '…';
  }
  text(ctx, content, x, y, current, weight, color, align);
}

function wrapText(ctx, value, x, y, maxWidth, size, lineHeight, maxLines = 2, color = INK) {
  ctx.font = `500 ${size}px ${FONT}`;
  const chars = Array.from(String(value ?? ''));
  const lines = [];
  let current = '';
  for (const char of chars) {
    if (ctx.measureText(current + char).width > maxWidth && current) {
      lines.push(current);
      current = char;
    } else current += char;
  }
  if (current) lines.push(current);
  const visible = lines.slice(0, maxLines);
  if (lines.length > maxLines) {
    let last = visible[visible.length - 1];
    while (last && ctx.measureText(last + '…').width > maxWidth) last = last.slice(0, -1);
    visible[visible.length - 1] = last + '…';
  }
  visible.forEach((line, i) => text(ctx, line, x, y + i * lineHeight, size, 500, color, 'center'));
}

function spark(ctx, x, y, radius, color, rotation = 0) {
  ctx.save();
  ctx.translate(x, y); ctx.rotate(rotation);
  ctx.beginPath();
  ctx.moveTo(0, -radius);
  ctx.quadraticCurveTo(radius * .18, -radius * .18, radius, 0);
  ctx.quadraticCurveTo(radius * .18, radius * .18, 0, radius);
  ctx.quadraticCurveTo(-radius * .18, radius * .18, -radius, 0);
  ctx.quadraticCurveTo(-radius * .18, -radius * .18, 0, -radius);
  ctx.fillStyle = color; ctx.fill(); ctx.restore();
}

function circle(ctx, x, y, r, color) {
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill();
}

function safeCharacterId(character) {
  const id = String(character?.id || '');
  if (!/^[a-z0-9_-]+$/i.test(id)) throw new Error('人物信息不完整，请重新生成结果。');
  return id;
}

function loadPortrait(character) {
  const id = safeCharacterId(character);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('人物插画暂时未能加载，请稍后重试。'));
    img.src = new URL(portraitURL(id), import.meta.url).href;
  });
}

export function resultURL(character) {
  const id = safeCharacterId(character);
  const url = new URL(location.pathname, location.origin);
  url.searchParams.set('character', id);
  return url.href;
}

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    try { await navigator.clipboard.writeText(value); return; }
    catch { /* Old WebViews may deny Clipboard API while allowing a user copy. */ }
  }
  const area = document.createElement('textarea');
  area.value = value;
  area.setAttribute('readonly', '');
  area.setAttribute('aria-label', '分享链接');
  area.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
  document.body.append(area);
  area.select(); area.setSelectionRange(0, value.length);
  let copied = false;
  try { copied = document.execCommand('copy'); } finally { area.remove(); }
  if (!copied) throw new Error('当前浏览器无法复制链接，可以使用浏览器的分享按钮。');
}

export async function copyResultLink(character) {
  const url = resultURL(character);
  await copyText(url);
  return url;
}

/** Generates locally; answers and scores never leave this browser. */
export async function createCardBlob(character, scores, options = {}) {
  const portrait = await loadPortrait(character);
  if (document.fonts?.ready) await document.fonts.ready;
  const canvas = document.createElement('canvas');
  canvas.width = 1080; canvas.height = 1440;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('当前浏览器无法生成图片，请尝试分享链接。');
  const bg = ctx.createLinearGradient(0, 0, 1080, 1440);
  bg.addColorStop(0, '#f9f5ed'); bg.addColorStop(1, '#f3eefb');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, 1080, 1440);
  circle(ctx, 1040, 50, 170, '#ece4f6');
  circle(ctx, -40, 1250, 170, '#f0e4d4');
  ctx.save();
  ctx.shadowColor = '#57415a15'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 10;
  panel(ctx, 48, 48, 984, 1344, 46, '#fffdf8');
  ctx.restore();
  panel(ctx, 48, 48, 984, 1344, 46, null, '#e9e2ed');

  circle(ctx, 105, 106, 22, '#ded2f4');
  spark(ctx, 105, 106, 14, PURPLE);
  text(ctx, '历史人格研究所', 144, 116, 29, 700);
  text(ctx, 'HISTORY SOUL', 972, 114, 21, 600, '#9a90a5', 'right');
  ctx.strokeStyle = '#eee8ef'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(90, 147); ctx.lineTo(990, 147); ctx.stroke();

  const nickname = String(options.nickname || '').trim().slice(0, 12);
  text(ctx, nickname ? `${nickname}的历史同频人` : '我的历史同频人', 540, 199, 26, 500, '#81768e', 'center');
  fittedText(ctx, character.name, 540, 288, 78, 800);
  panel(ctx, 340, 314, 400, 52, 26, '#eee6fa');
  fittedText(ctx, character.title || character.role, 540, 349, 25, 356, 600, PURPLE);

  circle(ctx, 540, 561, 196, '#f0e9fa');
  circle(ctx, 540, 566, 168, '#f8f2ff');
  ctx.save();
  ctx.globalAlpha = .85;
  circle(ctx, 318, 475, 19, '#f2d6be');
  circle(ctx, 758, 650, 13, '#c6d9ca');
  spark(ctx, 766, 452, 30, '#ddbb69', .15);
  spark(ctx, 316, 655, 23, '#b1a2d8', -.2);
  spark(ctx, 804, 576, 14, '#cfbfeb');
  ctx.restore();
  const imageWidth = portrait.naturalWidth || 400;
  const imageHeight = portrait.naturalHeight || 400;
  const scale = Math.min(440 / imageWidth, 408 / imageHeight);
  const dw = imageWidth * scale, dh = imageHeight * scale;
  ctx.drawImage(portrait, 540 - dw / 2, 565 - dh / 2, dw, dh);
  fittedText(ctx, [character.era, character.role].filter(Boolean).join(' · '), 540, 806, 25, 820, 500, '#8e8298');
  wrapText(ctx, character.tagline || character.description, 540, 854, 820, 29, 40, 2);

  const tags = (character.tags || []).slice(0, 3).map(String);
  ctx.font = `500 23px ${FONT}`;
  const widths = tags.map(tag => Math.min(270, Math.max(112, ctx.measureText(tag).width + 40)));
  const total = widths.reduce((sum, width) => sum + width, 0) + Math.max(0, tags.length - 1) * 16;
  let tagX = (1080 - total) / 2;
  tags.forEach((tag, index) => {
    panel(ctx, tagX, 918, widths[index], 44, 22, ['#f0eafa', '#e9f0e7', '#faeddb'][index]);
    fittedText(ctx, tag, tagX + widths[index] / 2, 949, 23, widths[index] - 24, 500, '#786d83');
    tagX += widths[index] + 16;
  });

  panel(ctx, 114, 990, 852, 270, 25, '#f9f6fb');
  text(ctx, '这一次，我的性格轮廓', 148, 1030, 24, 600, '#6f627e');
  const colors = ['#b4a0db', '#e4bc8a', '#a8c2b1', '#dba9b9', '#9aafca'];
  DIMENSIONS.forEach(([key, label], i) => {
    const y = 1052 + i * 37;
    const raw = Number(scores?.[key]);
    const score = Number.isFinite(raw) ? Math.round(Math.min(100, Math.max(0, raw))) : 50;
    text(ctx, label, 148, y + 22, 22, 500, '#877b92');
    panel(ctx, 292, y + 7, 560, 14, 7, '#eae4ef');
    if (score > 0) panel(ctx, 292, y + 7, Math.max(14, 560 * score / 100), 14, 7, colors[i]);
    text(ctx, score, 928, y + 22, 22, 600, '#7e728c', 'right');
  });

  text(ctx, '穿越千年，遇见另一种可能。', 540, 1306, 25, 600, INK, 'center');
  let hostname = '';
  try { hostname = new URL(options.url || resultURL(character)).hostname; } catch { /* Decorative host is optional. */ }
  const footer = hostname && hostname !== 'localhost' && hostname !== '127.0.0.1'
    ? `${hostname}  ·  20 道题，寻找你的历史同频人`
    : `20 道情景题 · ${characters.length} 位历史人物 · 寻找你的历史同频人`;
  fittedText(ctx, footer, 540, 1346, 19, 870, 500, '#95899e');
  text(ctx, '趣味自我探索；非专业心理评估，人物画像为创意解读。', 540, 1418, 18, 400, '#8f829d', 'center');

  return await new Promise((resolve, reject) => canvas.toBlob(
    blob => blob ? resolve(blob) : reject(new Error('图片生成失败，请尝试分享链接。')),
    'image/png',
  ));
}

export async function downloadCard(character, scores, options = {}) {
  const blob = await createCardBlob(character, scores, options);
  const filename = `历史人格研究所-${character.name}.png`;
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url; anchor.download = filename;
  document.body.append(anchor); anchor.click(); anchor.remove();
  // Keep the object URL alive long enough for mobile browsers to read the file.
  setTimeout(() => URL.revokeObjectURL(url), 60000);
  return { blob, filename };
}

export async function shareResult(character, scores) {
  const url = resultURL(character);
  const title = `我的历史同频人是${character.name}｜历史人格研究所`;
  const description = `我的历史同频人是${character.name}，${character.title || character.role}！20 道情景题，看看你会遇见谁。`;
  if (navigator.share) {
    // Sharing the text/link directly preserves transient user activation on Safari.
    // The separate save-card action provides the PNG for image-first social apps.
    await navigator.share({ title, text: description, url });
    return { method: 'link', url };
  }
  await copyText(`${description}\n${url}`);
  return { method: 'clipboard', url };
}
