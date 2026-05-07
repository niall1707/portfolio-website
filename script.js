// Matrix Rain Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`abcdefghijklmnopqrstuvwxyz";
const characters = matrix.split("");

const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = [];
for(let x = 0; x < columns; x++) {
    drops[x] = Math.random() * canvas.height;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(5, 8, 16, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px Share Tech Mono';
    
    for(let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.3)';
    } else {
        navbar.style.boxShadow = '0 5px 30px rgba(0, 255, 65, 0.5)';
    }
    
    lastScroll = currentScroll;
});

// Hash Animation for buttons and elements
function generateHash(length = 8) {
    const chars = '0123456789abcdef';
    let hash = '';
    for (let i = 0; i < length; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
}

// Animate hash elements
const hashElements = document.querySelectorAll('.hash-animation, .hash-animation-inline, .btn-hash');
hashElements.forEach(element => {
    setInterval(() => {
        element.textContent = generateHash();
    }, 500);
});

// Footer hash animation (SHA-256 simulation)
const footerHash = document.getElementById('footer-hash');
setInterval(() => {
    footerHash.textContent = generateHash(64);
}, 1000);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease forwards';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.about-card, .project-card, .experience-card, .skill-category, .education-card').forEach(el => {
    observer.observe(el);
});

// Typing animation for terminal
const terminalLines = document.querySelectorAll('.typing-animation');
let delay = 0;

terminalLines.forEach((line, index) => {
    delay = index * 2;
    line.style.animationDelay = `${delay}s`;
});

// Skill bars animation on scroll
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.skill-progress');
            if (progressBar) {
                progressBar.style.animation = 'fillBar 1.5s ease forwards';
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-item').forEach(item => {
    skillObserver.observe(item);
});

// Glitch effect on hover for section titles
document.querySelectorAll('.glitch').forEach(glitchElement => {
    glitchElement.addEventListener('mouseenter', () => {
        glitchElement.style.animation = 'glitch-1 0.3s infinite';
    });
    
    glitchElement.addEventListener('mouseleave', () => {
        glitchElement.style.animation = '';
    });
});

// Random hash generation for skill progress bars
document.querySelectorAll('.skill-hash').forEach(hash => {
    setInterval(() => {
        hash.textContent = generateHash(4);
    }, 500);
});

// Add cursor effect on terminal window
const terminalBody = document.querySelector('.terminal-body');
if (terminalBody) {
    terminalBody.addEventListener('click', () => {
        const cursor = document.querySelector('.cursor-blink');
        if (cursor) {
            cursor.style.animation = 'none';
            setTimeout(() => {
                cursor.style.animation = '';
            }, 10);
        }
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add data-text attribute for glitch effect
document.querySelectorAll('.glitch').forEach(element => {
    if (!element.getAttribute('data-text')) {
        element.setAttribute('data-text', element.textContent);
    }
});

// Console easter egg
console.log('%c🛡️ SYSTEM ACCESS GRANTED 🛡️', 'color: #00ff41; font-size: 20px; font-weight: bold; font-family: monospace;');
console.log('%c========================================', 'color: #00ff41; font-family: monospace;');
console.log('%cWelcome to Niall Heeney\'s Cybersecurity Portfolio', 'color: #00ffff; font-size: 14px; font-family: monospace;');
console.log('%c========================================', 'color: #00ff41; font-family: monospace;');
console.log('%cIf you\'re reading this, you might be the kind of person I\'d like to connect with!', 'color: #00ff41; font-family: monospace;');
console.log('%cFeel free to reach out: niall1707@gmail.com', 'color: #00ffff; font-family: monospace;');
console.log('%c========================================', 'color: #00ff41; font-family: monospace;');

// Random tech facts on console
const techFacts = [
    "SHA-256 generates a 256-bit hash value",
    "The first computer bug was an actual moth found in a computer",
    "The @ symbol was used in email addresses for the first time in 1971",
    "The first virus was created in 1983",
    "A googol is 10^100 (a 1 followed by 100 zeros)"
];

console.log(`%c💡 Tech Fact: ${techFacts[Math.floor(Math.random() * techFacts.length)]}`, 'color: #00ff41; font-family: monospace; font-style: italic;');

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Track scroll progress
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #00ff41, #00ffff);
    z-index: 9999;
    transition: width 0.1s ease;
    box-shadow: 0 0 10px #00ff41;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Add typing sound effect simulation (visual only)
let typingTimeout;
document.addEventListener('keypress', () => {
    clearTimeout(typingTimeout);
    const cursor = document.querySelector('.cursor-blink');
    if (cursor) {
        cursor.style.color = '#00ffff';
        typingTimeout = setTimeout(() => {
            cursor.style.color = '';
        }, 100);
    }
});

// Create particle effect on hover for CTA buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', (e) => {
        for (let i = 0; i < 5; i++) {
            createParticle(e.clientX, e.clientY);
        }
    });
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #00ff41;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${x}px;
        top: ${y}px;
        box-shadow: 0 0 10px #00ff41;
    `;
    
    document.body.appendChild(particle);
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = 2 + Math.random() * 3;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    let posX = x;
    let posY = y;
    let opacity = 1;
    
    const animate = () => {
        posX += vx;
        posY += vy;
        opacity -= 0.02;
        
        particle.style.left = posX + 'px';
        particle.style.top = posY + 'px';
        particle.style.opacity = opacity;
        
        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    };
    
    animate();
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in effect to all sections
    document.querySelectorAll('section').forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
