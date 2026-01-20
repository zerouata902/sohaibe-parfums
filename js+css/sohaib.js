
// ===== كود العرض الشرائح (Slideshow) =====
document.addEventListener('DOMContentLoaded', function() {
    // عناصر العرض الشرائح
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 3000;
    let isTransitioning = false;
    
    // تهيئة العرض الشرائح
    function initSlideshow() {
        startSlideshow();
        preloadImages();
        
        prevBtn.addEventListener('click', showPrevSlide);
        nextBtn.addEventListener('click', showNextSlide);
        
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-index'));
                if (!isTransitioning) {
                    goToSlide(slideIndex);
                }
            });
        });
        
        const slideshowContainer = document.querySelector('.slideshow-container');
        slideshowContainer.addEventListener('mouseenter', pauseSlideshow);
        slideshowContainer.addEventListener('mouseleave', startSlideshow);
    }
    
    // تحميل الصور مسبقاً
    function preloadImages() {
        const images = [];
        slides.forEach(slide => {
            const img = slide.querySelector('img');
            if (img) {
                const image = new Image();
                image.src = img.src;
                images.push(image);
            }
        });
    }
    
    // عرض الشريحة التالية
    function showNextSlide() {
        if (isTransitioning) return;
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlideshow();
    }
    
    // عرض الشريحة السابقة
    function showPrevSlide() {
        if (isTransitioning) return;
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlideshow();
    }
    
    // الانتقال إلى شريحة محددة
    function goToSlide(index) {
        if (isTransitioning || index === currentSlide) return;
        currentSlide = index;
        updateSlideshow();
    }
    
    // تحديث العرض الشرائح
    function updateSlideshow() {
        isTransitioning = true;
        
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        setTimeout(() => {
            slides[currentSlide].classList.add('active');
            
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            dots[currentSlide].classList.add('active');
            
            resetSlideshowTimer();
            isTransitioning = false;
        }, 50);
    }
    
    // بدء التبديل التلقائي
    function startSlideshow() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(showNextSlide, slideDuration);
    }
    
    // إيقاف التبديل التلقائي مؤقتًا
    function pauseSlideshow() {
        clearInterval(slideInterval);
    }
    
    // إعادة ضبط مؤقت التبديل التلقائي
    function resetSlideshowTimer() {
        pauseSlideshow();
        startSlideshow();
    }
    
    // بدء العرض الشرائح
    initSlideshow();
});

// ===== كود الفيديو والمحمل =====
document.addEventListener('DOMContentLoaded', function() {
    const heroVideoContainer = document.querySelector('.hero-video-container');
    const heroVideo = heroVideoContainer.querySelector('video');
    const heroSection = document.querySelector('.hero-section');
    const loader = document.querySelector('.video-loader');

    // إخفاء قسم البطل وإظهار المحمل
    if (heroSection) heroSection.style.display = 'none';
    
    // إخفاء المحمل بعد 3 ثواني
    setTimeout(() => {
        if (loader) loader.style.display = 'none';
    }, 3000);
    
    // عند انتهاء الفيديو
    if (heroVideo) {
        heroVideo.addEventListener('ended', () => {
            heroVideoContainer.style.display = 'none';
            if (heroSection) heroSection.style.display = 'block';
        });
    }
});

