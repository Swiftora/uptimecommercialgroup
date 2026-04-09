// Nav scroll
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('up',scrollY>50),{passive:true});

// Reveal on scroll
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('v');obs.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.r').forEach(el=>obs.observe(el));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const t=document.querySelector(a.getAttribute('href'));
  if(t){e.preventDefault();window.scrollTo({top:t.getBoundingClientRect().top+scrollY-76,behavior:'smooth'})}
}));

// Custom cursor
const c=document.querySelector('.cursor'),cr=document.querySelector('.cursor-ring');
if(window.matchMedia('(hover:hover)').matches){
  document.addEventListener('mousemove',e=>{c.style.left=e.clientX+'px';c.style.top=e.clientY+'px';cr.style.left=e.clientX+'px';cr.style.top=e.clientY+'px'});
}
