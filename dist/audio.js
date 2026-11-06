/**
 * Original score: “纸上来信” — 32 bars in D, with four eight-bar phrases.
 * All instruments are synthesized locally; no recording, sample pack or network request.
 * Call initAudio() once during boot. Settings use 0..1 volumes and persist locally.
 * window emits history-audio-change with getAudioStatus() as CustomEvent.detail.
 * Status reports the audio engine, not whether the device's speakers are audible.
 */

const STORAGE_KEY = 'history-soul-audio-v1';
const CHANGE_EVENT = 'history-audio-change';
const DEFAULTS = Object.freeze({
  musicEnabled: true, sfxEnabled: true, muted: false,
  musicVolume: 0.24, sfxVolume: 0.45,
});
const SOURCE_LIMITS = Object.freeze({ music: 28, sfx: 12 });
const LOOK_AHEAD = 0.18;
const TICK_MS = 40;
const FADE_OUT = 0.045;
const SCORE_BARS = 32;

const SCENES = Object.freeze({
  home:   { bpm: 84, startBar: 0,  melody: 0.86, harmony: 0.9,  rhythm: 0.42, ornament: false },
  quiz:   { bpm: 84, startBar: 8,  melody: 0.68, harmony: 0.78, rhythm: 0.26, ornament: false },
  memory: { bpm: 92, startBar: 16, melody: 0.87, harmony: 0.85, rhythm: 0.78, ornament: true },
  result: { bpm: 84, startBar: 24, melody: 1.00, harmony: 1.0,  rhythm: 0.40, ornament: true },
});
const SCENE_ALIASES = Object.freeze({
  menu: 'home', gallery: 'home', method: 'home', shared: 'home',
  flip: 'memory', match: 'memory', game: 'memory', 'flip-game': 'memory', 'memory-game': 'memory',
  results: 'result', complete: 'result', settlement: 'result', finish: 'result',
});

// Each note is [eighth-note offset, MIDI pitch, length in eighth notes].
// The melody is written out deliberately, rather than randomly replaying a short jingle.
const MELODY = [
  [[0,74,2],[3,76,1],[4,78,2],[6,76,2]],
  [[0,74,3],[4,69,2],[6,71,2]],
  [[0,74,2],[2,71,1],[4,69,2],[7,66,1]],
  [[0,69,3],[4,71,2],[6,74,2]],
  [[0,71,2],[3,74,1],[4,76,2],[6,74,2]],
  [[0,69,4],[5,66,1],[6,64,2]],
  [[0,66,2],[2,69,2],[4,64,3]],
  [[0,69,3],[4,71,1],[6,76,2]],
  [[0,78,2],[2,76,1],[4,74,2],[6,69,2]],
  [[0,76,2],[3,78,1],[4,81,2],[7,78,1]],
  [[0,78,3],[4,74,2],[6,71,2]],
  [[0,74,2],[2,76,2],[5,71,1],[6,69,2]],
  [[0,76,2],[3,74,1],[4,69,2],[6,66,2]],
  [[0,71,3],[4,74,1],[6,76,2]],
  [[0,76,2],[2,74,1],[4,71,2],[6,69,2]],
  [[0,74,5],[6,69,2]],
  [[0,78,2],[3,81,1],[4,83,2],[6,81,2]],
  [[0,79,2],[2,78,1],[4,76,2],[6,74,2]],
  [[0,78,3],[4,76,2],[6,74,2]],
  [[0,76,2],[3,81,1],[4,78,2],[6,76,2]],
  [[0,78,2],[2,74,2],[4,71,3]],
  [[0,74,2],[3,76,1],[4,79,2],[6,78,2]],
  [[0,76,3],[4,74,1],[6,71,2]],
  [[0,69,2],[3,71,1],[4,73,2],[6,76,2]],
  [[0,74,2],[3,76,1],[4,78,2],[6,76,2]],
  [[0,74,3],[4,71,2],[6,69,2]],
  [[0,71,2],[2,74,2],[5,76,1],[6,74,2]],
  [[0,69,3],[4,66,2],[6,69,2]],
  [[0,76,2],[3,74,1],[4,69,3]],
  [[0,71,2],[2,69,2],[4,64,2],[6,69,2]],
  [[0,66,2],[2,69,2],[4,74,4]],
  [[0,74,6]],
];
const HARMONY = {
  D:  { bass: 50, notes: [62,66,69] },
  Bm: { bass: 47, notes: [59,62,66] },
  G:  { bass: 43, notes: [59,62,67] },
  Em: { bass: 40, notes: [59,64,67] },
  A:  { bass: 45, notes: [57,62,64] },
};
const PROGRESSION = [
  'D','D','Bm','Bm','G','D','Em','A',
  'D','D','Bm','G','Em','G','A','D',
  'Bm','G','D','A','Bm','G','Em','A',
  'D','Bm','G','D','Em','A','D','D',
];
const SFX = Object.freeze({
  select:   { debounce: 65,  notes: [[0,81,0.13,0.19]] },
  flip:     { debounce: 80,  notes: [[0,64,0.11,0.14],[0.045,76,0.13,0.15]] },
  match:    { debounce: 150, notes: [[0,74,0.23,0.20],[0.075,78,0.25,0.18],[0.15,81,0.34,0.17]] },
  miss:     { debounce: 180, notes: [[0,64,0.18,0.13],[0.10,62,0.22,0.11]] },
  complete: { debounce: 700, notes: [[0,74,0.25,0.18],[0.09,78,0.27,0.19],[0.18,81,0.3,0.18],[0.27,83,0.32,0.16],[0.39,86,0.56,0.16]] },
});

