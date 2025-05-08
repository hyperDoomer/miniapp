let scoreChatGPT = 0;
let scoreDeepSeek = 0;

function spawnRuby() {
  const arena = document.getElementById('arena');
  const ruby = document.getElementById('ruby');

  const arenaWidth = arena.clientWidth;
  const arenaHeight = arena.clientHeight;

  const x = Math.floor(Math.random() * (arenaWidth - 32));
  const y = Math.floor(Math.random() * (arenaHeight - 32));

  ruby.style.left = `${x}px`;
  ruby.style.top = `${y}px`;
  ruby.style.display = 'block';
}

function hideRuby() {
  const ruby = document.getElementById('ruby');
  ruby.style.display = 'none';
}

function updateScore() {
  document.getElementById('score-chatgpt').textContent = `ChatGPT: ${scoreChatGPT}`;
  document.getElementById('score-deepseek').textContent = `DeepSeek: ${scoreDeepSeek}`;
}

function checkCollection() {
  const ruby = document.getElementById('ruby');
  if (ruby.style.display === 'none') return;

  const rRect = ruby.getBoundingClientRect();
  const chatgpt = document.querySelector('.chatgpt img').getBoundingClientRect();
  const deepseek = document.querySelector('.deepseek img').getBoundingClientRect();

  const threshold = 79;

  // ✅ Получаем центры
  const rubyCenterX = rRect.x + rRect.width / 2;
  const rubyCenterY = rRect.y + rRect.height / 2;

  const chatgptCenterX = chatgpt.x + chatgpt.width / 2;
  const chatgptCenterY = chatgpt.y + chatgpt.height / 2;

  const deepseekCenterX = deepseek.x + deepseek.width / 2;
  const deepseekCenterY = deepseek.y + deepseek.height / 2;

  const chatgptDist = Math.hypot(rubyCenterX - chatgptCenterX, rubyCenterY - chatgptCenterY);
  const deepseekDist = Math.hypot(rubyCenterX - deepseekCenterX, rubyCenterY - deepseekCenterY);

  if (chatgptDist < threshold) {
    scoreChatGPT++;
    updateScore();
    hideRuby();
  } else if (deepseekDist < threshold) {
    scoreDeepSeek++;
    updateScore();
    hideRuby();
  }
}


window.addEventListener('DOMContentLoaded', () => {
  updateScore();
  setInterval(checkCollection, 200);
});
