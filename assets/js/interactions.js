'use strict';
(()=>{
 const toggle=document.querySelector('.chat-toggle'),panel=document.querySelector('#chat-panel'),close=document.querySelector('.chat-close'),message=document.querySelector('#chat-message'),send=document.querySelector('#chat-send'),note=document.querySelector('#chat-note');
 const wa=(window.SITE_CONFIG?.whatsapp||'').replace(/\D/g,'');const valid=/^\d{8,15}$/.test(wa);
 function updateChat(){if(valid){send.href='https://wa.me/'+wa+'?text='+encodeURIComponent(message.value.trim()||'Hello, I would like to discuss a project with hahumarketing.');send.target='_blank';send.rel='noopener noreferrer';send.textContent='Continue on WhatsApp ↗';note.textContent='Opens WhatsApp. Review your message and press Send there.';}else{send.href='contact.html';send.textContent='Continue to inquiry ↗';}}
 function shut(){panel.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.focus();}
 toggle.addEventListener('click',()=>{const open=panel.hidden;panel.hidden=!open;toggle.setAttribute('aria-expanded',String(open));if(open)close.focus();});close.addEventListener('click',shut);
 document.querySelectorAll('[data-chat]').forEach(b=>b.addEventListener('click',()=>{message.value=b.dataset.chat;updateChat();message.focus();}));message.addEventListener('input',updateChat);
 send.addEventListener('click',()=>{if(!valid&&message.value.trim()){try{sessionStorage.setItem('hahu-project-message',message.value.trim());}catch{}}});updateChat();
 const form=document.querySelector('#inquiry-form');if(form){try{const text=sessionStorage.getItem('hahu-project-message');if(text){form.elements.message.value=text;sessionStorage.removeItem('hahu-project-message');}}catch{}}
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden)shut();});
 document.addEventListener('click',e=>{if(!panel.hidden&&!panel.contains(e.target)&&!toggle.contains(e.target)){panel.hidden=true;toggle.setAttribute('aria-expanded','false');}});
 document.querySelectorAll('[data-project]').forEach(b=>b.addEventListener('click',()=>document.querySelector('#project-'+b.dataset.project)?.showModal()));
 document.querySelectorAll('.project-dialog').forEach(dialog=>{dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});});
})();
