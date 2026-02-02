// ===== ELEMENTS =====
const envelopeContainer = document.getElementById('envelope-container');
const letterContainer = document.getElementById('letter-container');
const yesBtn = document.getElementById('yes-btn');
const wheelSection = document.getElementById('wheel-section');
const sliderSection = document.getElementById('slider-section');
const scrollSection = document.getElementById('scroll-section');
const choiceSection = document.getElementById('choice-section');
const messageSection = document.getElementById('message-section');
const sadOverlay = document.getElementById('sad-overlay');

// ===== ENVELOPE CLICK =====
envelopeContainer.addEventListener('click', () => {
    envelopeContainer.style.display = 'none';
    letterContainer.classList.remove('hidden');
});

// ===== YES BUTTON =====
yesBtn.addEventListener('click', () => {
    letterContainer.style.display = 'none';
    wheelSection.classList.remove('hidden');
    window.scrollTo(0, 0);
});

// ===== SECTION 1: FATE WHEEL =====
const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spin-btn');
const wheelResult = document.getElementById('wheel-result');

const options = [
    "Definitely 💖",
    "Obviously 😌",
    "100% Yes 😍",
    "Spin Again 😉"
];

const colors = ['#ff6b9d', '#feca57', '#48dbfb', '#ff9ff3'];

let currentRotation = 0;
let isSpinning = false;

function drawWheel() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;
    const sliceAngle = (2 * Math.PI) / options.length;

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
        ctx.font = 'bold 16px Pixelify Sans';
        ctx.fillText(option, radius / 1.5, 10);
        ctx.restore();
    });

    // Center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#ff1493';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Pointer
    ctx.beginPath();
    ctx.moveTo(centerX + radius + 10, centerY);
    ctx.lineTo(centerX + radius - 20, centerY - 15);
    ctx.lineTo(centerX + radius - 20, centerY + 15);
    ctx.closePath();
    ctx.fillStyle = '#ff1493';
    ctx.fill();
}

function spinWheel() {
    if (isSpinning) return;
    
    isSpinning = true;
    spinBtn.disabled = true;
    wheelResult.textContent = '';

    const spins = 5 + Math.random() * 3;
    const finalRotation = currentRotation + spins * 2 * Math.PI;
    const duration = 3000;
    const startTime = Date.now();

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        currentRotation = currentRotation + (finalRotation - currentRotation) * easeOut / 10;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawWheel();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Calculate result
            const normalizedRotation = currentRotation % (2 * Math.PI);
            const sliceAngle = (2 * Math.PI) / options.length;
            const selectedIndex = Math.floor((2 * Math.PI - normalizedRotation) / sliceAngle) % options.length;
            
            wheelResult.textContent = `✨ ${options[selectedIndex]} ✨`;
            wheelResult.style.animation = 'glow 1s ease-in-out';
            
            setTimeout(() => {
                wheelSection.style.display = 'none';
                sliderSection.classList.remove('hidden');
                window.scrollTo(0, 0);
            }, 2000);
        }
    }

    animate();
}

spinBtn.addEventListener('click', spinWheel);
drawWheel();

// ===== SECTION 2: LOVE METER SLIDER =====
const loveSlider = document.getElementById('love-slider');
const sliderValue = document.getElementById('slider-value');
const sliderMessage = document.getElementById('slider-message');
const heartsContainer = document.getElementById('hearts-container');

let sliderLocked = false;

loveSlider.addEventListener('input', function() {
    const value = this.value;
    sliderValue.textContent = value + '%';

    // Create floating hearts
    if (Math.random() > 0.7) {
        createHeart(value);
    }

    if (!sliderLocked && value < 70) {
        // Shake animation
        loveSlider.classList.add('shake');
        setTimeout(() => {
            loveSlider.classList.remove('shake');
            loveSlider.value = 0;
            sliderValue.textContent = '0%';
        }, 300);
    } else if (value >= 70 && !sliderLocked) {
        sliderLocked = true;
        loveSlider.disabled = true;
        sliderMessage.textContent = "That's more than enough 😏";
        
        // Heart burst animation
        for (let i = 0; i < 20; i++) {
            setTimeout(() => createHeart(Math.random() * 100), i * 100);
        }

        setTimeout(() => {
            sliderSection.style.display = 'none';
            scrollSection.classList.remove('hidden');
            window.scrollTo(0, 0);
        }, 3000);
    }
});

