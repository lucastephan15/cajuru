// Galeria por cômodo: cada card do alojamento abre as outras fotos do mesmo cômodo.
// Forma aprovada (D-60): o painel abre no lugar, logo abaixo dos cards, com abas por cômodo.
(function(){
const G={
 pat:{t:'Pátio',f:[['pat-1','Pátio cascalhado ao lado da estrada'],['pat-2','Os pátios em L, vistos de cima'],['pat-3','Pátio, alojamento e o bairro ao fundo'],['pat-4','Pátio retangular e a rua asfaltada']]},
 coz:{t:'Cozinha',f:[['coz-1','Cozinha industrial, azulejada, com bancadas'],['coz-2','Área de serviço com tanques'],['coz-3','Do salão, a porta para a cozinha']]},
 sal:{t:'Salão coberto',f:[['sal-1','Estrutura de madeira e piso de pedra'],['sal-2','O mesmo salão, visto do outro lado'],['sal-3','Quiosques ao lado do salão']]},
 qua:{t:'Quartos',f:[['qua-1','Quarto nº 10'],['qua-2','Quarto'],['qua-3','Quarto'],['qua-4','Cômodo com porta envidraçada'],['qua-5','Cômodo amplo com armários de aço'],['qua-6','Cômodo com acesso ao corredor'],['qua-7','Banheiro com box']]},
 casa:{t:'Casa principal',f:[['casa-1','Pavimento superior, janela em arco'],['casa-2','Fachada, vista do alto'],['casa-3','Frente da casa, com jardim'],['casa-4','Lateral, com a serra ao fundo']]}
};
const src=(k,th)=>`img/gal/${th?'t/':''}${k}.jpg`;
const figs=[...document.querySelectorAll('.swipe figure[data-gal]')];
const keys=figs.map(f=>f.dataset.gal).filter(k=>G[k]);
const X=(s,c)=>s.replace(/</g,'&lt;');
const ico={x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
 l:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
 r:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
 ph:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="14" height="12" rx="2"/><path d="M7 21h12a2 2 0 0 0 2-2V9"/><circle cx="8" cy="10" r="1.5"/><path d="M17 15l-4-4-7 6"/></svg>'};

const css=`
.swipe figure[data-gal]{cursor:pointer}
.swipe figure[data-gal] .gx-ph{position:relative;display:block}
.swipe figure[data-gal] .gx-ph img{transition:transform .5s cubic-bezier(.2,.7,.2,1),filter .3s}
.swipe figure[data-gal]:hover .gx-ph img{filter:brightness(1.06)}
.gx-n{position:absolute;right:10px;bottom:10px;display:flex;align-items:center;gap:6px;padding:6px 10px 6px 8px;border-radius:999px;background:rgba(14,31,24,.78);backdrop-filter:blur(6px);color:#fff;font:600 12px/1 "Instrument Sans",sans-serif;border:1px solid rgba(255,255,255,.25)}
.gx-n svg{width:16px;height:16px}
.swipe figure[data-gal]:focus-visible{outline:2px solid var(--sky);outline-offset:4px;border-radius:14px}
.swipe figure.gx-on .gx-ph img{outline:3px solid var(--sky);outline-offset:-3px}
.gx-btn{display:grid;place-items:center;width:44px;height:44px;border-radius:999px;border:1px solid rgba(255,255,255,.25);background:rgba(14,31,24,.6);color:#fff;cursor:pointer;backdrop-filter:blur(6px)}
.gx-btn svg{width:20px;height:20px}
.gx-btn:hover{background:rgba(168,208,245,.2)}
.gx-th{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none}
.gx-th::-webkit-scrollbar{display:none}
.gx-th button{flex:0 0 auto;width:64px;height:48px;padding:0;border:0;border-radius:8px;overflow:hidden;cursor:pointer;opacity:.5;outline:2px solid transparent;outline-offset:-2px;transition:opacity .2s}
.gx-th button img{width:100%;height:100%;object-fit:cover}
.gx-th button.on{opacity:1;outline-color:var(--sky)}
.gx-tabs{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none}
.gx-tabs::-webkit-scrollbar{display:none}
.gx-tabs button{flex:0 0 auto;font:600 13px "Instrument Sans",sans-serif;color:var(--txt2);background:none;border:1px solid var(--line);padding:7px 12px;border-radius:999px;cursor:pointer;white-space:nowrap}
.gx-tabs button.on{background:var(--sky);border-color:var(--sky);color:var(--mata3)}
.gx-tabs button small{font-weight:400;opacity:.75;margin-left:4px}

/* painel no lugar */
.gxB{max-width:var(--wrap);margin:0 auto;padding:0 20px;display:grid;grid-template-rows:0fr;transition:grid-template-rows .45s cubic-bezier(.2,.7,.2,1)}
.gxB.open{grid-template-rows:1fr}
.gxB>div{overflow:hidden;min-height:0}
.gxB .in{margin-top:16px;border:1px solid var(--line);border-radius:18px;background:rgba(18,42,32,.7);padding:14px}
.gxB .hd{display:flex;align-items:center;gap:10px;margin-bottom:12px}
.gxB .hd .gx-tabs{flex:1}
.gxB .hd .gx-btn{width:38px;height:38px;flex:0 0 auto}
.gxB .stage{position:relative;border-radius:12px;overflow:hidden;background:#0e1f18;aspect-ratio:4/3}
.gxB .stage img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;transition:opacity .25s}
.gxB .stage .gx-btn{position:absolute;top:50%;transform:translateY(-50%)}
.gxB .stage .p{left:10px}.gxB .stage .n{right:10px}
.gxB .meta{display:flex;justify-content:space-between;gap:12px;padding:10px 2px 10px;font-size:14px}
.gxB .meta span{color:var(--txt2);font-variant-numeric:tabular-nums;white-space:nowrap}
@media(min-width:900px){.gxB .body{display:grid;grid-template-columns:1fr 260px;gap:16px}.gxB .stage{aspect-ratio:16/10}.gxB .gx-th{flex-wrap:wrap;align-content:flex-start;overflow:visible}.gxB .gx-th button{width:78px;height:60px}.gxB .meta{grid-column:1}}

`;
document.head.insertAdjacentHTML('beforeend','<style>'+css+'</style>');

// badge "N fotos" em cada card
figs.forEach(f=>{const k=f.dataset.gal;if(!G[k])return;const img=f.querySelector('img');const w=document.createElement('span');w.className='gx-ph';img.replaceWith(w);w.appendChild(img);
 w.insertAdjacentHTML('beforeend',`<span class="gx-n">${ico.ph}${G[k].f.length} fotos</span>`);
 f.tabIndex=0;f.setAttribute('role','button');f.setAttribute('aria-label',`Ver as ${G[k].f.length} fotos: ${G[k].t}`);f.dataset.open=k;
 f.addEventListener('click',()=>open(k));f.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(k)}})});

