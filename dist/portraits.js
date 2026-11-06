const people = {
 libai:{coat:'#b9cbd8',inner:'#f8f0df',hat:'poet',hair:'#363641',beard:'small',prop:'cup',accent:'#8c9fb4'},
 dufu:{coat:'#adbd9b',inner:'#f4ead9',hat:'scholar',hair:'#4e4947',beard:'long',prop:'scroll',accent:'#819676'},
 sushi:{coat:'#d6b88e',inner:'#faf0d8',hat:'song',hair:'#44403f',beard:'round',prop:'bun',accent:'#b38c65',happy:true},
 liqingzhao:{coat:'#c8b4db',inner:'#fff0df',hat:'flowers',hair:'#38333d',prop:'book',accent:'#ad88ba',female:true},
 taoyuanming:{coat:'#9dbfa6',inner:'#eee9ce',hat:'bun',hair:'#4b4541',beard:'small',prop:'flower',accent:'#6e9b82'},
 wangxizhi:{coat:'#c0c7de',inner:'#faf3dd',hat:'scholar',hair:'#3a3842',beard:'small',prop:'brush',accent:'#919dbb'},
 tangbohu:{coat:'#edae99',inner:'#fff2d8',hat:'poet',hair:'#3a3440',beard:'small',prop:'fan',accent:'#c78172'},
 xinqiji:{coat:'#9eaebd',inner:'#e9e4d8',hat:'warrior',hair:'#343640',beard:'small',prop:'sword',accent:'#71899e'},
 zhugeliang:{coat:'#d5e4dc',inner:'#faf5df',hat:'guan',hair:'#393d43',beard:'long',prop:'fan',accent:'#a0beb4'},
 simaqian:{coat:'#d4b69f',inner:'#f5ecd9',hat:'scholar',hair:'#403c40',beard:'small',prop:'scroll',accent:'#ae8a76'},
 kongzi:{coat:'#e0bd9b',inner:'#fff0da',hat:'master',hair:'#5e5752',beard:'long',prop:'book',accent:'#bc9674'},
 laozi:{coat:'#a6bfb9',inner:'#f8f0d8',hat:'bun',hair:'#e5e1d5',beard:'long',prop:'scroll',accent:'#799d96'},
 wangyangming:{coat:'#adb4d6',inner:'#f7e8d6',hat:'ming',hair:'#45404a',beard:'small',prop:'book',accent:'#7f89ae'},
 sunwu:{coat:'#91aaa1',inner:'#e8d9bb',hat:'warrior',hair:'#3b3940',beard:'small',prop:'scroll',accent:'#63897c'},
 wuzetian:{coat:'#d47f74',inner:'#f7d6aa',hat:'queen',hair:'#39313a',prop:'flower',accent:'#c29d5f',female:true},
 caocao:{coat:'#8799b6',inner:'#e8e0d3',hat:'guan',hair:'#3d3440',beard:'round',prop:'sword',accent:'#667998'},
 zhenghe:{coat:'#8ebdb9',inner:'#f3e6cd',hat:'ming',hair:'#363c41',prop:'compass',accent:'#5d9b97'},
 xuanzang:{coat:'#e9ae7c',inner:'#f6d592',hat:'monk',hair:'#49403a',prop:'staff',accent:'#d28758'},
 xuxiake:{coat:'#b4b59a',inner:'#f2e8cd',hat:'straw',hair:'#3f3d3a',beard:'small',prop:'staff',accent:'#8d9673'},
 shenkuo:{coat:'#a0bcc5',inner:'#f2e9d3',hat:'song',hair:'#3e4147',beard:'small',prop:'stars',accent:'#7399a7'},
 lishizhen:{coat:'#a8bca1',inner:'#f4e7ce',hat:'scholar',hair:'#7a7469',beard:'long',prop:'herb',accent:'#78996d'},
 banzhao:{coat:'#d0b6a3',inner:'#fff0da',hat:'doublebun',hair:'#443742',prop:'scroll',accent:'#ac8a78',female:true},
 caiwenji:{coat:'#abc5cf',inner:'#f5ecda',hat:'flowers',hair:'#3e3943',prop:'lute',accent:'#7d9eaf',female:true},
 shangguanwaner:{coat:'#e5aea1',inner:'#fff2d9',hat:'doublebun',hair:'#3a333d',prop:'brush',accent:'#c4867d',female:true},
 qiujin:{coat:'#b0b3c9',inner:'#fff1dd',hat:'short',hair:'#363441',prop:'sword',accent:'#8587aa',female:true},
 qinshihuang:{coat:'#575a69',inner:'#c5ab76',hat:'emperor',hair:'#31323c',beard:'small',prop:'scroll',accent:'#b89a60'},
 einstein:{coat:'#bfc9b9',inner:'#f3e8d8',hat:'wild',hair:'#eae7d9',beard:'moustache',prop:'stars',accent:'#8d9d86',western:true},
 newton:{coat:'#bda6c3',inner:'#fff0dc',hat:'curls',hair:'#bd9d81',prop:'apple',accent:'#92789b',western:true},
 curie:{coat:'#8a9bb7',inner:'#f8ecdf',hat:'scientist',hair:'#705e56',prop:'flask',accent:'#647a99',female:true,western:true},
 davinci:{coat:'#ce8f7b',inner:'#f2d5b3',hat:'beret',hair:'#d7cbbb',beard:'long',prop:'brush',accent:'#a26758',western:true},
 darwin:{coat:'#aeb9ad',inner:'#f0dfcd',hat:'bald',hair:'#dad3c5',beard:'long',prop:'leaf',accent:'#809282',western:true},
 nightingale:{coat:'#a4bbcf',inner:'#fff5e3',hat:'nurse',hair:'#8b6f5a',prop:'lamp',accent:'#7697b2',female:true,western:true},
 joan:{coat:'#b2bfc7',inner:'#e8d5bb',hat:'bob',hair:'#896a54',prop:'flag',accent:'#7e99a9',female:true,western:true},
 beethoven:{coat:'#8b95ac',inner:'#fcf0da',hat:'messy',hair:'#534b47',prop:'music',accent:'#64728e',western:true},
 tesla:{coat:'#8b9eac',inner:'#f4ebdd',hat:'sidepart',hair:'#383a41',beard:'moustache',prop:'bulb',accent:'#667d91',western:true},
 cleopatra:{coat:'#7eaeb0',inner:'#f0ce81',hat:'egypt',hair:'#30333d',prop:'flower',accent:'#c4a15e',female:true,skin:'#e5b68b'},
 lishimin:{coat:'#d5ac70',inner:'#fff0cf',hat:'tangcrown',hair:'#3c3540',beard:'small',prop:'decree',accent:'#ad8057',outfit:'imperial'},
 liubang:{coat:'#b77c70',inner:'#ead1aa',hat:'hancrown',hair:'#423a3b',beard:'round',prop:'seal',accent:'#8b5e59',outfit:'imperial'},
 xiangyu:{coat:'#8a94a7',inner:'#d9b98c',hat:'plumedhelm',hair:'#363540',beard:'small',prop:'halberd',accent:'#67748b',outfit:'armor',plume:'#b96f74'},
 liubei:{coat:'#b8a3cf',inner:'#f7e4bf',hat:'royalcap',hair:'#443943',beard:'small',prop:'twinswords',accent:'#927ba8',outfit:'imperial'},
 guanyu:{coat:'#70a58d',inner:'#e5c28c',hat:'bandana',hair:'#33353c',beard:'flowing',prop:'guandao',accent:'#477d67',outfit:'armor',skin:'#d8a189',skinLight:'#f2ceae'},
 zhangfei:{coat:'#967f79',inner:'#d8bd94',hat:'tuft',hair:'#34333d',beard:'bushy',prop:'snake-spear',accent:'#72616a',outfit:'armor',skin:'#d7ae8e'},
 zhaoyun:{coat:'#dce3e5',inner:'#c5dbe0',hat:'silverhelm',hair:'#3b3c48',prop:'spear',accent:'#9aafba',outfit:'armor',plume:'#9bbcc9'},
 yuefei:{coat:'#a7bcc0',inner:'#ecd8b0',hat:'silverhelm',hair:'#41424b',beard:'small',prop:'shield',accent:'#7d9b9e',outfit:'armor',plume:'#b57570'},
 hanxin:{coat:'#b5a589',inner:'#eee0bf',hat:'plumedhelm',hair:'#3e3942',prop:'strategy',accent:'#8e8069',outfit:'armor',plume:'#8586aa'},
 zhangliang:{coat:'#b3c9c6',inner:'#faf0d7',hat:'softcap',hair:'#49414a',beard:'small',prop:'bamboo',accent:'#86a5a0'},
 baozheng:{coat:'#827695',inner:'#dfc394',hat:'judge',hair:'#35333d',beard:'long',prop:'tablet',accent:'#615471',mark:'moon',skin:'#bc8d72',skinLight:'#d7b295'},
 direnjie:{coat:'#bb8a82',inner:'#f6ddbb',hat:'minister',hair:'#53505a',beard:'round',prop:'magnifier',accent:'#94696d'},
 zhangheng:{coat:'#94b1b5',inner:'#f4e1bc',hat:'guan',hair:'#403e47',beard:'small',prop:'seismoscope',accent:'#708f98'},
 zuchongzhi:{coat:'#aba6c8',inner:'#faf0d6',hat:'scholar',hair:'#504653',beard:'small',prop:'abacus',accent:'#827da1'},
 huatuo:{coat:'#aec5a9',inner:'#f8ebd2',hat:'mediccap',hair:'#bab2a0',beard:'long',prop:'medicine',accent:'#839b78'},
 baijuyi:{coat:'#c4b4a1',inner:'#f7ecd7',hat:'tangcap',hair:'#70665e',beard:'long',prop:'poetry',accent:'#9e8e7a'},
 wangwei:{coat:'#aabfb4',inner:'#f4e9d2',hat:'softcap',hair:'#4b4647',beard:'small',prop:'landscape',accent:'#7d9e90'},
 luxun:{coat:'#788894',inner:'#efe9db',hat:'flatcrop',hair:'#32353b',beard:'straight',prop:'fountainpen',accent:'#556b79',outfit:'changshan'},
 yuanlongping:{coat:'#a7bca0',inner:'#f1e8cf',hat:'farmercap',hair:'#d1c8b7',prop:'rice',accent:'#7d9678',outfit:'field',happy:true},
 qianxuesen:{coat:'#96a8b6',inner:'#f1eadb',hat:'modernpart',hair:'#484650',prop:'rocket',accent:'#6f879b',outfit:'mao'},
 wangzhaojun:{coat:'#acc9c9',inner:'#f9e8ce',hat:'furhood',hair:'#3d3642',prop:'lute',accent:'#7eaaac',female:true,outfit:'winter'},
 zhuowenjun:{coat:'#cba7b4',inner:'#fbe8d5',hat:'ribbonbun',hair:'#443741',prop:'zither',accent:'#a77b91',female:true},
 xiedaoyun:{coat:'#c0c5dd',inner:'#fbf0d9',hat:'ribbonbun',hair:'#45404b',prop:'snowpoem',accent:'#929cbe',female:true},
 huangdaopo:{coat:'#a0b8c8',inner:'#f5e6d0',hat:'headcloth',hair:'#77716b',prop:'shuttle',accent:'#7a98ae',female:true,outfit:'apron'},
 yangyuhuan:{coat:'#e0a59e',inner:'#f9dfb7',hat:'tangflower',hair:'#3d3440',prop:'peonyfan',accent:'#bb7e7d',female:true,outfit:'tangdress'},
 wencheng:{coat:'#c5a1a8',inner:'#f4dbad',hat:'princess',hair:'#3a3540',prop:'silk',accent:'#9e7788',female:true,outfit:'tangdress'},
 linhuiyin:{coat:'#9fbfba',inner:'#e9e6d7',hat:'fingerwave',hair:'#3a3b44',prop:'blueprint',accent:'#769c98',female:true,outfit:'qipao'},
 bingxin:{coat:'#c3b8d4',inner:'#fbefdc',hat:'lowbun',hair:'#675c64',prop:'starbook',accent:'#9a87b6',female:true,outfit:'qipao',glasses:true},
 zhangailing:{coat:'#d7a482',inner:'#fae6be',hat:'rolledbob',hair:'#393440',prop:'foldingfan',accent:'#af7a65',female:true,outfit:'qipao'},
 socrates:{coat:'#d4c5a9',inner:'#f8edda',hat:'greekbald',hair:'#c8c0ae',beard:'curly',prop:'question',accent:'#b5a78e',outfit:'toga'},
 shakespeare:{coat:'#936f85',inner:'#fff0dc',hat:'receding',hair:'#6f5043',beard:'pointed',prop:'quill',accent:'#755569',outfit:'ruff'},
 mozart:{coat:'#bc8185',inner:'#fff0d9',hat:'powderwig',hair:'#e2ded2',prop:'violin',accent:'#995e6c',outfit:'court'},
 hepburn:{coat:'#555767',inner:'#f5e5d0',hat:'highbun',hair:'#423a3e',prop:'coffee',accent:'#373b4d',female:true,outfit:'blackdress'},
 napoleon:{coat:'#788da9',inner:'#f7e7cc',hat:'bicorne',hair:'#55463f',prop:'map',accent:'#566a88',outfit:'uniform'},
 gandhi:{coat:'#f4ead6',inner:'#fffae9',hat:'bare',hair:'#9b9484',prop:'walkingstick',accent:'#d8cdb8',outfit:'shawl',glasses:true,skin:'#c59874',skinLight:'#e6c3a0'},
 galileo:{coat:'#a78e79',inner:'#ede1c9',hat:'renaissance',hair:'#9a8c7c',beard:'long',prop:'telescope',accent:'#7f7269',outfit:'robe'}
};

