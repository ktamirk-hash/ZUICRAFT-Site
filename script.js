document.addEventListener('DOMContentLoaded', () => {

  // Год в футере
  document.getElementById('year').textContent = new Date().getFullYear();

  // Анимация скриншотов
  const imgs = document.querySelectorAll('.full-gallery img');
  imgs.forEach((img, idx) => { setTimeout(()=>img.classList.add('loaded'), idx*150); });

  // Частицы
  const container = document.querySelector('.particles');
  const count = Math.min(36, Math.floor(window.innerWidth/40));
  for(let i=0;i<count;i++){
    const el=document.createElement('div'); el.className='particle';
    const size=6+Math.random()*18; el.style.width=size+'px'; el.style.height=size+'px';
    el.style.left=Math.random()*100+'%'; el.style.top=Math.random()*100+'%';
    el.style.opacity=0.3+Math.random()*0.7; container.appendChild(el);
    (function animateNode(node){
      const dur=6000+Math.random()*10000;
      const dx=(Math.random()-0.5)*50; const dy=(Math.random()-0.5)*30;
      node.animate([{transform:'translate3d(0,0,0)',opacity:node.style.opacity},{transform:`translate3d(${dx}px,${dy}px,0)`,opacity:0.1}],{duration:dur,direction:'alternate',iterations:Infinity,easing:'ease-in-out'});
    })(el);
  }

  // Блоки на фоне
  const blockContainer = document.querySelector('.block-bg');
  const cols = Math.floor(window.innerWidth / 40);
  const rows = Math.floor(window.innerHeight / 40);
  for(let i=0;i<cols*rows/2;i++){
    const block = document.createElement('div');
    const size = 20 + Math.random()*30;
    block.style.width = size+'px'; block.style.height = size+'px';
    block.style.left = Math.random()*100+'%'; block.style.top = Math.random()*100+'%';
    block.style.opacity = 0.2 + Math.random()*0.6;
    const duration = 4 + Math.random()*6;
    block.style.animationDuration = duration+'s';
    blockContainer.appendChild(block);
  }

  // Мини-галерея Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('img');
  const galleryLinks = Array.from(document.querySelectorAll('.full-gallery a'));
  let currentIndex = 0;

  function openLightbox(index){
    currentIndex = index;
    lightboxImg.src = galleryLinks[currentIndex].href;
    lightbox.style.display = 'flex';
  }
  function closeLightbox(){ lightbox.style.display = 'none'; }
  function showNext(){ currentIndex = (currentIndex + 1) % galleryLinks.length; lightboxImg.src = galleryLinks[currentIndex].href; }
  function showPrev(){ currentIndex = (currentIndex - 1 + galleryLinks.length) % galleryLinks.length; lightboxImg.src = galleryLinks[currentIndex].href; }

  galleryLinks.forEach((a, idx) => {
    a.addEventListener('click', e => { e.preventDefault(); openLightbox(idx); });
  });

  lightbox.addEventListener('click', e => { if(e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', e => {
    if(lightbox.style.display==='flex'){
      if(e.key==='Escape') closeLightbox();
      if(e.key==='ArrowRight') showNext();
      if(e.key==='ArrowLeft') showPrev();
    }
  });

});
