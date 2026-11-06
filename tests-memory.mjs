import assert from 'node:assert/strict';
import { createMemoryDeck, createMemoryRound, dailyDateKey } from './dist/memory-core.js';

const ids=Array.from({length:72},(_,i)=>`person-${i}`);
assert.equal(dailyDateKey(new Date('2026-11-07T15:59:59Z')),'2026-11-07');
assert.equal(dailyDateKey(new Date('2026-11-07T16:00:00Z')),'2026-11-08');
const daily=createMemoryDeck(ids,6,'2026-11-07');
assert.deepEqual(daily,createMemoryDeck([...ids].reverse(),6,'2026-11-07'));
assert.notDeepEqual(daily,createMemoryDeck(ids,6,'2026-11-08'));
for(const pairs of [6,8]) {
  const deck=createMemoryDeck(ids,pairs,'test');
  assert.equal(deck.length,pairs*2);
  assert.equal(new Set(deck).size,pairs);
  for(const id of new Set(deck)) assert.equal(deck.filter(x=>x===id).length,2);
}
assert.throws(()=>createMemoryRound(['a','a','a']));
assert.throws(()=>createMemoryDeck(['a'],2));

const round=createMemoryRound(['a','b','a','b'],{mismatchMs:950});
assert.equal(round.pause(0),false,'A round must not pause before its first card.');
assert.equal(round.flip(0,100).type,'flip');
assert.equal(round.flip(0,120).type,'ignored','Double-clicking one card cannot match it.');
assert.equal(round.snapshot().moves,0);
assert.equal(round.flip(1,200).type,'miss');
assert.equal(round.flip(2,220).type,'ignored','A third card is locked during mismatch feedback.');
assert.equal(round.snapshot().moves,1);
assert.equal(round.pause(400),true);
const paused=round.snapshot();
assert.equal(paused.elapsedMs,300);
assert.equal(paused.remainingMs,750);
assert.equal(round.flip(2,5000).type,'ignored');
assert.equal(round.advance(10000).elapsedMs,300,'Background time must not enter elapsed time.');
assert.equal(round.snapshot().remainingMs,750,'Mismatch feedback freezes while paused.');
assert.equal(round.resume(12000),true);
assert.equal(round.advance(12749).phase,'resolving');
assert.equal(round.advance(12750).phase,'playing');
assert.deepEqual(round.snapshot().open,[]);
assert.equal(round.snapshot().elapsedMs,1050);
assert.equal(round.flip(0,12800).type,'flip');
assert.equal(round.flip(2,12900).type,'match');
assert.equal(round.flip(0,13000).type,'ignored','Matched cards cannot count again.');
assert.equal(round.flip(1,13100).type,'flip');
assert.equal(round.flip(3,13200).type,'complete');
assert.equal(round.snapshot().moves,3);
const final=round.snapshot();
assert.equal(round.advance(99999).elapsedMs,final.elapsedMs,'Completion freezes the timer.');
assert.equal(round.flip(2,100000).type,'ignored');
assert.equal(round.pause(100001),false);

for(const pairs of [6,8]) {
  const deck=createMemoryDeck(ids,pairs,'complete');
  const game=createMemoryRound(deck);
  let clock=0,completions=0;
  for(const id of new Set(deck)) {
    for(const index of deck.map((v,i)=>v===id?i:-1).filter(i=>i>=0)) {
      if(game.flip(index,clock+=100).type==='complete') completions++;
    }
  }
  assert.equal(completions,1);
  assert.equal(game.snapshot().moves,pairs);
  assert.equal(game.snapshot().matchedPairs,pairs);
}
console.log('Memory game: deterministic daily deck, 6/8 pairs, repeat-click locks, mismatch pause/resume timing and full completion passed.');