const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));

// New silhouettes are opt-in so the original 36 illustrations stay byte-for-byte stable.
function specialHair(c) {
 const k=c.hat,h=c.hair,a=c.accent;
 const known=['tangcrown','hancrown','royalcap','plumedhelm','silverhelm','bandana','tuft','softcap','judge','minister','mediccap','tangcap','flatcrop','farmercap','modernpart','furhood','ribbonbun','headcloth','tangflower','princess','fingerwave','lowbun','rolledbob','greekbald','receding','powderwig','highbun','bicorne','bare','renaissance'];
 if(!known.includes(k))return null;
 let rear=`<path d="M84 178C72 112 88 62 158 57c72-1 91 51 78 123l-14 31H98Z" fill="${h}"/>`;
 let front=`<path d="M89 122q2-60 71-60 69 0 72 60-46-9-74-39-24 28-69 39Z" fill="${h}"/>`;
 if(['tangcrown','hancrown','royalcap'].includes(k)) {
  front+=`<path d="M105 103l9-48 26 6 20-28 21 28 26-6 10 48Z" fill="${k==='tangcrown'?'#c7a36b':'#65556a'}" stroke="#75604e" stroke-width="3"/><path d="M105 100q54-13 112 0v13q-56-12-112 0Z" fill="#b3915b"/><path d="M128 69v24m32-43v42m32-23v24" stroke="#efd393" stroke-width="3"/><circle cx="160" cy="88" r="7" fill="${k==='royalcap'?'#ab90b8':'#c88270'}"/>`;
  if(k==='tangcrown')front+=`<path d="M108 91L78 75l-16 7 43 24m109-15 30-16 16 7-43 24" fill="#b99a67" stroke="#75604e" stroke-width="2"/>`;
  if(k==='hancrown')front+=`<path d="M120 55l-9-18 82-5 12 21Z" fill="#5c4b60"/><path d="M125 43l65-4" stroke="#cbb17c" stroke-width="3"/>`;
 }
 if(['silverhelm','plumedhelm'].includes(k)) {
  rear=`<path d="M77 122l11 77 25 9 5-83m125-3-11 77-25 9-5-83" fill="${c.coat}" stroke="#75848c" stroke-width="3"/>`;
  front=`<path d="M87 121q-7-65 73-76 78 11 74 76l-23-8-12-24-39-16-39 16-12 24Z" fill="${c.coat}" stroke="#687986" stroke-width="3"/><path d="M160 47v28M98 93q63-17 123 0" stroke="${c.inner}" stroke-width="6" fill="none"/><path d="M150 53q-9-38 13-41 22 10 3 39" fill="${c.plume||'#ad7f84'}" stroke="#806d7e" stroke-width="2"/><circle cx="160" cy="71" r="9" fill="#cbb779"/>`;
  if(k==='plumedhelm')front+=`<path d="M114 62Q71 25 84 10q24 6 38 48M205 62q43-37 30-52-24 6-38 48" fill="${c.plume||'#ad7f84'}" stroke="#806d7e" stroke-width="2"/>`;
 }
 if(k==='bandana')front+=`<path d="M85 100q15-51 74-48 63-2 78 47l-20 17q-59-23-113 0Z" fill="#6a9d82" stroke="#416d5d" stroke-width="3"/><path d="M97 99q62-22 125 0" stroke="#c0d1ac" stroke-width="5" fill="none"/><path d="M230 100l29 17-19 44-16-42-10-10Z" fill="#5a8b72" stroke="#416d5d" stroke-width="3"/>`;
 if(k==='tuft')front=`<path d="M86 127l-9-28 10-9-2-21 25 3 13-23 28 12 8-28 17 25 29-3 2 20 22 6-1 22 15 24-22-8-22-27-42-10-43 14-15 24Z" fill="${h}"/><path d="M91 104q68-30 136 0" fill="none" stroke="#c1a06f" stroke-width="8"/><circle cx="159" cy="89" r="9" fill="#c1a06f"/>`;
 if(k==='softcap'||k==='tangcap'||k==='renaissance')front+=`<path d="M95 103q-16-41 16-53 45-14 93 1 31 11 21 47l-11 9q-64-18-119-4Z" fill="${k==='renaissance'?'#8e7764':c.accent}" stroke="#635965" stroke-width="3"/><path d="M108 91q52-16 106 1" stroke="#fff" opacity=".18" stroke-width="5" fill="none"/>${k==='tangcap'?'<path d="M108 91L83 128l-12-7 18-29m123-1 25 37 12-7-18-29" fill="#8a7b6b"/>':''}`;
 if(k==='judge'||k==='minister')front+=`<path d="M105 106l-2-43q56-28 114 0l-2 43Z" fill="#494250" stroke="#373440" stroke-width="3"/><path d="M104 90L41 70l-5 18 67 19m113-17 63-20 5 18-67 19" fill="#494250" stroke="#373440" stroke-width="3"/><path d="M117 68q42-19 85 0" stroke="#7e728d" stroke-width="4" fill="none"/><circle cx="160" cy="91" r="8" fill="${k==='judge'?'#b7a278':'#d2b88c'}"/>`;
 if(k==='mediccap')front+=`<path d="M95 101q-9-47 65-54 74 5 64 54Z" fill="#c7c2ac" stroke="#8a8e7a" stroke-width="3"/><path d="M92 99q70-17 136 0v14q-64-10-136 0Z" fill="#a1ad92"/>`;
 if(k==='flatcrop')front=`<path d="M90 127l-6-32 10-30 12 7 6-17 13 9 10-15 16 12 12-13 14 12 14-7 9 16 14-4 15 35-2 29-16-17-5-22-93 2-8 25Z" fill="${h}"/>`;
 if(k==='modernpart')front=`<path d="M89 125q-10-64 68-66 73 0 76 66l-16-13-14-34q-47 35-96 28l-5 21Z" fill="${h}"/><path d="M194 73q-35 28-79 28" fill="none" stroke="#aaa1a0" opacity=".4" stroke-width="4"/>`;
 if(k==='farmercap')front+=`<path d="M93 99q-1-55 69-55 64 0 67 55Z" fill="#aab69e" stroke="#7b8875" stroke-width="3"/><path d="M89 98q79-19 149 4 14 12-8 18-78-26-141-7Z" fill="#839a7c" stroke="#6b8265" stroke-width="3"/><path d="M161 46v42" stroke="#d0d6be" stroke-width="3"/>`;
 if(k==='furhood') {
  rear=`<path d="M77 176q-20-117 83-123 102 6 83 123l-14 49H92Z" fill="#c5d8d1" stroke="#789b9d" stroke-width="3"/>`;
  front=`<path d="M84 128q-7-65 75-69 81 5 78 69l-21-17q-18-31-56-38-38 6-56 38Z" fill="${h}"/><path d="M74 126q-8-81 86-82 94 2 87 82l-16-14q-1-54-71-54-68 1-72 54Z" fill="#f8efd8" stroke="#d6cfbc" stroke-width="3"/><circle cx="158" cy="55" r="9" fill="#c6a367"/>`;
 }
 if(['ribbonbun','lowbun','tangflower','princess','highbun'].includes(k)) {
  rear+=`<ellipse cx="160" cy="48" rx="${k==='highbun'?32:27}" ry="${k==='highbun'?34:26}" fill="${h}"/>`;
  front=`<path d="M88 121q4-65 72-61 65 1 73 61-36-9-68-43-32 29-77 43Z" fill="${h}"/>`;
  if(k==='ribbonbun')front+=`<path d="M135 51q26-13 51 0" stroke="${a}" stroke-width="8" fill="none"/><path d="M135 55l-30 17 14 11 22-24m44-4 27 20-17 9-17-25" fill="${c.coat}"/><path d="M196 82l19 47" stroke="${a}" stroke-width="5"/>`;
  if(k==='lowbun') { rear+=`<circle cx="84" cy="178" r="21" fill="${h}"/>`; front+=`<path d="M112 90q30-8 49-26" stroke="#a79ca6" opacity=".3" stroke-width="4" fill="none"/>`; }
  if(k==='tangflower')front+=`<g fill="#e9bdad" stroke="#be7e7f" stroke-width="2"><circle cx="116" cy="62" r="14"/><circle cx="101" cy="67" r="11"/><circle cx="106" cy="49" r="11"/><circle cx="124" cy="48" r="11"/><circle cx="131" cy="64" r="11"/></g><circle cx="117" cy="59" r="8" fill="#d9b36c"/><path d="M151 105l8-9 8 9-8 4Z" fill="#cb7f7c"/>`;
  if(k==='princess')front+=`<path d="M108 77l15-23 20 9 17-25 19 25 20-9 15 23q-54-13-106 0Z" fill="#d4b174" stroke="#9a7b57" stroke-width="2"/><path d="M106 76l-13 48m121-48 13 48" stroke="#d3b578" stroke-width="3"/><circle cx="92" cy="126" r="5" fill="#e6cf9a"/><circle cx="228" cy="126" r="5" fill="#e6cf9a"/><circle cx="160" cy="61" r="7" fill="#bc859a"/>`;
  if(k==='highbun')front+=`<path d="M138 72l4-14 12 7 9-17 9 17 12-7 5 14" fill="none" stroke="#eee3c9" stroke-width="4"/><path d="M101 103q36-9 58-28" stroke="#9b8d89" opacity=".3" stroke-width="4" fill="none"/>`;
 }
 if(k==='headcloth')front+=`<path d="M82 114q-10-69 76-73 83 3 82 71l-28-14q-51-34-102 0Z" fill="#afc9d3" stroke="#7b9aaa" stroke-width="3"/><path d="M104 53l100 48M91 72l55 27m47-47-64 40" stroke="#dce8e8" stroke-width="3"/><path d="M86 103l-17 18 18 35 14-45" fill="#afc9d3" stroke="#7b9aaa" stroke-width="3"/>`;
 if(k==='fingerwave'||k==='rolledbob') {
  rear=`<path d="M80 177q-14-113 78-120 91 2 84 114l-12 40-31-6-85 2-30-9Z" fill="${h}"/>`;
  front=`<path d="M85 130q-3-69 74-68 70 1 75 68l-19-19q-22-12-42-32-17 31-62 30l-13 24Z" fill="${h}"/><path d="M106 96q36 1 52-24m-53 35q38 1 62-28m12 6q16 18 36 24" fill="none" stroke="#91808b" stroke-width="4" opacity=".5"/>`;
  if(k==='rolledbob')front+=`<path d="M92 118q-9-34 15-38 23-2 15 17-5 10-19 5m101 4q22-16 28 7" fill="none" stroke="#70616e" stroke-width="8" stroke-linecap="round"/>`;
 }
 if(k==='bare') {rear='';front='';}
 if(k==='greekbald'||k==='receding') {
  rear=`<path d="M93 99q-29 17-14 84l27 15-4-74m126-25q29 17 14 84l-27 15 4-74" fill="${h}"/>`;front='';
  if(k==='receding')front=`<path d="M96 119q-4-26 22-43l-5 36m112 7q4-26-22-43l5 36" stroke="${h}" stroke-width="16" fill="none" stroke-linecap="round"/>`;
 }
 if(k==='powderwig') {
  rear=''; for(let i=0;i<4;i++)rear+=`<ellipse cx="87" cy="${114+i*20}" rx="20" ry="17" fill="${h}" stroke="#bcb8af" stroke-width="2"/><ellipse cx="233" cy="${114+i*20}" rx="20" ry="17" fill="${h}" stroke="#bcb8af" stroke-width="2"/>`;
  front=`<path d="M86 118q-11-66 74-65 84 0 75 65l-22-8q-24-32-51-36-30 6-54 36Z" fill="${h}" stroke="#bcb8af" stroke-width="2"/><path d="M132 65q31-15 56 6" stroke="#fff9e9" stroke-width="7" fill="none"/><path d="M221 188l22 18-24 5" fill="#80566b"/>`;
 }
 if(k==='bicorne')front+=`<path d="M62 106q28-21 48-64 49 31 103 0 19 41 45 64-98-25-196 0Z" fill="#45475a" stroke="#333748" stroke-width="3"/><path d="M73 101q38-10 41-50 47 27 94 0 13 40 39 50" fill="none" stroke="#c9b782" stroke-width="3"/><circle cx="159" cy="80" r="10" fill="#b37b78"/><circle cx="159" cy="80" r="6" fill="#e9ddbe"/><circle cx="159" cy="80" r="3" fill="#6e89a2"/>`;
 return {rear,front};
}

