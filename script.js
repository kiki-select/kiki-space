// 导航栏滚动效果
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 滚动时显示内容
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// 为各个区块添加动画类
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// 添加可见类后的样式
const style = document.createElement('style');
style.textContent = `
    .section.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// 技能条动画延迟
document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.querySelector('.skill-fill').style.animationDelay = `${index * 0.2}s`;
});

// 游戏页面敌机消灭动画
function initGameAnimation() {
    const enemies = document.querySelectorAll('.game-enemy');
    const explosions = document.querySelectorAll('.game-explosion');
    
    if (enemies.length === 0) return;
    
    // 敌机到达中间时触发爆炸
    enemies.forEach((enemy, index) => {
        enemy.addEventListener('animationiteration', () => {
            // 重置爆炸
            explosions[index].classList.remove('active');
        });
        
        // 监听动画进行，当敌机到达中间位置时显示爆炸
        const animationDuration = 4000; // 4秒
        const hitTime = animationDuration * 0.4; // 40%时到达中间
        
        setTimeout(() => {
            if (enemy.style.animationPlayState !== 'paused') {
                explosions[index].classList.add('active');
                setTimeout(() => {
                    explosions[index].classList.remove('active');
                }, 400);
            }
        }, hitTime + index * 1300);
    });
}

// 页面加载后初始化游戏动画
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initGameAnimation, 100);
});

console.log('🎮 KiKi 的个人网站已加载！');
