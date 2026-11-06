import {writeFile, mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {portrait,portraitIds} from '../dist/portraits.js';

const dir=fileURLToPath(new URL('../dist/assets/',import.meta.url));
await mkdir(dir+'characters',{recursive:true});
for(const id of portraitIds) await writeFile(dir+`characters/${id}.svg`,portrait(id));
const doll=(id,x,y,w,h,rotation=0)=>`<g transform="rotate(${rotation} ${x+w/2} ${y+h/2})">${portrait(id,{prefix:'hero-'+id}).replace(/<svg[^>]*>/,`<g transform="translate(${x} ${y}) scale(${w/320} ${h/360})">`).replace('</svg>','</g>')}</g>`;
const star=(x,y,s,c)=>`<path d="M0 -${s}Q${s*.2} -${s*.2} ${s} 0Q${s*.2} ${s*.2} 0 ${s}Q-${s*.2} ${s*.2} -${s} 0Q-${s*.2} -${s*.2} 0 -${s}Z" transform="translate(${x} ${y})" fill="${c}"/>`;
const hero=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 760" role="img" aria-label="李白、苏轼、诸葛亮、李清照、达芬奇和居里夫人的可爱历史人物合影">
<defs><linearGradient id="hero-bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop stop-color="#eee7fa"/><stop offset="1" stop-color="#d5cee9"/></linearGradient><linearGradient id="hero-stage" x1="0%" y1="0%" x2="0%" y2="100%"><stop stop-color="#eee0c8"/><stop offset="1" stop-color="#d8c8b6"/></linearGradient><filter id="hero-shadow" x="-40%" y="-40%" width="180%" height="200%"><feGaussianBlur stdDeviation="9"/></filter></defs>
<ellipse cx="455" cy="688" rx="341" ry="32" fill="#62586e" opacity=".08" filter="url(#hero-shadow)"/>
<path d="M123 416C54 301 99 139 246 110 287 20 433 27 497 71c115-54 257-5 284 118 105 93 69 239-1 297 40 145-124 217-234 180-97 72-244 24-277-48C129 619 84 509 123 416Z" fill="url(#hero-bg)"/>
<circle cx="244" cy="246" r="117" fill="#f2e9d4"/><circle cx="643" cy="244" r="115" fill="#e4e9df"/><circle cx="450" cy="198" r="111" fill="#ece4f3"/>
<path d="M143 552q300-85 616 0v72q-307 89-616 0Z" fill="url(#hero-stage)"/><ellipse cx="451" cy="551" rx="309" ry="52" fill="#f7eddb"/><path d="M153 592q304 77 596 0" fill="none" stroke="#f7edde" stroke-width="3" opacity=".6"/>
${doll('davinci',110,133,240,270,-8)}
${doll('sushi',335,66,238,268,2)}
${doll('curie',566,130,230,259,9)}
<ellipse cx="213" cy="581" rx="107" ry="19" fill="#8e819a" opacity=".1"/><ellipse cx="450" cy="620" rx="109" ry="18" fill="#8e819a" opacity=".1"/><ellipse cx="696" cy="588" rx="105" ry="19" fill="#8e819a" opacity=".1"/>
${doll('zhugeliang',63,292,310,349,-7)}
${doll('liqingzhao',530,305,306,344,7)}
${doll('libai',288,289,327,368,-1)}
<path d="M36 443q-9-21 11-32 20-9 32 8 15-13 30-2 12 12 4 26Z" fill="#faf5e9" stroke="#d7cddd" stroke-width="2"/>
<path d="M755 468q-7-23 14-31 22-7 32 12 15-12 29-1 14 11 4 23Z" fill="#faf5e9" stroke="#d7cddd" stroke-width="2"/>
${star(108,217,22,'#c7b3dd')}${star(785,201,23,'#d3b47d')}${star(275,82,14,'#d0b37e')}${star(814,389,13,'#b1c4b4')}${star(94,560,17,'#d9b77d')}${star(744,629,17,'#b2a1ce')}
<g fill="#f9f5eb" stroke="#b8adc7" stroke-width="2"><circle cx="99" cy="340" r="7"/><circle cx="751" cy="99" r="6"/><circle cx="805" cy="528" r="8"/><circle cx="341" cy="43" r="5"/></g>
<path d="M707 73q21-12 32 10m-571 529q-17 2-18 18m594-293q24-6 26 12" fill="none" stroke="#b7a5cd" stroke-width="4" stroke-linecap="round"/>
</svg>`;
await writeFile(dir+'hero.svg',hero);
await writeFile(dir+'favicon.svg',`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="19" fill="#786493"/><path d="M17 41V24l15-9 15 9v17l-15 9Z" fill="#f5e8ce"/><path d="M24 31h16m-16 7h16" stroke="#786493" stroke-width="4" stroke-linecap="round"/><circle cx="32" cy="22" r="3" fill="#786493"/></svg>`);
console.log(`Generated ${portraitIds.length} portraits, hero and favicon.`);
