const toggle=document.querySelector('.menu-toggle');const links=document.querySelector('.nav-links');if(toggle&&links){toggle.addEventListener('click',()=>{const opened=links.classList.toggle('open');toggle.setAttribute('aria-expanded',String(opened))});links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');toggle.setAttribute('aria-expanded','false')}))}

const year=document.getElementById("year");if(year)year.textContent=new Date().getFullYear();

// Galería ampliable de Enarakabi
(()=>{const dialog=document.getElementById('photo-dialog');if(!dialog)return;const tiles=[...document.querySelectorAll('[data-gallery-index]')];const img=dialog.querySelector('img');const counter=dialog.querySelector('.photo-counter');let current=0;const show=i=>{current=(i+tiles.length)%tiles.length;const source=tiles[current].querySelector('img');img.src=source.src;img.alt=source.alt;counter.textContent=`${current+1} / ${tiles.length}`};tiles.forEach((tile,i)=>tile.addEventListener('click',()=>{show(i);dialog.showModal()}));dialog.querySelector('.photo-close').addEventListener('click',()=>dialog.close());dialog.querySelector('.photo-prev').addEventListener('click',()=>show(current-1));dialog.querySelector('.photo-next').addEventListener('click',()=>show(current+1));dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')show(current-1);if(e.key==='ArrowRight')show(current+1)});dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()})})();

// Cabeceras de proyectos: autoplay, flechas, teclado y gesto táctil.
(()=>{
 const hero=document.querySelector('.enarakabi-hero');if(!hero)return;
 const slides=[...hero.querySelectorAll('.enarakabi-hero-slide')];
 const marks=[...hero.querySelectorAll('.enarakabi-hero-progress span')];
 if(slides.length<2)return;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 let active=slides.findIndex(s=>s.classList.contains('is-active'));if(active<0)active=0;
 let timer=null,touchX=null,touchY=null;
 const show=(index)=>{
  slides[active].classList.remove('is-active');marks[active]?.classList.remove('is-active');
  active=(index+slides.length)%slides.length;
  slides[active].classList.add('is-active');marks[active]?.classList.add('is-active');
 };
 const stop=()=>{if(timer!==null){clearInterval(timer);timer=null}};
 const start=()=>{if(!reduced&&!document.hidden&&timer===null)timer=setInterval(()=>show(active+1),5000)};
 const navigate=(step)=>{show(active+step);stop();start()};
 hero.querySelector('.hero-slide-prev')?.addEventListener('click',()=>navigate(-1));
 hero.querySelector('.hero-slide-next')?.addEventListener('click',()=>navigate(1));
 hero.addEventListener('touchstart',e=>{if(e.touches.length!==1)return;touchX=e.touches[0].clientX;touchY=e.touches[0].clientY},{passive:true});
 hero.addEventListener('touchend',e=>{if(touchX===null||!e.changedTouches.length)return;
  const dx=e.changedTouches[0].clientX-touchX,dy=e.changedTouches[0].clientY-touchY;
  touchX=null;touchY=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.3)navigate(dx<0?1:-1);
 },{passive:true});
 hero.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();navigate(-1)}else if(e.key==='ArrowRight'){e.preventDefault();navigate(1)}});
 document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
 start();
})();
