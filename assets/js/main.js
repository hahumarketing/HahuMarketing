'use strict';
(() => {
 const c=window.SITE_CONFIG || {}; const $=(s)=>document.querySelector(s);
 document.querySelectorAll('[data-brand]').forEach(el=>el.textContent=c.brand||'Web Studio');
 document.title=document.title.replace('Abay Web Studio',c.brand||'Web Studio');
 document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
 if(c.ownerName) document.querySelectorAll('[data-owner]').forEach(el=>el.textContent=c.ownerName);
 const emailValid=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email||'');
 const wa=(c.whatsapp||'').replace(/\D/g,'');const waValid=/^\d{8,15}$/.test(wa);
 const message="Hello hahumarketing, I would like to discuss website design or digital marketing for my business.";
 document.querySelectorAll('[data-email]').forEach(el=>{if(emailValid){el.href='mailto:'+c.email;el.textContent=c.email;}});
 document.querySelectorAll('[data-phone]').forEach(el=>{if(c.phone){el.href='tel:'+c.phone.replace(/[^\d+]/g,'');el.textContent=c.phone;}});
 document.querySelectorAll('[data-whatsapp]').forEach(el=>{if(waValid){el.href='https://wa.me/'+wa+'?text='+encodeURIComponent(message);el.target='_blank';el.rel='noopener noreferrer';}else{el.href='contact.html';if(!el.classList.contains('floating'))el.textContent='Discuss your website ↗';}});
 document.querySelectorAll('[data-price]').forEach(el=>{const v=c.prices?.[el.dataset.price];if(Number.isFinite(v))el.textContent='ETB '+v.toLocaleString('en-US');});
 document.querySelectorAll('[data-maintenance]').forEach(el=>{const v=c.maintenance?.[el.dataset.maintenance];if(Number.isFinite(v))el.textContent='ETB '+v.toLocaleString('en-US');});
 const menu=$('.menu'),nav=$('#navigation');menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){menu.setAttribute('aria-expanded','false');nav.classList.remove('open');menu.focus();}});
 document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll('[data-category]').forEach(card=>card.hidden=button.dataset.filter!=='All'&&card.dataset.category!==button.dataset.filter);}));
 const clock=$('#ethiopia-time');if(clock){const update=()=>clock.textContent=new Intl.DateTimeFormat('en',{timeZone:'Africa/Addis_Ababa',hour:'numeric',minute:'2-digit',timeZoneName:'short'}).format(new Date());update();setInterval(update,60000);}
 const form=$('#inquiry-form');if(!form)return;
 const params=new URLSearchParams(location.search);const pkg=params.get('package');if(['starter','business','advanced'].includes(pkg))form.elements.package.value=pkg;
 const service=params.get('service');if([...form.elements.service.options].some(o=>o.value===service))form.elements.service.value=service;
 if(pkg&&!service)form.elements.service.value='business';
 const ready=/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(c.formEndpoint||'');
 const status=$('#form-status'),submit=$('#submit-button');
 if(!ready){submit.disabled=true;submit.textContent='Online delivery awaiting setup';}else{submit.disabled=false;submit.textContent='Send project inquiry ↗';form.action=c.formEndpoint;form.method='POST';$('#setup-notice').hidden=true;}
 const brief=()=>{const data=new FormData(form);return 'HAHUMARKETING PROJECT INQUIRY\n\n'+['name','email','phone','business','service','package','budget','timeline','preferred','message'].map(k=>k.toUpperCase()+': '+(data.get(k)||'Not specified')).join('\n\n');};
 $('#download-inquiry').addEventListener('click',()=>{if(!form.reportValidity())return;const url=URL.createObjectURL(new Blob([brief()],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='hahu-marketing-project-brief.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='Your project brief was downloaded. It has not been sent.';});
 const waButton=$('#whatsapp-inquiry');if(waValid){waButton.hidden=false;waButton.addEventListener('click',()=>{if(!form.reportValidity())return;window.open('https://wa.me/'+wa+'?text='+encodeURIComponent(brief()),'_blank','noopener,noreferrer');status.textContent='Your brief has been opened in WhatsApp. Review it and press Send there.';});}
 form.addEventListener('submit',async e=>{e.preventDefault();if(!ready){status.textContent='Inquiry delivery is not connected. Download your brief instead.';return;}if(!form.reportValidity())return;if(form.elements._gotcha.value)return;const data=new FormData(form);if(data.get('preferred')!=='Email'&&!data.get('phone')?.trim()){status.textContent='Please add a phone number for your preferred contact method.';form.elements.phone.focus();return;}submit.disabled=true;submit.textContent='Sending…';status.textContent='Sending your inquiry…';const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),20000);try{const response=await fetch(c.formEndpoint,{method:'POST',body:data,headers:{Accept:'application/json'},signal:controller.signal});if(!response.ok)throw new Error('Submission not accepted');status.textContent='Your inquiry was accepted by the form service. Thank you for sharing your project.';form.reset();}catch(error){status.textContent='We could not confirm delivery. Your details are still here. Please try again or download your brief. If the request timed out, check before resending to avoid duplicates.';}finally{clearTimeout(timer);submit.disabled=false;submit.textContent='Send project inquiry ↗';}});
})();
