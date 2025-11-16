// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initSmoothScroll();
    initCarousel();
    initFormValidation();
    initNavHighlight();
    
    console.log('智能农业监测系统网站已加载完成！');
});

// 1. 平滑滚动功能
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // 计算目标位置（考虑固定导航栏的高度）
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 2. 图片轮播功能
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    let autoSlideInterval;
    
    // 显示指定索引的轮播项
    function showSlide(index) {
        // 隐藏所有轮播项
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // 处理边界情况
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }
        
        // 显示当前轮播项
        slides[currentSlide].classList.add('active');
        
        // 更新轮播指示器（如果有的话）
        updateCarouselIndicators();
    }
    
    // 更新轮播指示器
    function updateCarouselIndicators() {
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // 自动轮播功能
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000); // 每5秒自动切换
    }
    
    // 停止自动轮播
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }
    
    // 为按钮添加事件监听器
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(currentSlide - 1);
            startAutoSlide();
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(currentSlide + 1);
            startAutoSlide();
        });
    }
    
    // 鼠标悬停时暂停自动轮播
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    // 初始化轮播
    showSlide(0);
    startAutoSlide();
}

// 3. 表单验证功能
function initFormValidation() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    
    // 实时验证函数
    function validateName() {
        const name = nameInput.value.trim();
        if (name.length < 2) {
            nameError.textContent = '姓名至少需要2个字符';
            return false;
        } else {
            nameError.textContent = '';
            return true;
        }
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            emailError.textContent = '邮箱地址不能为空';
            return false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = '请输入有效的邮箱地址';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }
    
    function validateMessage() {
        const message = messageInput.value.trim();
        if (message.length < 10) {
            messageError.textContent = '留言内容至少需要10个字符';
            return false;
        } else {
            messageError.textContent = '';
            return true;
        }
    }
    
    // 实时输入验证
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);
    
    // 表单提交验证
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isMessageValid) {
            // 模拟表单提交成功
            showSuccessMessage('表单提交成功！我们会尽快回复您。');
            
            // 清空表单
            form.reset();
            
            // 在实际应用中，这里应该发送数据到服务器
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         name: nameInput.value,
            //         email: emailInput.value,
            //         message: messageInput.value
            //     })
            // });
        } else {
            showErrorMessage('请检查表单中的错误信息');
        }
    });
}

// 4. 导航栏高亮功能
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        let current = '';
        const headerHeight = document.querySelector('header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // 更新导航链接的高亮状态
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// 工具函数：显示成功消息
function showSuccessMessage(message) {
    showMessage(message, 'success');
}

// 工具函数：显示错误消息
function showErrorMessage(message) {
    showMessage(message, 'error');
}

// 通用消息显示函数
function showMessage(message, type) {
    // 移除已存在的消息
    const existingMessage = document.querySelector('.message-toast');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 创建新消息元素
    const messageElement = document.createElement('div');
    messageElement.className = `message-toast message-${type}`;
    messageElement.textContent = message;
    
    // 添加样式
    messageElement.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    if (type === 'success') {
        messageElement.style.backgroundColor = '#27ae60';
    } else {
        messageElement.style.backgroundColor = '#e74c3c';
    }
    
    // 添加到页面
    document.body.appendChild(messageElement);
    
    // 3秒后自动消失
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.remove();
                }
            }, 300);
        }
    }, 3000);
}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    nav a.active {
        background-color: rgba(255,255,255,0.2) !important;
        font-weight: 600 !important;
    }
`;
document.head.appendChild(style);

// 页面加载动画
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});