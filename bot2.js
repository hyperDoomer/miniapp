const bot2 = document.querySelector('.bot2');

function patrol(bot, distance = 100, duration = 2000) {
  let position = 0;
  let direction = 1;

  setInterval(() => {
    position += direction * distance;
    bot.style.transform = `translateX(${position}px)`;
    direction *= -1;
  }, duration);
}

patrol(bot2);
