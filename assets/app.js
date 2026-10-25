'use strict';
// Nat 5 revision app — shared engine. All subject content lives in assets/data.js.
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const todayStr=()=>new Date().toDateString();
const LETTERS=['A','B','C','D','E','F'];
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const TOPIC=Object.fromEntries(TOPICS.map(t=>[t.id,t]));
const topicName=id=>(TOPIC[id]||{name:id}).name;
const qAnswer=q=>q.type==='mcq'?q.opts[q.ans]:q.ans;
const TYPE_LABEL={mcq:'Multiple choice',fillin:'Fill in the blank'};

// ---------------- State ----------------
const STORE=META.store;
const S={
  panel:'practice',currentQ:null,currentTopic:'random',currentType:'all',answered:false,
  questionNum:1,notepadContent:'',recent:[],
  stats:{answered:0,correct:0,streak:0,bestStreak:0,dailyCount:0,dailyDate:'',dayStreak:0,lastStudyDate:''},
  topicStats:{},settings:{name:'',goal:10,accent:'saltire',mode:'system'},
  timerScores:[],mockScores:[],fcIdx:0,fcCards:[],fcKnown:0
};
try{
  const p=JSON.parse(localStorage.getItem(STORE)||'null');
  if(p){
    if(p.stats)Object.assign(S.stats,p.stats);
    if(p.topicStats)S.topicStats=p.topicStats;
    if(p.notepadContent)S.notepadContent=p.notepadContent;
    if(p.questionNum)S.questionNum=p.questionNum;
    if(p.settings)Object.assign(S.settings,p.settings);
    if(p.timerScores)S.timerScores=p.timerScores;
    if(p.mockScores)S.mockScores=p.mockScores;
  }else if(META.legacyStore){
    // carry over progress from the previous version of this site
    const o=JSON.parse(localStorage.getItem(META.legacyStore)||'null');
    if(o){
      S.stats.answered=o.totalAnswered||0;S.stats.correct=o.totalCorrect||0;S.stats.bestStreak=o.bestStreak||0;
      if(o.dailyGoal)S.settings.goal=o.dailyGoal;
      if(o.topicStats)Object.entries(o.topicStats).forEach(([k,v])=>{if(v&&v.a)S.topicStats[k]={correct:v.c||0,total:v.a};});
    }
  }
}catch(e){}

function save(){
  try{localStorage.setItem(STORE,JSON.stringify({stats:S.stats,topicStats:S.topicStats,notepadContent:S.notepadContent,questionNum:S.questionNum,settings:S.settings,timerScores:S.timerScores,mockScores:S.mockScores}));}catch(e){}
}
function rollDay(){
  const t=todayStr();
  if(S.stats.dailyDate!==t){S.stats.dailyCount=0;S.stats.dailyDate=t;}
  if(S.stats.lastStudyDate){
    const y=new Date();y.setDate(y.getDate()-1);
    if(S.stats.lastStudyDate!==t&&S.stats.lastStudyDate!==y.toDateString())S.stats.dayStreak=0;
  }
}
function recordStudy(){
  rollDay();
  const t=todayStr();
  if(S.stats.lastStudyDate!==t){S.stats.dayStreak=(S.stats.dayStreak||0)+1;S.stats.lastStudyDate=t;}
}
// One answered question: updates totals, streak, daily goal and topic accuracy
function recordAnswer(ok,topic){
  recordStudy();
  S.stats.answered++;S.stats.dailyCount++;
  if(topic){const ts=S.topicStats[topic]||(S.topicStats[topic]={correct:0,total:0});ts.total++;if(ok)ts.correct++;}
  if(ok){S.stats.correct++;S.stats.streak++;if(S.stats.streak>S.stats.bestStreak)S.stats.bestStreak=S.stats.streak;}
  else S.stats.streak=0;
  save();updateHeader();
  if(ok&&S.stats.dailyCount===(S.settings.goal||10))toast('Daily goal reached — nice work');
  else if(ok&&S.stats.streak>0&&S.stats.streak%5===0)toast(S.stats.streak+' correct in a row');
}

let toastTimer;
function toast(msg){
  const el=$('toast');el.textContent=msg;el.classList.add('show');
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2600);
}

// Fill-in marking: forgiving on case, punctuation and small extras
const norm=s=>String(s).toLowerCase().replace(/[^a-z0-9%\- ]/g,'').replace(/\s+/g,' ').trim();
function fillCorrect(given,answer){
  const v=norm(given),a=norm(answer);
  if(!v)return false;
  if(v===a||v.includes(a))return true;
  return a.includes(v)&&v.length>=Math.max(3,Math.ceil(a.length*0.5));
}

// ---------------- Navigation ----------------
const PANELS=['practice','topics','worksheets','flashcards','mock','timer','facts','notepad','progress','resources','settings'].filter(p=>$('panel-'+p));
const SITE='Nat 5 '+META.subject+' Revision';
function showPanel(id,{focus=false}={}){
  if(!PANELS.includes(id))id='practice';
  document.querySelectorAll('.panel').forEach(p=>p.hidden=p.id!=='panel-'+id);
  document.querySelectorAll('[data-nav]').forEach(a=>{
    if(a.dataset.nav===id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
  });
  const panel=$('panel-'+id);
  $('page-title').textContent=panel.dataset.title;
  document.title=id==='practice'?META.title:panel.dataset.title+' — '+SITE;
  S.panel=id;
  closeSheet();
  if(id==='progress')renderProg();
  if(id==='topics')renderTopics();
  if(id==='worksheets'&&!wsState.open)closeWS();
  if(id==='notepad')$('notepad-text').value=S.notepadContent;
  if(id==='mock'&&!mock.active)renderMockHome();
  if(focus)window.scrollTo(0,0);
}
function route(){showPanel((location.hash||'#practice').slice(1),{focus:true});}
window.addEventListener('hashchange',route);
function go(id){if(location.hash==='#'+id)route();else location.hash=id;}

function openSheet(){$('more-sheet').hidden=false;$('sheet-backdrop').hidden=false;$('more-btn').setAttribute('aria-expanded','true');}
function closeSheet(){$('more-sheet').hidden=true;$('sheet-backdrop').hidden=true;$('more-btn').setAttribute('aria-expanded','false');}
$('more-btn').addEventListener('click',()=>$('more-sheet').hidden?openSheet():closeSheet());
$('sheet-backdrop').addEventListener('click',closeSheet);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSheet();});

