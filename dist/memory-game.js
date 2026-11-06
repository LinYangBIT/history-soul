import { characters } from './data.js?v=4';
import { portraitURL } from './artwork.js?v=4';
import { createMemoryDeck, createMemoryRound, dailyDateKey } from './memory-core.js?v=4';

const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const people = new Map(characters.map(c=>[c.id,c]));
const modes = [{id:'daily',label:'每日相遇',pairs:6},{id:'free6',label:'轻松 6 对',pairs:6},{id:'free8',label:'进阶 8 对',pairs:8}];
const bestKey='history-soul:memory-best:v1';
const timeLabel = seconds => `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;
function readBest() {
  try {
    const value=JSON.parse(localStorage.getItem(bestKey)||'{}');
    return value && typeof value==='object' && !Array.isArray(value) ? value : {};
  } catch { return {}; }
}
function validBest(value) { return value && Number.isInteger(value.moves) && value.moves>=1 && Number.isInteger(value.seconds) && value.seconds>=0; }
function randomSeed() {
  if(globalThis.crypto?.getRandomValues) return String(crypto.getRandomValues(new Uint32Array(1))[0]);
  return `${Date.now()}-${Math.random()}`;
}

/** Independent scene. The host owns music, passport records, and navigation. */
export function mountMemoryGame(container, { onExit=()=>{}, onComplete=()=>{}, onSound=()=>{}, onPauseChange=()=>{} }={}) {
  if(!container) throw new Error('A memory-game container is required.');
  const lifecycle=new AbortController();
  const signal=lifecycle.signal;
  let mode='daily',dateKey=dailyDateKey(),round=null,ticker=null,destroyed=false,completed=false,pauseReason='manual',best={},newRecord=false;
  let previousSignature='',lastSecond=-1;
  const now=()=>performance.now();
  const notify=(fn,...args)=>{try{fn(...args);}catch(error){console.error('Memory game callback failed:',error);}};
  const query=selector=>container.querySelector(selector);
  const stopTicker=()=>{if(ticker!==null){clearInterval(ticker);ticker=null;}};
  const recordKey=()=>mode==='daily'?`daily:${dateKey}`:mode;
  const recordText=()=>validBest(best[recordKey()])?`本机最佳 ${best[recordKey()].moves} 步 · ${timeLabel(best[recordKey()].seconds)}`:'本机还没有这一场的纪录';
  const portrait=(id,cls='')=>`<img class="${cls}" src="${esc(portraitURL(id,true))}" width="480" height="480" alt="" decoding="async" draggable="false">`;

  function start(nextMode=mode) {
    if(destroyed) return;
    stopTicker();
    // Also reset the host's result-scene music when replaying a completed round.
    notify(onPauseChange,false,{reason:'restart'});
    mode=modes.some(m=>m.id===nextMode)?nextMode:'daily';
    dateKey=dailyDateKey();
    best=readBest(); completed=false; newRecord=false; previousSignature=''; lastSecond=-1;
    const selected=modes.find(m=>m.id===mode);
    const seed=mode==='daily'?`history-soul-memory-v1:${dateKey}`:randomSeed();
    round=createMemoryRound(createMemoryDeck(characters.map(c=>c.id),selected.pairs,seed));
    container.innerHTML=`<section class="memory-game" aria-labelledby="mg-title">
      <div class="mg-topline"><button class="mg-back" data-mg-action="exit">← 返回研究所</button><span class="mg-kicker">THE LITTLE MEMORY CLUB</span></div>
      <header class="mg-heading"><div><p class="mg-eyebrow">历史朋友，见过就记得</p><h1 id="mg-title" tabindex="-1">人物翻翻乐<span aria-hidden="true">✧</span></h1><p>翻开两张相同的人物，把散落的时空朋友配成一对。</p></div><div class="mg-stamp" aria-hidden="true"><span>记住一张脸</span><b>认识一个人</b><i>MEMORY CLUB</i></div></header>
      <div class="mg-modebar"><div class="mg-modes" role="group" aria-label="选择翻牌玩法">${modes.map(m=>`<button data-mg-mode="${m.id}" aria-pressed="${m.id===mode}" class="${m.id===mode?'is-active':''}">${m.label}<small>${m.pairs*2} 张牌</small></button>`).join('')}</div><p class="mg-daily-note">${mode==='daily'?`北京时间 ${dateKey}<br>每天更新，同一天的阵容与位置相同`:'每次重开都会遇见不同的朋友<br>自由练习，不限时间'}</p></div>
      <div class="mg-game-layout"><div class="mg-main"><div class="mg-hud" aria-label="本局进度"><div><span>已配对</span><b id="mg-pairs">0<small> / ${selected.pairs}</small></b></div><div><span>翻牌步数</span><b id="mg-moves">0</b></div><div><span>用时</span><b id="mg-time">00:00</b></div><button class="mg-pause" data-mg-action="pause" disabled aria-label="暂停翻牌">Ⅱ <span>暂停</span></button></div>
      <div class="mg-board-wrap"><div class="mg-board mg-board-${selected.pairs}" aria-label="${selected.pairs*2}张人物记忆牌">${round.snapshot().deck.map((id,i)=>`<button class="mg-card" data-mg-card="${i}" aria-label="第${i+1}张，未翻开" aria-pressed="false"><span class="mg-card-inner"><span class="mg-card-back" aria-hidden="true"><i>${String(i+1).padStart(2,'0')}</i><span class="mg-card-flower">✳</span><small>时空来信</small><b>HISTORY SOUL</b></span><span class="mg-card-front" aria-hidden="true" style="--mg-person:${people.get(id).color}">${portrait(id)}<span class="mg-card-name">${esc(people.get(id).name)}</span><span class="mg-card-check" aria-hidden="true">✓</span></span></span></button>`).join('')}</div>
      <div class="mg-pause-cover" hidden><div><span class="mg-pause-mark" aria-hidden="true">☾</span><h2>先让记忆歇一会儿</h2><p id="mg-pause-copy">计时已停，回来后再继续。</p><button class="mg-primary" data-mg-action="resume">继续翻牌 →</button><button class="mg-text-button" data-mg-action="exit">返回研究所</button></div></div></div>
      <p id="mg-feedback" class="mg-feedback" role="status" aria-live="polite">翻开第一张开始计时。两次翻牌算 1 步，慢慢来也可以。</p>
      <div class="mg-underboard"><span class="mg-best">${recordText()}</span><button class="mg-text-button" data-mg-action="restart">↻ 重新开始</button></div></div>
      <aside class="mg-notebook"><div class="mg-notebook-title"><span aria-hidden="true">✎</span><h2>本局相遇手记</h2></div><p>配对成功，就记住一位新朋友。</p><div id="mg-found" class="mg-found"><div class="mg-empty-found"><span aria-hidden="true">♡</span>第一位朋友，正在牌的背面等你。</div></div><div class="mg-howto"><b>轻轻松松玩</b><p>① 点开一张，记住 TA 的脸<br>② 再翻一张，找到同一位<br>③ 配齐所有人物，收好相遇手记</p><small>键盘方向键移动 · Enter / 空格翻牌<br>Esc 暂停 · 切到后台会自动暂停</small></div></aside></div>
      <section class="mg-completion" hidden aria-labelledby="mg-complete-title"></section>
    </section>`;
    query('#mg-title').focus({preventScroll:true});
    render();
  }

  function tick() {
    if(destroyed || !round) return;
    round.advance(now()); render();
  }
  function ensureTicker() {
    const state=round.snapshot();
    if(!destroyed && ticker===null && !state.paused && state.phase!=='ready' && state.phase!=='completed') ticker=setInterval(tick,100);
  }
  function render() {
    if(destroyed || !round) return;
    const state=round.snapshot();
    if(state.seconds!==lastSecond) {query('#mg-time').textContent=timeLabel(state.seconds);lastSecond=state.seconds;}
    const signature=[state.phase,state.paused,state.moves,state.open.join(','),state.matched.join(',')].join('|');
    if(signature===previousSignature) return;
    previousSignature=signature;
    query('#mg-moves').textContent=String(state.moves);
    query('#mg-pairs').innerHTML=`${state.matchedPairs}<small> / ${state.pairs}</small>`;
    query('[data-mg-action="pause"]').disabled=state.phase==='ready'||state.phase==='completed'||state.paused;
    const board=query('.mg-board');
    board.toggleAttribute('inert',state.paused);
    board.setAttribute('aria-hidden',String(state.paused));
    board.classList.toggle('is-paused',state.paused);
    query('.mg-pause-cover').hidden=!state.paused;
    container.querySelectorAll('[data-mg-card]').forEach((button,index)=>{
      const matched=state.matched.includes(index),revealed=matched||state.open.includes(index);
      button.classList.toggle('is-open',revealed);
      button.classList.toggle('is-matched',matched);
      button.classList.toggle('is-miss',state.phase==='resolving'&&state.open.includes(index));
      button.setAttribute('aria-pressed',String(revealed));
      button.setAttribute('aria-disabled',String(matched||state.phase==='resolving'||state.paused||state.phase==='completed'));
      button.setAttribute('aria-label',revealed?`第${index+1}张，${people.get(state.deck[index]).name}，${matched?'已配对':'已翻开'}`:`第${index+1}张，未翻开`);
      button.querySelector('.mg-card-front').setAttribute('aria-hidden',String(!revealed||state.paused));
    });
    const found=[...new Set(state.matched.map(index=>state.deck[index]))];
    if(found.length) query('#mg-found').innerHTML=found.map(id=>`<div class="mg-found-person">${portrait(id)}<div><b>${esc(people.get(id).name)}</b><small>${esc(people.get(id).era)} · ${esc(people.get(id).role)}</small></div><span aria-hidden="true">✓</span></div>`).join('');
  }

  function finish(state) {
    if(completed || destroyed) return;
    completed=true;stopTicker();
    const previous=best[recordKey()];
    newRecord=!validBest(previous)||state.moves<previous.moves||(state.moves===previous.moves&&state.seconds<previous.seconds);
    if(newRecord) {
      best[recordKey()]={moves:state.moves,seconds:state.seconds};
      const dailyKeys=Object.keys(best).filter(k=>k.startsWith('daily:')).sort();
      for(const key of dailyKeys.slice(0,-32)) delete best[key];
      try{localStorage.setItem(bestKey,JSON.stringify(best));}catch{}
    }
    query('.mg-best').textContent=recordText();
    query('#mg-feedback').textContent=`全部配对成功！这一局，你认识了${state.pairs}位历史朋友。`;
    const panel=query('.mg-completion');
    panel.innerHTML=`<div class="mg-finish-stars" aria-hidden="true">✦ ✧ ✦</div><p class="mg-eyebrow">一张相遇手记，完成了</p><h2 id="mg-complete-title" tabindex="-1">历史朋友，全员到齐！</h2><p class="mg-finish-summary">${state.pairs} 对人物 · <strong>${state.moves} 步</strong> · ${timeLabel(state.seconds)}<br><span>${newRecord?'✧ 刷新了这一模式的本机最佳！':recordText()}</span></p><div class="mg-learned">${state.ids.map(id=>{const p=people.get(id);return `<article>${portrait(id)}<h3>${esc(p.name)}</h3><p>${esc(p.era)} · ${esc(p.role)}</p><details><summary>认识 TA 的一件事</summary><p>${esc(p.story)}</p></details></article>`;}).join('')}</div><div class="mg-finish-actions"><button class="mg-primary" data-mg-action="restart">${mode==='daily'?'再挑战一次今日阵容':'再遇见一组朋友'} ↗</button><button class="mg-secondary" data-mg-action="exit">收好手记，返回研究所</button></div><p class="mg-local-note">步数纪录只保存在当前浏览器。每日阵容于北京时间零点更新。</p>`;
    panel.hidden=false;
    query('#mg-complete-title').focus({preventScroll:true});
    panel.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
    notify(onComplete,{ids:[...state.ids],moves:state.moves,seconds:state.seconds,mode,dateKey});
  }

  function flip(index) {
    if(destroyed || document.hidden) return;
    const event=round.flip(index,now());
    if(event.type==='ignored') return;
    if(event.type!=='complete') notify(onSound,event.type);
    render();ensureTicker();
    const message=event.type==='flip'?`翻开了${people.get(event.state.deck[index]).name}。再找一张相同的人物。`:event.type==='miss'?'这两位还不是同一个人。记住位置，稍后再来找。':`找到${people.get(event.id).name}！又认识了一位历史朋友。`;
    query('#mg-feedback').textContent=message;
    if(event.type==='complete') {
      // The host changes music scenes in onComplete; play the flourish after that cleanup.
      finish(event.state);
      if(!destroyed) notify(onSound,'complete');
    }
  }
  function pause(reason='dialog') {
    if(destroyed || !round || !round.pause(now())) return false;
    pauseReason=reason;stopTicker();render();
    query('#mg-pause-copy').textContent=reason==='hidden'?'刚刚离开了页面，计时已经自动暂停。准备好再继续。':reason==='dialog'?'看完小窗口后，点「继续翻牌」再出发。':'计时已停，牌面也收好了。准备好再继续。';
    notify(onPauseChange,true,{reason});
    if(reason==='manual') query('[data-mg-action="resume"]').focus();
    return true;
  }
  function resume() {
    if(destroyed || document.hidden || !round.resume(now())) return;
    render();ensureTicker();notify(onPauseChange,false,{reason:pauseReason});
    const state=round.snapshot();
    const next=state.deck.findIndex((_,i)=>!state.matched.includes(i)&&!state.open.includes(i));
    if(next>=0) query(`[data-mg-card="${next}"]`).focus();
  }
  function destroy() {
    if(destroyed) return;
    destroyed=true;stopTicker();lifecycle.abort();
    notify(onPauseChange,false,{reason:'exit'});
    container.replaceChildren();
  }
  container.addEventListener('click',event=>{
    const button=event.target.closest('button');
    if(!button || !container.contains(button) || button.disabled || destroyed) return;
    if(button.dataset.mgCard!==undefined) {flip(Number(button.dataset.mgCard));return;}
    if(button.dataset.mgMode) {start(button.dataset.mgMode);return;}
    const action=button.dataset.mgAction;
    if(action==='pause') pause('manual');
    else if(action==='resume') resume();
    else if(action==='restart') start();
    else if(action==='exit') {destroy();notify(onExit);}
  },{signal});
  container.addEventListener('keydown',event=>{
    if(destroyed || event.altKey || event.ctrlKey || event.metaKey) return;
    if(event.key==='Escape' && !round.snapshot().paused) {event.preventDefault();event.stopPropagation();pause('manual');return;}
    const button=event.target.closest('[data-mg-card]');
    if(!button || round.snapshot().paused || !['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key)) return;
    event.preventDefault();event.stopPropagation();
    const buttons=[...container.querySelectorAll('[data-mg-card]')];
    const current=buttons.indexOf(button);
    const columns=getComputedStyle(query('.mg-board')).gridTemplateColumns.split(' ').length;
    let index=current+({ArrowLeft:-1,ArrowRight:1,ArrowUp:-columns,ArrowDown:columns}[event.key]||0);
    if(event.key==='Home') index=0;
    if(event.key==='End') index=buttons.length-1;
    buttons[Math.max(0,Math.min(buttons.length-1,index))].focus();
  },{signal});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pause('hidden');},{signal});
  window.addEventListener('pagehide',()=>pause('hidden'),{signal});
  start();
  return {destroy,pause};
}
