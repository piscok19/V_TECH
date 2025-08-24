(function(){
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", initial);
  const btn = document.querySelector('#theme-toggle');
  const label = document.querySelector('#theme-label');
  function updateLabel(){ label.textContent = root.getAttribute('data-theme') === 'light' ? '🌞' : '🌙'; }
  btn?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateLabel();
  });
  updateLabel();
})();

const WA_NUMBER = "6281358903616";
function enc(t){ return encodeURIComponent(t).replace(/%20/g, '+'); }
function openWhatsApp(service){
  const base = `https://wa.me/${WA_NUMBER}`;
  const msg = `Halo V Tech 👋, saya ingin konsultasi/booking layanan: ${service}.`;
  const url = `${base}?text=${enc(msg)}`;
  window.open(url, "_blank", "noopener");
}
const modal = document.querySelector('#modal');
const modService = document.querySelector('#mod-service');
const modMsg = document.querySelector('#mod-msg');
const modSend = document.querySelector('#mod-send');
const modClose = document.querySelector('#mod-close');
function openModal(service){
  modal.classList.add('open');
  modService.textContent = service;
  modMsg.value = `Halo V Tech 👋,\nSaya ingin menanyakan layanan ${service}.\nKebutuhan saya: ...\nLokasi: ...\nWaktu yang diinginkan: ...`;
  modSend.onclick = () => {
    const text = modMsg.value.trim();
    const url = `https://wa.me/${WA_NUMBER}?text=${enc(text)}`;
    window.open(url, "_blank", "noopener");
    modal.classList.remove('open');
  };
}
modClose?.addEventListener('click', () => modal.classList.remove('open'));
modal?.addEventListener('click', (e) => { if(e.target === modal) modal.classList.remove('open'); });
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-service]').forEach(el => {
    el.addEventListener('click', () => openModal(el.getAttribute('data-service')));
  });
});