// ---------------- Topic pickers ----------------
function fillTopicSelect(sel,{smart=true}={}){
  const top=document.createElement('optgroup');top.label='Mixed';
  top.append(new Option('Random mix — all topics','random'));
  if(smart)top.append(new Option('Smart Mix — focuses on your weakest topics','smart'));
  sel.append(top);
  const og=document.createElement('optgroup');og.label='Topics';
  TOPICS.forEach(t=>og.append(new Option(t.icon+' '+t.name,t.id)));
  sel.append(og);
}

// ---------------- Question selection ----------------
const typeOk=type=>q=>type==='all'||q.type===type;
function weightedPick(keys){
  const w=keys.map(k=>{const ts=S.topicStats[k];if(!ts||ts.total<3)return 2;return 0.5+3*(1-ts.correct/ts.total);});
  let r=Math.random()*w.reduce((a,b)=>a+b,0);
  for(let i=0;i<keys.length;i++){r-=w[i];if(r<=0)return keys[i];}
  return keys[keys.length-1];
}
function pickQuestion(topicSel,filter){
  let pool=QUESTIONS.filter(filter);
  if(topicSel==='smart'){
    const keys=TOPICS.map(t=>t.id).filter(k=>pool.some(q=>q.topic===k));
    const k=weightedPick(keys);pool=pool.filter(q=>q.topic===k);
  }else if(topicSel!=='random'){
    const tp=pool.filter(q=>q.topic===topicSel);pool=tp.length?tp:QUESTIONS.filter(q=>q.topic===topicSel);
  }
  if(!pool.length)pool=QUESTIONS;
  const fresh=pool.filter(q=>!S.recent.includes(q.q));
  if(fresh.length)pool=fresh;
  const q=pool[Math.floor(Math.random()*pool.length)];
  S.recent.push(q.q);if(S.recent.length>30)S.recent.shift();
  return q;
}

// ---------------- Multiple-choice options ----------------
// Options keep their order when one refers to the others ("all of the above"); otherwise they are shuffled.
function optionOrder(q){
  const idx=q.opts.map((_,i)=>i);
  return q.opts.some(o=>/\b(above|below|both|none of|all of)\b/i.test(o))?idx:shuffle(idx);
}
// onPick(isCorrect, chosenText) is called once.
function renderOptions(box,q,onPick){
  box.innerHTML='';
  const order=optionOrder(q);
  const btns=order.map((oi,i)=>{
    const b=document.createElement('button');b.type='button';b.className='opt';
    b.dataset.correct=oi===q.ans?'1':'';
    b.innerHTML=`<span class="opt-key">${LETTERS[i]}</span><span class="opt-text">${esc(q.opts[oi])}</span>`;
    b.addEventListener('click',()=>{
      if(box.dataset.locked)return;
      box.dataset.locked='1';
      const ok=oi===q.ans;
      btns.forEach(x=>{x.disabled=true;if(x.dataset.correct)x.classList.add('correct');});
      if(!ok)b.classList.add('wrong');
      onPick(ok,q.opts[oi]);
    });
    box.append(b);return b;
  });
  delete box.dataset.locked;
  return btns;
}
function pickByKey(box,key){
  const idx='1234'.indexOf(key)>=0?'1234'.indexOf(key):'abcd'.indexOf(key.toLowerCase());
  if(idx<0)return false;
  const b=box.querySelectorAll('.opt')[idx];
  if(b&&!b.disabled&&!b.hidden){b.click();return true;}
  return false;
}
// Fill-in box: input + check. onSubmit(isCorrect, givenText) is called once.
function renderFill(box,q,onSubmit,{label='Check answer',extra=''}={}){
  box.innerHTML=`<form class="fill-form" autocomplete="off">
    <label class="sr-only" for="${box.id}-in">Your answer</label>
    <input class="input input-lg" id="${box.id}-in" type="text" placeholder="Type the missing word" spellcheck="false" autocapitalize="off">
    <div class="btn-row"><button type="submit" class="btn btn-primary">${label}</button>${extra}</div></form>`;
  const form=box.querySelector('form'),inp=form.querySelector('input');
  form.addEventListener('submit',e=>{
    e.preventDefault();
    if(form.dataset.done)return;
    if(!inp.value.trim()){inp.focus();toast('Type an answer first');return;}
    form.dataset.done='1';
    const ok=fillCorrect(inp.value,q.ans);
    inp.disabled=true;inp.classList.add(ok?'is-ok':'is-no');
    form.querySelector('[type=submit]').disabled=true;
    onSubmit(ok,inp.value.trim());
  });
  return inp;
}