function hair(c) {
 const special=specialHair(c); if(special)return special;
 const h=c.hair, a=c.accent, k=c.hat;
 let rear = `<path d="M82 171C70 113 83 61 151 55c68-7 94 33 88 101l-10 58-28-6-84 4-30-12Z" fill="${h}"/>`;
 let front='';
 if(['flowers','doublebun','scientist'].includes(k)) {
  rear += `<circle cx="160" cy="60" r="31" fill="${h}"/>`;
  front=`<path d="M88 118q10-60 72-57 64 4 72 57c-25-11-47-24-67-42-18 23-40 35-77 42Z" fill="${h}"/><path d="M154 79q-17 29-42 35M168 79q20 22 43 28" fill="none" stroke="#fff" opacity=".09"/>`;
  if(k==='flowers') front+=`<path d="M110 69l-32-18" stroke="${a}" stroke-width="5"/><g fill="#fff4cf" stroke="${a}" stroke-width="2"><circle cx="106" cy="66" r="9"/><circle cx="97" cy="61" r="8"/><circle cx="101" cy="52" r="8"/><circle cx="113" cy="54" r="8"/><circle cx="116" cy="64" r="8"/></g><circle cx="107" cy="61" r="5" fill="#ddb66f"/><path d="M88 82v31" stroke="#d5b26e" stroke-width="3"/><circle cx="88" cy="117" r="4" fill="#e9c87b"/>`;
  if(k==='doublebun') rear+=`<circle cx="99" cy="77" r="24" fill="${h}"/><circle cx="220" cy="77" r="24" fill="${h}"/><path d="M82 73q17-17 34 0M204 73q17-17 32 0" stroke="${a}" stroke-width="7" fill="none"/>`;
 }
 else if(['bob','short','egypt'].includes(k)) {
  rear=`<path d="M78 173C70 88 100 58 159 56c62-2 91 40 80 118l-4 42H83Z" fill="${h}"/>`;
  front=`<path d="M88 119q-5-57 71-58 74 3 72 58l-26-6-9-26-3 28-23-3-9-25-5 26-33 0-4-24-7 26Z" fill="${h}"/>`;
  if(k==='short') front=`<path d="M86 129q-4-64 73-69 59 0 73 45-54-9-74-27-17 34-72 51Z" fill="${h}"/>`;
  if(k==='egypt')front+=`<path d="M88 100h144" stroke="#dbb566" stroke-width="12"/><path d="M156 104q-10-13 0-26t10 10q-12-1-10 16" fill="#ecc979" stroke="#a88044" stroke-width="2"/><circle cx="160" cy="97" r="5" fill="#7eafbb"/>`;
 }
 else if(k==='wild') {
  rear=`<path d="M103 182l-35 12 9-25-30-5 25-22-29-18 29-11-16-27 36 1-1-29 27 12 21-31 17 20 27-23 8 25 30-8-6 26 35 4-20 20 30 22-27 13 24 21-28 9 9 23-35-8Z" fill="${h}" stroke="#c7c4ba" stroke-width="2"/>`;
  front=`<path d="M95 117q8-43 35-48l-10 27q17-16 32-17l-5 20q25-21 44-23l-9 23 37 16q-27-6-48-4l-36-9Z" fill="${h}"/>`;
 }
 else if(k==='curls') {
  rear=''; for(let i=0;i<7;i++) {const y=89+i*17; rear+=`<ellipse cx="90" cy="${y}" rx="19" ry="22" fill="${h}"/><ellipse cx="230" cy="${y}" rx="19" ry="22" fill="${h}"/>`;}
  rear+=`<path d="M87 111q-6-65 74-60 69-2 72 65Z" fill="${h}"/>`;
  front=`<path d="M90 119q32 1 70-42 30 38 69 37-3-49-68-51-58-2-71 56Z" fill="${h}"/><path d="M109 95q28-35 51-18M177 79q29 9 40 26" stroke="#fff" opacity=".14" fill="none" stroke-width="5"/>`;
 }
 else if(k==='bald') {
  rear=`<path d="M89 119q-12 8-10 40l20 42h20l-2-80ZM231 119q12 8 10 40l-20 42h-20l2-80Z" fill="${h}"/>`;
 }
 else if(k==='messy') front=`<path d="M83 130l-10-26 13-4-2-26 22 1 7-22 24 10 19-22 17 14 25-8 7 20 24 1-2 24 18 19-15 15-19-17-8 9-19-29-25 9-17-5-22 24-14-5Z" fill="${h}"/>`;
 else if(k==='sidepart') front=`<path d="M87 129q-6-62 69-68 71-3 78 66l-19-16-12-29q-35 24-97 28l-6 28Z" fill="${h}"/><path d="M194 77q-30 20-77 22" stroke="#fff" stroke-width="4" opacity=".12" fill="none"/>`;
 else if(k==='monk') {
  rear='';front=`<path d="M83 114L98 51l28 22 34-41 34 41 28-22 17 64Z" fill="#efb96f" stroke="#a7754e" stroke-width="3"/><path d="M98 51l5 62m23-40 7 40m27-81v81m34-40-7 40m35-62-5 62" stroke="#d99458" stroke-width="3"/><path d="M81 111h158v16H81Z" fill="#d17a5b"/><circle cx="160" cy="85" r="10" fill="#f9df9a" stroke="#ac7850" stroke-width="3"/>`;
 }
 else if(k==='nurse') front=`<path d="M87 122q5-57 73-61 70 3 74 62l-24-9q-14-23-49-39-36 15-51 43Z" fill="${h}"/><path d="M87 99q-2-56 73-58 76 2 74 58l-23-14q-54-23-103 0Z" fill="#fff9ed" stroke="#d8d3c8" stroke-width="3"/><path d="M92 81q68-41 137 0" stroke="#e8e1d7" stroke-width="5" fill="none"/>`;
 else {
  front=`<path d="M87 128q-3-65 74-66 70-1 73 62l-20-11q-34-16-53-39-28 34-57 37l-5 24Z" fill="${h}"/>`;
  if(k==='bun') front+=`<circle cx="160" cy="54" r="24" fill="${h}"/><path d="M140 50l39 3" stroke="${a}" stroke-width="7"/><path d="M151 34q16-7 22 6" stroke="#fff" opacity=".12" stroke-width="4" fill="none"/>`;
  if(k==='poet') front+=`<path d="M98 103q-18-32-2-45l46 5q1-28 23-27l27 22q29-7 38 14l-11 33q-64-25-121-2Z" fill="#e8e7df" stroke="#858695" stroke-width="3"/><path d="M104 94q59-21 112 1M145 65q18 13 38 22" fill="none" stroke="#b5b6be" stroke-width="3"/><path d="M209 94l29 18-6 47-16-17-15-40Z" fill="#d5d7d5" stroke="#858695" stroke-width="3"/>`;
  if(k==='scholar'||k==='master') front+=`<path d="M99 103l8-55q53-24 106 0l8 55Z" fill="${k==='master'?'#6a625a':'#6b6874'}" stroke="#45424d" stroke-width="3"/><path d="M109 96l5-41q44-16 92 0l6 41" fill="none" stroke="#ffffff" opacity=".12" stroke-width="5"/><path d="M97 99q63-16 126 0v14q-63-11-126 0Z" fill="#494651"/>`;
  if(k==='song'||k==='ming') front+=`<path d="M100 103l4-42q55-33 112 0l4 42Z" fill="#4c4b59"/><path d="M101 90L43 77l-4 12 62 18M219 90l58-13 4 12-62 18" fill="#4c4b59" stroke="#3c3b46" stroke-width="3"/><path d="M114 65q42-22 90 0" stroke="#fff" opacity=".1" stroke-width="5" fill="none"/>`;
  if(k==='guan') front+=`<path d="M119 100l5-55 25 8 11-29 16 29 24-8 5 55Z" fill="#515664" stroke="#363a46" stroke-width="3"/><path d="M135 95l5-35m17 33 4-48m18 51 5-36" stroke="#79808f" stroke-width="3"/><path d="M112 96q50-11 99 0v15q-49-10-99 0Z" fill="#333944"/>`;
  if(k==='warrior') front+=`<path d="M94 112q-1-61 65-65 65 4 68 65l-22-6-6-25-39-12-39 12-7 25Z" fill="${a}" stroke="#4a5760" stroke-width="3"/><path d="M160 49v23M104 89l111 0" fill="none" stroke="#c1c5bb" stroke-width="5"/><circle cx="160" cy="61" r="7" fill="#d8bd80"/>`;
  if(k==='queen') front+=`<path d="M95 102l10-40 26 17 29-37 29 37 26-17 10 40Z" fill="#d6b264" stroke="#9b783f" stroke-width="3"/><path d="M105 97q55-16 110 0" stroke="#f8df98" stroke-width="7"/><circle cx="160" cy="75" r="9" fill="#bc6f69"/><circle cx="109" cy="60" r="7" fill="#e8c87c"/><circle cx="211" cy="60" r="7" fill="#e8c87c"/><path d="M98 93l-17 24m141-24 17 24" stroke="#c5a45d" stroke-width="4"/><circle cx="80" cy="121" r="7" fill="#e8c87c"/><circle cx="240" cy="121" r="7" fill="#e8c87c"/>`;
  if(k==='emperor') front+=`<path d="M110 98V48h101v50Z" fill="#3c3f4c"/><path d="M78 50l157-14 8 23-161 14Z" fill="#545460" stroke="#353744" stroke-width="3"/>${[94,121,148,175,202,229].map((x,i)=>`<path d="M${x} ${69-i*2}v35" stroke="#c3a565" stroke-width="2"/><circle cx="${x}" cy="${104-i*2}" r="4" fill="#dfc27d"/>`).join('')}`;
  if(k==='beret')front+=`<path d="M86 101q-27-44 21-55 66-25 122 4 20 13 4 37l-27 15Z" fill="#b96e60" stroke="#885448" stroke-width="3"/><path d="M98 96q55-18 119-8" stroke="#e3a390" opacity=".6" stroke-width="5" fill="none"/><path d="M154 41l2-12" stroke="#885448" stroke-width="8" stroke-linecap="round"/>`;
  if(k==='straw') front+=`<path d="M63 105l97-64 98 64q-94 31-195 0Z" fill="#dcc493" stroke="#a9936b" stroke-width="3"/><path d="M160 45l-60 60m60-60-27 67m27-67 28 67m-28-67 61 60M98 88q61 18 122 0" fill="none" stroke="#bca16f" stroke-width="2"/>`;
 }
 return {rear,front};
}