let settings = readSettings();
let initialized = false;
let context = null;
let graph = null;
let scene = 'home';
let paused = false;
let pageHidden = false;
let everUnlocked = false;
let scheduler = null;
let suspendTimer = null;
let gestureListeners = false;
let nextStepTime = 0;
let nextStep = 0;
let transportStart = 0;
let transportStartStep = 0;
let resumeBar = 0;
let pendingSound = null;
let lastError = null;
let fatalError = false;
let settingsPersisted = true;
let lastNotification = '';
const voices = { music: new Set(), sfx: new Set() };
const lastSound = new Map();

function clampVolume(value, fallback) {
  return typeof value === 'number' && Number.isFinite(value)
    ? Math.max(0, Math.min(1, value)) : fallback;
}

function readSettings() {
  const value = { ...DEFAULTS };
  try {
    const stored = JSON.parse(globalThis.localStorage?.getItem(STORAGE_KEY) || 'null');
    if (stored?.version !== 1) return value;
    for (const key of ['musicEnabled','sfxEnabled','muted']) {
      if (typeof stored[key] === 'boolean') value[key] = stored[key];
    }
    for (const key of ['musicVolume','sfxVolume']) value[key] = clampVolume(stored[key], value[key]);
  } catch { /* Restricted storage and damaged preferences must never block the game. */ }
  return value;
}

function clockNow() { return globalThis.performance?.now?.() ?? Date.now(); }
function isBackground() { return pageHidden || Boolean(globalThis.document?.hidden); }
function musicAudible() { return settings.musicEnabled && settings.musicVolume > 0 && !settings.muted; }
function sfxAudible() { return settings.sfxEnabled && settings.sfxVolume > 0 && !settings.muted; }
function outputAllowed() { return !paused && !isBackground() && (musicAudible() || sfxAudible()); }
function audioConstructor() { return globalThis.AudioContext || globalThis.webkitAudioContext; }
function sourceCount(channel) {
  let count = 0;
  for (const voice of voices[channel]) count += voice.sources.size;
  return count;
}

function currentBar() {
  if (scheduler === null || !context || context.state !== 'running') return resumeBar;
  const eighth = 60 / SCENES[scene].bpm / 2;
  const elapsedSteps = Math.max(0, Math.floor((context.currentTime - transportStart) / eighth));
  return Math.floor((transportStartStep + elapsedSteps) / 8) % SCORE_BARS;
}

export function getAudioSettings() { return { ...settings }; }

function musicLevel() {
  if (!graph?.analyser || !context || context.state !== 'running' || scheduler === null || !outputAllowed() || !musicAudible()) return 0;
  graph.analyser.getFloatTimeDomainData(graph.meterBuffer);
  let energy = 0;
  for (const sample of graph.meterBuffer) energy += sample * sample;
  return Math.sqrt(energy / graph.meterBuffer.length);
}