// ---------------- Practice ----------------
let practiceBtns=[];
function newQuestion(){
  const q=pickQuestion(S.currentTopic,typeOk(S.currentType));
  S.currentQ=q;S.answered=false;S.fiftyUsed=false;
  $('q-text').textContent=q.q;
  $('q-topic-label').textContent=topicName(q.topic);
  $('q-num').textContent=S.questionNum;
  $('q-type').textContent=TYPE_LABEL[q.type]||q.type;
  $('feedback-area').innerHTML='';
  $('hint-btn').hidden=q.type!=='mcq';$('skip-btn').hidden=false;
  const box=$('q-options');
  if(q.type==='mcq'){practiceBtns=renderOptions(box,q,markAnswer);}
  else{practiceBtns=[];const inp=renderFill(box,q,markAnswer);if(S.panel==='practice'&&matchMedia('(hover:hover)').matches)inp.focus({preventScroll:true});}
}
function markAnswer(ok){
  if(S.answered)return;
  S.answered=true;
  const q=S.currentQ;
  $('hint-btn').hidden=true;$('skip-btn').hidden=true;
  const run=ok&&S.stats.streak>=2?` <span class="muted">· ${S.stats.streak+1} in a row</span>`:'';
  const html=ok
    ?`<div class="fb fb-ok"><div class="fb-head"><svg class="ico"><use href="#i-check"/></svg>Correct${run}</div>
      ${q.explain?`<div class="fb-exp"><b>Why:</b> ${esc(q.explain)}</div>`:''}
      <button class="btn btn-primary" id="next-btn">Next question<svg class="ico"><use href="#i-arrow"/></svg></button></div>`
    :`<div class="fb fb-no"><div class="fb-head"><svg class="ico"><use href="#i-x"/></svg>Not quite</div>
      The answer is <span class="ans">${esc(qAnswer(q))}</span>.
      ${q.explain?`<div class="fb-exp"><b>Remember:</b> ${esc(q.explain)}</div>`:''}
      <button class="btn btn-primary" id="next-btn">Next question<svg class="ico"><use href="#i-arrow"/></svg></button></div>`;
  $('feedback-area').innerHTML=html;
  $('next-btn').addEventListener('click',newQuestion);
  $('next-btn').focus({preventScroll:true});
  S.questionNum++;
  recordAnswer(ok,q.topic);
}
function skipQuestion(){if(S.answered)return;S.stats.streak=0;updateHeader();save();newQuestion();}
// Hint = 50:50 — removes two wrong answers (multiple choice only)
function getHint(){
  if(!S.currentQ||S.answered||S.fiftyUsed||S.currentQ.type!=='mcq')return;
  S.fiftyUsed=true;
  shuffle(practiceBtns.filter(b=>!b.dataset.correct)).slice(0,2).forEach(b=>{b.hidden=true;});
  $('feedback-area').innerHTML=`<div class="fb fb-hint"><div class="fb-head"><svg class="ico"><use href="#i-bulb"/></svg>50:50</div>Two wrong answers removed.</div>`;
}
function updateHeader(){
  rollDay();
  const g=S.settings.goal||10,dc=S.stats.dailyCount||0,pct=Math.min(100,dc/g*100);
  $('hdr-days').textContent=S.stats.dayStreak||0;
  $('hdr-daily').textContent=dc;$('hdr-goal').textContent=g;
  $('goal-ring').setAttribute('stroke-dasharray',pct+' 100');
  document.querySelector('.chip-goal').classList.toggle('done',dc>=g);
  $('daily-count').textContent=dc;$('daily-goal-lbl').textContent=g;
  $('goal-fill').style.width=pct+'%';
  $('run-streak').textContent=S.stats.streak;$('best-streak').textContent=S.stats.bestStreak;
}
function setTopic(k){S.currentTopic=k;$('topic-select').value=k;newQuestion();}

$('hint-btn').addEventListener('click',getHint);
$('skip-btn').addEventListener('click',skipQuestion);
$('topic-select').addEventListener('change',e=>setTopic(e.target.value));
$('type-seg').addEventListener('click',e=>{
  const b=e.target.closest('[data-type]');if(!b)return;
  S.currentType=b.dataset.type;
  $('type-seg').querySelectorAll('[data-type]').forEach(x=>x.setAttribute('aria-checked',x===b));
  newQuestion();
});
// Keys 1–4 / A–D choose an answer; Enter moves on
document.addEventListener('keydown',e=>{
  if(e.ctrlKey||e.metaKey||e.altKey||e.target.closest('input,select,textarea'))return;
  if(S.panel==='practice'){
    if(!S.answered&&S.currentQ&&S.currentQ.type==='mcq'&&pickByKey($('q-options'),e.key)){e.preventDefault();return;}
    if(e.key==='Enter'&&S.answered&&document.activeElement?.id!=='next-btn'){e.preventDefault();newQuestion();}
  }else if(S.panel==='timer'&&!$('timer-game').hidden){
    if(pickByKey($('timer-options'),e.key))e.preventDefault();
  }else if(S.panel==='mock'&&mock.active&&!mock.locked){
    if(pickByKey($('mock-options'),e.key))e.preventDefault();
  }
});

// ---------------- Topics ----------------
function accClass(pct,total){return !total?'':pct<50?'acc-low':pct<75?'acc-mid':'acc-high';}
function renderTopics(){
  const g=$('topic-grid');g.innerHTML='';
  const grid=document.createElement('div');grid.className='topic-grid';
  TOPICS.forEach(t=>{
    const ts=S.topicStats[t.id]||{correct:0,total:0};
    const n=QUESTIONS.filter(q=>q.topic===t.id).length;
    const pct=ts.total?Math.round(ts.correct/ts.total*100):0;
    const b=document.createElement('button');b.className='tile '+accClass(pct,ts.total);
    b.innerHTML=`<div class="tile-top"><span class="glyph">${esc(t.icon)}</span><span class="tag tag-topic">${n} questions</span></div>
      <h3>${esc(t.name)}</h3>
      <div class="tile-meta">${esc(t.sub||'')}</div>
      <div class="tile-meta">${ts.total?`${pct}% correct · ${ts.total} answered`:'Not started'}</div>
      <div class="bar"><div class="bar-fill" style="width:${pct}%"></div></div>`;
    b.addEventListener('click',()=>{setTopic(t.id);go('practice');});
    grid.append(b);
  });
  g.append(grid);
}

