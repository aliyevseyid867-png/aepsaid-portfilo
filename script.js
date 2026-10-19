/* PERSONALIZE YOUR SITE HERE: replace the example links and text with your own. */
const LINKS = {
  tiktok: 'https://www.tiktok.com/@YOUR_USERNAME',
  discord: 'https://discord.com/users/YOUR_DISCORD_ID'
};

// Update social links across the page in one place.
document.querySelectorAll('a[href="https://www.tiktok.com/"], a[href="https://discord.com/"]').forEach(link => {
  if (link.href.includes('tiktok.com')) link.href = LINKS.tiktok;
  if (link.href.includes('discord.com')) link.href = LINKS.discord;
});

const intro = document.getElementById('intro');
const site = document.getElementById('site');
function enterSite(){
  intro.classList.add('leaving');
  site.classList.add('visible');
  document.body.classList.add('entered');
  setTimeout(() => { intro.style.display = 'none'; }, 1100);
}
document.getElementById('enterButton').addEventListener('click', enterSite);
document.getElementById('skipIntro').addEventListener('click', enterSite);

// Navigation highlight and mobile menu.
const nav = document.querySelector('.main-nav');
document.getElementById('mobileMenu').addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.querySelectorAll('a').forEach(item => item.classList.remove('active'));
  a.classList.add('active');
}));

// Subtle atmosphere toggle (disables the floating runes and ambient blue glow).
document.getElementById('soundToggle').addEventListener('click', e => {
  document.body.classList.toggle('calm-mode');
  e.currentTarget.style.color = document.body.classList.contains('calm-mode') ? '#8b93a2' : '#dfe8ff';
});

// Diary cover opens into a readable page.
const diary = document.getElementById('interactiveDiary');
document.getElementById('openDiary').addEventListener('click', () => diary.classList.add('open'));
document.getElementById('closeDiary').addEventListener('click', () => diary.classList.remove('open'));

// Preview collections: change image filenames here when you add your own work.
const collections = {
  edits: ['assets/edits.jpg','assets/edits-2.jpg','assets/edits-3.jpg'],
  cc: ['assets/cc.jpg','assets/cc-2.jpg','assets/cc-3.jpg'],
  projects: ['assets/projects.jpg','assets/projects-2.jpg','assets/projects-3.jpg'],
  pack: ['assets/edit-pack.jpg','assets/edit-pack-2.jpg','assets/edit-pack-3.jpg']
};
const previewGrid = document.getElementById('previewGrid');
function showCollection(name){
  previewGrid.innerHTML = '';
  collections[name].forEach((src,i) => {
    const button = document.createElement('button'); button.className = 'preview-item'; button.dataset.full = src;
    const img = document.createElement('img'); img.src = src; img.alt = `${name} preview ${i+1}`;
    img.onerror = () => { img.style.opacity = '.15'; };
    const label = document.createElement('span'); label.textContent = `PREVIEW 0${i+1} ↗`;
    button.append(img,label); previewGrid.append(button);
  });
}
document.querySelectorAll('.preview-tab').forEach(tab => tab.addEventListener('click', () => {
  document.querySelectorAll('.preview-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active'); showCollection(tab.dataset.tab);
}));

// Card click scrolls to the matching preview collection.
document.querySelectorAll('.category-card').forEach(card => card.addEventListener('click', e => {
  e.preventDefault(); const name = card.dataset.preview;
  document.querySelectorAll('.preview-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === name));
  showCollection(name); document.getElementById('preview-section').scrollIntoView({behavior:'smooth'});
}));

// Preview lightbox.
const lightbox = document.getElementById('lightbox'); const lightboxImage = document.getElementById('lightboxImage');
previewGrid.addEventListener('click', e => {
  const item = e.target.closest('.preview-item'); if (!item) return;
  lightboxImage.src = item.dataset.full; lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden','false');
});
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');lightboxImage.src='';}
document.getElementById('closeLightbox').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => {if(e.target===lightbox) closeLightbox();});
document.addEventListener('keydown', e => {if(e.key==='Escape'){closeLightbox();if(diary.classList.contains('open'))diary.classList.remove('open');}});

// Candle is draggable with mouse or touch; its glow reveals the hidden runes.
const scene = document.getElementById('candleScene'); const candle = document.getElementById('candle'); let dragging = false;
function moveCandle(clientX){
  const rect = scene.getBoundingClientRect(); const x = Math.max(25,Math.min(rect.width-25,clientX-rect.left));
  const percent = x/rect.width*100; candle.style.left = `${percent}%`; scene.style.setProperty('--light-x',`${percent}%`); candle.setAttribute('aria-valuenow',Math.round(percent));
}
candle.addEventListener('pointerdown', e => {dragging=true;candle.setPointerCapture(e.pointerId);moveCandle(e.clientX);});
candle.addEventListener('pointermove', e => {if(dragging)moveCandle(e.clientX);});
candle.addEventListener('pointerup', () => dragging=false); candle.addEventListener('pointercancel',()=>dragging=false);
candle.addEventListener('keydown', e => {if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();const r=scene.getBoundingClientRect();const current=parseFloat(candle.style.left)||50;const next=Math.max(5,Math.min(95,current+(e.key==='ArrowRight'?5:-5)));candle.style.left=`${next}%`;scene.style.setProperty('--light-x',`${next}%`);candle.setAttribute('aria-valuenow',next);}});

document.getElementById('year').textContent = new Date().getFullYear();