function specialProp(c) {
 const p=c.prop,s='#766b70';
 if(p==='guandao')return `<path d="M236 318l5-106" stroke="#8b7658" stroke-width="7"/><path d="M241 218l-2-45q34-24 40-52 10 58-38 97Z" fill="#d4dfd9" stroke="#718b81" stroke-width="3"/><path d="M249 203q19-15 24-44" fill="none" stroke="#f7f4df" stroke-width="4"/><path d="M233 224l19 1" stroke="#c0a26a" stroke-width="7"/><path d="M245 227l21 25-18-5 4 18-16-34" fill="#b87970"/>`;
 if(['spear','snake-spear','halberd'].includes(p))return `<path d="M241 317V207" stroke="#8c715e" stroke-width="7"/>${p==='snake-spear'?`<path d="M240 214q-17-16 1-32t-1-30q28 18 9 37t-9 25Z" fill="#cdd7d3" stroke="#74848b" stroke-width="3"/>`:`<path d="M229 207l12-57 13 57-13 12Z" fill="#d6e1df" stroke="#7d8d94" stroke-width="3"/><path d="M241 161v46" stroke="#fff6dd" stroke-width="3"/>`}${p==='halberd'?`<path d="M246 174q31 9 12 38l-12-4q17-11 0-21Z" fill="#c4d3cf" stroke="#74848b" stroke-width="3"/>`:''}<path d="M235 217l-15 36 17-12 9 13 2-35Z" fill="${c.plume||'#b47b75'}"/>`;
 if(p==='twinswords')return `<path d="M205 291l-9-75 8-19 12 18 1 76m11 2 22-74 14-15 4 20-29 73" fill="#d5dadd" stroke="#849199" stroke-width="3"/><path d="M193 289l33 2m-3 2 29 9" stroke="#c7ad72" stroke-width="7"/><path d="M209 294v17m26-11-5 16" stroke="#8d6c71" stroke-width="9"/>`;
 if(p==='shield')return `<path d="M181 242q36-16 71 0v33q-5 30-35 40-32-12-36-40Z" fill="#cbd7d4" stroke="#718d91" stroke-width="4"/><path d="M190 249q27-10 53 0v25q-4 22-26 32-23-9-27-32Z" fill="#a4babb" stroke="#dde5da" stroke-width="3"/><path d="M217 253v41m-15-27h30" stroke="#d9c18c" stroke-width="6"/><circle cx="217" cy="268" r="9" fill="#c1a66d"/>`;
 if(p==='strategy'||p==='map')return `<path d="M179 236l22-6 26 10 26-8v67l-26 10-26-10-22 6Z" fill="#f4e7ca" stroke="#aa947b" stroke-width="2"/><path d="M201 235v59m26-49v59" stroke="#cfbd98" stroke-width="2"/><path d="M189 289q30-49 55-28" stroke="#92aba0" stroke-width="4" stroke-dasharray="5 5" fill="none"/><path d="M208 256l9-15 10 15Z" fill="#a7b6a1"/><circle cx="241" cy="279" r="6" fill="#cb9386"/>`;
 if(p==='decree')return `<path d="M182 237h67v61h-67Z" fill="#efd5a1" stroke="#ae8e5d" stroke-width="3"/><path d="M182 232v71m67-71v71" stroke="#bd8c61" stroke-width="8" stroke-linecap="round"/><path d="M195 251h39m-39 11h31m-31 11h23" stroke="#bc9369" stroke-width="3"/><rect x="225" y="279" width="12" height="11" rx="2" fill="#bf7b6c"/>`;
 if(p==='seal')return `<path d="M189 266l25-10 31 11v27l-25 10-31-11Z" fill="#c6b18b" stroke="#927958" stroke-width="3"/><path d="M214 257v27l31-17m-31 17 6 20" fill="none" stroke="#e7d6ad" stroke-width="3"/><path d="M199 257q-8-17 4-23 8-10 17 0 16-1 13 17l-14 8Z" fill="#d9c391" stroke="#a68a5c" stroke-width="2"/>`;
 if(p==='bamboo')return `<g transform="rotate(-10 214 269)"><rect x="180" y="229" width="70" height="68" rx="5" fill="#dec59b" stroke="#a99069" stroke-width="2"/>${[187,199,211,223,235,247].map(x=>`<path d="M${x} 231v64" stroke="#aa936e" stroke-width="2"/>`).join('')}<path d="M181 243h67m-67 38h67" stroke="#b7796a" stroke-width="3"/><path d="M193 250v22m12-21v17m12-17v22m12-22v17" stroke="#9b8062" stroke-width="2"/></g>`;
 if(p==='tablet')return `<path d="M196 302l-6-67q26-20 51 0l-6 67Z" fill="#e7d1a7" stroke="#a48a64" stroke-width="3"/><path d="M204 243v44m12-47v49m12-46v44" stroke="#c3a97e" stroke-width="3"/>`;
 if(p==='magnifier')return `<path d="M220 271l25 38" stroke="#9f8261" stroke-width="10" stroke-linecap="round"/><circle cx="206" cy="250" r="29" fill="#e7eff0" fill-opacity=".7" stroke="#9d8d6f" stroke-width="7"/><path d="M188 249q0-16 14-18" fill="none" stroke="#fffaf0" stroke-width="5" stroke-linecap="round"/>`;
 if(p==='seismoscope')return `<ellipse cx="218" cy="303" rx="40" ry="8" fill="#9f8a65"/><path d="M187 267q-10 35 31 36 43-2 32-36l-9-11h-46Z" fill="#c6ad7e" stroke="#927c58" stroke-width="3"/><ellipse cx="218" cy="261" rx="26" ry="9" fill="#ddc595" stroke="#927c58" stroke-width="3"/><path d="M210 252q8-13 16 0" fill="#b89b6c"/><path d="M186 274l-10 6 9 8m64-14 10 6-10 8m-35-18v17m10-17v17" stroke="#927c58" stroke-width="5" stroke-linecap="round"/><circle cx="182" cy="291" r="4" fill="#e6cc93"/><circle cx="254" cy="291" r="4" fill="#e6cc93"/>`;
 if(p==='abacus')return `<g transform="rotate(-8 216 269)"><rect x="176" y="235" width="80" height="65" rx="6" fill="#ead3a4" stroke="#9b795d" stroke-width="6"/>${[188,202,216,230,244].map((x,i)=>`<path d="M${x} 240v55" stroke="#ab8e64" stroke-width="2"/><ellipse cx="${x}" cy="249" rx="6" ry="4" fill="#9d7760"/><ellipse cx="${x}" cy="${270+i%2*6}" rx="6" ry="4" fill="#b68864"/><ellipse cx="${x}" cy="${281+i%2*6}" rx="6" ry="4" fill="#b68864"/>`).join('')}<path d="M180 259h72" stroke="#9b795d" stroke-width="4"/></g>`;
 if(p==='medicine')return `<path d="M181 260q38-15 76 0v40q-38 15-76 0Z" fill="#c0a47e" stroke="#91795c" stroke-width="3"/><path d="M184 268q34 12 70 0m-70 10q34 12 70 0m-70 10q34 12 70 0" fill="none" stroke="#e1c99b" stroke-width="2"/><path d="M204 264l5-44m18 43 11-44" stroke="#7e9e78" stroke-width="4"/><path d="M207 243q-23-6-19-24 22 5 19 24m28-2q-2-21 20-23 0 17-20 23m-25-8q-8-20 5-29 12 20-5 29" fill="#a5bd8d" stroke="#7e9e78" stroke-width="2"/>`;
 if(['poetry','snowpoem','starbook'].includes(p))return `<path d="M179 238l40 6 36-7v64l-36 7-40-7Z" fill="#faf0d8" stroke="#a69a8b" stroke-width="2"/><path d="M219 245v62m-30-52 20 3m-20 9 20 3m-20 9 17 2m22-24 16-3m-16 16 16-3m-16 16 16-3" stroke="#b5a5a3" stroke-width="2"/>${p==='snowpoem'?'<g stroke="#98acbd" stroke-width="3" stroke-linecap="round"><path d="M233 201v24m-11-18 22 12m-22 0 22-12"/><path d="M190 218v16m-7-12 14 8m-14 0 14-8"/></g>':p==='starbook'?'<path d="M237 218l4-11 4 11 11 4-11 4-4 11-4-11-11-4Z" fill="#d5bc83"/>':''}`;
 if(p==='landscape'||p==='blueprint')return `<path d="M178 231h79v70h-79Z" fill="${p==='blueprint'?'#92aebc':'#f4e8cd'}" stroke="#9b927e" stroke-width="3"/>${p==='blueprint'?'<g fill="none" stroke="#e7f1ed" stroke-width="2"><path d="M188 286v-24l28-16 30 16v24Zm-2-24h62m-54 7h46m-31 0v17m16-17v17"/><path d="M188 294h59m-57-54h26"/></g>':'<path d="M184 282l19-33 13 16 14-24 22 41Z" fill="#a7b5a2"/><path d="M183 288q34-12 67 0" stroke="#91a8ae" stroke-width="4" fill="none"/><circle cx="190" cy="246" r="6" fill="#d5b78b"/>'}`;
 if(p==='fountainpen')return `<path d="M185 247h58v58h-58Z" fill="#f6e8cf" stroke="#ad9d86" stroke-width="2"/><path d="M194 263h34m-34 10h34m-34 10h24" stroke="#c0ae95" stroke-width="2"/><path d="M220 289l26-73" stroke="#515561" stroke-width="8" stroke-linecap="round"/><path d="M245 220l6-19 5 1-2 20-8 7Z" fill="#d0b275" stroke="#9c885f" stroke-width="2"/>`;
 if(p==='rice')return `<path d="M215 307q9-62-8-103m10 105q27-61 22-103m-20 105q-1-42-35-66" stroke="#8b9f6e" stroke-width="3" fill="none"/><path d="M215 279q-28-27-39-16 19 23 39 16m6-11q31-23 38-9-12 19-38 9" fill="#a7bb80"/>${[0,1,2,3,4].map(i=>`<ellipse cx="${204+i*2}" cy="${212+i*10}" rx="5" ry="8" transform="rotate(-35 ${204+i*2} ${212+i*10})" fill="#dbbf77"/><ellipse cx="${241-i}" cy="${214+i*10}" rx="5" ry="8" transform="rotate(30 ${241-i} ${214+i*10})" fill="#e6ca84"/>`).join('')}`;
 if(p==='rocket')return `<path d="M204 279q-7-46 15-75 24 28 16 75Z" fill="#e2e6df" stroke="#85939b" stroke-width="3"/><path d="M211 221l8-17 10 17Z" fill="#bf8382"/><path d="M204 253l-16 31 16-5m31-26 16 31-16-5" fill="#9fb7c7" stroke="#6d879a" stroke-width="2"/><circle cx="219" cy="241" r="8" fill="#abc8d2" stroke="#7e98a4" stroke-width="3"/><path d="M208 280l10 29 14-29" fill="#e3be7b"/><path d="M215 281l4 15 7-15" fill="#f8e7b9"/>`;
 if(p==='zither')return `<g transform="rotate(-11 215 270)"><rect x="166" y="250" width="96" height="38" rx="11" fill="#b99572" stroke="#876954" stroke-width="3"/><path d="M174 258h79m-79 6h79m-79 6h79m-79 6h79" stroke="#eed5a8" stroke-width="1.5"/><path d="M186 254v29m58-29v29" stroke="#8c7157" stroke-width="4"/></g>`;
 if(p==='shuttle')return `<path d="M175 257q38-39 82 0-38 43-82 0Z" fill="#caa67f" stroke="#987452" stroke-width="3"/><path d="M194 257q18-15 41 0-22 17-41 0Z" fill="#eee1c3" stroke="#ac8c63" stroke-width="2"/><path d="M201 248v18m6-21v24m6-25v26m6-25v24m6-21v18" stroke="#b098b3" stroke-width="2"/><path d="M235 261q32 12 1 28t-43 9" stroke="#b098b3" stroke-width="3" fill="none"/>`;
 if(p==='peonyfan')return `<path d="M219 310v-44" stroke="#b29970" stroke-width="6"/><circle cx="219" cy="243" r="34" fill="#f7e6cc" stroke="#c5ad81" stroke-width="3"/><path d="M211 258l12-28m-9 21-14-6m17-5 17-5" stroke="#9aaf8b" stroke-width="3"/><g fill="#dfa79a" stroke="#bf887d" stroke-width="1.5"><circle cx="220" cy="231" r="10"/><circle cx="211" cy="231" r="7"/><circle cx="224" cy="222" r="7"/><circle cx="228" cy="234" r="7"/></g><circle cx="220" cy="229" r="5" fill="#e7c381"/>`;
 if(p==='silk')return `<path d="M185 239q27-20 66 0v56q-36-18-66 0Z" fill="#deb8a8" stroke="#b18b84" stroke-width="3"/><path d="M193 244q26-12 50 0m-50 13q26-12 50 0m-50 13q26-12 50 0m-50 13q26-12 50 0" stroke="#f5dcb5" stroke-width="3" fill="none"/><path d="M184 238v61" stroke="#c09a72" stroke-width="8" stroke-linecap="round"/>`;
 if(p==='foldingfan')return `<path d="M218 297l-49-48q47-43 96 0Z" fill="#e8c0a5" stroke="#af8574" stroke-width="3"/><path d="M218 293l-31-51m31 51-11-62m11 62 12-62m-12 62 31-51" stroke="#c79a7b" stroke-width="2"/><path d="M218 297l-4 16" stroke="#a88265" stroke-width="6"/>`;
 if(p==='question')return `<path d="M188 235h58v68h-58Z" fill="#f4e8cc" stroke="#ae9f84" stroke-width="3"/><path d="M205 255q0-14 15-11 16 7 0 18-5 3-4 11" fill="none" stroke="#aa9677" stroke-width="5" stroke-linecap="round"/><circle cx="216" cy="284" r="3.5" fill="#aa9677"/>`;
 if(p==='quill')return `<path d="M184 281h36v22h-36Z" fill="#80717c" stroke="#665c69" stroke-width="3"/><ellipse cx="202" cy="282" rx="18" ry="6" fill="#a6939d"/><path d="M207 286l29-70" stroke="#b29b7b" stroke-width="3"/><path d="M219 259q-8-49 40-64-3 42-40 64Z" fill="#f3e7cd" stroke="#c1b291" stroke-width="2"/><path d="M220 259l30-51m-19 32 15 1m-10-9 14-2" stroke="#c1b291" stroke-width="2"/>`;
 if(p==='violin')return `<g transform="rotate(16 216 269)"><path d="M212 212h12v41q17-4 17 12-12 6-4 16 19 15 2 30-23 17-41-1-14-16 3-29 8-10-3-16 0-16 14-12Z" fill="#c5936b" stroke="#956b50" stroke-width="3"/><path d="M215 219v83m6-83v83" stroke="#f5ddb1" stroke-width="2"/><path d="M207 281q-8 7-2 11m24-11q8 7 2 11" stroke="#765847" stroke-width="2" fill="none"/><path d="M207 301h20" stroke="#765847" stroke-width="3"/><path d="M250 216l-8 95" stroke="#a18362" stroke-width="4"/></g>`;
 if(p==='coffee')return `<path d="M191 250h47l-5 50h-36Z" fill="#f5e8ce" stroke="#b3a58f" stroke-width="3"/><path d="M187 246h55v9h-55Z" fill="#ded5c4" stroke="#a99e8d" stroke-width="2"/><path d="M196 269h37v16h-37Z" fill="#9bbdba"/><path d="M208 234q-7-9 1-16m11 16q-7-9 1-16" stroke="#d9cfc0" stroke-width="3" stroke-linecap="round" fill="none"/>`;
 if(p==='walkingstick')return `<path d="M238 319l5-100q0-16-15-16-11 0-11 12" fill="none" stroke="#a88b64" stroke-width="7" stroke-linecap="round"/><path d="M228 204q12 0 12 14" fill="none" stroke="#dfc59a" stroke-width="2"/>`;
 if(p==='telescope')return `<g transform="rotate(-25 216 259)"><path d="M178 249h69v21h-69Z" fill="#c7aa7f" stroke="#8f7d61" stroke-width="3"/><path d="M230 246h30v27h-30Z" fill="#ac9270" stroke="#7a6e5b" stroke-width="3"/><ellipse cx="261" cy="259" rx="7" ry="14" fill="#a9c1c3" stroke="#7a6e5b" stroke-width="3"/><path d="M187 251v17m12-17v17" stroke="#edd8ad" stroke-width="3"/></g><path d="M218 271v37m0-22-18 21m18-21 17 21" stroke="#9e8a6c" stroke-width="4"/>`;
 return '';
}