function createHeart(position) {
    const heart = document.createElement('div');
    heart.textContent = '💕';
    heart.className = 'floating-heart';
    heart.style.left = position + '%';
    heart.style.top = '50%';
    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// ===== SECTION 3: SCROLL TO AGREE =====
const scrollMessages = document.querySelectorAll('.scroll-item');
const agreeBtn = document.getElementById('agree-btn');

function handleScroll() {
    const scrollContainer = document.querySelector('.scroll-container');
    const scrollPosition = scrollContainer.scrollTop;
    const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
    const scrollPercent = (scrollPosition / scrollHeight) * 100;

    scrollMessages.forEach((item, index) => {
        const threshold = (index / (scrollMessages.length - 1)) * 80;
        if (scrollPercent >= threshold) {
            item.classList.add('visible');
        }
    });

    if (scrollPercent > 85) {
        agreeBtn.classList.add('show');
    }
}

document.querySelector('.scroll-container').addEventListener('scroll', handleScroll);

agreeBtn.addEventListener('click', () => {
    scrollSection.style.display = 'none';
    choiceSection.classList.remove('hidden');
    window.scrollTo(0, 0);
});

// ===== SECTION 4: CHOICE CARDS =====
const dateCards = document.querySelectorAll('.date-card');

dateCards.forEach(card => {
    card.addEventListener('click', function() {
        const choice = this.dataset.choice;
        
        // Smooth transition
        this.style.transform = 'scale(1.2)';
        this.style.transition = 'transform 0.3s ease';

        setTimeout(() => {
            choiceSection.style.display = 'none';
            messageSection.classList.remove('hidden');
            window.scrollTo(0, 0);
        }, 500);
    });
});

// ===== FINAL: MESSAGE INPUT & EMAIL =====
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
        // Using EmailJS (free email service)
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                service_id: 'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
                template_id: 'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
                user_id: 'YOUR_PUBLIC_KEY', // Replace with your EmailJS public key
                template_params: {
                    from_name: 'Datto',
                    message: message,
                    to_email: 'YOUR_EMAIL@example.com' // Replace with your email
                }
            })
        });

        if (response.ok) {
            sendStatus.textContent = '💖 Message sent! You made me the happiest! 💖';
            sendStatus.style.color = '#00b894';
            messageInput.value = '';
            
            // Show final animation
            setTimeout(() => {
                document.body.innerHTML = `
                    <div style="min-height: 100vh; display: flex; justify-content: center; align-items: center; flex-direction: column; background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%); padding: 20px; text-align: center;">
                        <h1 style="font-size: 48px; color: white; margin-bottom: 30px; font-family: 'Pixelify Sans', sans-serif;">
                            You're the best, Datto! 💕
                        </h1>
                        <img src="https://media.giphy.com/media/UuB5lh1bL1Dl6svihe/giphy.gif" style="width: 300px; border-radius: 20px; margin-bottom: 20px;">
                        <p style="font-size: 24px; color: white; font-family: 'Pixelify Sans', sans-serif;">
                            Can't wait for our Valentine's date! 🌹
                        </p>
                    </div>
                `;
            }, 2000);
        } else {
            throw new Error('Failed to send');
        }
    } catch (error) {
        sendStatus.textContent = '❌ Oops! Something went wrong. Try again?';
        sendStatus.style.color = '#d63031';
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send to My Heart 💖';
    }
});

// ===== SAD OVERLAY (if needed) =====
function showSadOverlay() {
    sadOverlay.classList.remove('hidden');
    setTimeout(() => {
        sadOverlay.classList.add('hidden');
    }, 2000);
}

// You can call showSadOverlay() anywhere you want to show the sad animation
