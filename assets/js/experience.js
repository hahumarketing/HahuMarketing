'use strict';
(()=>{

 const explorer=document.querySelector('.service-explorer');
 if(explorer){
  const choices=[...explorer.querySelectorAll('[data-service-choice]')];
  choices.forEach(choice=>choice.addEventListener('toggle',()=>{
   if(!choice.open)return;
   explorer.dataset.service=choice.dataset.serviceChoice;
   choices.forEach(other=>{if(other!==choice)other.open=false;});
   explorer.querySelectorAll('[data-service-scene]').forEach(scene=>{scene.hidden=scene.dataset.serviceScene!==choice.dataset.serviceChoice;});
  }));
 }
 const experience=document.querySelector('.experience');
 if(experience){const buttons=[...experience.querySelectorAll('[data-view-button]')];const captions={desktop:'A considered first impression. Built around your business.',mobile:'The same attention to detail. Made for the screen in your hand.',brand:'A recognizable identity. Wherever your customers find you.'};
 const select=b=>{experience.dataset.view=b.dataset.viewButton;buttons.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));document.querySelector('#experience-caption').textContent=captions[b.dataset.viewButton];};
 buttons.forEach((b,i)=>{b.addEventListener('click',()=>select(b));b.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%buttons.length;else if(e.key==='ArrowLeft')n=(i+buttons.length-1)%buttons.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=buttons.length-1;else return;e.preventDefault();buttons[n].focus();select(buttons[n]);});});
 }
 if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target);}}),{threshold:.08});document.querySelectorAll('.service-card,.why-points>div').forEach(el=>{el.classList.add('reveal-ready');observer.observe(el);});}
})();
