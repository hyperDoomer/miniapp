const bot = document.querySelector('.chatgpt');
const ruby = document.getElementById('ruby');

// Инициализируем позицию из стилей
let posX = parseFloat(getComputedStyle(bot).left);
let posY = parseFloat(getComputedStyle(bot).bottom);

function moveToRuby() {
  if (!ruby || ruby.style.display !== 'block') return;

  const rubyRect = ruby.getBoundingClientRect();
  if (rubyRect.width === 0 || rubyRect.height === 0) return;

  const arena = document.getElementById('arena');
  const arenaRect = arena.getBoundingClientRect();

  const rubyX = rubyRect.left - arenaRect.left;
  const rubyY = rubyRect.top - arenaRect.top;

  const botHeight = 96;
  const arenaHeight = 400;
  let currentY = arenaHeight - posY - botHeight;

  const dx = rubyX - posX;
  const dy = rubyY - currentY;

  const distance = Math.hypot(dx, dy);
  if (distance < 2) return;

  const speed = 10;
  const angle = Math.atan2(dy, dx);
  posX += Math.cos(angle) * speed;
  currentY += Math.sin(angle) * speed;

  posY = arenaHeight - currentY - botHeight;

  bot.style.left = `${posX}px`;
  bot.style.bottom = `${posY}px`;
}

setInterval(moveToRuby, 30);
