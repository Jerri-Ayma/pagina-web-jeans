/* ========== MANEJO GLOBAL DE ERRORES ========== */
window.addEventListener('error', function(event) {
    console.error('Error no capturado:', event.message, event.filename, event.lineno);
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Promise sin manejar:', event.reason);
});

/* ========== UTILIDADES ========== */
function throttle(fn, limit = 100) {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ========== MENÚ MÓVIL ========== */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Abrir menú
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
        navToggle.classList.add('hide');
    });
}

// Cerrar menú con botón X
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        navToggle.classList.remove('hide');
    });
}

// Cerrar menú al hacer clic en enlaces (opcional pero recomendado)
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        navToggle.classList.remove('hide');
    });
});

// ========== HEADER CON SCROLL ==========
const header = document.getElementById('header');

function scrollHeader() {
    header.classList.toggle('header--scrolled', window.scrollY >= 50);
}

window.addEventListener('scroll', throttle(scrollHeader, 100));

// ========== BOTÓN SCROLL TO TOP ==========
const scrollTop = document.getElementById('scroll-top');

function showScrollTop() {
    if (window.scrollY >= 400) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
}

window.addEventListener('scroll', throttle(showScrollTop, 100));

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== ANIMACIÓN DE ENTRADA PARA PRODUCTOS ==========
function animateOnScroll() {
    const productCards = document.querySelectorAll('.product__card:not(.product__card--visible)');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('product__card--visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    productCards.forEach(card => {
        card.classList.add('product__card--animate');
        observer.observe(card);
    });
}

// Ejecutar animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
});

// ========== GOOGLE MAPS (OPCIONAL) ==========
// Descomenta y configura esto cuando tengas tu API key de Google Maps
/*
function initMap() {
    // Coordenadas de tu tienda (reemplaza con las coordenadas reales)
    const storeLocation = { lat: -12.0464, lng: -77.0428 }; // Ejemplo: Lima, Perú
    
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: storeLocation,
        styles: [
            {
                featureType: 'all',
                elementType: 'geometry',
                stylers: [{ color: '#f5f5f5' }]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#c9c9c9' }]
            }
        ]
    });
    
    // Marcador en el mapa
    const marker = new google.maps.Marker({
        position: storeLocation,
        map: map,
        title: 'Jervils'
    });
}

// Cargar el mapa cuando la página esté lista
window.initMap = initMap;
*/

// ========== FUNCIÓN PARA AGREGAR PRODUCTOS DINÁMICAMENTE ==========
function addProduct(name, price, imageUrl) {
    const catalogGrid = document.querySelector('.catalog__grid');
    if (!catalogGrid) return;

    const card = document.createElement('article');
    card.className = 'product__card';

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'product__image';

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = name;
    imageWrapper.appendChild(img);

    const info = document.createElement('div');
    info.className = 'product__info';

    const h3 = document.createElement('h3');
    h3.className = 'product__name';
    h3.textContent = name;

    const p = document.createElement('p');
    p.className = 'product__price';

    const data = document.createElement('data');
    data.value = price;
    data.textContent = 'S/ ' + price;
    p.appendChild(data);

    info.appendChild(h3);
    info.appendChild(p);
    card.appendChild(imageWrapper);
    card.appendChild(info);
    catalogGrid.appendChild(card);

    animateOnScroll();
}
