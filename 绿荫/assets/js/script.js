// Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.header');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Header scroll effect with enhanced animation
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Hide/show header on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Smooth scrolling for navigation links with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('loaded');
            }, index * 100);
        }
    });
}, observerOptions);

// Observe elements for animation with staggered delays
document.querySelectorAll('.feature-card, .category-card, .point').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    observer.observe(el);
});

// Enhanced sound category interactions
document.querySelectorAll('.category-card').forEach(card => {
    const soundWaves = card.querySelectorAll('.sound-waves span');

    card.addEventListener('mouseenter', () => {
        soundWaves.forEach((wave, index) => {
            wave.style.animationDelay = `${index * 0.3}s`;
            wave.style.animationPlayState = 'running';
        });

        // Add glow effect
        card.style.boxShadow = '0 20px 60px rgba(27, 94, 32, 0.15)';
    });

    card.addEventListener('mouseleave', () => {
        soundWaves.forEach(wave => {
            wave.style.animationPlayState = 'paused';
        });
    });

    // Click interaction
    card.addEventListener('click', () => {
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    });
});

// Enhanced treehole interface interactions
const treeholeInterface = document.querySelector('.treehole-interface');
if (treeholeInterface) {
    const moodSelector = treeholeInterface.querySelector('.mood-selector');
    const likeCount = treeholeInterface.querySelector('.like-count');
    const demoText = treeholeInterface.querySelector('.demo-text');

    // Enhanced mood selector with multiple states
    const moods = [
        { svg: createMoodSvg('calm'), color: '#f1f8e9' },
        { svg: createMoodSvg('happy'), color: '#e8f5e9' },
        { svg: createMoodSvg('thoughtful'), color: '#f9fbe7' },
        { svg: createMoodSvg('peaceful'), color: '#f1f8e9' }
    ];
    let currentMood = 0;

    function createMoodSvg(type) {
        const svgMap = {
            calm: '<circle cx="16" cy="16" r="14" fill="#f1f8e9"/><circle cx="11" cy="14" r="2" fill="#4caf50"/><circle cx="21" cy="14" r="2" fill="#4caf50"/><path d="M10 22C10 22 13 18 16 18C19 18 22 22 22 22" stroke="#4caf50" stroke-width="2" stroke-linecap="round"/>',
            happy: '<circle cx="16" cy="16" r="14" fill="#e8f5e9"/><circle cx="11" cy="14" r="2" fill="#66bb6a"/><circle cx="21" cy="14" r="2" fill="#66bb6a"/><path d="M10 20C10 20 13 24 16 24C19 24 22 20 22 20" stroke="#66bb6a" stroke-width="2" stroke-linecap="round"/>',
            thoughtful: '<circle cx="16" cy="16" r="14" fill="#f9fbe7"/><circle cx="13" cy="14" r="2" fill="#8bc34a"/><circle cx="19" cy="14" r="2" fill="#8bc34a"/><path d="M12 20C12 20 14 18 16 18C18 18 20 20 20 20" stroke="#8bc34a" stroke-width="2" stroke-linecap="round"/>',
            peaceful: '<circle cx="16" cy="16" r="14" fill="#f1f8e9"/><circle cx="16" cy="16" r="6" fill="none" stroke="#4caf50" stroke-width="2"/><circle cx="16" cy="16" r="2" fill="#4caf50"/>'
        };
        return svgMap[type] || svgMap.calm;
    }

    moodSelector.addEventListener('click', () => {
        currentMood = (currentMood + 1) % moods.length;
        const mood = moods[currentMood];

        moodSelector.innerHTML = `
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                ${mood.svg}
            </svg>
        `;

        // Enhanced animation
        moodSelector.style.transform = 'scale(1.2) rotate(360deg)';
        moodSelector.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';

        setTimeout(() => {
            moodSelector.style.transform = 'scale(1) rotate(0deg)';
        }, 600);

        // Change background color
        treeholeInterface.style.background = `linear-gradient(135deg, ${mood.color} 0%, white 100%)`;
        treeholeInterface.style.transition = 'background 0.5s ease';
    });

    // Enhanced like count with heart animation
    let isLiked = false;
    let likes = 23;

    likeCount.addEventListener('click', () => {
        isLiked = !isLiked;

        if (isLiked) {
            likes++;
            likeCount.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 14C8 14 2 10 2 6C2 3 4 2 6 2C7 2 7.5 2.5 8 3C8.5 2.5 9 2 10 2C12 2 14 3 14 6C14 10 8 14 8 14Z" fill="#e91e63"/>
                </svg>
                <span>${likes}</span>
            `;
            likeCount.style.color = '#e91e63';
            likeCount.style.background = 'rgba(233, 30, 99, 0.1)';

            // Create floating hearts
            createFloatingHeart(likeCount);
        } else {
            likes--;
            likeCount.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 14C8 14 2 10 2 6C2 3 4 2 6 2C7 2 7.5 2.5 8 3C8.5 2.5 9 2 10 2C12 2 14 3 14 6C14 10 8 14 8 14Z" fill="#e0e0e0"/>
                </svg>
                <span>${likes}</span>
            `;
            likeCount.style.color = 'var(--text-muted)';
            likeCount.style.background = 'rgba(129, 199, 132, 0.1)';
        }

        // Bounce animation
        likeCount.style.transform = 'scale(1.3)';
        setTimeout(() => {
            likeCount.style.transform = 'scale(1)';
        }, 200);
    });

    // Typing effect for demo text
    const originalText = demoText.textContent;
    demoText.textContent = '';
    let charIndex = 0;

    function typeText() {
        if (charIndex < originalText.length) {
            demoText.textContent += originalText[charIndex];
            charIndex++;
            setTimeout(typeText, 50);
        }
    }

    // Start typing when interface is visible
    const interfaceObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && charIndex === 0) {
            typeText();
        }
    });
    interfaceObserver.observe(treeholeInterface);
}

