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

noBtn.addEventListener('mouseover', () => {
    const min = 150;
    const max = 250;
    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;
    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;
    
    noBtn.style.transition = 'transform 0.3s ease';
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
    
    // Make YES button bigger each time
    yesScale += 0.15;
    yesBtn.style.transform = `scale(${yesScale})`;
});

// Mobile: NO button click also moves it
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const min = 150;
    const max = 250;
    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;
    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;
    
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
    
    yesScale += 0.2;
    yesBtn.style.transform = `scale(${yesScale})`;
});

// ===== YES BUTTON =====
yesBtn.addEventListener('click', () => {
    letterContainer.classList.add('hidden');
    wheelSection.classList.remove('hidden');
    setTimeout(() => {
        document.querySelector('#wheel-section .letter-window').classList.add('open');
    }, 50);
});

// ===== SECTION 1: FATE WHEEL (IMPROVED) =====
const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spin-btn');
const wheelResult = document.getElementById('wheel-result');

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
    const radius = 140;
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
        ctx.lineWidth = 4;
        ctx.stroke();

        // Draw text
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(i * sliceAngle + sliceAngle / 2 + currentRotation);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 18px Pixelify Sans';
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 4;
        ctx.fillText(option, radius / 1.6, 8);
        ctx.restore();
    });

    // Center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 25, 0, 2 * Math.PI);
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

    const extraSpins = 5 + Math.random() * 3; // 5-8 full rotations
    const randomStop = Math.random() * (2 * Math.PI); // Random position
    const targetRotation = currentRotation + (extraSpins * 2 * Math.PI) + randomStop;
    const duration = 4000; // 4 seconds
    const startTime = Date.now();
    const startRotation = currentRotation;

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Improved easing (ease-out-cubic for smoother deceleration)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        currentRotation = startRotation + (targetRotation - startRotation) * easeOut;

        drawWheel();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Calculate result
            const normalizedRotation = (2 * Math.PI - (currentRotation % (2 * Math.PI))) % (2 * Math.PI);
            const sliceAngle = (2 * Math.PI) / options.length;
            const selectedIndex = Math.floor(normalizedRotation / sliceAngle) % options.length;
            
            wheelResult.textContent = `✨ Looks like fate has spoken: ${options[selectedIndex]} ✨`;
            wheelResult.style.fontSize = '20px';
            
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

// ===== SECTION 2: LOVE METER SLIDER (FIXED) =====
const loveSlider = document.getElementById('love-slider');
const sliderValue = document.getElementById('slider-value');
const sliderMessage = document.getElementById('slider-message');
const heartsDisplay = document.getElementById('hearts');

let sliderLocked = false;
let lockedValue = 0;

loveSlider.addEventListener('input', function() {
    if (sliderLocked) {
        // Keep showing the locked value, don't let it change
        this.value = lockedValue;
        return;
    }

    const value = parseInt(this.value);
    sliderValue.textContent = value + '%';

    // Update hearts display
    const heartCount = Math.floor(value / 10);
    heartsDisplay.textContent = '💕'.repeat(heartCount);

    if (value < 70) {
        // Shake and bounce back
        loveSlider.classList.add('shake');
        setTimeout(() => {
            loveSlider.classList.remove('shake');
            if (!sliderLocked) {
                loveSlider.value = 0;
                sliderValue.textContent = '0%';
                heartsDisplay.textContent = '';
            }
        }, 300);
    } else if (value >= 70 && !sliderLocked) {
        // Lock the slider at current value
        sliderLocked = true;
        lockedValue = value;
        loveSlider.disabled = true;
        
        // Keep showing the actual percentage
        sliderValue.textContent = value + '%';
        sliderMessage.textContent = "That's more than enough 😏";
        
        // Hearts explosion
        heartsDisplay.textContent = '💖💕💗💓💝💘💞💟❤️❣️';
        
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

// ===== SECTION 4: CHOICE CARDS (LDR) =====
const dateChoices = document.querySelectorAll('.date-choice');

dateChoices.forEach(choice => {
    choice.addEventListener('click', function() {
        this.style.transform = 'scale(1.15)';
        this.style.transition = 'transform 0.3s ease';
        
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
            sendStatus.textContent = '💖 Message sent! You made me the happiest! 💖';
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
        sendStatus.textContent = '❌ Oops! Something went wrong. Try again?';
        sendStatus.style.color = '#d63031';
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send 💖';
    }
});
