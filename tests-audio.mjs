import test from 'node:test';
import assert from 'node:assert/strict';

// Deterministic lifecycle tests. This fake graph cannot validate real sound quality;
// browser playback/RMS and listening remain separate acceptance checks.
class Target {
  listeners = new Map();
  addEventListener(type, fn) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type).add(fn);
  }
  removeEventListener(type, fn) { this.listeners.get(type)?.delete(fn); }
  dispatchEvent(event) { for (const fn of [...(this.listeners.get(event.type) || [])]) fn(event); }
}
class Param {
  value = 0;
  setValueAtTime(value) { this.value = value; }
  linearRampToValueAtTime(value) { this.value = value; }
  exponentialRampToValueAtTime(value) { assert(value > 0); this.value = value; }
  cancelScheduledValues() {}
  cancelAndHoldAtTime() {}
}
class Node {
  connections = [];
  connect(node) { this.connections.push(node); }
  disconnect() { this.connections.length = 0; }
}

function environment(stored = null, options = {}) {
  const names = ['window','document','localStorage','AudioContext','webkitAudioContext','CustomEvent',
    'setInterval','clearInterval','setTimeout','clearTimeout','performance'];
  const original = new Map(names.map(name => [name, Object.getOwnPropertyDescriptor(globalThis, name)]));
  const env = { now: 10000, allowed: Boolean(options.autoplay), contexts: [], timers: new Map(), nextTimer: 1,
    window: new Target(), document: new Target(), store: new Map(), maxSources: 0 };
  env.document.hidden = false;
  if (stored !== null) env.store.set('history-soul-audio-v1', stored);
  class Oscillator extends Node {
    frequency = new Param();
    startAt = Infinity;
    endAt = Infinity;
    ended = false;
    constructor(ctx) { super(); this.ctx = ctx; ctx.oscillators.add(this); }
    start(at) { this.startAt = at; this.ctx.starts++; }
    stop(at) { this.endAt = at; }
    endIfDue() {
      if (!this.ended && this.endAt <= this.ctx.currentTime) {
        this.ended = true; this.ctx.oscillators.delete(this); this.onended?.();
      }
    }
  }
  class Context extends Target {
    currentTime = 0;
    state = 'suspended';
    destination = new Node();
    oscillators = new Set();
    starts = 0;
    resumeCalls = 0;
    waiting = [];
    constructor() {
      super();
      if (env.failConstruction) throw new Error('audio device unavailable');
      env.contexts.push(this);
    }
    createGain() { return Object.assign(new Node(), { gain: new Param() }); }
    createDynamicsCompressor() {
      return Object.assign(new Node(), Object.fromEntries(['threshold','knee','ratio','attack','release'].map(x => [x, new Param()])));
    }
    createAnalyser() {
      return Object.assign(new Node(), { fftSize: 256, getFloatTimeDomainData(array) { array.fill(0.01); } });
    }
    createOscillator() { return new Oscillator(this); }
    resume() {
      this.resumeCalls++;
      if (!env.allowed) return new Promise(resolve => this.waiting.push(resolve));
      this.state = 'running'; this.dispatchEvent({ type: 'statechange' });
      for (const resolve of this.waiting.splice(0)) resolve();
      return Promise.resolve();
    }
    suspend() {
      this.state = 'suspended'; this.dispatchEvent({ type: 'statechange' });
      return Promise.resolve();
    }
  }
  function assign(name, value) { Object.defineProperty(globalThis, name, { value, configurable: true, writable: true }); }
  assign('window', env.window); assign('document', env.document);
  assign('localStorage', { getItem: key => env.store.get(key) ?? null, setItem: (key,value) => env.store.set(key,value) });
  assign('AudioContext', options.unsupported ? undefined : Context); assign('webkitAudioContext', undefined);
  assign('CustomEvent', class { constructor(type, options) { this.type = type; this.detail = options.detail; } });
  assign('performance', { now: () => env.now });
  const addTimer = (fn, delay, repeat) => {
    const id = env.nextTimer++;
    env.timers.set(id, { fn, delay, repeat, at: env.now + delay }); return id;
  };
  assign('setInterval', (fn,delay) => addTimer(fn,delay,true));
  assign('setTimeout', (fn,delay) => addTimer(fn,delay,false));
  assign('clearInterval', id => env.timers.delete(id)); assign('clearTimeout', id => env.timers.delete(id));
  env.stepClock = to => {
    const delta = (to - env.now) / 1000;
    for (const ctx of env.contexts) {
      if (ctx.state === 'running') ctx.currentTime += delta;
      for (const osc of [...ctx.oscillators]) osc.endIfDue();
    }
    env.now = to;
  };
  env.advance = milliseconds => {
    const until = env.now + milliseconds;
    let guard = 0;
    while (++guard < 100000) {
      const item = [...env.timers].filter(([,t]) => t.at <= until).sort((a,b) => a[1].at-b[1].at)[0];
      if (!item) break;
      const [id,timer] = item;
      env.stepClock(timer.at);
      if (timer.repeat) timer.at += timer.delay; else env.timers.delete(id);
      timer.fn();
    }
    assert(guard < 100000, 'timer loop must be bounded');
    env.stepClock(until);
  };
  env.skip = milliseconds => {
    env.stepClock(env.now + milliseconds);
    for (const [,timer] of env.timers) timer.at = env.now + timer.delay;
    for (const [,timer] of env.timers) if (timer.repeat) timer.fn();
  };
  env.intervals = () => [...env.timers.values()].filter(t => t.repeat).length;
  env.gesture = trusted => env.window.dispatchEvent({ type: 'pointerup', button: 0, isTrusted: trusted });
  env.restore = () => {
    for (const name of names) {
      const descriptor = original.get(name);
      if (descriptor) Object.defineProperty(globalThis, name, descriptor); else delete globalThis[name];
    }
  };
  return env;
}