// Create floating heart animation
function createFloatingHeart(container) {
    const heart = document.createElement('span');
    heart.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 18C10 18 2 12 2 7C2 4 4 2 6 2C7.5 2 8.5 3 10 4C11.5 3 12.5 2 14 2C16 2 18 4 18 7C18 12 10 18 10 18Z" fill="#e91e63" opacity="0.8"/>
        </svg>
    `;
    heart.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.5rem;
        animation: floatHeart 1.5s ease-out forwards;
        pointer-events: none;
        z-index: 1000;
    `;

    container.appendChild(heart);

    setTimeout(() => heart.remove(), 1500);
}


// Enhanced parallax effect for hero section
let ticking = false;
function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    const floatingElements = document.querySelectorAll('.element');
    const heroContent = document.querySelector('.hero-content');
    const giantLeaves = document.querySelectorAll('.giant-leaf');

    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.6}px)`;
    }

    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled * 0.001);
    }

    // 巨大叶子视差效果
    giantLeaves.forEach((leaf, index) => {
        const speed = 0.05 + (index * 0.02);
        const currentTransform = leaf.style.transform || '';
        leaf.style.transform = `${currentTransform} translateY(${scrolled * speed}px)`;
    });

    floatingElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        const rotation = scrolled * 0.05;
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg) scale(${1 + scrolled * 0.0002})`;
    });

    ticking = false;
}

// 初始化巨大叶子
function initGiantLeaves() {
    const giantLeaves = document.querySelectorAll('.giant-leaf');

    giantLeaves.forEach((leaf, index) => {
        // 设置最终的旋转角度
        const finalAngle = leaf.getAttribute('data-final-angle');
        leaf.style.setProperty('--final-angle', `${finalAngle}deg`);

        // 获取每片叶子的动画时长
        const duration = parseFloat(getComputedStyle(leaf).getPropertyValue('--rotation-duration'));

        // 添加微风效果 - 等待对应叶子动画完成后开始
        setTimeout(() => {
            setInterval(() => {
                if (Math.random() > 0.8) {
                    const windStrength = Math.random() * 2 - 1;
                    const baseTransform = `translateX(-50%) translateY(${leaf.classList.contains('leaf-left') ? '0px' :
                                      leaf.classList.contains('leaf-center-1') ? '-12px' :
                                      leaf.classList.contains('leaf-center-2') ? '-24px' : '-36px'}) rotate(${finalAngle}deg) scale(1)`;

                    leaf.style.transition = 'transform 2s ease-in-out';
                    leaf.style.transform = `${baseTransform} translateX(${windStrength}px) rotate(${parseFloat(finalAngle) + windStrength * 0.3}deg)`;

                    setTimeout(() => {
                        leaf.style.transform = baseTransform;
                    }, 2000);
                }
            }, 7000);
        }, duration * 1000); // 根据每片叶子的动画时长等待

        // 鼠标悬停交互
        leaf.addEventListener('mouseenter', () => {
            leaf.style.filter = 'drop-shadow(0 25px 50px rgba(27, 94, 32, 0.35))';
            leaf.style.opacity = '1';
        });

        leaf.addEventListener('mouseleave', () => {
            leaf.style.filter = 'drop-shadow(0 20px 40px rgba(27, 94, 32, 0.25))';
            leaf.style.opacity = '0.85';
        });
    });
}

