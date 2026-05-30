const canvas = document.getElementById('breathingCanvas');
const ctx = canvas.getContext('2d');
const btnToggle = document.getElementById('btnToggle');
const statusText = document.getElementById('statusText');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;

const MIN_RADIUS = 30;
const MAX_RADIUS = 80;

// Settings (4-7-8) in milliseconds
const T_INHALE = 4000;
const T_HOLD = 7000;
const T_EXHALE = 8000;

let currentPhase = 'idle'; // idle, inhale, hold, exhale
let phaseStartTime = 0;
let currentRadius = MIN_RADIUS;
let animationFrameId;

function getColorPrimary() {
    return getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#6B8062';
}

function getColorStart() {
    return getComputedStyle(document.documentElement).getPropertyValue('--gradientStart').trim() || '#E2E8F0';
}

function drawBubble(radius) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    
    const primaryColor = getColorPrimary();
    const startColor = getColorStart();
    
    // Create soft gradient for bubble
    const grad = ctx.createRadialGradient(CENTER_X, CENTER_Y, radius * 0.2, CENTER_X, CENTER_Y, radius);
    grad.addColorStop(0, primaryColor);
    grad.addColorStop(1, startColor);
    
    ctx.beginPath();
    ctx.arc(CENTER_X, CENTER_Y, radius, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    
    // Glassy stroke
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();
}

function animate(timestamp) {
    if (currentPhase === 'idle') {
        drawBubble(MIN_RADIUS);
        return;
    }

    if (!phaseStartTime) phaseStartTime = timestamp;
    const elapsed = timestamp - phaseStartTime;
    
    let progress = 0;

    switch(currentPhase) {
        case 'inhale':
            progress = Math.min(elapsed / T_INHALE, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            currentRadius = MIN_RADIUS + (MAX_RADIUS - MIN_RADIUS) * easeOut;
            
            if (progress >= 1) {
                currentPhase = 'hold';
                phaseStartTime = timestamp;
                statusText.innerText = 'Hold...';
            }
            break;
            
        case 'hold':
            progress = Math.min(elapsed / T_HOLD, 1);
            currentRadius = MAX_RADIUS;
            
            if (progress >= 1) {
                currentPhase = 'exhale';
                phaseStartTime = timestamp;
                statusText.innerText = 'Exhale...';
            }
            break;
            
        case 'exhale':
            progress = Math.min(elapsed / T_EXHALE, 1);
            // Ease in cubic
            const easeIn = progress * progress * progress;
            currentRadius = MAX_RADIUS - (MAX_RADIUS - MIN_RADIUS) * easeIn;
            
            if (progress >= 1) {
                currentPhase = 'inhale';
                phaseStartTime = timestamp;
                statusText.innerText = 'Inhale...';
            }
            break;
    }
    
    drawBubble(currentRadius);
    animationFrameId = requestAnimationFrame(animate);
}

btnToggle.addEventListener('click', () => {
    if (currentPhase === 'idle') {
        currentPhase = 'inhale';
        phaseStartTime = 0;
        btnToggle.innerText = 'END SESSION';
        statusText.innerText = 'Inhale...';
        animationFrameId = requestAnimationFrame(animate);
    } else {
        currentPhase = 'idle';
        btnToggle.innerText = 'BEGIN SESSION';
        statusText.innerText = 'Ready';
        cancelAnimationFrame(animationFrameId);
        drawBubble(MIN_RADIUS);
    }
});

// Initial draw
drawBubble(MIN_RADIUS);
statusText.innerText = 'Ready';