// ===== كود التمرير السلس =====
document.addEventListener('DOMContentLoaded', function() {
    const scrollToProductsBtn = document.getElementById("scrollToProducts");
    if (scrollToProductsBtn) {
        scrollToProductsBtn.addEventListener("click", function(){
            const categoriesSection = document.getElementById("categories");
            if (categoriesSection) {
                categoriesSection.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    }
});

// ===== كود النصوص المتحركة والجزيئات =====
document.addEventListener('DOMContentLoaded', function() {
    // تعريف الجمل
    const phrases = [
        {
            arabic: "مــرحـباً بـكـُم في مَوقـع صُهيـب شاه",
            french: "Bienvenue sur le site de Sohaib Shah"
        },
        {
            arabic: "عطورنا ليست مجرد روائح، بل قصص ترويها",
            french: "Nos parfums ne sont pas que des odeurs, ce sont des histoires à raconter"
        },
        {
            arabic: "كل قطرة من عطرنا تحمل تراثًا من الفخامة",
            french: "Chaque goutte de notre parfum porte un héritage de luxe"
        },
        {
            arabic: "عبق التاريخ وأصالة الحاضر في كل زجاجة",
            french: "Le parfum de l'histoire et l'authenticité du présent dans chaque flacon"
        },
        {
            arabic: "روائح تخلد الذكريات وتصنع الأحلام",
            french: "Des parfums qui immortalise les souvenirs et créent des rêves"
        },
        {
            arabic: "من قلب الشرق تأتي أرقى العطور",
            french: "Du cœur de l'Orient viennent les parfums les plus raffinés"
        },
        {
            arabic: "فاخرة كالماضي، معاصرة كالحاضر",
            french: "Luxueux comme le passé, contemporain comme le présent"
        }
    ];

    // العناصر DOM
    const arabicTextElement = document.getElementById('changing-text-arabic');
    const frenchTextElement = document.getElementById('changing-text-french');
    const particlesContainer = document.getElementById('particles-container');

    // حالة الكتابة والمسح
    let currentPhraseIndex = 0;
    let isDeleting = false;
    let isArabic = true;
    let arabicText = '';
    let frenchText = '';
    let arabicCharIndex = 0;
    let frenchCharIndex = 0;
    let typingSpeed = 60;
    let deletingSpeed = 30;
    let pauseBetween = 2000;

    // دالة الكتابة حرف بحرف
    function typeText() {
        if (!arabicTextElement || !frenchTextElement) return;
        
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (isArabic) {
            if (!isDeleting && arabicCharIndex <= currentPhrase.arabic.length) {
                arabicText = currentPhrase.arabic.substring(0, arabicCharIndex);
                arabicTextElement.innerHTML = arabicText + '<span class="cursor"></span>';
                arabicCharIndex++;
                setTimeout(typeText, typingSpeed);
            } 
            else if (isDeleting && arabicCharIndex >= 0) {
                arabicText = currentPhrase.arabic.substring(0, arabicCharIndex);
                arabicTextElement.innerHTML = arabicText + '<span class="cursor"></span>';
                arabicCharIndex--;
                setTimeout(typeText, deletingSpeed);
            }
            else if (!isDeleting && arabicCharIndex > currentPhrase.arabic.length) {
                isArabic = false;
                setTimeout(typeText, 500);
            }
            else if (isDeleting && arabicCharIndex < 0) {
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                arabicCharIndex = 0;
                frenchCharIndex = 0;
                isDeleting = false;
                isArabic = true;
                setTimeout(typeText, typingSpeed);
            }
        } else {
            if (!isDeleting && frenchCharIndex <= currentPhrase.french.length) {
                frenchText = currentPhrase.french.substring(0, frenchCharIndex);
                frenchTextElement.innerHTML = frenchText + '<span class="cursor"></span>';
                frenchCharIndex++;
                setTimeout(typeText, typingSpeed - 10);
            }
            else if (isDeleting && frenchCharIndex >= 0) {
                frenchText = currentPhrase.french.substring(0, frenchCharIndex);
                frenchTextElement.innerHTML = frenchText + '<span class="cursor"></span>';
                frenchCharIndex--;
                setTimeout(typeText, deletingSpeed);
            }
            else if (!isDeleting && frenchCharIndex > currentPhrase.french.length) {
                setTimeout(() => {
                    isDeleting = true;
                    typeText();
                }, pauseBetween);
            }
            else if (isDeleting && frenchCharIndex < 0) {
                isArabic = true;
                isDeleting = true;
                setTimeout(typeText, 500);
            }
        }
    }

    // بدء تأثير الكتابة
    setTimeout(() => {
        if (arabicTextElement && frenchTextElement) {
            typeText();
        }
    }, 1000);

    // إنشاء الجزيئات العائمة
    function createParticles() {
        if (!particlesContainer) return;
        
        const particleCount = Math.min(80, Math.floor(window.innerWidth * window.innerHeight / 10000));
        
        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        const opacity = Math.random() * 0.5 + 0.1;
        particle.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
        
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        particle.style.animation = `float ${Math.random() * 10 + 10}s infinite ease-in-out`;
        
        particlesContainer.appendChild(particle);
    }

    // تهيئة الجزيئات
    if (particlesContainer) {
        createParticles();
        
        setInterval(() => {
            if (particlesContainer.children.length > 120) {
                for (let i = 0; i < 15; i++) {
                    if (particlesContainer.firstChild) {
                        particlesContainer.removeChild(particlesContainer.firstChild);
                    }
                }
            }
            
            for (let i = 0; i < 8; i++) {
                createParticle();
            }
        }, 15000);
    }
});

// ===== كود الشريط الترويجي =====
document.addEventListener('DOMContentLoaded', function() {
    const promoBanner = document.querySelector('.promo-banner');
    const promoScroll = document.querySelector('.promo-scroll');
    
    if (!promoBanner || !promoScroll) return;
    
    setTimeout(() => {
        initPromoScroll();
    }, 100);
    
    function initPromoScroll() {
        const items = promoScroll.querySelectorAll('.promo-item');
        
        items.forEach(item => {
            const clone = item.cloneNode(true);
            promoScroll.appendChild(clone);
        });
        
        const itemWidth = items[0].offsetWidth + 30;
        const totalItems = items.length * 2;
        const totalWidth = itemWidth * totalItems;
        
        const isMobile = window.innerWidth <= 768;
        const speed = isMobile ? 40 : 50;
        const duration = totalWidth / speed;
        
        promoScroll.style.animation = `scrollPromo ${duration}s linear infinite`;
        
        promoScroll.style.animation = 'none';
        setTimeout(() => {
            promoScroll.style.animation = `scrollPromo ${duration}s linear infinite`;
        }, 10);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes scrollPromo {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
    `;
    document.head.appendChild(style);
    
    promoScroll.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    
    promoScroll.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
});

// ===== كود النظام الأساسي (العربة، المنتجات، الطلبات) =====
document.addEventListener('DOMContentLoaded', () => {
    // متغيرات عامة
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let currentCategory = 'homme';
    
    // عناصر DOM
    // الصفحات
    const mainPage = document.getElementById('mainPage');
    const cartPage = document.getElementById('cartPage');
    const orderPage = document.getElementById('orderPage');
    
    // عناصر الصفحة الرئيسية
    const shoppingBag = document.getElementById('shoppingBag');
    const bagDot = document.getElementById('bagDot');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const underline = document.getElementById('categoryUnderline');
    const productsWrapper = document.getElementById('productsWrapper');
    const voirPlusLink = document.getElementById('voirPlusLink');
    
    // عناصر صفحة العربة
    const backFromCartBtn = document.getElementById('backFromCartBtn');
    const cartCount = document.getElementById('cartCount');
    const cartItemsSection = document.getElementById('cartItemsSection');
    const subtotalPrice = document.getElementById('subtotalPrice');
    const totalPrice = document.getElementById('totalPrice');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const backToShopBtn = document.getElementById('backToShopBtn');
    
    // عناصر صفحة الطلب
    const backFromOrderBtn = document.getElementById('backFromOrderBtn');
    const orderForm = document.getElementById('orderForm');
    const orderSummary = document.getElementById('orderSummary');
    const submitOrderBtn = document.getElementById('submitOrderBtn');
    
    // التهيئة
    function init() {
        updateCartDot();
        setupCategoryUnderline();
        filterProductsByCategory('homme');
        setupEventListeners();
        setupProductCards();
        updateCartDisplay();
        updateVoirPlusLink('homme');
    }
    
    // إدارة الصفحات
    function showPage(page) {
        if (!page) return;
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        page.classList.add('active');
    }
    
    // تحديث نقطة العربة
    function updateCartDot() {
        if (!bagDot) return;
        const hasItems = cart.length > 0;
        bagDot.classList.toggle('active', hasItems);
    }
    
    // تحديث رابط "شاهد المزيد"
    function updateVoirPlusLink(category) {
        if (!voirPlusLink) return;
        
        const links = {
            'homme': 'pages/homme.html',
            'femme': 'pages/femme.html',
            'enfant': 'pages/enfant.html',
            'unisexe': 'pages/unisexe.html'
        };
        
        voirPlusLink.href = links[category] || 'homme.html';
        voirPlusLink.setAttribute('data-category', category);
        
        const categoryNames = {
            'homme': 'Homme',
            'femme': 'Femme',
            'enfant': 'Enfant',
            'unisexe': 'Unisexe'
        };
        
        voirPlusLink.innerHTML = `Voir Plus ${categoryNames[category]} <i class="fas fa-arrow-right"></i>`;
    }
    
    // تحديث عرض العربة
    function updateCartDisplay() {
        if (!cartCount || !cartItemsSection || !subtotalPrice || !totalPrice) return;
        
        const cartCountText = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = `${cartCountText} ${cartCountText === 1 ? 'article' : 'articles'}`;
        
        cartItemsSection.innerHTML = '';
        
        if (cart.length === 0) {
            if (emptyCartMessage) emptyCartMessage.classList.add('active');
            cartItemsSection.style.display = 'none';
            const cartSummary = document.querySelector('.cart-summary');
            if (cartSummary) cartSummary.style.display = 'none';
            subtotalPrice.textContent = '0.00 dh';
            totalPrice.textContent = '0.00 dh';
            return;
        }
        
        if (emptyCartMessage) emptyCartMessage.classList.remove('active');
        cartItemsSection.style.display = 'block';
        const cartSummary = document.querySelector('.cart-summary');
        if (cartSummary) cartSummary.style.display = 'block';
        
        let subtotal = 0;
        
        cart.forEach((item, index) => {
            const itemTotal = parseFloat(item.price) * item.quantity;
            subtotal += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">${item.price} dh</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn decrease" data-index="${index}">-</button>
                        <span class="item-quantity">${item.quantity}</span>
                        <button class="quantity-btn increase" data-index="${index}">+</button>
                        <button class="remove-item" data-index="${index}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            cartItemsSection.appendChild(cartItem);
        });
        
        subtotalPrice.textContent = `${subtotal.toFixed(2)} dh`;
        totalPrice.textContent = `${subtotal.toFixed(2)} dh`;
        
        // إضافة مستمعي الأحداث للأزرار
        document.querySelectorAll('.decrease').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.closest('.quantity-btn').dataset.index;
                updateQuantity(index, -1);
            });
        });
        
        document.querySelectorAll('.increase').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.closest('.quantity-btn').dataset.index;
                updateQuantity(index, 1);
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.closest('.remove-item').dataset.index;
                removeFromCart(index);
            });
        });
    }
    
    // إعداد خط التصنيف
    function setupCategoryUnderline() {
        const activeBtn = document.querySelector('.category-btn.active');
        if (activeBtn && underline) updateUnderline(activeBtn);
    }
    
    function updateUnderline(button) {
        if (!button || !underline) return;
        const { left, width } = button.getBoundingClientRect();
        const container = button.parentElement.getBoundingClientRect();
        underline.style.left = `${left - container.left}px`;
        underline.style.width = `${width}px`;
    }
    
    // وظائف العربة
    function addToCart(productElement) {
        if (!productElement) return;
        
        const title = productElement.querySelector('h3')?.textContent || '';
        const price = productElement.querySelector('.price')?.textContent.replace(' dh', '') || '0';
        const image = productElement.querySelector('img')?.src || '';
        
        if (!title || !price) return;
        
        const existingItem = cart.find(item => item.title === title);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ title, price, image, quantity: 1 });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDot();
        updateCartDisplay();
        
        // تأثير الزر
        const button = productElement.querySelector('.add-to-cart');
        if (button) {
            const originalContent = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.style.background = 'black';
            setTimeout(() => {
                button.innerHTML = originalContent;
                button.style.background = '#000000';
            }, 1000);
        }
        
        // الانتقال لصفحة العربة
        if (cartPage) showPage(cartPage);
    }
    
    function updateQuantity(index, change) {
        if (!cart[index]) return;
        
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) cart.splice(index, 1);
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDot();
        updateCartDisplay();
    }
    
    function removeFromCart(index) {
        if (!cart[index]) return;
        
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDot();
        updateCartDisplay();
    }
    
    // تصفية المنتجات
    function filterProductsByCategory(category) {
        currentCategory = category;
        const products = document.querySelectorAll('.product-card');
        
        products.forEach(product => {
            if (product.dataset.category === category) {
                product.style.display = 'block';
                setTimeout(() => {
                    product.style.opacity = '1';
                    product.style.transform = 'translateY(0)';
                }, 100);
            } else {
                product.style.opacity = '0';
                product.style.transform = 'translateY(20px)';
                setTimeout(() => product.style.display = 'none', 300);
            }
        });
        
        updateVoirPlusLink(category);
        
        if (productsWrapper) {
            productsWrapper.scrollTo({ left: 0, behavior: 'smooth' });
        }
    }
    
    // ملخص الطلب
    function updateOrderSummaryDisplay() {
        if (!orderSummary) return;
        
        orderSummary.innerHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = parseFloat(item.price) * item.quantity;
            total += itemTotal;
            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            orderItem.innerHTML = `<span>${item.title} x${item.quantity}</span><span>${itemTotal.toFixed(2)} dh</span>`;
            orderSummary.appendChild(orderItem);
        });
        
        const totalElement = document.createElement('div');
        totalElement.className = 'order-item order-item-total';
        totalElement.innerHTML = `<strong>Total</strong><strong>${total.toFixed(2)} dh</strong>`;
        orderSummary.appendChild(totalElement);
    }
    
    // توليد رسالة واتساب
    function generateWhatsAppMessage(formData) {
        let message = `*NOUVELLE COMMANDE - SOHAIB PARFUMS*\n\n`;
        message += `*Informations client:*\n📋 Nom complet: ${formData.firstName} ${formData.lastName}\n📞 Téléphone: ${formData.phone}\n`;
        if (formData.email) message += `📧 Email: ${formData.email}\n`;
        message += `🏙️ Ville: ${formData.city}\n📍 Adresse: ${formData.address}\n\n`;
        message += `*Détails de la commande:*\n`;
        cart.forEach(item => {
            const itemTotal = parseFloat(item.price) * item.quantity;
            message += `• ${item.title} x${item.quantity}: ${itemTotal.toFixed(2)} dh\n`;
        });
        const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
        message += `\n*TOTAL: ${total.toFixed(2)} dh*\n\n📅 Date: ${new Date().toLocaleDateString('fr-FR')}\n🕒 Heure: ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
        return encodeURIComponent(message);
    }
    
    // إعداد مستمعي الأحداث
    function setupEventListeners() {
        // أحداث الصفحات
        if (shoppingBag && cartPage) {
            shoppingBag.addEventListener('click', () => showPage(cartPage));
        }
        
        if (backFromCartBtn && mainPage) {
            backFromCartBtn.addEventListener('click', () => showPage(mainPage));
        }
        
        if (backToShopBtn && mainPage) {
            backToShopBtn.addEventListener('click', () => showPage(mainPage));
        }
        
        if (backFromOrderBtn && cartPage) {
            backFromOrderBtn.addEventListener('click', () => showPage(cartPage));
        }
        
        // أحداث الأزرار التصنيف
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                updateUnderline(button);
                const category = button.dataset.category;
                filterProductsByCategory(category);
            });
        });
        
        // حدث رابط "شاهد المزيد"
        if (voirPlusLink) {
            voirPlusLink.addEventListener('click', (e) => {
                e.preventDefault();
                const href = voirPlusLink.href;
                const category = voirPlusLink.getAttribute('data-category');
                const loadingText = `<i class="fas fa-spinner fa-spin"></i> Chargement ${category}...`;
                const originalText = voirPlusLink.innerHTML;
                
                voirPlusLink.innerHTML = loadingText;
                voirPlusLink.style.opacity = '0.7';
                voirPlusLink.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    voirPlusLink.innerHTML = originalText;
                    voirPlusLink.style.opacity = '1';
                    voirPlusLink.style.pointerEvents = 'auto';
                    window.location.href = href;
                }, 800);
            });
        }
        
        // حدث زر الدفع
        if (checkoutBtn && orderPage) {
            checkoutBtn.addEventListener('click', () => {
                if (cart.length === 0) return;
                updateOrderSummaryDisplay();
                showPage(orderPage);
            });
        }
        
        // حدث إرسال الطلب
        if (orderForm && submitOrderBtn) {
            orderForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const button = submitOrderBtn;
                const originalContent = button.innerHTML;
                
                button.style.backgroundColor = 'black';
                button.style.color = 'white';
                button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Envoi...`;
                button.disabled = true;
                
                const formData = {
                    firstName: document.getElementById('firstName')?.value || '',
                    lastName: document.getElementById('lastName')?.value || '',
                    phone: document.getElementById('phone')?.value || '',
                    email: document.getElementById('email')?.value || '',
                    city: document.getElementById('city')?.value || '',
                    address: document.getElementById('address')?.value || ''
                };
                
                setTimeout(() => {
                    const message = generateWhatsAppMessage(formData);
                    const phoneNumber = '212761910201';
                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                    window.open(whatsappUrl, '_blank');
                    
                    button.innerHTML = originalContent;
                    button.style.backgroundColor = '';
                    button.style.color = '';
                    button.disabled = false;
                    
                    cart = [];
                    localStorage.removeItem('cart');
                    updateCartDot();
                    updateCartDisplay();
                    
                    setTimeout(() => {
                        if (mainPage) showPage(mainPage);
                    }, 1000);
                    
                    orderForm.reset();
                }, 4000);
            });
        }
    }
    
    // إعداد بطاقات المنتجات
    function setupProductCards() {
        const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
            
            const addButton = card.querySelector('.add-to-cart');
            if (addButton) {
                addButton.addEventListener('click', () => addToCart(card));
            }
        });
        
        // دعم السحب للمنتجات
        if (productsWrapper) {
            let isDown = false;
            let startX;
            let scrollLeft;
            
            productsWrapper.addEventListener('mousedown', (e) => {
                isDown = true;
                productsWrapper.classList.add('active');
                startX = e.pageX - productsWrapper.offsetLeft;
                scrollLeft = productsWrapper.scrollLeft;
            });
            
            productsWrapper.addEventListener('mouseleave', () => { 
                isDown = false; 
                productsWrapper.classList.remove('active'); 
            });
            
            productsWrapper.addEventListener('mouseup', () => { 
                isDown = false; 
                productsWrapper.classList.remove('active'); 
            });
            
            productsWrapper.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - productsWrapper.offsetLeft;
                const walk = (x - startX) * 2;
                productsWrapper.scrollLeft = scrollLeft - walk;
            });
        }
    }
    
    // تشغيل التهيئة
    init();
    
    // أحداث إضافية
    window.addEventListener('load', () => {
        const activeBtn = document.querySelector('.category-btn.active');
        if (activeBtn && underline) {
            setTimeout(() => updateUnderline(activeBtn), 100);
        }
    });
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        const categories = document.querySelector('.categories');
        
        if (heroImage && categories) {
            const heroHeight = heroImage.offsetHeight;
            if (scrolled > heroHeight * 0.7) {
                categories.style.background = 'rgba(255, 255, 255, 0.98)';
                categories.style.backdropFilter = 'blur(10px)';
            } else {
                categories.style.background = '#ffffff';
                categories.style.backdropFilter = 'none';
            }
        }
    });

});


// ===== نظام الكميات المتبقية فقط =====

let productQuantities = JSON.parse(localStorage.getItem('productQuantities')) || {};
const STORAGE_KEY = 'productQuantities';

document.addEventListener('DOMContentLoaded', () => {
    initializeProductQuantities();
    document.querySelectorAll('.product-card').forEach(card => {
        addQuantityBadge(card);
    });
});

function initializeProductQuantities() {
    if (Object.keys(productQuantities).length === 0) {
        generateInitialQuantities();
    }
}

function generateInitialQuantities() {
    const products = document.querySelectorAll('.product-card');
    productQuantities = {};
    
    products.forEach((card, index) => {
        const title = card.querySelector('h3')?.textContent || `Product ${index + 1}`;
        productQuantities[title] = {
            current: 10,
            max: 10
        };
    });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(productQuantities));
}

function getQtyStatus(current, max) {
    const percent = (current / max) * 100;
    
    if (current <= 0) return { class: 'sold-out', label: 'نفذ' };
    if (percent <= 20) return { class: 'low', label: 'محدود' };
    return { class: 'high', label: 'جيد' };
}

function addQuantityBadge(card) {
    const title = card.querySelector('h3')?.textContent;
    if (!title || !productQuantities[title]) return;
    
    const qtyData = productQuantities[title];
    const status = getQtyStatus(qtyData.current, qtyData.max);
    
    const qtyContainer = document.createElement('div');
    qtyContainer.className = 'qty-badge';
    
    const qtyBadge = document.createElement('div');
    qtyBadge.className = `qty-indicator ${status.class}`;
    qtyBadge.innerHTML = `
        <div class="qty-label">Qty:</div>
        <div class="qty-number">${qtyData.current}</div>
    `;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'qty-tooltip';
    tooltip.textContent = `${qtyData.current} من ${qtyData.max} متبقي`;
    
    qtyContainer.appendChild(qtyBadge);
    qtyContainer.appendChild(tooltip);
    card.appendChild(qtyContainer);
}