// 页面加载时初始化叶子
document.addEventListener('DOMContentLoaded', () => {
    initGiantLeaves();
});


window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Enhanced feature cards with 3D tilt effect
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
        card.style.boxShadow = `${20 + rotateY}px ${20 + rotateX}px 60px rgba(27, 94, 32, 0.15)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-15px) scale(1.02)';
        card.style.boxShadow = '';
    });
});

// Enhanced phone mockup interaction
const phoneMockup = document.querySelector('.phone-mockup');
if (phoneMockup) {
    phoneMockup.addEventListener('mousemove', (e) => {
        const rect = phoneMockup.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        phoneMockup.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-20px)`;
    });

    phoneMockup.addEventListener('mouseleave', () => {
        phoneMockup.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-20px)';
    });
}




// Enhanced social links with particle effect
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Only prevent default if the link is a placeholder (#)
        if (link.getAttribute('href') === '#') {
            e.preventDefault();
        } else {
            // For real links, create particle effect then navigate
            const href = link.getAttribute('href');
            const target = link.getAttribute('target') || '_blank';

            // Create particle explosion
            for (let i = 0; i < 8; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: #81c784;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1000;
                `;

                const rect = link.getBoundingClientRect();
                particle.style.left = rect.left + rect.width / 2 + 'px';
                particle.style.top = rect.top + rect.height / 2 + 'px';

                document.body.appendChild(particle);

                const angle = (Math.PI * 2 * i) / 8;
                const velocity = 100 + Math.random() * 50;

                particle.animate([
                    {
                        transform: 'translate(0, 0) scale(1)',
                        opacity: 1
                    },
                    {
                        transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`,
                        opacity: 0
                    }
                ], {
                    duration: 600,
                    easing: 'ease-out'
                }).onfinish = () => particle.remove();
            }

            // Open the link after a short delay to show the effect
            setTimeout(() => {
                window.open(href, target);
            }, 200);
        }
    });
});

// Add custom CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    @keyframes floatHeart {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) translateY(0);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -150%) scale(1.5) translateY(-20px);
        }
    }

    .btn-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(style);

// Enhanced page loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease-in';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.hero-text').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 500);
});

// Enhanced keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }

    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for keyboard navigation
const focusStyles = document.createElement('style');
focusStyles.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--accent-lime) !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(focusStyles);

// Performance optimization with debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedResize = debounce(() => {
    // Handle responsive adjustments
    if (window.innerWidth < 768) {
        document.body.classList.add('mobile-view');
    } else {
        document.body.classList.remove('mobile-view');
    }
}, 250);

window.addEventListener('resize', debouncedResize);

// Download card click handler
function handleDownload(platform) {
    // 显示下载提示
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(76, 175, 80, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-size: 1rem;
    `;

    if (platform === 'android') {
        // Android版本 - 直接下载APK文件
        notification.textContent = '正在准备下载绿荫APK...';

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // 直接跳转到GitHub Releases下载APK文件
        setTimeout(() => {
            // 跳转到GitHub Releases下载链接
            window.location.href = 'https://github.com/NatureEase-lvyin/lvyin/releases/latest/download/lvyin.apk';

            // 更新提示信息
            notification.textContent = '绿荫APK下载已开始！';

            // 延迟隐藏通知
            setTimeout(() => {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }, 1500);

    } else if (platform === 'ios') {
        // iOS版本 - 跳转到App Store
        notification.textContent = '正在跳转到 App Store...';

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            window.open('https://apps.apple.com/app/your-app-id', '_blank');
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 1500);
    }
}

// Initialize mobile view check
debouncedResize();

