import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { dimensions, questions, characters } from './dist/data.js';
import { scoreAnswers, matchCharacters, getDimensionInsight } from './dist/scoring.js';

assert.equal(questions.length,20);
assert.equal(characters.length,72);
assert.equal(new Set(characters.map(c=>c.id)).size,72);
assert.equal(new Set(characters.map(c=>JSON.stringify(c.vector))).size,72);
assert.equal(characters.filter(c=>c.isNew).length,36);
assert.ok(characters.slice(0,36).every(c=>c.isNew===false));
// Regression fixtures ensure this content expansion never alters existing answers or profiles.
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
assert.equal(hash(questions),'d5a55441d338488d21adfc9711c2e44be14bd92399307cff477ef69303132a46');
assert.equal(hash(characters.slice(0,36).map(c=>({id:c.id,vector:c.vector}))),'ec596cbaf5fadb801776aacadb0ce8adc728dee3f0bab9df07f30e11d5e4bcba');
for(const c of characters){
  for(const field of ['id','name','era','role','title','tagline','description','strength','watchout','habit','story','color','category','gender','region']){
    assert.ok(typeof c[field]==='string'&&c[field].trim().length>0,`${c.id}.${field}`);
  }
  assert.match(c.id,/^[a-z]+$/);
  assert.match(c.color,/^#[0-9a-f]{6}$/i);
  assert.ok(['中国','世界'].includes(c.region),`${c.id}.region`);
  assert.ok(['灵感派','谋略派','行动派','探索派','温暖派'].includes(c.category),`${c.id}.category`);
  assert.ok(['男','女'].includes(c.gender),`${c.id}.gender`);
  assert.equal(typeof c.isNew,'boolean',`${c.id}.isNew`);
  assert.ok(Array.isArray(c.aliases)&&c.aliases.length>0,`${c.id}.aliases`);
  assert.ok(c.aliases.every(a=>typeof a==='string'&&a.trim()),`${c.id} aliases content`);
  assert.equal(new Set(c.aliases).size,c.aliases.length,`${c.id} duplicate alias`);
  assert.ok(Array.isArray(c.tags)&&c.tags.length===3,`${c.id}.tags`);
  assert.ok(c.tags.every(t=>typeof t==='string'&&t.trim()),`${c.id} tags content`);
  assert.equal(new Set(c.tags).size,3,`${c.id} duplicate tag`);
  assert.deepEqual(Object.keys(c.vector),dimensions.map(d=>d.key),`${c.id}.vector`);
  assert.ok(Object.values(c.vector).every(v=>Number.isFinite(v)&&v>=0&&v<=100));
}
assert.equal(new Set(questions.map(q=>q.id)).size,20);
for(const d of dimensions){
  const list=questions.filter(q=>q.dim===d.key);
  assert.equal(list.length,4);
  assert.equal(list.filter(q=>q.reversed).length,2);
}
for(const q of questions){
  assert.equal(q.options.length,4);
  assert.deepEqual(q.options.map(o=>o.value).sort((a,b)=>a-b),[0,33,67,100]);
  assert.equal(q.options[0].value,q.reversed?100:0,`${q.id} direction`);
}
assert.equal(questions[1].options[0].text,'清单已打钩，充电器也放好了');
assert.equal(questions[1].options[0].value,100);

const low=scoreAnswers(questions.map(q=>q.options.findIndex(o=>o.value===0)));
const high=scoreAnswers(questions.map(q=>q.options.findIndex(o=>o.value===100)));
assert.ok(Object.values(low).every(v=>v===0));
assert.ok(Object.values(high).every(v=>v===100));
const middle=scoreAnswers(Array(20).fill(0));
assert.ok(Object.values(middle).every(v=>v===50));
assert.ok(getDimensionInsight(middle).every(d=>d.level==='balanced'));
assert.throws(()=>scoreAnswers([]));
assert.throws(()=>scoreAnswers(Array(20).fill(null)));
assert.throws(()=>scoreAnswers(Array(20).fill(4)));
assert.throws(()=>matchCharacters({O:NaN,C:50,E:50,A:50,S:50}));
assert.throws(()=>matchCharacters({O:-1,C:50,E:50,A:50,S:50}));

// Every character must have an actual 20-answer path which makes it the top result.
const values=[0,33,67,100];
const combos=[];
const reachablePaths={};
for(const a of values)for(const b of values)for(const c of values)for(const d of values)combos.push({v:[a,b,c,d],mean:(a+b+c+d)/4});
for(const c of characters){
  assert.equal(matchCharacters(c.vector)[0].character.id,c.id);
  const answers=Array(20);
  for(const dim of dimensions){
    const best=[...combos].sort((a,b)=>Math.abs(a.mean-c.vector[dim.key])-Math.abs(b.mean-c.vector[dim.key]))[0];
    questions.map((q,i)=>({q,i})).filter(({q})=>q.dim===dim.key).forEach(({q,i},n)=>answers[i]=q.options.findIndex(o=>o.value===best.v[n]));
  }
  assert.equal(matchCharacters(scoreAnswers(answers))[0].character.id,c.id,`unreachable ${c.id}`);
  reachablePaths[c.id]=answers;
}

// Seeded synthetic simulation checks implementation coverage, never population prevalence.
let seed=20261105;
const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
const counts=Object.fromEntries(characters.map(c=>[c.id,0]));
for(let i=0;i<30000;i++){
  const ranked=matchCharacters(scoreAnswers(questions.map(()=>Math.floor(random()*4))));
  counts[ranked[0].character.id]++;
  assert.ok(ranked.every((r,j)=>r.score>=0&&r.score<=100&&(!j||r.distance>=ranked[j-1].distance)));
}
const observed=Object.values(counts).filter(x=>x>0).length;
// Random simulation is a smoke check, not a proof of reachability or a population prevalence estimate.
// The constructive answer paths above, rather than random frequency, verify all 72 outcomes.
console.log(JSON.stringify({status:'passed',questions:20,dimensions:5,characters:72,newCharacters:36,reachable:Object.keys(reachablePaths).length,simulation:30000,observed,qaPaths:{zhaoyun:reachablePaths.zhaoyun.map(i=>i+1),wangzhaojun:reachablePaths.wangzhaojun.map(i=>i+1)},counts},null,2));