export function getAudioStatus() {
  let state;
  if (!initialized) state = 'uninitialized';
  else if (!audioConstructor()) state = 'unsupported';
  else if (fatalError) state = 'error';
  else if (isBackground()) state = 'background';
  else if (paused) state = 'paused';
  else if (!musicAudible() && !sfxAudible()) state = 'muted';
  else if (!context || context.state !== 'running') state = 'pending';
  else if (scheduler !== null && musicAudible()) state = 'playing';
  else state = 'ready';
  const musicState = ['uninitialized','unsupported','error','background','paused'].includes(state)
    ? state : !musicAudible() ? 'muted' : state === 'playing' ? 'playing' : 'pending';
  const musicRms = musicState === 'playing' ? musicLevel() : 0;
  return {
    state, musicState, contextState: context?.state || 'not-created',
    initialized, unlocked: everUnlocked, scene, paused, background: isBackground(),
    pending: state === 'pending', musicPlaying: musicState === 'playing',
    sfxReady: Boolean(context?.state === 'running' && outputAllowed() && sfxAudible()),
    bar: currentBar() + 1, bars: SCORE_BARS, bpm: SCENES[scene].bpm,
    track: '纸上来信', schedulerRunning: scheduler !== null,
    activeMusicVoices: voices.music.size, activeSfxVoices: voices.sfx.size,
    activeMusicSources: sourceCount('music'), activeSfxSources: sourceCount('sfx'),
    musicRms, outputLevel: Math.min(1, musicRms * 12),
    sourceLimits: { ...SOURCE_LIMITS }, settings: getAudioSettings(),
    settingsPersisted, error: lastError,
  };
}

function notify(force = false) {
  const status = getAudioStatus();
  // Voices and bar change continuously. Lifecycle notifications are intentionally quiet;
  // an open diagnostic/settings panel can read getAudioStatus() for live counters.
  const signature = JSON.stringify([status.state,status.musicState,status.contextState,scene,
    paused,status.background,status.unlocked,settings,settingsPersisted,lastError]);
  if (!force && signature === lastNotification) return;
  lastNotification = signature;
  if (globalThis.window?.dispatchEvent && globalThis.CustomEvent) {
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: status }));
  }
}

function setGain(param, value, duration = 0.06) {
  if (!context) return;
  const now = context.currentTime;
  if (typeof param.cancelAndHoldAtTime === 'function') param.cancelAndHoldAtTime(now);
  else {
    const current = param.value;
    param.cancelScheduledValues(now);
    param.setValueAtTime(current, now);
  }
  param.linearRampToValueAtTime(value, now + duration);
}

function applyLevels() {
  if (!graph) return;
  setGain(graph.music.gain, musicAudible() ? settings.musicVolume : 0);
  setGain(graph.sfx.gain, sfxAudible() ? settings.sfxVolume : 0);
}

function ensureContext() {
  if (context && context.state !== 'closed') return true;
  const Constructor = audioConstructor();
  if (!Constructor) { notify(); return false; }
  try {
    context = new Constructor({ latencyHint: 'interactive' });
    const music = context.createGain(), sfx = context.createGain();
    const master = context.createGain(), compressor = context.createDynamicsCompressor();
    const analyser = context.createAnalyser();
    analyser.fftSize = 256;
    master.gain.value = 0.8;
    compressor.threshold.value = -15;
    compressor.knee.value = 12;
    compressor.ratio.value = 6;
    compressor.attack.value = 0.006;
    compressor.release.value = 0.2;
    music.gain.value = musicAudible() ? settings.musicVolume : 0;
    sfx.gain.value = sfxAudible() ? settings.sfxVolume : 0;
    music.connect(analyser); analyser.connect(master); sfx.connect(master);
    master.connect(compressor); compressor.connect(context.destination);
    graph = { music, sfx, master, compressor, analyser, meterBuffer: new Float32Array(analyser.fftSize) };
    context.addEventListener('statechange', onContextStateChange);
    fatalError = false; lastError = null;
    return true;
  } catch {
    lastError = '浏览器暂时无法启动声音；游戏仍可继续。'; fatalError = true;
    context = null; graph = null; notify();
    return false;
  }
}

function attachGestures() {
  if (gestureListeners || !globalThis.window?.addEventListener) return;
  for (const type of ['pointerup','touchend','keydown']) {
    window.addEventListener(type, onGesture, { capture: true, passive: true });
  }
  gestureListeners = true;
}