// ---------------- Worksheets ----------------
// Each sheet: SQA-style written questions — multiple choice, fill the blanks, Punnett squares and model-answer questions.
const wsState={open:false,idx:-1,c:0,t:0};
const sheetQs=sh=>sh.sections.flatMap(s=>s.qs);
function renderWSList(){
  const el=$('sheet-list');el.innerHTML='';
  SHEETS.forEach((sh,i)=>{
    const b=document.createElement('button');b.className='tile';
    b.innerHTML=`<div class="tile-top"><span class="glyph">${esc(sh.icon||'✎')}</span><span class="tag tag-topic">${sheetQs(sh).length} questions</span></div>
      <h3>${esc(sh.title)}</h3><div class="tile-meta">${sh.sections.map(s=>s.head).join(' · ')}</div>`;
    b.addEventListener('click',()=>openWS(i));el.append(b);
  });
}
function wsQuestionHTML(q,n){
  let body='';
  if(q.kind==='mcq'){
    body=`<div class="opts opts-sm" role="group" aria-label="Answers">${q.opts.map((o,j)=>`<button type="button" class="opt" data-j="${j}"><span class="opt-key">${LETTERS[j]}</span><span class="opt-text">${o[0]}</span></button>`).join('')}</div>`;
  }else if(q.kind==='blanks'){
    body=`<div class="ws-blanks">${q.body}</div><div class="btn-row"><button type="button" class="btn btn-primary btn-sm" data-check>Check</button></div>`;
  }else if(q.kind==='punnett'){
    body=`<div>${q.body}</div><div class="btn-row"><button type="button" class="btn btn-primary btn-sm" data-check>Check</button></div>`;
  }else if(q.kind==='written'){
    body=`<label class="sr-only" for="ta-${n}">Your answer</label><textarea class="input ws-ta ${q.tall?'tall':''}" id="ta-${n}" placeholder="${esc(q.placeholder||'Write your answer here…')}"></textarea>
      <div class="btn-row"><button type="button" class="btn btn-primary btn-sm" data-check>Show model answer</button></div>`;
  }
  return `<div class="ws-q" data-n="${n}">
    <div class="ws-label">${q.label}</div>
    ${q.text?`<div class="ws-text">${q.text}</div>`:''}
    ${body}
    <div class="ws-reveal" hidden>${q.reveal}</div></div>`;
}
function openWS(idx){
  const sh=SHEETS[idx];
  Object.assign(wsState,{open:true,idx,c:0,t:0});
  $('ws-list').hidden=true;
  const av=$('ws-active');av.hidden=false;
  let n=0;
  av.innerHTML=`<div class="card">
    <div class="ws-head">
      <div><h2 class="card-title" style="margin-bottom:6px">${esc(sh.title)}</h2><span class="tag tag-topic">${sheetQs(sh).length} questions · self-marked</span></div>
      <button class="btn btn-ghost btn-sm" data-ws-back><svg class="ico"><use href="#i-back"/></svg>All worksheets</button>
    </div>
    ${sh.keyAreas?`<div class="ws-key">${sh.keyAreas}</div>`:''}
    <div class="ws-strip" id="ws-strip" hidden><span class="ws-score" id="ws-score">0/0</span><div class="grow"><div class="small" id="ws-msg"></div><div class="bar"><div class="bar-fill" id="ws-fill"></div></div></div></div>
    ${sh.sections.map(sec=>`${sec.head?`<h3 class="ws-section">${sec.head}</h3>`:''}${sec.qs.map(q=>wsQuestionHTML(q,n++)).join('')}`).join('')}
    <div class="btn-row" style="margin-top:16px">
      <button type="button" class="btn btn-primary" data-ws-markall>Mark all</button>
      <button type="button" class="btn btn-ghost" data-ws-reset>Start again</button>
    </div></div>`;
  const qs=sheetQs(sh);
  av.querySelectorAll('.ws-q').forEach(el=>{
    const q=qs[+el.dataset.n];
    el.addEventListener('click',e=>{
      if(el.dataset.done)return;
      if(q.kind==='mcq'){
        const b=e.target.closest('.opt');if(!b)return;
        const ok=!!q.opts[+b.dataset.j][1];
        el.querySelectorAll('.opt').forEach((x,j)=>{x.disabled=true;x.classList.add('locked');if(q.opts[j][1])x.classList.add('correct');});
        if(!ok)b.classList.add('wrong');
        wsFinish(el,ok);
      }else if(e.target.closest('[data-check]')){
        if(q.kind==='blanks'){
          let all=true;
          q.ids.forEach((id,i)=>{
            const inp=el.querySelector('[id="'+id+'"]');if(!inp)return;
            const v=inp.value.trim().toLowerCase().replace(/[^a-z0-9\- ]/g,''),a=String(q.answers[i]).toLowerCase().replace(/[^a-z0-9\- ]/g,'');
            const ok=!!v&&(v===a||v.includes(a)||(v.length>2&&(a.includes(v)||a.startsWith(v))));
            inp.classList.add(ok?'is-ok':'is-no');inp.disabled=true;if(!ok)all=false;
          });
          wsFinish(el,all);
        }else if(q.kind==='punnett'){
          // genotypes match whatever the letter order (tT = Tt)
          const g=s=>String(s).trim().split('').sort((x,y)=>x.toLowerCase()===y.toLowerCase()?(x<y?-1:1):x.toLowerCase()<y.toLowerCase()?-1:1).join('');
          let all=true;
          q.ids.forEach((id,i)=>{
            const inp=el.querySelector('[id="'+id+'"]');if(!inp)return;
            const ok=g(inp.value)===g(q.answers[i]);
            inp.closest('.pun-cell')?.classList.add(ok?'is-ok':'is-no');inp.disabled=true;
            if(!ok){all=false;inp.value=q.answers[i];}
          });
          wsFinish(el,all);
        }else if(q.kind==='written'){
          const ta=el.querySelector('textarea');if(ta)ta.disabled=true;
          wsFinish(el,true);
        }
      }
    });
  });
  av.querySelector('[data-ws-back]').addEventListener('click',closeWS);
  av.querySelector('[data-ws-reset]').addEventListener('click',()=>openWS(idx));
  av.querySelector('[data-ws-markall]').addEventListener('click',()=>{
    av.querySelectorAll('.ws-q').forEach(el=>{
      if(el.dataset.done)return;
      el.querySelectorAll('input,textarea').forEach(i=>{i.disabled=true;if(i.classList.contains('eq-in'))i.classList.add('is-no');i.closest('.pun-cell')?.classList.add('is-no');});
      el.querySelectorAll('.opt').forEach(x=>{x.disabled=true;});
      wsFinish(el,false);
    });
  });
  window.scrollTo(0,0);
}
function wsFinish(el,ok){
  el.dataset.done='1';
  el.classList.add(ok?'is-ok':'is-no');
  el.querySelectorAll('[data-check]').forEach(b=>b.disabled=true);
  el.querySelector('.ws-reveal').hidden=false;
  wsState.t++;if(ok)wsState.c++;
  recordStudy();save();updateHeader();
  const pct=Math.round(wsState.c/wsState.t*100);
  $('ws-strip').hidden=false;
  $('ws-score').textContent=wsState.c+'/'+wsState.t;
  $('ws-fill').style.width=pct+'%';
  $('ws-msg').textContent=pct>=80?'Excellent — on track for an A/B.':pct>=60?'Good — review what you missed.':'Keep revising — read the model answers.';
}
function closeWS(){wsState.open=false;$('ws-list').hidden=false;$('ws-active').hidden=true;$('ws-active').innerHTML='';}

