// Pure memory-game rules. All time is supplied by the caller, so pauses never rely on timers.
export function dailyDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en', { timeZone:'Asia/Shanghai', year:'numeric', month:'2-digit', day:'2-digit' }).formatToParts(date);
  const get = key => parts.find(p=>p.type===key).value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}

function seededRandom(seed) {
  let state = 2166136261;
  for(const char of String(seed)) state = Math.imul(state ^ char.charCodeAt(0), 16777619) >>> 0;
  return () => {
    state += 0x6D2B79F5;
    let n = state;
    n = Math.imul(n ^ n >>> 15, n | 1);
    n ^= n + Math.imul(n ^ n >>> 7, n | 61);
    return ((n ^ n >>> 14) >>> 0) / 4294967296;
  };
}

function shuffle(values, random) {
  const result = [...values];
  for(let i=result.length-1;i>0;i--) {
    const j = Math.floor(random() * (i+1));
    [result[i],result[j]] = [result[j],result[i]];
  }
  return result;
}

export function createMemoryDeck(ids, pairs=6, seed='daily') {
  const pool = [...new Set(ids)].sort();
  if(!Number.isInteger(pairs) || pairs<1 || pool.length<pairs) throw new Error('Not enough unique people for this round.');
  const random = seededRandom(seed);
  const chosen = shuffle(pool,random).slice(0,pairs);
  return shuffle(chosen.flatMap(id=>[id,id]),random);
}

export function createMemoryRound(deck, { mismatchMs=950 }={}) {
  const cards = [...deck];
  const frequencies = new Map();
  for(const id of cards) frequencies.set(id,(frequencies.get(id)||0)+1);
  if(!cards.length || [...frequencies.values()].some(n=>n!==2)) throw new Error('Each person must have exactly two cards.');
  let phase='ready', paused=false, moves=0, elapsedMs=0, lastNow=null, remainingMs=0;
  let open=[];
  const matched=new Set();

  function advance(now) {
    if(!Number.isFinite(now)) throw new Error('A finite monotonic timestamp is required.');
    const delta=lastNow===null?0:Math.max(0,now-lastNow);
    lastNow=now;
    if(!paused && phase!=='ready' && phase!=='completed') {
      elapsedMs+=delta;
      if(phase==='resolving') {
        remainingMs=Math.max(0,remainingMs-delta);
        if(remainingMs===0) { open=[]; phase='playing'; }
      }
    }
    return snapshot();
  }
  function snapshot() {
    return { deck:[...cards], ids:[...frequencies.keys()], phase, paused, moves, elapsedMs,
      seconds:Math.floor(elapsedMs/1000), open:[...open], matched:[...matched], pairs:cards.length/2,
      matchedPairs:matched.size/2, remainingMs };
  }
  function flip(index, now) {
    advance(now);
    if(paused || phase==='completed' || phase==='resolving' || !Number.isInteger(index) || index<0 || index>=cards.length || matched.has(index) || open.includes(index)) return { type:'ignored', state:snapshot() };
    if(phase==='ready') phase='playing';
    open.push(index);
    if(open.length===1) return { type:'flip', state:snapshot() };
    moves++;
    const [a,b]=open;
    if(cards[a]===cards[b]) {
      matched.add(a); matched.add(b); open=[];
      if(matched.size===cards.length) phase='completed';
      return { type:phase==='completed'?'complete':'match', id:cards[a], state:snapshot() };
    }
    phase='resolving'; remainingMs=mismatchMs;
    return { type:'miss', state:snapshot() };
  }
  function pause(now) {
    advance(now);
    if(phase==='ready' || phase==='completed' || paused) return false;
    paused=true;
    return true;
  }
  function resume(now) {
    if(!paused) return false;
    lastNow=now; paused=false;
    return true;
  }
  return { flip, advance, pause, resume, snapshot };
}