function detachGestures() {
  if (!gestureListeners || !globalThis.window?.removeEventListener) return;
  for (const type of ['pointerup','touchend','keydown']) window.removeEventListener(type, onGesture, true);
  gestureListeners = false;
}

function onGesture(event) {
  if (!event.isTrusted || event.repeat || (event.type === 'pointerup' && event.button !== 0)) return;
  if (event.type === 'keydown' && ['Shift','Control','Alt','Meta','CapsLock'].includes(event.key)) return;
  if (!outputAllowed()) return;
  // No await before resume(): iOS/Safari requires this call within the real gesture.
  requestResume();
}

function onContextStateChange() {
  if (!context) return;
  if (context.state === 'running') {
    everUnlocked = true; fatalError = false; lastError = null;
    detachGestures();
    syncPlayback();
  } else {
    stopMusic(0, true); stopChannel('sfx', 0); pendingSound = null;
    attachGestures(); notify();
  }
}

function cancelSuspend() {
  if (suspendTimer !== null) clearTimeout(suspendTimer);
  suspendTimer = null;
}

function suspendAfterFade() {
  cancelSuspend();
  if (!context || context.state !== 'running') return;
  suspendTimer = setTimeout(() => {
    suspendTimer = null;
    if (outputAllowed() || !context || context.state !== 'running') return;
    Promise.resolve(context.suspend()).catch(() => {}).finally(() => notify());
  }, Math.ceil((FADE_OUT + 0.025) * 1000));
}

function requestResume() {
  if (!outputAllowed() || !ensureContext()) { syncPlayback(); return; }
  cancelSuspend();
  if (context.state === 'running') { syncPlayback(); return; }
  attachGestures();
  // Do not lock on a pending resume promise: a blocked zero-gesture attempt can remain
  // unresolved until a later real gesture, which must be allowed to call resume again.
  try {
    const requestedContext = context;
    Promise.resolve(requestedContext.resume()).then(() => {
      if (context !== requestedContext) return;
      if (context.state === 'running') { everUnlocked = true; detachGestures(); }
      syncPlayback();
    }).catch(() => {
      if (context !== requestedContext) return;
      attachGestures(); notify(); // Autoplay refusal is a normal pending state.
    });
  } catch { attachGestures(); }
  notify();
}

function releaseVoice(voice) {
  if (voice.sources.size) return;
  voices[voice.channel].delete(voice);
  for (const node of voice.nodes) { try { node.disconnect(); } catch {} }
  voice.nodes.length = 0;
}

function stopVoice(voice, fade) {
  if (!context || (voice.stopping && context.state === 'running' && fade > 0)) return;
  voice.stopping = true;
  const now = context.currentTime;
  try { setGain(voice.gain.gain, 0, fade); } catch {}
  for (const source of voice.sources) {
    try { source.stop(now + fade); } catch {}
  }
  // A suspended/closed context cannot finish a fade. Releasing already silent nodes
  // here avoids retaining scheduled oscillators while a page stays in the background.
  if (context.state !== 'running' || fade === 0) {
    for (const source of voice.sources) { try { source.disconnect(); } catch {} }
    voice.sources.clear(); releaseVoice(voice);
  }
}

function stopChannel(channel, fade = FADE_OUT) {
  for (const voice of Array.from(voices[channel])) stopVoice(voice, fade);
}

function stopMusic(fade = FADE_OUT, remember = true) {
  if (remember && scheduler !== null) resumeBar = currentBar();
  if (scheduler !== null) clearInterval(scheduler);
  scheduler = null;
  stopChannel('music', fade);
}