const tabs=cur=>keys.map(k=>`<button data-k="${k}" class="${k===cur?'on':''}">${G[k].t}<small>${G[k].f.length}</small></button>`).join('');
const thumbs=(k,i)=>G[k].f.map(([s],j)=>`<button data-i="${j}" class="${j===i?'on':''}" aria-label="Foto ${j+1}"><img src="${src(s,1)}" alt="" loading="lazy"></button>`).join('');
let open=()=>{};

{
 const sw=figs[0]?.closest('.swipe');if(!sw)return;
 const el=document.createElement('div');el.className='gxB';
 el.innerHTML=`<div><div class="in"><div class="hd"><div class="gx-tabs"></div><button class="gx-btn x" aria-label="Fechar">${ico.x}</button></div><div class="body"><div><div class="stage"><img alt=""><button class="gx-btn p" aria-label="Anterior">${ico.l}</button><button class="gx-btn n" aria-label="Próxima">${ico.r}</button></div><div class="meta"><b></b><span></span></div></div><div class="gx-th"></div></div></div></div>`;
 sw.after(el);
 const im=el.querySelector('.stage img'),tb=el.querySelector('.gx-tabs'),th=el.querySelector('.gx-th'),cb=el.querySelector('.meta b'),cs=el.querySelector('.meta span');let k,i=0;
 const show=n=>{i=(n+G[k].f.length)%G[k].f.length;const[s,c]=G[k].f[i];im.src=src(s);im.alt=c;cb.textContent=c;cs.textContent=`${i+1} / ${G[k].f.length}`;th.querySelectorAll('button').forEach((b,j)=>b.classList.toggle('on',j===i))};
 const pick=kk=>{k=kk;tb.innerHTML=tabs(k);const ot=tb.querySelector('.on');if(ot)tb.scrollLeft=ot.offsetLeft-tb.clientWidth/2+ot.clientWidth/2;th.innerHTML=thumbs(k,0);figs.forEach(f=>f.classList.toggle('gx-on',f.dataset.gal===k));show(0)};
 open=kk=>{const was=el.classList.contains('open');if(was&&k===kk){close();return}pick(kk);el.classList.add('open');
  const f=figs.find(f=>f.dataset.gal===kk);f?.scrollIntoView({behavior:'smooth',block:'nearest',inline:'nearest'});
  setTimeout(()=>{const r=el.getBoundingClientRect();if(r.bottom>innerHeight)scrollBy({top:Math.min(r.top-70,r.bottom-innerHeight+16),behavior:'smooth'})},was?0:480)};
 const close=()=>{el.classList.remove('open');figs.forEach(f=>f.classList.remove('gx-on'))};
 el.querySelector('.x').onclick=close;el.querySelector('.p').onclick=()=>show(i-1);el.querySelector('.n').onclick=()=>show(i+1);
 tb.onclick=e=>{const b=e.target.closest('button');if(b)pick(b.dataset.k)};th.onclick=e=>{const b=e.target.closest('button');if(b)show(+b.dataset.i)};
 let x0=null;const st=el.querySelector('.stage');st.addEventListener('touchstart',e=>x0=e.touches[0].clientX,{passive:true});st.addEventListener('touchend',e=>{if(x0==null)return;const d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>40)show(i+(d<0?1:-1));x0=null});
}

window.__gxOpen=(k,i)=>open(k,i);
})();