// ---------------- Flashcards ----------------
// Cards are built from the question bank: question on the front, answer and explanation on the back.
function fillFCDecks(){
  const sel=$('fc-topic');
  sel.append(new Option('All topics ('+QUESTIONS.length+')','all'));
  TOPICS.forEach(t=>sel.append(new Option(t.icon+' '+t.name+' ('+QUESTIONS.filter(q=>q.topic===t.id).length+')',t.id)));
}
function loadFC(){const k=$('fc-topic').value;S.fcCards=shuffle(QUESTIONS.filter(q=>k==='all'||q.topic===k));S.fcIdx=0;S.fcKnown=0;showFC();}
function showFC(){
  const c=S.fcCards[S.fcIdx];if(!c)return;
  $('flashcard').classList.remove('flipped');
  $('fc-kicker').textContent=topicName(c.topic);
  $('fc-term').textContent=c.q;
  $('fc-term-back').textContent='Answer';
  $('fc-def').innerHTML=`<b>${esc(qAnswer(c))}</b>${c.explain?`<small>${esc(c.explain)}</small>`:''}`;
  $('fc-idx').textContent=S.fcIdx+1;$('fc-tot').textContent=S.fcCards.length;
  $('fc-known').textContent=S.fcKnown;
}
function flipCard(){$('flashcard').classList.toggle('flipped');}
function stepFC(d){
  if(!S.fcCards.length)return;
  S.fcIdx+=d;
  if(S.fcIdx>=S.fcCards.length){S.fcIdx=0;S.fcCards=shuffle(S.fcCards);toast('End of deck — reshuffled');}
  if(S.fcIdx<0)S.fcIdx=S.fcCards.length-1;
  showFC();
}
function rateFC(knew){
  const c=S.fcCards[S.fcIdx];if(!c)return;
  if(knew){S.fcKnown++;recordAnswer(true,c.topic);}
  stepFC(1);
}
$('fc-topic').addEventListener('change',loadFC);
$('flashcard').addEventListener('click',flipCard);
$('fc-prev').addEventListener('click',()=>stepFC(-1));
$('fc-skip').addEventListener('click',()=>rateFC(false));
$('fc-knew').addEventListener('click',()=>rateFC(true));
$('fc-shuffle').addEventListener('click',()=>{S.fcCards=shuffle(S.fcCards);S.fcIdx=0;showFC();toast('Deck shuffled');});
document.addEventListener('keydown',e=>{
  if(S.panel!=='flashcards'||e.target.closest('input,select,textarea'))return;
  if(e.key==='ArrowRight')stepFC(1);else if(e.key==='ArrowLeft')stepFC(-1);
  else if(e.key===' '&&e.target.id!=='flashcard'){e.preventDefault();flipCard();}
});

// ---------------- Timed challenge (multiple choice) ----------------
const timer={interval:null,left:0,secs:0,score:0,topic:'random',q:null,token:0};
function startTimer(secs){
  timer.topic=$('timer-topic').value;timer.secs=secs;timer.left=secs;timer.score=0;
  $('timer-setup').hidden=true;$('timer-result').hidden=true;$('timer-game').hidden=false;
  $('timer-score-lbl').textContent='0';
  const d=$('timer-display');d.textContent=secs;d.classList.remove('urgent');
  newTimerQ();
  clearInterval(timer.interval);
  timer.interval=setInterval(()=>{
    timer.left--;d.textContent=timer.left;
    if(timer.left<=10)d.classList.add('urgent');
    if(timer.left<=0)endTimer();
  },1000);
}
function newTimerQ(){
  timer.token++;
  timer.q=pickQuestion(timer.topic,q=>q.type==='mcq');
  $('timer-q').textContent=timer.q.q;
  renderOptions($('timer-options'),timer.q,ok=>{
    const fb=$('timer-fb'),tk=timer.token;
    if(ok){timer.score++;$('timer-score-lbl').textContent=timer.score;fb.innerHTML='<span class="ok">Correct</span>';setTimeout(()=>{if(tk===timer.token&&timer.interval)newTimerQ();},450);}
    else{fb.innerHTML=`<span class="no">Answer: ${esc(qAnswer(timer.q))}</span>`;setTimeout(()=>{if(tk===timer.token&&timer.interval)newTimerQ();},1600);}
  });
}
function endTimer(){
  clearInterval(timer.interval);timer.interval=null;timer.token++;
  $('timer-game').hidden=true;$('timer-result').hidden=false;$('timer-fb').textContent='';
  $('timer-final').textContent=timer.score+' correct';
  const best=S.timerScores.filter(s=>s.secs===timer.secs).reduce((m,s)=>Math.max(m,s.score),0);
  const mins=timer.secs/60;
  $('timer-msg').textContent=timer.score>best?`New personal best for the ${mins}-minute challenge.`:
    `Your best for ${mins} minute${mins>1?'s':''} is ${best}. `+(timer.score>=best*0.8?'Close!':'Keep practising.');
  S.timerScores.push({score:timer.score,secs:timer.secs,date:new Date().toLocaleDateString('en-GB')});
  if(S.timerScores.length>30)S.timerScores=S.timerScores.slice(-30);
  save();
}
function resetTimer(){clearInterval(timer.interval);timer.interval=null;timer.token++;$('timer-setup').hidden=false;$('timer-game').hidden=true;$('timer-result').hidden=true;}
document.querySelectorAll('#timer-setup [data-secs]').forEach(b=>b.addEventListener('click',()=>startTimer(+b.dataset.secs)));
$('timer-skip').addEventListener('click',()=>{$('timer-fb').textContent='';newTimerQ();});
$('timer-stop').addEventListener('click',endTimer);
$('timer-again').addEventListener('click',resetTimer);

