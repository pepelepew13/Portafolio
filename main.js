// Navegación suave para anclas
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    if(id && id !== '#'){
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({behavior:'smooth', block:'start'});
    }
  })
});

// Tabs
const tabs = document.querySelectorAll('.tab');
const panes = document.querySelectorAll('.tabpanes .pane');
if(tabs.length){
  tabs.forEach(t=>{
    t.addEventListener('click', ()=>{
      tabs.forEach(x=>x.classList.remove('active'));
      panes.forEach(p=>p.classList.remove('active'));
      t.classList.add('active');
      document.getElementById(t.dataset.pane)?.classList.add('active');
    });
  });
}

// TOC activo según scroll
const toc = document.querySelectorAll('.toc a');
const ids = ['#intro','#pl','#modelo','#algebraico','#simplex','#ejercicios','#conclusion'];
const sections = ids.map(id => document.querySelector(id)).filter(Boolean);
const onScroll = ()=>{
  const y = window.scrollY + window.innerHeight/2;
  let active = 0;
  sections.forEach((s,i)=>{ if(y >= s.offsetTop) active = i; });
  toc.forEach((a,i)=> a.classList.toggle('active', i===active));
};
window.addEventListener('scroll', onScroll); onScroll();

// Botón volver arriba
const toTop = document.getElementById('toTop');
if(toTop){
  window.addEventListener('scroll', ()=>{
    toTop.classList.toggle('show', window.scrollY > 600);
  });
  toTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
}

// Efecto reveal para .card
const reveal = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){ en.target.style.animationPlayState = 'running'; reveal.unobserve(en.target); }
  })
}, {threshold:.16});

document.querySelectorAll('.card').forEach(el=>{
  el.style.animationPlayState = 'paused';
  reveal.observe(el);
});