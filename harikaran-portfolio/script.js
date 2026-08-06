// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('is-open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('is-open'));
});

// Background neural-network node canvas
const canvas = document.getElementById('nodeCanvas');
const ctx = canvas.getContext('2d');
let w, h, nodes;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function resize(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const NODE_COUNT = Math.max(24, Math.floor((window.innerWidth * window.innerHeight) / 45000));
nodes = Array.from({ length: NODE_COUNT }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  vx: (Math.random() - 0.5) * 0.25,
  vy: (Math.random() - 0.5) * 0.25,
  r: Math.random() * 1.6 + 0.6
}));

const LINK_DIST = 150;

function draw(){
  ctx.clearRect(0, 0, w, h);

  for(const n of nodes){
    if(!reduceMotion){
      n.x += n.vx;
      n.y += n.vy;
      if(n.x < 0 || n.x > w) n.vx *= -1;
      if(n.y < 0 || n.y > h) n.vy *= -1;
    }
  }

  for(let i = 0; i < nodes.length; i++){
    for(let j = i + 1; j < nodes.length; j++){
      const a = nodes[i], b = nodes[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if(dist < LINK_DIST){
        const alpha = (1 - dist / LINK_DIST) * 0.18;
        ctx.strokeStyle = `rgba(108,99,255,${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  for(const n of nodes){
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,182,39,0.55)';
    ctx.fill();
  }

  if(!reduceMotion) requestAnimationFrame(draw);
}
draw();

// Nav background solidify on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if(window.scrollY > 40){
    nav.style.background = 'rgba(10,14,23,0.85)';
  } else {
    nav.style.background = 'linear-gradient(180deg, rgba(10,14,23,0.9), rgba(10,14,23,0))';
  }
});
