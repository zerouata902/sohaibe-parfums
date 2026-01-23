

    // ===== VARIABLES GLOBALES =====
let currentGender = 'homme';
let slideshowInterval;
let currentSlide = 0;
const totalSlides = 3;

// ===== ELEMENTS DOM =====
const slideshow = document.querySelector('.slideshow');
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const hommeOption = document.querySelector('.homme-option');
const femmeOption = document.querySelector('.femme-option');
const hommeImage = document.getElementById('hommeImage');
const femmeImage = document.getElementById('femmeImage');
const formSection = document.getElementById('formSection');
const reservationForm = document.getElementById('reservationForm');
const hommePdf = document.querySelector('.homme-pdf');
const femmePdf = document.querySelector('.femme-pdf');
const hommeIframeContainer = document.querySelector('.homme-iframe-container');
const femmeIframeContainer = document.querySelector('.femme-iframe-container');
const hommePdfBtn = document.querySelector('.homme-pdf-btn');
const femmePdfBtn = document.querySelector('.femme-pdf-btn');

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    startSlideshow();
    setupPdfEventListeners();
});

// ===== SLIDESHOW =====
function startSlideshow() {
    slideshowInterval = setInterval(nextSlide, 3000);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlideshow();
}

function updateSlideshow() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentSlide) {
            slide.classList.add('active');
        }
    });
    
    indicators.forEach((indicator, index) => {
        indicator.classList.remove('active');
        if (index === currentSlide) {
            indicator.classList.add('active');
        }
    });
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlideshow();
    
    clearInterval(slideshowInterval);
    startSlideshow();
}

