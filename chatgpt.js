(function () {
    const bot = document.querySelector('.bot.chatgpt');
    const ruby = document.getElementById('ruby');
    const speed = 3;
    const botWidth = 96;
    const botHeight = 96;
    let scale = 1;
    let growing = true;
    let direction = 1;
    let tick = 0;

    function updateTransform() {
        // Vertical bobbing using sine wave
        const bobOffset = Math.sin(tick / 20) * 5;

        // Rotation rocking
        const rotation = Math.sin(tick / 30) * 2; // degrees

        // Apply combined transform
        bot.style.transform = `translateY(${bobOffset}px) rotateZ(${rotation}deg) scale(${direction}, ${scale})`;

        // Glow flicker effect
        const glow = 8 + Math.sin(tick / 10) * 4;
        bot.style.filter = `drop-shadow(0 0 ${glow}px limegreen)`;
    }

    function breathe() {
        tick++;

        scale += growing ? 0.002 : -0.002;
        if (scale >= 1.03) growing = false;
        if (scale <= 0.97) growing = true;

        updateTransform();
        requestAnimationFrame(breathe);
    }

    function moveToRuby() {
        const rubyVisible = ruby.style.display !== 'none';
        const botLeft = parseFloat(bot.style.left || 0);
        const botBottom = parseFloat(bot.style.bottom || 0);

        if (rubyVisible) {
            const rubyLeft = parseFloat(ruby.style.left || 0);
            const rubyBottom = parseFloat(ruby.style.bottom || 0);

            let dx = rubyLeft - botLeft;
            let dy = rubyBottom - botBottom;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 1) {
                dx = (dx / distance) * speed;
                dy = (dy / distance) * speed;

                bot.style.left = `${botLeft + dx}px`;
                bot.style.bottom = `${botBottom + dy}px`;

                direction = dx >= 0 ? 1 : -1;
                updateTransform();
            }

            const closeEnough =
                Math.abs(botLeft - rubyLeft) < botWidth / 2 &&
                Math.abs(botBottom - rubyBottom) < botHeight / 2;

            if (closeEnough) {
                ruby.style.display = 'none';
            }
        }

        requestAnimationFrame(moveToRuby);
    }

    requestAnimationFrame(breathe);
    requestAnimationFrame(moveToRuby);
})();
