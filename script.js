document.addEventListener("DOMContentLoaded", function () {
    for (let i = 0; i < 20; i++) {
        let symbol = Math.random() > 0.5 ? "☕" : "❤️"; // Zufällig Kaffee oder Herz
        createEmoji(symbol);
    }
});

function createEmoji(symbol) {
    let emoji = document.createElement("div");
    emoji.classList.add("falling-emoji");
    emoji.innerHTML = symbol;
    document.body.appendChild(emoji);
    
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * -500; // Startpunkt zufällig weiter oben setzen
    
    emoji.style.position = "absolute";
    emoji.style.left = `${x}px`;
    emoji.style.top = `${y}px`;
    
    animateFalling(emoji, Math.random() * 2 + 1);
    
    emoji.addEventListener("click", function (event) {
        event.preventDefault(); // Verhindert unerwartetes Verhalten auf Touchscreens
        pulseEmoji(emoji);
    });
    
    emoji.addEventListener("touchstart", function (event) {
        pulseEmoji(emoji);
    }, { passive: true });
}

function animateFalling(element, speed) {
    let position = parseFloat(element.style.top) || -50;
    
    function fall() {
        position += speed;
        element.style.top = `${position}px`;
        
        if (position < window.innerHeight) {
            requestAnimationFrame(fall);
        } else {
            position = Math.random() * -500; // Neustart des Falls mit zufälligem Startpunkt
            element.style.left = `${Math.random() * window.innerWidth}px`; // Zufällige X-Position
            element.style.top = `${position}px`;
            requestAnimationFrame(fall);
        }
    }
    fall();
}

function pulseEmoji(emoji) {
    emoji.style.transition = "transform 0.5s ease-in-out";
    emoji.style.transform = "scale(2.5)";
    setTimeout(() => {
        emoji.style.transform = "scale(1)";
    }, 500);
}

// Dark Mode verhindern und Scrollen ermöglichen
const style = document.createElement('style');
style.innerHTML = `
  @media (prefers-color-scheme: dark) {
    body {
      background-color: #d4edda !important;
      color: black !important;
    }
    .container {
      background: rgba(255, 255, 255, 0.8) !important;
    }
  }

  html, body {
    overflow: auto !important;
  }
`;
document.head.appendChild(style);