let serial = 0;
const loadAudio = () => import(`./dist/audio.js?audio-test=${++serial}`);
const settle = async () => { await Promise.resolve(); await Promise.resolve(); await Promise.resolve(); };

test('gesture unlock, one 32-bar transport, bounded sources, settings and background lifecycle', async () => {
  const env = environment();
  try {
    const audio = await loadAudio();
    const notices = [];
    window.addEventListener('history-audio-change', event => notices.push(event.detail));
    assert.deepEqual(audio.getAudioSettings(), { musicEnabled:true,sfxEnabled:true,muted:false,musicVolume:0.24,sfxVolume:0.45 });
    audio.initAudio(); audio.initAudio(); audio.initAudio();
    assert.equal(env.contexts.length, 1);
    assert.equal(audio.getAudioStatus().musicState, 'pending');
    assert.equal(env.intervals(), 0);
    const blockedCalls = env.contexts[0].resumeCalls;
    env.gesture(false);
    assert.equal(env.contexts[0].resumeCalls, blockedCalls, 'synthetic gestures must not unlock audio');
    env.allowed = true;
    env.gesture(true); await settle();
    assert.equal(audio.getAudioStatus().musicState, 'playing');
    assert.equal(env.intervals(), 1);
    assert.equal(env.window.listeners.get('pointerup').size, 0, 'successful unlock removes gesture listeners');
    assert(audio.getAudioStatus().musicRms > 0);

    for (let i=0;i<40;i++) {
      audio.setAudioScene(['quiz','memory','result','home'][i%4]);
      assert.equal(env.intervals(), 1);
      const status = audio.getAudioStatus();
      assert(status.activeMusicSources <= status.sourceLimits.music);
      assert(status.activeSfxSources <= status.sourceLimits.sfx);
    }
    env.advance(1000); await settle();
    assert.equal(env.contexts.length, 1, 'restarts reuse the audio context');
    const seenBars = new Set();
    for (let i=0;i<240;i++) {
      env.advance(400);
      const status = audio.getAudioStatus(); seenBars.add(status.bar);
      assert(status.activeMusicSources <= 28);
      assert.equal(env.intervals(), 1);
    }
    assert.equal(seenBars.size, 32, 'all 32 bars occur before the loop repeats');
    assert(env.contexts[0].starts > 32 * 8, 'the complete score schedules sustained melody and accompaniment');

    for (let i=0;i<60;i++) {
      audio.playSound(['select','flip','match','miss','complete'][i%5]);
      const status = audio.getAudioStatus(); assert(status.activeSfxSources <= 12);
      env.advance(10);
    }
    env.advance(2000); assert.equal(audio.getAudioStatus().activeSfxSources, 0);
    audio.updateAudioSettings({ musicEnabled:false });
    env.advance(100); await settle();
    assert.equal(audio.getAudioStatus().musicState, 'muted');
    assert.equal(audio.getAudioStatus().sfxReady, true);
    assert.equal(audio.getAudioStatus().activeMusicSources, 0);
    assert.equal(env.intervals(), 0);
    assert.equal(audio.playSound('select'), true, 'music and effects controls are independent');
    audio.updateAudioSettings({ musicEnabled:true, musicVolume:0.18, sfxVolume:0.3 });
    await settle(); assert.equal(env.intervals(), 1);

    audio.setAudioPaused(true);
    env.advance(200); await settle();
    assert.equal(audio.getAudioStatus().state, 'paused');
    assert.equal(audio.getAudioStatus().musicRms, 0);
    assert.equal(audio.getAudioStatus().activeMusicSources, 0);
    assert.equal(audio.getAudioStatus().activeSfxSources, 0);
    assert.equal(env.intervals(), 0);
    assert.equal(audio.playSound('flip'), false);
    audio.setAudioScene('memory');
    assert.equal(env.intervals(), 0, 'scene changes cannot undo manual pause');
    audio.setAudioPaused(false); await settle();
    assert.equal(env.intervals(), 1);
    assert.equal(audio.getAudioStatus().scene, 'memory');

    document.hidden = true; document.dispatchEvent({type:'visibilitychange'});
    env.advance(200); await settle();
    assert.equal(audio.getAudioStatus().state, 'background');
    assert.equal(env.intervals(), 0);
    assert.equal(audio.getAudioStatus().activeMusicSources, 0);
    const beforeHidden = env.contexts[0].starts;
    env.advance(60000); assert.equal(env.contexts[0].starts, beforeHidden);
    document.hidden = false; document.dispatchEvent({type:'visibilitychange'}); await settle();
    assert.equal(env.intervals(), 1);
    assert(env.contexts[0].starts - beforeHidden <= 10, 'foreground resumes one current beat, not a backlog');
    env.skip(12000);
    assert(audio.getAudioStatus().activeMusicSources <= 28, 'a late timer also skips missed music');

    audio.updateAudioSettings({ muted:true }); env.advance(200); await settle();
    assert.equal(audio.getAudioStatus().state, 'muted');
    assert.equal(env.intervals(), 0);
    assert(notices.some(s => s.musicState === 'playing'));
    assert(notices.some(s => s.state === 'background'));
    const saved = JSON.parse(env.store.get('history-soul-audio-v1'));
    assert.equal(saved.muted, true); assert.equal(saved.musicVolume, 0.18);
    const reloaded = await loadAudio();
    reloaded.initAudio();
    assert.equal(reloaded.getAudioStatus().state, 'muted');
    assert.equal(env.intervals(), 0, 'refresh preserves explicit mute');
    assert.equal(env.contexts.length, 1, 'muted refresh does not allocate an audio graph');
  } finally { env.restore(); }
});

