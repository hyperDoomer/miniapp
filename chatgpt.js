const chatgpt = document.querySelector('.chatgpt');

function breathe(bot, amplitude = 10, duration = 1000) {
  let direction = 1;
  setInterval(() => {
    bot.style.transform = `translateY(${direction * -amplitude}px)`;
    direction *= -1;
  }, duration);
}

breathe(chatgpt);