function prop(c) {
 const special=specialProp(c); if(special)return special;
 const p=c.prop, s='#575365';
 const book=`<path d="M183 232l55-11 4 71-57 10-27-14v-66Z" fill="#f9ebc9" stroke="${s}" stroke-width="3"/><path d="M185 237l48-10 2 59-49 10-23-12v-56Z" fill="${c.accent}"/><path d="M185 237v59m10-44 28-6m-28 17 28-6m-28 17 18-4" stroke="#f7e9ce" stroke-width="3"/>`;
 if(p==='book')return book;
 if(p==='scroll')return `<g transform="rotate(-10 214 263)"><path d="M184 228h52v65h-52Z" fill="#f3ddb5" stroke="#ab906e" stroke-width="3"/><ellipse cx="184" cy="228" rx="8" ry="5" fill="#dbc195" stroke="#ab906e" stroke-width="2"/><path d="M176 229v62q7 9 15 0v-62" fill="#ead3a9" stroke="#ab906e" stroke-width="2"/><path d="M201 242v33m10-33v33m10-33v22" stroke="#ad9a7e" stroke-width="3" stroke-linecap="round"/></g>`;
 if(p==='brush')return `<path d="M204 297l28-104" stroke="#8b6c50" stroke-width="8" stroke-linecap="round"/><path d="M229 201l3-23q14-8 12-21 12 25-8 46Z" fill="#faf0df" stroke="#726a65" stroke-width="2"/><path d="M240 162q12 25-4 41l-7-2 3-7Z" fill="#514e5b"/><path d="M175 285h40l-5 15h-31Z" fill="#7a747b"/>`;
 if(p==='fan')return `<g transform="rotate(14 213 264)"><path d="M211 291q-15-28-52-55 7-38 33-20 6-38 29-13 27-28 35 11 32-13 34 20-49 31-66 57Z" fill="#f7f3df" stroke="#a8ad9f" stroke-width="3"/><path d="M217 287l-42-48m44 48-23-62m24 61 2-72m0 71 28-59m-27 59 49-46" stroke="#c9cabb" stroke-width="2"/><path d="M218 286l-8 25" stroke="#a48d66" stroke-width="7" stroke-linecap="round"/></g>`;
 if(p==='flask')return `<path d="M211 219v23l-26 43q-8 15 10 18h45q18-2 10-18l-25-43v-23" fill="#e5f3e8" stroke="#667f8c" stroke-width="3"/><path d="M199 267l-10 20q-4 10 8 11h40q12-1 8-11l-11-20Z" fill="#b8cfa4"/><path d="M207 219h22" stroke="#667f8c" stroke-width="4" stroke-linecap="round"/><circle cx="216" cy="280" r="5" fill="#ecf5d8"/><circle cx="229" cy="291" r="3" fill="#ecf5d8"/><path d="M198 282l-4 8" stroke="#fff" stroke-width="4" stroke-linecap="round"/>`;
 if(p==='cup')return `<path d="M189 254q8 48 27 48t27-48Z" fill="#f5ead3" stroke="#a19b91" stroke-width="3"/><ellipse cx="216" cy="254" rx="27" ry="9" fill="#fff5dc" stroke="#a19b91" stroke-width="3"/><ellipse cx="216" cy="255" rx="20" ry="5" fill="#dec798"/><path d="M242 264q29-7 18 19-6 10-20 7" fill="none" stroke="#a19b91" stroke-width="6"/>`;
 if(p==='bun')return `<ellipse cx="215" cy="285" rx="42" ry="10" fill="#a98768"/><path d="M179 280q-2-40 37-43 39 1 37 43Z" fill="#fff0cc" stroke="#bca37f" stroke-width="3"/><path d="M216 241q-17 14-20 25m20-25q0 14 3 25m-3-25q17 13 23 24" fill="none" stroke="#dbc39d" stroke-width="3"/>`;
 if(p==='flower'||p==='herb'||p==='leaf')return `<path d="M213 304l5-70" stroke="#72997b" stroke-width="5"/><path d="M216 277q-36-1-31-24 27-1 31 24m2-19q29-2 25-25-26 0-25 25" fill="#a4c4a0" stroke="#72997b" stroke-width="2"/>${p==='flower'?`<g fill="#f4d8a5" stroke="#c6a36a" stroke-width="2"><circle cx="217" cy="225" r="11"/><circle cx="205" cy="231" r="10"/><circle cx="207" cy="217" r="10"/><circle cx="224" cy="213" r="10"/><circle cx="230" cy="229" r="10"/></g><circle cx="217" cy="224" r="7" fill="#d7ac60"/>`:`<path d="M218 239q-23-19-12-37 22 12 12 37" fill="#a4c4a0" stroke="#72997b" stroke-width="2"/>`}`;
 if(p==='apple')return `<path d="M217 249q-7-21-4-30" stroke="#8a7553" stroke-width="5"/><path d="M217 236q9-24 28-16-8 20-28 16" fill="#94b58b"/><path d="M216 249q-27-16-40 9-10 25 16 46 14 5 24-1 14 6 26-6 19-20 8-39-12-22-34-9Z" fill="#d88176" stroke="#aa615a" stroke-width="3"/><path d="M190 262q-8 7-4 17" fill="none" stroke="#f6c5ae" stroke-width="5" stroke-linecap="round"/>`;
 if(p==='sword')return `<path d="M217 283l5-82 10-14 9 15-8 83Z" fill="#dce1df" stroke="#7c8790" stroke-width="3"/><path d="M231 205l-6 73" stroke="#fff7e9" stroke-width="3"/><path d="M207 280l36 4" stroke="#c5a56b" stroke-width="8" stroke-linecap="round"/><path d="M223 285l-3 25" stroke="#80655a" stroke-width="10"/><circle cx="218" cy="312" r="7" fill="#c5a56b"/>`;
 if(p==='staff')return `<path d="M240 311l3-132q-1-20-17-15-15 4-8 19" stroke="#a88a5f" stroke-width="7" fill="none" stroke-linecap="round"/>${c.hat==='monk'?`<circle cx="242" cy="170" r="17" fill="none" stroke="#d7b867" stroke-width="5"/><circle cx="230" cy="185" r="7" fill="none" stroke="#d7b867" stroke-width="3"/><circle cx="254" cy="185" r="7" fill="none" stroke="#d7b867" stroke-width="3"/>`:''}`;
 if(p==='compass')return `<circle cx="219" cy="274" r="34" fill="#e7c68d" stroke="#9c805a" stroke-width="3"/><circle cx="219" cy="274" r="27" fill="#f6ecd0" stroke="#c4a571" stroke-width="2"/><path d="M219 251l-7 24 7 22 7-22Z" fill="#d18b7c"/><path d="M219 251v46l7-22Z" fill="#879eaa"/><circle cx="219" cy="274" r="4" fill="#fff1d1"/>`;
 if(p==='stars')return `<g transform="translate(218 268)"><ellipse rx="36" ry="14" fill="none" stroke="#aa8fc0" stroke-width="3"/><ellipse rx="36" ry="14" transform="rotate(60)" fill="none" stroke="#aa8fc0" stroke-width="3"/><ellipse rx="36" ry="14" transform="rotate(-60)" fill="none" stroke="#aa8fc0" stroke-width="3"/><circle r="8" fill="#e6c788"/><circle cx="28" cy="10" r="5" fill="#a4bec5"/></g>`;
 if(p==='lute')return `<g transform="rotate(18 218 266)"><path d="M210 212h17v47q20 11 17 34-4 22-27 23-24-2-26-23-3-23 19-35Z" fill="#cfab7d" stroke="#967452" stroke-width="3"/><path d="M215 217v85m5-85v85m5-85v85" stroke="#f9dfad" stroke-width="2"/><path d="M209 215h20m-19 76h17" stroke="#8a694d" stroke-width="4"/></g>`;
 if(p==='lamp')return `<path d="M205 244q-2-30 14-31 16 2 14 31" fill="none" stroke="#8f856c" stroke-width="4"/><path d="M201 250l4 48h29l5-48Z" fill="#f6db93" stroke="#8f856c" stroke-width="3"/><path d="M197 246h46m-43 54h40" stroke="#8f856c" stroke-width="7" stroke-linecap="round"/><path d="M218 286q-11-8 1-25 14 17 4 25Z" fill="#d89562"/><path d="M220 261v30" stroke="#fff2c1" stroke-width="3"/>`;
 if(p==='flag')return `<path d="M227 310V189" stroke="#9c8466" stroke-width="6"/><path d="M231 193q28-15 52 1l-8 40q-25-16-44 0Z" fill="#d1bd88" stroke="#ac9260" stroke-width="2"/><path d="M252 201v23m-8-14h17" stroke="#fff2cd" stroke-width="4"/>`;
 if(p==='music')return `<path d="M190 231h53v69h-53Z" fill="#f7ebcf" stroke="#a49b8b" stroke-width="2"/><path d="M198 248h35m-35 9h35m-35 9h35m-35 9h35" stroke="#b1a691" stroke-width="2"/><path d="M213 278v-32l16-4v30" fill="none" stroke="#5a5662" stroke-width="3"/><ellipse cx="208" cy="279" rx="7" ry="5" fill="#5a5662"/><ellipse cx="224" cy="273" rx="7" ry="5" fill="#5a5662"/>`;
 if(p==='bulb')return `<path d="M206 280q-2-12-13-25-12-31 25-37 36 7 24 37-12 15-13 25Z" fill="#f5de9d" stroke="#a39773" stroke-width="3"/><path d="M210 280l-3-29 12 9 11-9-5 29" fill="none" stroke="#c2a468" stroke-width="3"/><path d="M204 282h27v17h-27Z" fill="#9da9af" stroke="#6e7f8a" stroke-width="3"/><path d="M208 301h19" stroke="#6e7f8a" stroke-width="5" stroke-linecap="round"/><path d="M186 222l-9-9m72 9 9-9m-40-10v-12" stroke="#d7bd79" stroke-width="4" stroke-linecap="round"/>`;
 return book;
}

