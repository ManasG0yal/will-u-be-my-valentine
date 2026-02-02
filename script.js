// ===== ELEMENTS =====
const envelopeContainer = document.getElementById('envelope-container');
const letterContainer = document.getElementById('letter-container');
const letterWindow = document.querySelector('.letter-window');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const wheelSection = document.getElementById('wheel-section');
const sliderSection = document.getElementById('slider-section');
const scrollSection = document.getElementById('scroll-section');
const choiceSection = document.getElementById('choice-section');
const messageSection = document.getElementById('message-section');

// ===== ENVELOPE CLICK =====
envelopeContainer.addEventListener('click', () => {
    envelopeContainer.style.display = 'none';
    letterContainer.classList.remove('hidden');
    setTimeout(() => {
        letterWindow.classList.add('open');
    }, 50);
});

// ===== NO BUTTON - MOVES AWAY =====
let yesScale = 1;

function moveNoButton() {
    const min = 100;
    const max = 200;
    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;
    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;
    
    noBtn.style.transition = 'transform 0.3s ease';
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
    
    // Make YES button bigger each time
    yesScale += 0.15;
    yesBtn.style.transform = `scale(${yesScale})`;
}

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Touch support for mobile
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

// ===== YES BUTTON =====
yesBtn.addEventListener('click', () => {
    letterContainer.classList.add('hidden');
    wheelSection.classList.remove('hidden');
    setTimeout(() => {
        document.querySelector('#wheel-section .letter-window').classList.add('open');
    }, 50);
});

// ===== SECTION 1: FATE WHEEL =====
const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spin-btn');
const wheelResult = document.getElementById('wheel-result');

// Make canvas responsive
function resizeCanvas() {
    const size = Math.min(320, window.innerWidth * 0.85, window.innerHeight * 0.4);
    canvas.width = size;
    canvas.height = size;
    drawWheel();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const options = [
    "Definitely 💖",
    "Obviously 😌",
    "100% Yes 😍",
    "Of Course! 💕"
];

const colors = ['#ff6b9d', '#feca57', '#48dbfb', '#ff9ff3'];

let currentRotation = 0;
let isSpinning = false;

function drawWheel() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = (canvas.width / 2) - 10;
    const sliceAngle = (2 * Math.PI) / options.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    options.forEach((option, i) => {
        // Draw slice
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, i * sliceAngle + currentRotation, (i + 1) * sliceAngle + currentRotation);
        ctx.lineTo(centerX, centerY);
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw text
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(i * sliceAngle + sliceAngle / 2 + currentRotation);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        const fontSize = Math.max(14, canvas.width / 20);
        ctx.font = `bold ${fontSize}px Pixelify Sans`;
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 4;
        ctx.fillText(option, radius / 1.6, 8);
        ctx.restore();
    });

    // Center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#ff1493';
    ctx.lineWidth = 4;
    ctx.stroke();
}

function spinWheel() {
    if (isSpinning) return;
    
    isSpinning = true;
    spinBtn.disabled = true;
    wheelResult.textContent = '';

    const extraSpins = 5 + Math.random() * 3;
    const randomStop = Math.random() * (2 * Math.PI);
    const targetRotation = currentRotation + (extraSpins * 2 * Math.PI) + randomStop;
    const duration = 4000;
    const startTime = Date.now();
    const startRotation = currentRotation;

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOut = 1 - Math.pow(1 - progress, 3);
        currentRotation = startRotation + (targetRotation - startRotation) * easeOut;

        drawWheel();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            const normalizedRotation = (2 * Math.PI - (currentRotation % (2 * Math.PI))) % (2 * Math.PI);
            const sliceAngle = (2 * Math.PI) / options.length;
            const selectedIndex = Math.floor(normalizedRotation / sliceAngle) % options.length;
            
            wheelResult.textContent = `✨ ${options[selectedIndex]} ✨`;
            
            setTimeout(() => {
                wheelSection.classList.add('hidden');
                sliderSection.classList.remove('hidden');
                setTimeout(() => {
                    document.querySelector('#slider-section .letter-window').classList.add('open');
                }, 50);
            }, 2500);
            
            isSpinning = false;
            spinBtn.disabled = false;
        }
    }

    animate();
}

spinBtn.addEventListener('click', spinWheel);
drawWheel();