test('damaged settings are bounded, unknown sound ignored, construction can retry', async () => {
  const env = environment(JSON.stringify({version:1,musicVolume:'loud',sfxVolume:4,musicEnabled:'no'}), {autoplay:true});
  try {
    const audio = await loadAudio();
    assert.equal(audio.getAudioSettings().musicVolume, 0.24);
    assert.equal(audio.getAudioSettings().sfxVolume, 1);
    assert.equal(audio.getAudioSettings().musicEnabled, true);
    env.failConstruction = true; audio.initAudio();
    assert.equal(audio.getAudioStatus().state, 'error');
    env.failConstruction = false; audio.initAudio(); await settle();
    assert.equal(audio.getAudioStatus().state, 'playing');
    assert.equal(audio.playSound('not-a-sound'), false);
    audio.updateAudioSettings({ musicVolume:-1, sfxVolume:NaN, sfxEnabled:false });
    env.advance(200); await settle();
    assert.equal(audio.getAudioSettings().musicVolume, 0);
    assert.equal(audio.getAudioSettings().sfxVolume, 1);
    assert.equal(audio.getAudioStatus().state, 'muted');
    assert.equal(env.intervals(), 0);
  } finally { env.restore(); }
});

test('unsupported browsers remain playable and report an honest state', async () => {
  const env = environment(null, {unsupported:true});
  try {
    const audio = await loadAudio();
    assert.equal(audio.initAudio().state, 'unsupported');
    assert.equal(audio.playSound('complete'), false);
    assert.equal(env.intervals(), 0);
    assert.equal(audio.getAudioStatus().musicRms, 0);
  } finally { env.restore(); }
});
