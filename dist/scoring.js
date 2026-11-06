import { dimensions, questions, characters } from './data.js?v=4';

const keys = dimensions.map(d => d.key);
export function scoreAnswers(answers) {
  if (!Array.isArray(answers) || answers.length !== questions.length) throw new Error('请完成全部 20 道题后再查看结果。');
  const buckets = Object.fromEntries(keys.map(k => [k, []]));
  questions.forEach((q,i) => {
    const choice = answers[i];
    if (!Number.isInteger(choice) || choice < 0 || choice >= q.options.length) throw new Error(`第 ${i + 1} 题还没有有效答案。`);
    buckets[q.dim].push(q.options[choice].value);
  });
  return Object.fromEntries(keys.map(k => [k, buckets[k].reduce((a,b) => a + b, 0) / buckets[k].length]));
}

function validateScores(scores) {
  if (!scores || keys.some(k => typeof scores[k] !== 'number' || !Number.isFinite(scores[k]) || scores[k] < 0 || scores[k] > 100)) throw new Error('五维分数需要是 0 到 100 之间的有效数字。');
}

export function matchCharacters(scores) {
  validateScores(scores);
  return characters.map(character => {
    const distance = Math.sqrt(keys.reduce((sum,k) => sum + (scores[k] - character.vector[k]) ** 2, 0) / keys.length);
    return { character, distance, score:Math.round(100 - distance) };
  }).sort((a,b) => a.distance - b.distance);
}

export function getDimensionInsight(scores) {
  validateScores(scores);
  return dimensions.map(d => {
    const value = scores[d.key];
    const level = value < 40 ? 'low' : value > 60 ? 'high' : 'balanced';
    return { ...d, score:value, level, title:level === 'low' ? d.low : level === 'high' ? d.high : '兼具两种倾向',
      text:level === 'balanced' ? '你的选择比较居中，可能会随情境灵活切换。' : `${level === 'low' ? d.low : d.high}是这次回答中更明显的倾向；另一端同样有价值。` };
  });
}

export function getMatchReasons(scores, character) {
  validateScores(scores);
  return dimensions.map(d => ({...d, difference:Math.abs(scores[d.key] - character.vector[d.key]), score:scores[d.key]}))
    .sort((a,b)=>a.difference-b.difference).slice(0,3)
    .map(d=>({ key:d.key, label:d.label, text:`在「${d.label}」上，你这次的选择${scores[d.key] < 40 ? `偏向${d.low}` : scores[d.key] > 60 ? `偏向${d.high}` : '兼具两种倾向'}，与这个角色的创作画像较接近。` }));
}

export function compareProfiles(a, b) {
  validateScores(a); validateScores(b);
  const axes = dimensions.map(d=>({...d, a:a[d.key], b:b[d.key], gap:Math.abs(a[d.key]-b[d.key])}));
  const distance = Math.sqrt(axes.reduce((s,d)=>s+d.gap**2,0)/axes.length);
  return { score:Math.round(100-distance), closest:[...axes].sort((x,y)=>x.gap-y.gap)[0], contrast:[...axes].sort((x,y)=>y.gap-x.gap)[0], axes };
}