function specialOutfit(c,p,o) {
 const k=c.outfit;if(!k)return '';
 const base=`<path d="M112 214q-39 7-49 50l25 20 15-13-6 50q61 17 126 0l-7-50 16 13 25-20q-13-43-49-50Z" fill="url(#${p}-coat)" stroke="${o}" stroke-width="3"/>`;
 if(k==='armor')return `${base}<path d="M93 230l-20 29 28 11 13-34m114-6 20 29-28 11-13-34" fill="${c.coat}" stroke="${o}" stroke-width="3"/><path d="M122 219l37 23 38-23 14 71q-51 22-102 0Z" fill="${c.accent}" stroke="${o}" stroke-width="3"/>${[0,1,2,3].map(i=>`<path d="M${119-i*2} ${247+i*12}q44 14 ${83+i*4} 0" stroke="${c.coat}" stroke-width="4" fill="none"/>`).join('')}<path d="M136 241v48m23-43v47m24-51v47" stroke="${c.coat}" stroke-width="3"/><path d="M106 293q54 15 108 0l3 13q-58 15-113 0Z" fill="${c.inner}"/><circle cx="160" cy="302" r="10" fill="#b9a06d"/><path d="M116 309v14m22-11v14m43-14v14m21-17v14" stroke="#d2c7b2" stroke-width="3"/>`;
 if(k==='imperial')return `${base}<path d="M128 214l32 39 31-39-9-2-23 25-22-25Z" fill="${c.inner}"/><path d="M111 274q49 13 99 0v15q-49 12-99 0Z" fill="#c9a66d"/><rect x="148" y="278" width="25" height="15" rx="4" fill="#e5cc94"/><path d="M133 253q9-14 21-8 9 6 20 0 13-6 21 8m-62 9q9-9 21-3 9 6 20 0 13-6 21 3" fill="none" stroke="${c.inner}" stroke-width="3"/><path d="M120 299l-4 20m43-22v28m42-26 5 20" stroke="${c.inner}" stroke-width="4" opacity=".5"/>`;
 if(['mao','field','changshan'].includes(k))return `${base}<path d="M133 214v18l27 9 27-9v-18l-27 12Z" fill="${c.accent}" stroke="${o}" stroke-width="2"/><path d="M160 239v83" stroke="${c.inner}" stroke-width="2"/>${[251,269,287,305].map(y=>`<circle cx="167" cy="${y}" r="3" fill="${c.inner}"/>`).join('')}${k!=='changshan'?`<path d="M111 245h35v29q-17 9-35 0Zm65 0h32v29q-16 9-32 0Z" fill="none" stroke="${c.inner}" stroke-width="2"/><path d="M111 252h35m30 0h32" stroke="${c.inner}" stroke-width="3"/>`:''}${k==='field'?'<path d="M71 251l25 14m128 0 25-14" stroke="#d2debf" stroke-width="11"/>':''}`;
 if(k==='qipao')return `${base}<path d="M138 214v17q22 10 44 0v-17" fill="${c.accent}" stroke="${o}" stroke-width="2"/><path d="M178 229q13 6 17 19v69" fill="none" stroke="${c.inner}" stroke-width="3"/><path d="M173 237h16m-10 10h17" stroke="${c.inner}" stroke-width="3" stroke-linecap="round"/><path d="M111 280q20-20 29-8m-26 27q24-32 35-24" stroke="${c.inner}" stroke-width="2" fill="none"/><g fill="${c.inner}" opacity=".8"><circle cx="135" cy="272" r="5"/><circle cx="143" cy="280" r="5"/><circle cx="128" cy="282" r="5"/></g><path d="M206 307l6 19" stroke="${c.inner}" stroke-width="3"/>`;
 if(k==='apron')return `${base}<path d="M129 218l-15 31-3 72q50 15 101 0l-3-72-17-31-12 5 12 27h-63l12-27Z" fill="#d4d4c4" stroke="#a5b1a8" stroke-width="2"/><path d="M128 279h61v23q-31 14-61 0Z" fill="#abc0bf" stroke="#8aa3a8" stroke-width="2"/><path d="M138 263v58m14-58v60m14-60v60m14-60v58" stroke="#edf0df" stroke-width="2" opacity=".6"/>`;
 if(k==='tangdress')return `${base}<path d="M126 215l34 36 34-36" fill="${c.inner}" stroke="#f8e6c4" stroke-width="4"/><path d="M108 255q51 16 103 0v14q-51 18-103 0Z" fill="#dfc397"/><path d="M115 271l-9 48m29-46-4 52m49-52 5 52m18-54 10 48" stroke="${c.inner}" stroke-width="3" opacity=".5"/><path d="M74 244q-1 31 31 32m146-32q1 31-31 32" stroke="${c.inner}" stroke-width="12" fill="none"/>`;
 if(k==='winter')return `${base}<path d="M120 214l40 47 40-47" stroke="#f6ecd6" stroke-width="13" fill="none"/><path d="M110 271h100v16H110Z" fill="#bdac80"/><path d="M74 254l23 20m128 0 23-20" stroke="#f6ecd6" stroke-width="12"/><path d="M159 290v36" stroke="#f1e5cc" stroke-width="6"/>`;
 if(k==='blackdress')return `<path d="M127 214q-21 0-29 24l-34 26 23 20 21-18-15 57q65 17 132 0l-15-57 22 18 25-20-36-26q-9-24-29-24l-15 24h-36Z" fill="url(#${p}-coat)" stroke="${o}" stroke-width="3"/><path d="M128 216l13 22h36l14-22" stroke="#e6d9c3" stroke-width="3" fill="none"/>${[0,1,2,3,4,5,6].map(i=>`<circle cx="${135+i*8}" cy="${226+Math.sin(i/6*Math.PI)*8}" r="4" fill="#f5e7cb"/>`).join('')}<path d="M106 281q54 11 108 0" stroke="#7f7d8c" stroke-width="5" fill="none"/><path d="M123 295l-5 26m39-25v29m39-30 5 26" stroke="#767586" stroke-width="3" opacity=".5"/>`;
 if(k==='shawl'||k==='toga')return `${base}<path d="M110 215q20 31 98 54l-12 52q-64-17-91-44Z" fill="${c.inner}" stroke="#c8bc9f" stroke-width="3"/><path d="M118 229q23 27 80 41m-80-24q23 24 74 40m-72-20q19 18 64 33" stroke="#ddd0b4" stroke-width="3" fill="none"/><path d="M202 217l13 39" stroke="#dfd1b5" stroke-width="7"/>${k==='toga'?'<circle cx="202" cy="226" r="9" fill="#c0a974"/><path d="M198 226h8m-4-4v8" stroke="#e7d6aa" stroke-width="2"/>':''}`;
 if(k==='uniform')return `${base}<path d="M128 216l32 96 31-96-18-1-13 65-14-65Z" fill="#eee6d2"/><path d="M121 219l-10 32 32 5m54-37 10 32-31 5" fill="#c09284" stroke="#ba9b76" stroke-width="2"/><path d="M98 222l-19 15 25 13 11-18m105-10 19 15-25 13-11-18" fill="#d4b778" stroke="#aa8d5b" stroke-width="2"/>${[252,268,284].map(y=>`<circle cx="153" cy="${y}" r="3" fill="#cfb373"/><circle cx="169" cy="${y}" r="3" fill="#cfb373"/>`).join('')}<path d="M116 298h89" stroke="#c1a577" stroke-width="8"/>`;
 if(k==='ruff'||k==='court')return `${base}<path d="M138 220l22 94 23-94Z" fill="${c.inner}"/><path d="M129 234l-7 56m67-56 9 56" stroke="#dcc4a0" stroke-width="3"/>${[252,268,284].map(y=>`<circle cx="169" cy="${y}" r="3" fill="#c5a370"/>`).join('')}${k==='ruff'?`<path d="M122 217l-10 11 10 7 3 11 13-3 8 10 14-7 14 7 9-10 12 3 3-11 11-7-10-11q-39 20-77 0Z" fill="#f6ecd7" stroke="#d2c7ae" stroke-width="2"/>`:'<path d="M140 222l19 24 21-24-21 7Z" fill="#f7ebd3" stroke="#d0c2a8" stroke-width="2"/>'}`;
 if(k==='robe')return `${base}<path d="M129 215l31 65 31-65-14-1-17 38-17-38Z" fill="${c.inner}"/><path d="M126 222l-13 97m80-97 13 97" stroke="#d3b995" stroke-width="8"/><path d="M143 280v43m35-43v43" stroke="#b8a385" stroke-width="3"/>`;
 return '';
}