function note(channel, midi, when, duration, amplitude, timbre = 'pluck') {
  if (!context || !graph || context.state !== 'running') return false;
  const partials = timbre === 'pluck' ? [[1,1,'sine'],[2.01,0.13,'sine']] : [[1,1,'sine']];
  if (sourceCount(channel) + partials.length > SOURCE_LIMITS[channel]) return false;
  const frequency = 440 * 2 ** ((midi - 69) / 12);
  const start = Math.max(context.currentTime, when);
  const gain = context.createGain();
  gain.connect(graph[channel]);
  const voice = { channel, gain, sources: new Set(), nodes: [gain], stopping: false };
  voices[channel].add(voice);
  const attack = timbre === 'pad' ? 0.16 : timbre === 'bass' ? 0.022 : 0.007;
  const release = timbre === 'pad' ? 0.48 : timbre === 'bass' ? 0.27 : Math.min(0.28, duration * 0.65);
  const end = start + duration + release;
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(amplitude, start + attack);
  if (timbre === 'pluck' || timbre === 'wood') {
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, amplitude * 0.18), start + Math.max(attack + 0.01, duration * 0.7));
  } else {
    gain.gain.linearRampToValueAtTime(amplitude * 0.7, start + duration);
  }
  gain.gain.exponentialRampToValueAtTime(0.0001, end);
  gain.gain.linearRampToValueAtTime(0, end + 0.012);
  try {
    for (const [ratio, level, type] of partials) {
      const osc = context.createOscillator(), mix = context.createGain();
      osc.type = type; osc.frequency.setValueAtTime(frequency * ratio, start);
      mix.gain.value = level;
      osc.connect(mix); mix.connect(gain);
      voice.nodes.push(osc, mix); voice.sources.add(osc);
      osc.onended = () => { voice.sources.delete(osc); releaseVoice(voice); };
      osc.start(start); osc.stop(end + 0.02);
    }
  } catch (error) {
    stopVoice(voice, 0); throw error;
  }
  return true;
}

function scheduleStep(stepNumber, when) {
  const profile = SCENES[scene];
  const bar = Math.floor(stepNumber / 8), step = stepNumber % 8;
  const eighth = 60 / profile.bpm / 2;
  const chord = HARMONY[PROGRESSION[bar]];
  const section = [0.82,0.94,1,0.86][Math.floor(bar / 8)];
  for (const [offset, pitch, length] of MELODY[bar]) {
    if (offset === step) note('music', pitch, when, length * eighth * 0.7,
      0.17 * profile.melody * section, 'pluck');
  }
  if (step === 0) {
    note('music', chord.bass, when, eighth * 3.5, 0.14 * profile.harmony, 'bass');
    chord.notes.forEach((pitch, i) => note('music', pitch, when + i * 0.025,
      eighth * 3.3, 0.054 * profile.harmony * section, 'pad'));
  }
  if (step === 4) {
    note('music', chord.bass + 7, when, eighth * 2.5, 0.085 * profile.harmony, 'bass');
    note('music', chord.notes[1], when + 0.018, eighth * 1.6, 0.055 * profile.harmony, 'pluck');
    note('music', chord.notes[2], when + eighth, eighth * 1.5, 0.045 * profile.harmony, 'pluck');
  }
  if (step === 2 || step === 6 || (profile.ornament && step === 0 && bar % 2 === 0)) {
    note('music', step === 6 ? 81 : 74, when, 0.035, 0.035 * profile.rhythm, 'wood');
  }
  // A sparse higher answer appears only in the brighter middle/evening variations.
  if (profile.ornament && step === 7 && bar % 4 === 2) {
    note('music', chord.notes[2] + 12, when, eighth * 0.45, 0.035, 'pluck');
  }
}

function pump() {
  if (!context || context.state !== 'running' || !outputAllowed() || !musicAudible()) return;
  const now = context.currentTime;
  const eighth = 60 / SCENES[scene].bpm / 2;
  // Never catch up a long timer gap with a burst of historical notes.
  if (nextStepTime < now - 0.08) {
    nextStep = (Math.ceil(nextStep / 8) * 8) % (SCORE_BARS * 8);
    nextStepTime = now + 0.035;
    transportStart = nextStepTime; transportStartStep = nextStep;
  }
  let scheduled = 0;
  try {
    while (nextStepTime < now + LOOK_AHEAD && scheduled < 8) {
      scheduleStep(nextStep, nextStepTime);
      nextStep = (nextStep + 1) % (SCORE_BARS * 8);
      nextStepTime += eighth; scheduled++;
    }
  } catch {
    stopMusic(0, true); stopChannel('sfx', 0);
    fatalError = true; lastError = '声音暂时中断，可以在声音设置中重试。';
    attachGestures(); notify();
  }
}

function startMusic() {
  if (scheduler !== null || !context || context.state !== 'running' || !musicAudible() || !outputAllowed()) return;
  nextStep = resumeBar * 8;
  nextStepTime = context.currentTime + 0.055;
  transportStart = nextStepTime; transportStartStep = nextStep;
  // Each scene gets one timer and one shared music bus, never an additional loop.
  setGain(graph.music.gain, 0, 0.005);
  graph.music.gain.linearRampToValueAtTime(settings.musicVolume, context.currentTime + 0.20);
  scheduler = setInterval(pump, TICK_MS);
  pump();
}

