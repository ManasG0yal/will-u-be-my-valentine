// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const wheelSection = document.getElementById("wheel-section");
const sliderSection = document.getElementById("slider-section");
const scrollSection = document.getElementById("scroll-section");
const choiceSection = document.getElementById("choice-section");
const messageSection = document.getElementById("message-section");
const finalScreen = document.getElementById("final-screen");

const noBtn = document.querySelector(".no-btn");
const yesBtn = document.getElementById("yes-btn");

// Envelope click
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";
    setTimeout(() => {
        document.querySelector(".letter-window").classList.add("open");
    }, 50);
});

// NO button moves
noBtn.addEventListener("mouseover", () => {
    const distance = 200;
    const angle = Math.random() * Math.PI * 2;
    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// YES button
yesBtn.addEventListener("click", () => {
    letter.style.display = "none";
    wheelSection.style.display = "flex";
    setTimeout(() => {
        wheelSection.querySelector(".letter-window").classList.add("open");
    }, 50);
});

// ===== WHEEL =====
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin-btn");
const wheelResult = document.getElementById("wheel-result");

const options = ["Definitely 💖", "Obviously 😌", "100% Yes 😍", "Of Course! 💕"];
const colors = ["#ff6b9d", "#feca57", "#48dbfb", "#ff9ff3"];

let currentAngle = 0;

function drawWheel() {
    const centerX = 150;
    const centerY = 150;
    const radius = 140;
    const sliceAngle = (2 * Math.PI) / 4;

    ctx.clearRect(0, 0, 300, 300);

    for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, i * sliceAngle + currentAngle, (i + 1) * sliceAngle + currentAngle);
        ctx.lineTo(centerX, centerY);
        ctx.fillStyle = colors[i];
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(i * sliceAngle + sliceAngle / 2 + currentAngle);
        ctx.textAlign = "center";
        ctx.fillStyle = "#fff";
        ctx.font = "bold 16px Pixelify Sans";
        ctx.fillText(options[i], radius / 1.5, 5);
        ctx.restore();
    }

    // Center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.strokeStyle = "#ff1493";
    ctx.lineWidth = 3;
    ctx.stroke();
}

drawWheel();

spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    const spinAmount = 5 * 2 * Math.PI + Math.random() * 2 * Math.PI;
    const duration = 3000;
    const startAngle = currentAngle;
    const startTime = Date.now();

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        currentAngle = startAngle + spinAmount * easeOut;
        drawWheel();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            wheelResult.textContent = "✨ Fate says YES! ✨";
            setTimeout(() => {
                wheelSection.style.display = "none";
                sliderSection.style.display = "flex";
                setTimeout(() => {
                    sliderSection.querySelector(".letter-window").classList.add("open");
                }, 50);
            }, 2000);
        }
    }
    animate();
});

// ===== SLIDER =====
const loveSlider = document.getElementById("love-slider");
const sliderValue = document.getElementById("slider-value");
const sliderMessage = document.getElementById("slider-message");

loveSlider.addEventListener("input", function() {
    const value = parseInt(this.value);
    sliderValue.textContent = value + "%";

    if (value >= 70) {
        sliderMessage.textContent = "That's perfect! 😏";
        setTimeout(() => {
            sliderSection.style.display = "none";
            scrollSection.style.display = "flex";
            setTimeout(() => {
                scrollSection.querySelector(".letter-window").classList.add("open");
            }, 50);
        }, 1500);
    }
});

// ===== SCROLL =====
const scrollContent = document.querySelector(".scroll-content");
const scrollMsgs = document.querySelectorAll(".scroll-msg");
const agreeBtn = document.getElementById("agree-btn");

scrollContent.addEventListener("scroll", function() {
    const scrollPercent = (this.scrollTop / (this.scrollHeight - this.clientHeight)) * 100;
    
    scrollMsgs.forEach((msg, i) => {
        if (scrollPercent > i * 25) {
            msg.classList.add("visible");
        }
    });

    if (scrollPercent > 80) {
        agreeBtn.style.display = "block";
    }
});

agreeBtn.addEventListener("click", () => {
    scrollSection.style.display = "none";
    choiceSection.style.display = "flex";
    setTimeout(() => {
        choiceSection.querySelector(".letter-window").classList.add("open");
    }, 50);
});

// ===== CHOICES =====
const choices = document.querySelectorAll(".choice");

choices.forEach(choice => {
    choice.addEventListener("click", () => {
        choiceSection.style.display = "none";
        messageSection.style.display = "flex";
        setTimeout(() => {
            messageSection.querySelector(".letter-window").classList.add("open");
        }, 50);
    });
});

// ===== MESSAGE =====
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const sendStatus = document.getElementById("send-status");

sendBtn.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (!message) {
        sendStatus.textContent = "Please write something! 💕";
        return;
    }

    sendStatus.textContent = "💖 Message received! 💖";
    setTimeout(() => {
        messageSection.style.display = "none";
        finalScreen.style.display = "flex";
        setTimeout(() => {
            finalScreen.querySelector(".letter-window").classList.add("open");
        }, 50);
    }, 1500);
});