function faceDetails(c) {
 let out='';
 if(c.mark==='moon')out+=`<path d="M166 115a9 9 0 1 0 0 17 10 10 0 0 1 0-17Z" fill="#f2dfb7"/>`;
 if(c.glasses)out+=`<g fill="none" stroke="#776d63" stroke-width="2.5"><circle cx="124" cy="153" r="17"/><circle cx="196" cy="153" r="17"/><path d="M141 153q19-8 38 0m-72-4-14-5m120 5 14-5"/></g>`;
 return out;
}

export function portrait(character, options={}) {
 const id=typeof character==='string'?character:character.id;
 const c=people[id]||people.libai;
 const p=esc(options.prefix||`p-${id}`),skin=c.skin||'#f3d1b2',outline='#5b5262';
 const h=hair(c);
 const name=typeof character==='object'?character.name:id;
 let beard='';
 if(c.beard==='small')beard=`<path d="M140 180q9-4 18 3 10-7 23-3" fill="none" stroke="${c.hair}" stroke-width="5" stroke-linecap="round"/><path d="M151 195q10 5 20-1l-11 21Z" fill="${c.hair}"/>`;
 if(c.beard==='round')beard=`<path d="M121 176q5 30 39 31 31-2 39-31-2 39-39 45-36-5-39-45Z" fill="${c.hair}"/><path d="M141 181q9-5 19 2 10-7 22-2" fill="none" stroke="${c.hair}" stroke-width="6" stroke-linecap="round"/>`;
 if(c.beard==='long')beard=`<path d="M120 176q6 24 40 26 35-2 41-26-2 56-40 74-36-18-41-74Z" fill="${c.hair}"/><path d="M139 180q11-4 22 4 12-8 23-4" fill="none" stroke="${c.hair}" stroke-width="6" stroke-linecap="round"/><path d="M143 209q3 18 14 29m13-29q0 17-7 28" fill="none" stroke="#fff" opacity=".15" stroke-width="3"/>`;
 if(c.beard==='moustache')beard=`<path d="M134 181q13-10 26-1 14-9 27 1-15 12-27 3-12 9-26-3Z" fill="${c.hair}"/>`;
 if(c.beard==='flowing')beard=`<path d="M120 177q7 25 40 25 33 0 41-25-1 67-42 107-40-41-39-107Z" fill="${c.hair}"/><path d="M138 183q10-6 22 2 12-8 24-2" fill="none" stroke="${c.hair}" stroke-width="6"/><path d="M142 213q3 31 15 55m14-55q0 31-10 55" stroke="#788072" stroke-width="3" fill="none" opacity=".5"/>`;
 if(c.beard==='bushy')beard=`<path d="M117 175l6 15 9-6 9 17 12-9 10 12 12-13 13 9 10-20 9-4-3 29-12 2-8 18-15-5-11 13-12-13-15 5-7-17-13-7Z" fill="${c.hair}"/><path d="M137 181q11-9 24 1 12-10 25-1" fill="none" stroke="${c.hair}" stroke-width="7" stroke-linecap="round"/>`;
 if(c.beard==='straight')beard=`<path d="M138 178l45-1-1 8-44-1Z" fill="${c.hair}"/>`;
 if(c.beard==='pointed')beard=`<path d="M142 180q8-4 17 3 12-7 23-3m-33 17 12 17 12-17" fill="none" stroke="${c.hair}" stroke-width="5" stroke-linecap="round"/>`;
 if(c.beard==='curly')beard=`<path d="M120 178q4 25 40 27 38-1 41-27-1 48-40 67-37-17-41-67Z" fill="${c.hair}"/>${[0,1,2,3,4].map((_,i)=>`<path d="M${131+i*13} ${207+Math.sin(i)*2}q-6 9 4 13t-2 12" fill="none" stroke="#aba38f" stroke-width="2"/>`).join('')}<path d="M141 181q8-6 19 2 11-8 22-2" fill="none" stroke="${c.hair}" stroke-width="6"/>`;
 const shoes=`<ellipse cx="125" cy="327" rx="24" ry="12" fill="#655f6b"/><ellipse cx="191" cy="327" rx="24" ry="12" fill="#655f6b"/><path d="M108 325h26m46 0h25" stroke="#fff" opacity=".18" stroke-width="3" stroke-linecap="round"/>`;
 let body=c.western?`<path d="M112 214q-43 9-47 54l28 17 9-17-3 52q61 14 122 0l-4-53 12 17 26-18q-9-45-46-52Z" fill="url(#${p}-coat)" stroke="${outline}" stroke-width="3"/><path d="M133 217l26 97 26-97Z" fill="${c.inner}"/><path d="M124 219l-7 33 22-1-6 22 27 42-18-94m54-2 7 33-22-1 6 22-27 42 18-94" fill="${c.accent}"/><path d="M151 235l9 9 10-9-10-7Z" fill="#7a6874"/>`:`<path d="M113 213q-40 8-53 49l24 26 18-13-7 45q63 17 131 0l-8-45 16 10 27-27q-16-40-52-45Z" fill="url(#${p}-coat)" stroke="${outline}" stroke-width="3"/><path d="M132 214l28 40 29-40Z" fill="${c.inner}"/><path d="M126 219l37 53 38-55-12-4-27 39-29-39Z" fill="#fff2d9"/><path d="M104 270q56 14 113 0l2 15q-58 15-117 0Z" fill="${c.accent}"/><path d="M163 285l-4 37" stroke="${c.accent}" stroke-width="5"/><path d="M113 292l-4 23m100-23 5 23" stroke="#fff" stroke-width="4" opacity=".18"/>`;
 body=specialOutfit(c,p,outline)||body;
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 360" role="img" aria-label="${esc(name)}的原创可爱插画"><defs><linearGradient id="${p}-skin" x1="0%" y1="0%" x2="70%" y2="100%"><stop stop-color="${c.skinLight||'#fff0d9'}"/><stop offset="1" stop-color="${skin}"/></linearGradient><linearGradient id="${p}-coat" x1="0%" y1="0%" x2="100%" y2="100%"><stop stop-color="${c.coat}"/><stop offset="1" stop-color="${c.accent}"/></linearGradient><radialGradient id="${p}-blush"><stop stop-color="#e9a098" stop-opacity=".65"/><stop offset="1" stop-color="#e9a098" stop-opacity="0"/></radialGradient></defs>${options.framed?`<circle cx="160" cy="177" r="139" fill="${options.background||'#eee7f4'}"/>`:''}<ellipse cx="160" cy="336" rx="88" ry="10" fill="#666075" opacity=".09"/>${h.rear}${shoes}${body}<path d="M144 204v21q16 16 33 0v-21" fill="${skin}" stroke="${outline}" stroke-width="2"/><ellipse cx="88" cy="153" rx="13" ry="18" fill="${skin}" stroke="${outline}" stroke-width="2"/><ellipse cx="232" cy="153" rx="13" ry="18" fill="${skin}" stroke="${outline}" stroke-width="2"/><path d="M89 145q-7 6 0 14m142-14q7 6 0 14" stroke="#d9ab94" stroke-width="2" fill="none"/><path d="M88 123q-1-54 72-55 74 1 73 55v32q-1 57-73 61-71-4-72-61Z" fill="url(#${p}-skin)" stroke="${outline}" stroke-width="3"/><ellipse cx="113" cy="171" rx="24" ry="16" fill="url(#${p}-blush)"/><ellipse cx="207" cy="171" rx="24" ry="16" fill="url(#${p}-blush)"/><path d="M111 133q12-7 24-1m50 0q12-6 24 1" stroke="${c.hair==='#eae7d9'?'#aea99d':c.hair}" stroke-width="4" stroke-linecap="round" fill="none"/>${c.happy?`<path d="M113 151q10-12 20 0m54 0q10-12 20 0" fill="none" stroke="${outline}" stroke-width="5" stroke-linecap="round"/>`:`<ellipse cx="124" cy="153" rx="5" ry="7" fill="${outline}"/><ellipse cx="196" cy="153" rx="5" ry="7" fill="${outline}"/><circle cx="126" cy="150" r="1.5" fill="#fff"/><circle cx="198" cy="150" r="1.5" fill="#fff"/>`}<path d="M157 159q-5 8 5 9" stroke="#ce9c89" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M150 180q11 10 23-1" stroke="${outline}" stroke-width="3" fill="none" stroke-linecap="round"/>${beard}${h.front}${faceDetails(c)}${c.female?`<circle cx="95" cy="173" r="4" fill="#e1bd77"/><circle cx="225" cy="173" r="4" fill="#e1bd77"/>`:''}${prop(c)}<path d="M76 266q2-17 15-12l18 10q6 8-2 14l-15 2q-12 0-16-14Z" fill="${skin}" stroke="${outline}" stroke-width="2.5"/><path d="M207 271q1-13 12-12l15 4q10 6 4 16l-14 7q-14-2-17-15Z" fill="${skin}" stroke="${outline}" stroke-width="2.5"/><path d="M84 266l10 5m126-4 10 5" stroke="#d3a08a" stroke-width="2" stroke-linecap="round" fill="none"/></svg>`;
}

export const portraitIds = Object.keys(people);
