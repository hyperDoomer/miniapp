(() => {
    const bot = document.querySelector('.deepseek');
    const botImg = bot.querySelector('img');
    const arena = document.getElementById('arena');
    const speed = 3;
    const botWidth = 96;
    const botHeight = 96;
    
    // Enhanced particle system
    const particles = [];
    const effectsContainer = document.createElement('div');
    effectsContainer.style.position = 'absolute';
    effectsContainer.style.width = '0';
    effectsContainer.style.height = '0';
    effectsContainer.style.overflow = 'visible';
    effectsContainer.style.pointerEvents = 'none';
    arena.appendChild(effectsContainer);

    // Movement tracking
    let x = parseInt(bot.style.left) || arena.clientWidth - botWidth;
    let y = parseInt(bot.style.bottom) || 50;
    let targetX = null;
    let targetY = null;
    let lastX = x;
    let lastY = y;
    let isCollecting = false;
    let lastTrailTime = 0;

    function createParticle(x, y, color, size, velocity) {
        const p = document.createElement('div');
        p.style.position = 'absolute';
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.backgroundColor = color;
        p.style.borderRadius = '50%';
        p.style.left = `${x}px`;
        p.style.bottom = `${y}px`;
        effectsContainer.appendChild(p);
        return {
            element: p,
            x: 0,
            y: 0,
            vx: (Math.random() - 0.5) * velocity,
            vy: Math.random() * velocity,
            life: 30 + Math.random() * 30,
            size: size
        };
    }

    function emitTrail() {
        const now = Date.now();
        if (now - lastTrailTime > 50) { // Emit every 50ms
            const botCenterX = x + botWidth/2;
            const botCenterY = y + botHeight/2;
            
            // Blue energy trail (3 particles)
            for (let i = 0; i < 3; i++) {
                particles.push(createParticle(
                    botCenterX + (Math.random() - 0.5) * 20,
                    botCenterY - 20,
                    `rgba(94, 179, 246, ${0.4 + Math.random() * 0.3})`,
                    3 + Math.random() * 3,
                    0.5
                ));
            }
            lastTrailTime = now;
        }
    }

    function emitSparks() {
        const botCenterX = x + botWidth/2;
        const botCenterY = y + botHeight/2;
        
        // Spark burst (15 particles)
        for (let i = 0; i < 15; i++) {
            particles.push(createParticle(
                botCenterX,
                botCenterY,
                `hsl(${Math.random() * 60 + 190}, 80%, 60%)`,
                4 + Math.random() * 4,
                3
            ));
        }
    }

    function updateParticles() {
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            
            // Fade and shrink
            p.element.style.opacity = p.life / 60;
            p.element.style.transform = `scale(${p.life/60})`;
            p.element.style.left = `${parseInt(p.element.style.left) + p.vx}px`;
            p.element.style.bottom = `${parseInt(p.element.style.bottom) + p.vy}px`;
            
            if (p.life <= 0) {
                p.element.remove();
                particles.splice(i, 1);
            }
        }
    }

    function getExactMovement(dx, dy) {
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= speed) {
            if (!isCollecting && distance < 50) {
                isCollecting = true;
                emitSparks();
            }
            return [dx, dy];
        }
        isCollecting = false;
        const scale = speed / distance;
        return [dx * scale, dy * scale];
    }

    function moveTowardsTarget() {
        const botCenterX = x + botWidth/2;
        const botCenterY = y + botHeight/2;
        const dx = targetX - botCenterX;
        const dy = targetY - botCenterY;
        
        const [moveX, moveY] = getExactMovement(dx, dy);
        x += moveX;
        y += moveY;

        // Face direction
        const targetFlip = dx < 0 ? 'scaleX(-1)' : 'scaleX(1)';
        if (!botImg.style.transform.includes(targetFlip)) {
            botImg.style.transform = targetFlip;
        }

        // Emit trail when moving
        if (moveX !== 0 || moveY !== 0) {
            emitTrail();
        }
    }

    function checkForRuby() {
        const ruby = document.getElementById('ruby');
        if (ruby.style.display === 'block') {
            const rubyRect = ruby.getBoundingClientRect();
            const arenaRect = arena.getBoundingClientRect();
            
            targetX = rubyRect.left - arenaRect.left + rubyRect.width/2;
            targetY = arenaRect.bottom - rubyRect.bottom + rubyRect.height/2;
        } else {
            targetX = null;
            targetY = null;
        }
    }

    function patrol() {
        const arenaWidth = arena.clientWidth;
        const arenaHeight = arena.clientHeight;
        
        if (x <= 0) {
            x = 0;
            botImg.style.transform = 'scaleX(1)';
        } else if (x >= arenaWidth - botWidth) {
            x = arenaWidth - botWidth;
            botImg.style.transform = 'scaleX(-1)';
        }
        
        if (y <= 0) y = 0;
        else if (y >= arenaHeight - botHeight) y = arenaHeight - botHeight;
        
        const direction = botImg.style.transform.includes('-1') ? -1 : 1;
        x += speed * direction;
        
        // Emit occasional trail even when patrolling
        if (Date.now() % 200 < 10) {
            emitTrail();
        }
    }

    function animate() {
        checkForRuby();
        
        if (targetX !== null && targetY !== null) {
            moveTowardsTarget();
        } else {
            patrol();
        }
        
        bot.style.left = `${Math.round(x)}px`;
        bot.style.bottom = `${Math.round(y)}px`;
        
        updateParticles();
        requestAnimationFrame(animate);
    }

    // Initialize
    botImg.style.transform = 'scaleX(-1)';
    animate();
})();