// ---------------- Mock exams ----------------
// Each sitting draws a fresh set from the whole question bank. 1 mark per question.
const mock={active:false,paper:null,questions:[],idx:0,answers:[],correct:[],score:0,total:0,left:0,started:0,interval:null,locked:false};
const fmtTime=s=>Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
function renderMockHome(){
  const el=$('mock-papers');el.innerHTML='';
  MOCK_PAPERS.forEach((p,n)=>{
    const d=document.createElement('div');d.className='tile paper';
    d.innerHTML=`<div class="tile-top"><span class="glyph">P${n+1}</span></div>
      <h3>${p.title}</h3>
      <div class="tile-meta">${p.desc}</div>
      <div class="paper-facts"><span class="tag">${p.n} questions</span><span class="tag">${p.mins} min</span><span class="tag tag-topic">${QUESTIONS.length} in the pool</span></div>
      <button class="btn btn-primary">Start paper</button>`;
    d.querySelector('button').addEventListener('click',()=>startMock(n));
    el.append(d);
  });
  const prev=$('mock-prev-scores');
  if(S.mockScores.length){prev.hidden=false;prev.innerHTML='<h2 class="card-title">Recent attempts</h2>'+mockHistoryHTML(5);}
  else prev.hidden=true;
}
function mockHistoryHTML(n){
  if(!S.mockScores.length)return '<p class="empty">No mock exams yet. Try one from the Mock exams page.</p>';
  return [...S.mockScores].slice(-n).reverse().map(s=>`<div class="list-row">
    <span class="rank">${esc(s.grade==='No Award'?'–':s.grade)}</span>
    <span class="grow">${esc((MOCK_PAPERS[s.paper]&&MOCK_PAPERS[s.paper].short)||'Paper')} · ${s.score}/${s.total} (${s.pct}%)</span>
    <span class="muted small">${esc(s.date)}</span></div>`).join('');
}
function startMock(n){
  const p=MOCK_PAPERS[n],qs=shuffle(QUESTIONS).slice(0,Math.min(p.n,QUESTIONS.length));
  Object.assign(mock,{active:true,paper:n,questions:qs,idx:0,answers:new Array(qs.length).fill(''),correct:new Array(qs.length).fill(false),score:0,total:qs.length,left:p.mins*60,started:Date.now(),locked:false});
  $('mock-home').hidden=true;$('mock-results').hidden=true;$('mock-exam').hidden=false;
  $('mock-paper-title').textContent=p.short;
  $('mock-total').textContent=mock.total;
  $('mock-marks-so-far').textContent='0';
  const clock=$('mock-timer-display');clock.textContent=fmtTime(mock.left);clock.classList.remove('low');
  clearInterval(mock.interval);mock.interval=setInterval(mockTick,1000);
  showMockQ();window.scrollTo(0,0);
}
function mockTick(){
  mock.left--;
  const clock=$('mock-timer-display');clock.textContent=fmtTime(Math.max(0,mock.left));
  if(mock.left<=120)clock.classList.add('low');
  if(mock.left<=0)endMock();
}
function showMockQ(){
  const q=mock.questions[mock.idx],total=mock.questions.length;
  mock.locked=false;
  $('mock-q-counter').textContent=`Question ${mock.idx+1} of ${total}`;
  $('mock-topic-label').textContent=topicName(q.topic);
  $('mock-type-label').textContent=TYPE_LABEL[q.type]||'';
  $('mock-q-text').textContent=q.q;
  $('mock-fb').innerHTML='';$('mock-skip').disabled=false;
  $('mock-prog-bar').style.width=(mock.idx/total*100)+'%';
  const done=(ok,given)=>{
    if(!mock.active||mock.locked)return;
    mock.locked=true;
    mock.answers[mock.idx]=given;mock.correct[mock.idx]=ok;
    if(ok)mock.score++;
    $('mock-marks-so-far').textContent=mock.score;
    $('mock-skip').disabled=true;
    $('mock-fb').innerHTML=ok
      ?`<div class="fb fb-ok"><div class="fb-head"><svg class="ico"><use href="#i-check"/></svg>Correct — 1 mark</div>${q.explain?esc(q.explain):''}</div>`
      :`<div class="fb fb-no"><div class="fb-head"><svg class="ico"><use href="#i-x"/></svg>Answer: ${esc(qAnswer(q))}</div>${q.explain?esc(q.explain):''}</div>`;
    const at=mock.idx;
    setTimeout(()=>{if(mock.active&&mock.idx===at)advanceMock();},ok?1400:3200);
  };
  if(q.type==='mcq')renderOptions($('mock-options'),q,done);
  else{const inp=renderFill($('mock-options'),q,done,{label:'Submit answer'});if(matchMedia('(hover:hover)').matches)inp.focus({preventScroll:true});}
}
function advanceMock(){mock.idx++;if(mock.idx>=mock.questions.length)endMock();else showMockQ();}
function skipMockQ(){if(!mock.active||mock.locked)return;mock.answers[mock.idx]='';advanceMock();}
function endMock(){
  if(!mock.active)return;
  clearInterval(mock.interval);mock.interval=null;mock.active=false;
  $('mock-exam').hidden=true;$('mock-results').hidden=false;$('mock-review-section').hidden=true;
  const p=MOCK_PAPERS[mock.paper],total=mock.total,score=mock.score,pct=total?Math.round(score/total*100):0;
  const g=MOCK_GRADES.find(x=>pct>=x.min)||MOCK_GRADES[MOCK_GRADES.length-1];
  const grade=g.grade;
  const answered=mock.answers.filter(a=>a!=='').length;
  const secs=Math.round((Date.now()-mock.started)/1000);
  $('mock-grade-icon').textContent=grade==='No Award'?'–':grade;
  $('mock-grade-title').textContent=grade==='No Award'?'Keep practising':'Grade '+grade;
  $('mock-score-display').textContent=`${score} / ${total} · ${pct}%`;
  $('mock-grade-band').innerHTML=`<div class="res-facts"><span class="tag tag-calc">${score} correct</span><span class="tag tag-nocalc">${answered-score} wrong</span><span class="tag">${total-answered} blank</span><span class="tag">${Math.floor(secs/60)}m ${secs%60}s</span></div>${esc(p.title)}`;
  $('mock-grade-msg').textContent=g.msg;
  S.mockScores.push({paper:mock.paper,score,total,pct,grade,date:new Date().toLocaleDateString('en-GB')});
  if(S.mockScores.length>50)S.mockScores=S.mockScores.slice(-50);
  mock.questions.forEach((q,i)=>{if(mock.answers[i]==='')return;const ts=S.topicStats[q.topic]||(S.topicStats[q.topic]={correct:0,total:0});ts.total++;if(mock.correct[i])ts.correct++;});
  recordStudy();save();updateHeader();window.scrollTo(0,0);
}
function showMockReview(){
  const sec=$('mock-review-section');sec.hidden=false;
  $('mock-review-list').innerHTML=mock.questions.map((q,i)=>{
    const given=mock.answers[i],ok=mock.correct[i];
    return `<div class="review-item ${ok?'ok':'no'}">
      <div class="meta">${i+1}. ${esc(topicName(q.topic))} · ${esc(TYPE_LABEL[q.type]||'')}</div>
      <div class="q">${esc(q.q)}</div>
      <div>Your answer: <b>${given?esc(given):'<span class="muted">blank</span>'}</b>${ok?'':` · Correct: <b>${esc(qAnswer(q))}</b>`}</div>
      ${ok||!q.explain?'':`<div class="exp">${esc(q.explain)}</div>`}</div>`;
  }).join('');
  sec.scrollIntoView({behavior:'smooth'});
}
function resetMock(){
  clearInterval(mock.interval);mock.interval=null;mock.active=false;
  $('mock-home').hidden=false;$('mock-exam').hidden=true;$('mock-results').hidden=true;
  renderMockHome();window.scrollTo(0,0);
}
$('mock-skip').addEventListener('click',skipMockQ);
$('mock-end').addEventListener('click',()=>{if(confirm('End the exam now? Unanswered questions score zero.'))endMock();});
$('mock-review-btn').addEventListener('click',showMockReview);
$('mock-again').addEventListener('click',()=>startMock(mock.paper));
$('mock-back').addEventListener('click',resetMock);
window.addEventListener('beforeunload',e=>{if(mock.active){e.preventDefault();e.returnValue='';}});

