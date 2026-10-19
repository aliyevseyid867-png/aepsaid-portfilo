const intro = document.getElementById('intro');
const site = document.getElementById('site');
function enterSite(){intro.classList.add('is-gone');site.setAttribute('aria-hidden','false');document.body.classList.add('entered');setTimeout(()=>{intro.style.display='none';},1100);}
document.getElementById('enterButton').addEventListener('click',enterSite);
document.getElementById('skipIntro').addEventListener('click',enterSite);
// Generate subtle particles without external assets.
const dustLayer=document.getElementById('dustLayer');
for(let i=0;i<38;i++){const d=document.createElement('i');d.className='dust';d.style.left=(Math.random()*100)+'%';d.style.top=(Math.random()*100)+'%';d.style.animationDuration=(9+Math.random()*17)+'s';d.style.animationDelay=(-Math.random()*22)+'s';d.style.opacity=(.15+Math.random()*.55).toFixed(2);dustLayer.appendChild(d);}
// Set the year and support the optional reduced-motion browser preference.
document.getElementById('year').textContent=new Date().getFullYear();
// Mobile navigation.
const menuToggle=document.getElementById('menuToggle'),nav=document.querySelector('.main-nav');
menuToggle.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
// Gentle 3D tilt on pointer devices; disabled for touch screens.
if(window.matchMedia('(hover:hover) and (pointer:fine)').matches){document.querySelectorAll('.portfolio-card').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;card.style.transform=`translateY(-7px) rotateX(${y*-4}deg) rotateY(${x*5}deg)`;});card.addEventListener('pointerleave',()=>card.style.removeProperty('transform'));});}
// Interactive diary: open the dialog, then swing the cover open like a real book.
const diaryModal=document.getElementById('diaryModal');
const diaryCover=document.getElementById('diaryCover');
const diaryBookScene=document.getElementById('diaryBookScene');
function openDiary(){
  diaryModal.classList.remove('is-closing');
  diaryCover.classList.remove('is-open');
  if(!diaryModal.open) diaryModal.showModal();
  requestAnimationFrame(()=>setTimeout(()=>diaryCover.classList.add('is-open'),120));
}
function closeDiary(){
  if(!diaryModal.open) return;
  diaryModal.classList.add('is-closing');
  diaryCover.classList.remove('is-open');
  setTimeout(()=>{diaryModal.close();diaryModal.classList.remove('is-closing');},420);
}
document.getElementById('diaryButton').addEventListener('click',openDiary);
diaryCover.addEventListener('click',()=>diaryCover.classList.toggle('is-open'));
document.getElementById('closeDiary').addEventListener('click',closeDiary);
diaryModal.addEventListener('click',e=>{if(e.target===diaryModal)closeDiary();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&diaryModal.open)closeDiary();});
// Preview modal: placeholders are intentionally user-replaceable, not AI-generated pictures.
const previews={
  edits:{title:'EDITS',kicker:'01 / VIDEO EDITS',text:'Your best edits, collected in one place.',image:'assets/edits-preview.jpg'},
  cc:{title:'COLOR CORRECTIONS',kicker:'02 / CC',text:'Your color grades, before-and-after frames and coloring previews.',image:'assets/cc-preview.jpg'},
  projects:{title:'AFTER EFFECTS PROJECTS',kicker:'03 / PROJECTS',text:'Project files, presets and breakdowns.',image:'assets/projects-preview.jpg'},
  pack:{title:'EDIT PACK',kicker:'04 / RESOURCES',text:'Your resources, overlays and editing assets.',image:'assets/edit-pack-preview.jpg'}
};
let currentPreview='edits';const previewModal=document.getElementById('previewModal');
function openPreview(key){currentPreview=key;const p=previews[key]||previews.edits;document.getElementById('previewKicker').textContent=p.kicker;document.getElementById('previewTitle').textContent=p.title;document.getElementById('previewText').textContent=p.text;document.getElementById('previewPlaceholder').src=p.image;document.getElementById('previewPlaceholder').alt=p.title+' preview';if(!previewModal.open)previewModal.showModal();}
document.querySelectorAll('[data-preview]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();openPreview(el.dataset.preview);}));
document.getElementById('closePreview').addEventListener('click',()=>previewModal.close());
document.getElementById('nextPreview').addEventListener('click',()=>{const keys=Object.keys(previews);openPreview(keys[(keys.indexOf(currentPreview)+1)%keys.length]);});
// Candle can be dragged horizontally with mouse or touch. Its light follows the flame.
const candleTrack=document.getElementById('candleTrack'),flame=candleTrack.querySelector('.candle-flame'),wax=candleTrack.querySelector('.candle-wax'),holder=candleTrack.querySelector('.candle-holder');let dragging=false;
function moveCandle(clientX){const r=candleTrack.getBoundingClientRect();const x=Math.max(8,Math.min(r.width-38,clientX-r.left-8));wax.style.marginLeft=x+'px';holder.style.marginLeft=(x-20)+'px';flame.style.left=(x+3)+'px';candleTrack.style.paddingLeft='0';}
candleTrack.addEventListener('pointerdown',e=>{dragging=true;candleTrack.classList.add('dragging');candleTrack.setPointerCapture(e.pointerId);moveCandle(e.clientX);});
candleTrack.addEventListener('pointermove',e=>{if(dragging)moveCandle(e.clientX);});
function stopCandle(){dragging=false;candleTrack.classList.remove('dragging');}
candleTrack.addEventListener('pointerup',stopCandle);candleTrack.addEventListener('pointercancel',stopCandle);
// Magic toggle softly dims decorative particles/runes without disabling the raven or background.
document.getElementById('magicToggle').addEventListener('click',()=>{document.body.classList.toggle('magic-muted');const muted=document.body.classList.contains('magic-muted');document.querySelector('.rune-field').style.opacity=muted?'.15':'1';dustLayer.style.opacity=muted?'.15':'1';});
// Replace these example destinations with your actual TikTok and Discord URLs in this file.
const SOCIAL_LINKS={tiktok:'https://www.tiktok.com/@YOUR_USERNAME',discord:'https://discord.com/users/YOUR_USER_ID'};
document.querySelectorAll('[data-social]').forEach(a=>{const key=a.dataset.social;a.href=SOCIAL_LINKS[key];a.target='_blank';a.rel='noopener noreferrer';a.addEventListener('click',e=>{if(a.href.includes('YOUR_USERNAME')||a.href.includes('YOUR_USER_ID')){e.preventDefault();alert('Replace the example '+key+' link in script.js with your own link.');}});});