function renderSound(name) {
  const sound = SFX[name];
  if (!sound || !context || context.state !== 'running' || !sfxAudible() || !outputAllowed()) return false;
  const required = sound.notes.length * 2;
  if (sourceCount('sfx') + required > SOURCE_LIMITS.sfx) return false;
  const when = context.currentTime + 0.008;
  try {
    for (const [offset, pitch, duration, volume] of sound.notes) {
      note('sfx', pitch, when + offset, duration, volume, 'pluck');
    }
    return true;
  } catch {
    stopChannel('sfx', 0);
    return false; // Audio errors must not break the action that triggered the effect.
  }
}

function syncPlayback() {
  if (!initialized) return;
  if (!outputAllowed()) {
    pendingSound = null;
    stopMusic(FADE_OUT, true); stopChannel('sfx', FADE_OUT);
    suspendAfterFade(); notify(); return;
  }
  cancelSuspend();
  if (!context || context.state !== 'running') {
    attachGestures(); notify(); return;
  }
  applyLevels();
  if (musicAudible()) startMusic();
  else stopMusic(FADE_OUT, true);
  if (!sfxAudible()) stopChannel('sfx', FADE_OUT);
  if (pendingSound) {
    const queued = pendingSound; pendingSound = null;
    if (clockNow() - queued.at < 450) renderSound(queued.name);
  }
  notify();
}

function onVisibilityChange() {
  if (isBackground()) syncPlayback();
  else if (outputAllowed()) requestResume();
  else notify();
}

export function initAudio() {
  if (!initialized) {
    initialized = true;
    globalThis.document?.addEventListener('visibilitychange', onVisibilityChange);
    globalThis.window?.addEventListener('pagehide', () => { pageHidden = true; syncPlayback(); });
    globalThis.window?.addEventListener('pageshow', () => { pageHidden = false; onVisibilityChange(); });
    attachGestures();
  }
  // This is also a safe retry entry point after an AudioContext construction failure.
  if (outputAllowed()) requestResume();
  else syncPlayback();
  notify();
  return getAudioStatus();
}

export function setAudioScene(value) {
  const normalized = SCENE_ALIASES[value] || (Object.hasOwn(SCENES, value) ? value : 'home');
  if (scene !== normalized) {
    stopMusic(0.08, false);
    stopChannel('sfx', FADE_OUT); pendingSound = null;
    scene = normalized; resumeBar = SCENES[scene].startBar;
  }
  if (!initialized) initAudio();
  else if (outputAllowed()) requestResume();
  else syncPlayback();
  notify();
  return getAudioStatus();
}

export function playSound(name) {
  if (!Object.hasOwn(SFX, name) || !sfxAudible() || paused || isBackground()) return false;
  const now = clockNow();
  if (now - (lastSound.get(name) ?? -Infinity) < SFX[name].debounce) return false;
  if (!initialized) initAudio();
  lastSound.set(name, now);
  if (context?.state === 'running') return renderSound(name);
  // Only the most recent first-gesture effect may wait briefly for resume. There is
  // never a sound backlog to replay after backgrounding or a delayed permission.
  pendingSound = { name, at: now };
  requestResume();
  return !fatalError && Boolean(audioConstructor());
}

export function updateAudioSettings(patch = {}) {
  for (const key of ['musicEnabled','sfxEnabled','muted']) {
    if (typeof patch[key] === 'boolean') settings[key] = patch[key];
  }
  for (const key of ['musicVolume','sfxVolume']) settings[key] = clampVolume(patch[key], settings[key]);
  try {
    if (!globalThis.localStorage) throw new Error('unavailable');
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, ...settings }));
    settingsPersisted = true;
  } catch { settingsPersisted = false; }
  if (!initialized) initAudio();
  else if (outputAllowed()) requestResume();
  else syncPlayback();
  notify(true);
  return getAudioSettings();
}

export function setAudioPaused(value) {
  paused = Boolean(value);
  if (!initialized) initAudio();
  else if (outputAllowed()) requestResume();
  else syncPlayback();
  notify();
  return getAudioStatus();
}