// ---------------- Static content: tips, key facts, links ----------------
function renderStatic(){
  const tips=EXAM_TIPS.map(([ico,html])=>`<div class="tip-row"><span class="tip-ico" aria-hidden="true">${ico}</span><div>${html}</div></div>`).join('');
  $('mock-tips').innerHTML=tips;
  $('resource-tips').innerHTML=tips;
  if($('facts-list'))$('facts-list').innerHTML=FACTS.map(sec=>`<div class="fs"><h2>${sec.h}</h2><div class="formula-grid">${sec.cards.map(([n,v])=>`<div class="fc"><div class="fct">${n}</div>${v}</div>`).join('')}</div></div>`).join('');
  $('link-list').innerHTML=LINKS.map(([href,title,desc])=>`<a class="link-row" href="${esc(href)}" target="_blank" rel="noopener"><span><b>${title}</b><small>${desc}</small></span><svg class="ico"><use href="#i-external"/></svg></a>`).join('');
  $('about-text').innerHTML=ABOUT;
}

// ---------------- Progress ----------------
function renderProg(){
  rollDay();
  const st=S.stats,acc=st.answered?Math.round(st.correct/st.answered*100)+'%':'–';
  $('stats-grid').innerHTML=[
    [st.answered,'Questions answered'],[st.correct,'Correct'],[acc,'Accuracy'],
    [st.dayStreak||0,'Day streak'],[st.bestStreak,'Best run in a row'],[st.dailyCount+' / '+(S.settings.goal||10),'Today']
  ].map(([n,l])=>`<div class="stat"><div class="stat-num">${n}</div><div class="stat-lbl">${l}</div></div>`).join('');
  const rows=TOPICS.map(t=>{const ts=S.topicStats[t.id]||{correct:0,total:0};return {t,ts,pct:ts.total?Math.round(ts.correct/ts.total*100):null};});
  rows.sort((a,b)=>(a.pct===null)-(b.pct===null)||(a.pct??0)-(b.pct??0));
  const list=$('topic-prog');list.innerHTML='';
  rows.forEach(({t,ts,pct})=>{
    const r=document.createElement('div');r.className='prog-row '+accClass(pct??0,ts.total);
    r.innerHTML=`<div class="name">${esc(t.icon+' '+t.name)}<small>${ts.total?`${ts.correct}/${ts.total} correct · ${pct}%`:'Not started'}</small></div>
      <div class="bar"><div class="bar-fill" style="width:${pct??0}%"></div></div>
      <button class="btn btn-ghost">Practise</button>`;
    r.querySelector('button').addEventListener('click',()=>{setTopic(t.id);go('practice');});
    list.append(r);
  });
  const lb=$('leaderboard');
  if(S.timerScores.length){
    lb.innerHTML=[...S.timerScores].sort((a,b)=>b.score-a.score).slice(0,5).map((s,i)=>`<div class="list-row">
      <span class="rank ${i===0?'r1':''}">${i+1}</span><span class="grow">${s.secs/60}-minute challenge</span>
      <b>${s.score}</b><span class="muted small">${esc(s.date)}</span></div>`).join('');
  }else lb.innerHTML='<p class="empty">No scores yet — try the Timed challenge.</p>';
  $('mock-history').innerHTML=mockHistoryHTML(8);
}
function resetProg(){
  if(!confirm('Reset all progress? This cannot be undone.'))return;
  S.stats={answered:0,correct:0,streak:0,bestStreak:0,dailyCount:0,dailyDate:todayStr(),dayStreak:0,lastStudyDate:''};
  S.topicStats={};S.questionNum=1;S.timerScores=[];S.mockScores=[];
  save();renderProg();updateHeader();toast('Progress reset');
}
$('reset-prog').addEventListener('click',resetProg);

