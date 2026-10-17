'use strict';
(()=>{

 const explorer=document.querySelector('.service-explorer');
 if(explorer){
  const choices=[...explorer.querySelectorAll('[data-service-choice]')];
  const mobileControls=document.createElement('div');
  mobileControls.className='mobile-service-controls';
  const pills=document.createElement('div');
  pills.className='mobile-service-pills';pills.setAttribute('role','group');pills.setAttribute('aria-label','Explore our services');
  const description=document.createElement('div');description.className='mobile-service-description';description.id='mobile-service-description';description.setAttribute('aria-live','polite');
  const mobileButtons=choices.map(choice=>{
   const button=document.createElement('button');button.type='button';button.setAttribute('aria-controls',description.id);
   const label=choice.querySelector('summary').childNodes[0].textContent.trim();
   button.innerHTML='<span aria-hidden="true">+</span>'+label;
   button.addEventListener('click',()=>{choice.open=true;syncMobile(choice);});
   pills.append(button);return button;
  });
  function syncMobile(choice){
   mobileButtons.forEach((button,i)=>{const selected=choices[i]===choice;button.setAttribute('aria-pressed',String(selected));button.querySelector('span').textContent=selected?'−':'+';});
   description.replaceChildren(choice.querySelector('.service-answer').cloneNode(true));
  }
  mobileControls.append(pills,description);explorer.append(mobileControls);explorer.classList.add('mobile-explorer-ready');
  syncMobile(choices.find(choice=>choice.open)||choices[0]);
  choices.forEach(choice=>choice.addEventListener('toggle',()=>{
   if(!choice.open)return;
   syncMobile(choice);
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