// ===== SECTION 2: LOVE METER SLIDER (SIMPLIFIED) =====
const loveSlider = document.getElementById('love-slider');
const sliderValue = document.getElementById('slider-value');
const sliderMessage = document.getElementById('slider-message');
const heartsDisplay = document.getElementById('hearts');

let sliderLocked = false;
let finalValue = 0;

loveSlider.addEventListener('input', function() {
    if (sliderLocked) {
        return;
    }

    const value = parseInt(this.value);
    
    // Always show the current value
    sliderValue.textContent = value + '%';

    // Update hearts
    const heartCount = Math.floor(value / 10);
    heartsDisplay.textContent = '💕'.repeat(heartCount);

    if (value < 70) {
        // Shake and reset
        this.classList.add('shake');
        setTimeout(() => {
            this.classList.remove('shake');
            if (!sliderLocked) {
                this.value = 0;
                sliderValue.textContent = '0%';
                heartsDisplay.textContent = '';
            }
        }, 300);
    } else if (value >= 70) {
        // Lock it!
        sliderLocked = true;
        finalValue = value;
        this.disabled = true;
        
        // Keep showing the final value
        sliderValue.textContent = finalValue + '%';
        sliderMessage.textContent = "That's more than enough 😏";
        heartsDisplay.textContent = '💖💕💗💓💝💘💞💟';
        
        setTimeout(() => {
            sliderSection.classList.add('hidden');
            scrollSection.classList.remove('hidden');
            setTimeout(() => {
                document.querySelector('#scroll-section .letter-window').classList.add('open');
            }, 50);
        }, 2500);
    }
});

// ===== SECTION 3: SCROLL TO AGREE =====
const scrollContent = document.getElementById('scroll-content');
const scrollMessages = document.querySelectorAll('.scroll-msg');
const scrollFinal = document.querySelector('.scroll-msg-final');
const agreeBtn = document.getElementById('agree-btn');

function handleScroll() {
    const scrollTop = scrollContent.scrollTop;
    const scrollHeight = scrollContent.scrollHeight - scrollContent.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;

    scrollMessages.forEach((msg, index) => {
        const threshold = (index / (scrollMessages.length - 1)) * 70;
        if (scrollPercent >= threshold) {
            msg.classList.add('visible');
        }
    });

    if (scrollPercent > 80) {
        scrollFinal.classList.add('show');
    }
}

scrollContent.addEventListener('scroll', handleScroll);

agreeBtn.addEventListener('click', () => {
    scrollSection.classList.add('hidden');
    choiceSection.classList.remove('hidden');
    setTimeout(() => {
        document.querySelector('#choice-section .letter-window').classList.add('open');
    }, 50);
});

// ===== SECTION 4: CHOICE CARDS =====
const dateChoices = document.querySelectorAll('.date-choice');

dateChoices.forEach(choice => {
    choice.addEventListener('click', function() {
        this.style.transform = 'scale(1.15)';
        
        setTimeout(() => {
            choiceSection.classList.add('hidden');
            messageSection.classList.remove('hidden');
            setTimeout(() => {
                document.querySelector('#message-section .letter-window').classList.add('open');
            }, 50);
        }, 500);
    });
});

// ===== FINAL: MESSAGE & EMAIL =====
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const sendStatus = document.getElementById('send-status');

sendBtn.addEventListener('click', async function() {
    const message = messageInput.value.trim();
    
    if (!message) {
        sendStatus.textContent = 'Please write something! 💕';
        sendStatus.style.color = '#ff6b9d';
        return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending... 💌';

    try {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                service_id: 'YOUR_SERVICE_ID',
                template_id: 'YOUR_TEMPLATE_ID',
                user_id: 'YOUR_PUBLIC_KEY',
                template_params: {
                    from_name: 'Datto',
                    message: message,
                    to_email: 'YOUR_EMAIL@example.com'
                }
            })
        });

        if (response.ok) {
            sendStatus.textContent = '💖 Message sent! 💖';
            sendStatus.style.color = '#00b894';
            messageInput.value = '';
            
            setTimeout(() => {
                messageSection.classList.add('hidden');
                document.getElementById('success-screen').classList.remove('hidden');
                setTimeout(() => {
                    document.querySelector('#success-screen .letter-window').classList.add('open');
                }, 50);
            }, 2000);
        } else {
            throw new Error('Failed to send');
        }
    } catch (error) {
        sendStatus.textContent = '❌ Try again?';
        sendStatus.style.color = '#d63031';
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send 💖';
    }
});