// ---------------- Notepad ----------------
let noteTimer;
$('notepad-text').addEventListener('input',e=>{
  S.notepadContent=e.target.value;$('note-status').textContent='Saving…';
  clearTimeout(noteTimer);noteTimer=setTimeout(()=>{save();$('note-status').textContent='Saved on this device';},400);
});
$('note-clear').addEventListener('click',()=>{if(confirm('Clear all notes?')){$('notepad-text').value='';S.notepadContent='';save();}});
$('note-copy').addEventListener('click',()=>{
  const txt=$('notepad-text').value;
  (navigator.clipboard?navigator.clipboard.writeText(txt):Promise.reject()).then(()=>toast('Notes copied'),()=>{$('notepad-text').select();toast('Press Ctrl+C to copy');});
});
$('note-download').addEventListener('click',()=>{
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([$('notepad-text').value],{type:'text/plain'}));
  a.download=META.slug+'-notes.txt';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
});

// ---------------- Settings ----------------
function greetingText(){
  return S.settings.name?`Hi ${S.settings.name} — ready for some Nat 5 ${META.subject}?`:'';
}
function setSeg(id,attr,val){$(id).querySelectorAll(`[data-${attr}]`).forEach(b=>b.setAttribute('aria-checked',b.dataset[attr]===String(val)));}
function applySettings(){
  const st=S.settings,root=document.documentElement;
  if(st.mode==='light'||st.mode==='dark')root.dataset.theme=st.mode;else delete root.dataset.theme;
  if(st.accent&&st.accent!=='saltire')root.dataset.accent=st.accent;else delete root.dataset.accent;
  setSeg('goal-seg','goal',st.goal||10);setSeg('mode-seg','mode',st.mode||'system');setSeg('accent-seg','accent',st.accent||'saltire');
  $('student-name').value=st.name||'';
  const gr=greetingText();$('greeting').textContent=gr;$('greeting').hidden=!gr;
  const meta=document.querySelector('meta[name="theme-color"]');
  meta.content=getComputedStyle(root).getPropertyValue('--bg').trim()||'#0065bd';
  updateHeader();
}
$('student-name').addEventListener('input',e=>{S.settings.name=e.target.value.trim();save();const gr=greetingText();$('greeting').textContent=gr;$('greeting').hidden=!gr;});
$('goal-seg').addEventListener('click',e=>{const b=e.target.closest('[data-goal]');if(!b)return;S.settings.goal=+b.dataset.goal;save();applySettings();});
$('mode-seg').addEventListener('click',e=>{const b=e.target.closest('[data-mode]');if(!b)return;S.settings.mode=b.dataset.mode;save();applySettings();});
$('accent-seg').addEventListener('click',e=>{const b=e.target.closest('[data-accent]');if(!b)return;S.settings.accent=b.dataset.accent;save();applySettings();});
matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change',applySettings);

// ---------------- PWA ----------------
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
}
const INSTALL_KEY=STORE+'_install_dismissed';
let deferredPrompt=null;
window.addEventListener('beforeinstallprompt',e=>{
  e.preventDefault();deferredPrompt=e;
  let dismissed=false;try{dismissed=localStorage.getItem(INSTALL_KEY)==='1';}catch(_){}
  if(!dismissed)setTimeout(()=>{$('install-banner').hidden=false;},30000);
});
$('install-btn').addEventListener('click',()=>{
  if(!deferredPrompt)return;
  deferredPrompt.prompt();deferredPrompt.userChoice.finally(()=>{deferredPrompt=null;$('install-banner').hidden=true;});
});
$('dismiss-install').addEventListener('click',()=>{$('install-banner').hidden=true;try{localStorage.setItem(INSTALL_KEY,'1');}catch(_){}});
(function(){
  const ua=navigator.userAgent;
  const iOS=/iPad|iPhone|iPod/.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  const standalone=navigator.standalone===true||matchMedia('(display-mode: standalone)').matches;
  let dismissed=false;try{dismissed=localStorage.getItem(INSTALL_KEY)==='1';}catch(_){}
  if(!iOS||standalone||dismissed)return;
  $('install-text').hidden=true;$('ios-text').hidden=false;
  $('install-btn').hidden=true;$('dismiss-install').textContent='Got it';
  setTimeout(()=>{$('install-banner').hidden=false;},20000);
})();

// ---------------- Init ----------------
fillTopicSelect($('topic-select'));
fillTopicSelect($('timer-topic'),{smart:false});
fillFCDecks();
renderWSList();renderStatic();loadFC();
rollDay();applySettings();save();
newQuestion();
route();