// ===== GENDER SELECTION =====
function selectGender(gender) {
    currentGender = gender;
    
    // Mettre à jour l'interface
    hommeOption.classList.remove('active');
    femmeOption.classList.remove('active');
    hommeImage.classList.remove('active');
    femmeImage.classList.remove('active');
    hommePdf.classList.remove('active');
    femmePdf.classList.remove('active');
    
    // Fermer tous les iframes
    closeAllIframes();
    
    if (gender === 'homme') {
        hommeOption.classList.add('active');
        hommeImage.classList.add('active');
        hommePdf.classList.add('active');
        
        // Scroller vers PDF hommes
        setTimeout(() => {
            hommePdf.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
    } else {
        femmeOption.classList.add('active');
        femmeImage.classList.add('active');
        femmePdf.classList.add('active');
        
        // Scroller vers PDF femmes
        setTimeout(() => {
            femmePdf.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
    }
}

// ===== IFRAME FUNCTIONALITY =====
function createIframe(iframeUrl, container) {
    if (!container) return;
    
    // Effacer le contenu précédent
    container.innerHTML = '';
    
    // Créer le wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'iframe-wrapper';
    
    // Créer l'écran de chargement
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'iframe-loading';
    loadingScreen.innerHTML = `
        <div class="spinner">
            <i class="fas fa-spinner"></i>
        </div>
        <p>جاري تحميل الكتالوج...</p>
    `;
    
    // Créer l'iframe
    const iframe = document.createElement('iframe');
    iframe.className = 'flipbook-iframe fp-iframe';
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'clipboard-write');
    iframe.setAttribute('scrolling', 'no');
    iframe.style.border = '1px solid lightgray';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.src = iframeUrl;
    
    // Ajouter l'événement de chargement
    iframe.onload = () => {
        loadingScreen.style.display = 'none';
    };
    
    // Ajouter l'événement d'erreur
    iframe.onerror = () => {
        loadingScreen.innerHTML = `
            <div class="spinner">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <p>حدث خطأ في تحميل الكتالوج</p>
        `;
    };
    
    // Créer les boutons d'action
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'iframe-actions';
    actionsDiv.innerHTML = `
        <button class="iframe-action-btn" onclick="reloadIframe(this)">
            <i class="fas fa-sync-alt"></i> إعادة تحميل
        </button>
        <button class="iframe-action-btn" onclick="fullscreenIframe(this)">
            <i class="fas fa-expand"></i> ملء الشاشة
        </button>
        <button class="iframe-action-btn" onclick="closeIframe(this)">
            <i class="fas fa-times"></i> إغلاق الكتالوج
        </button>
    `;
    
    // Ajouter tout au wrapper
    wrapper.appendChild(loadingScreen);
    wrapper.appendChild(iframe);
    
    // Ajouter au container
    container.appendChild(wrapper);
    container.appendChild(actionsDiv);
    container.classList.add('active');
    
    // Scroller vers l'iframe
    setTimeout(() => {
        container.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }, 100);
}

function openHommeIframe() {
    const iframeUrl = hommePdfBtn.getAttribute('data-iframe');
    createIframe(iframeUrl, hommeIframeContainer);
}

function openFemmeIframe() {
    const iframeUrl = femmePdfBtn.getAttribute('data-iframe');
    createIframe(iframeUrl, femmeIframeContainer);
}

function closeIframe(button) {
    const container = button.closest('.iframe-container');
    if (container) {
        container.innerHTML = '';
        container.classList.remove('active');
    }
}

function closeAllIframes() {
    if (hommeIframeContainer) {
        hommeIframeContainer.innerHTML = '';
        hommeIframeContainer.classList.remove('active');
    }
    
    if (femmeIframeContainer) {
        femmeIframeContainer.innerHTML = '';
        femmeIframeContainer.classList.remove('active');
    }
}

function reloadIframe(button) {
    const container = button.closest('.iframe-container');
    const iframe = container.querySelector('.flipbook-iframe');
    if (iframe) {
        iframe.src = iframe.src;
        
        // Afficher l'écran de chargement
        const loadingScreen = container.querySelector('.iframe-loading');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
            loadingScreen.innerHTML = `
                <div class="spinner">
                    <i class="fas fa-spinner"></i>
                </div>
                <p>جاري إعادة تحميل الكتالوج...</p>
            `;
        }
    }
}

function fullscreenIframe(button) {
    const container = button.closest('.iframe-container');
    const iframe = container.querySelector('.flipbook-iframe');
    if (iframe) {
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.webkitRequestFullscreen) {
            iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) {
            iframe.msRequestFullscreen();
        }
    }
}

// ===== FORM VALIDATION =====
function validateForm(formData) {
    if (!formData.fullName.trim()) {
        alert('Veuillez entrer votre nom complet');
        document.getElementById('fullName').focus();
        return false;
    }
    
    if (!formData.phone.trim()) {
        alert('Veuillez entrer votre numéro de téléphone');
        document.getElementById('phone').focus();
        return false;
    }
    
    if (!formData.parfum1.trim()) {
        alert('Veuillez entrer le nom du premier parfum');
        document.getElementById('parfum1').focus();
        return false;
    }
    
    if (!formData.parfum2.trim()) {
        alert('Veuillez entrer le nom du deuxième parfum');
        document.getElementById('parfum2').focus();
        return false;
    }
    
    if (!formData.city) {
        alert('Veuillez sélectionner votre ville');
        document.getElementById('city').focus();
        return false;
    }
    
    if (!formData.address.trim()) {
        alert('Veuillez entrer votre adresse complète');
        document.getElementById('address').focus();
        return false;
    }
    
    return true;
}

function generateWhatsAppMessage(formData) {
    let message = `*NOUVELLE RÉSERVATION - SOUHAIB SHAH PERFUMES*\n\n`;
    
    message += `*Collection choisie:* ${currentGender === 'homme' ? 'Homme 👨' : 'Femme 👩'}\n\n`;
    
    message += `*Parfums commandés:*\n`;
    if (formData.parfum1) message += `• ${formData.parfum1}\n`;
    if (formData.parfum2) message += `• ${formData.parfum2}\n`;
    if (formData.parfum3) message += `• ${formData.parfum3}\n`;
    if (formData.parfum4) message += `• ${formData.parfum4}\n`;
    
    message += `\n*Informations client:*\n`;
    message += `👤 Nom: ${formData.fullName}\n`;
    message += `📞 Téléphone: ${formData.phone}\n`;
    if (formData.email) message += `📧 Email: ${formData.email}\n`;
    message += `🏙️ Ville: ${formData.city}\n`;
    message += `📍 Adresse: ${formData.address}\n`;
    
    if (formData.notes) message += `\n📝 Notes: ${formData.notes}\n`;
    
    message += `\n📦 Pack: 4 parfums (30ml chacun)\n`;
    message += `💰 Prix: 180 DH\n`;
    message += `🚚 Livraison: Gratuite\n`;
    
    message += `\n📅 Date de réservation: ${new Date().toLocaleDateString('fr-FR')}\n`;
    message += `🕒 Heure: ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
    
    return encodeURIComponent(message);
}

// ===== EVENT LISTENERS =====
function setupPdfEventListeners() {
    // Bouton PDF hommes
    if (hommePdfBtn) {
        hommePdfBtn.addEventListener('click', openHommeIframe);
    }
    
    // Bouton PDF femmes
    if (femmePdfBtn) {
        femmePdfBtn.addEventListener('click', openFemmeIframe);
    }
}

function setupEventListeners() {
    // Slideshow indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Sélection du genre
    hommeOption.addEventListener('click', () => {
        selectGender('homme');
    });
    
    femmeOption.addEventListener('click', () => {
        selectGender('femme');
    });
    
    // Soumission du formulaire
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                fullName: document.getElementById('fullName').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                city: document.getElementById('city').value,
                address: document.getElementById('address').value,
                parfum1: document.getElementById('parfum1').value,
                parfum2: document.getElementById('parfum2').value,
                parfum3: document.getElementById('parfum3').value,
                parfum4: document.getElementById('parfum4').value,
                notes: document.getElementById('notes').value
            };
            
            if (!validateForm(formData)) {
                return;
            }
            
            const message = generateWhatsAppMessage(formData);
            const phoneNumber = '212761910201'; // Remplacez par votre numéro réel
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
            
            const confirmation = confirm('Voulez-vous envoyer votre réservation sur WhatsApp ?');
            
            if (confirmation) {
                window.open(whatsappUrl, '_blank');
                
                // Réinitialiser le formulaire après envoi
                setTimeout(() => {
                    reservationForm.reset();
                    alert('Votre réservation a été envoyée avec succès !\nNotre équipe vous contactera bientôt.');
                }, 1000);
            }
        });
    }
    
    // Pause slideshow on hover
    slideshow.addEventListener('mouseenter', () => {
        clearInterval(slideshowInterval);
    });
    
    slideshow.addEventListener('mouseleave', () => {
        startSlideshow();
    });
    
    // Touch support for mobile
    slideshow.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        const startX = touch.clientX;
        
        slideshow.addEventListener('touchend', function handleTouchEnd(e) {
            const touch = e.changedTouches[0];
            const endX = touch.clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    nextSlide();
                } else {
                    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                    updateSlideshow();
                }
            }
            
            slideshow.removeEventListener('touchend', handleTouchEnd);
        });
    });
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft':
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlideshow();
            break;
        case 'ArrowRight':
            nextSlide();
            break;
    }
});

// ===== FORM AUTO-FOCUS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const firstInput = document.querySelector('#parfum1');
            if (firstInput) {
                firstInput.focus();
            }
        }
    });
}, {
    threshold: 0.5
});

if (formSection) {
    observer.observe(formSection);
}

// ===== PHONE NUMBER FORMATTING =====
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = value.match(/.{1,2}/g).join(' ');
        }
        e.target.value = value;
    });
}

