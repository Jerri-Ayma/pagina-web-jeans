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
    if (window.scrollY >= 50) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
}

window.addEventListener('scroll', scrollHeader);

// ========== BOTÓN SCROLL TO TOP ==========
const scrollTop = document.getElementById('scroll-top');

function showScrollTop() {
    if (window.scrollY >= 400) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
}

window.addEventListener('scroll', showScrollTop);

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
    const productCards = document.querySelectorAll('.product__card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
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
// Esta función te permite agregar productos desde JavaScript
function addProduct(name, price, imageUrl) {
    const catalogGrid = document.querySelector('.catalog__grid');
    
    const productCard = document.createElement('div');
    productCard.className = 'product__card';
    
    productCard.innerHTML = `
        <div class="product__image">
            <img src="${imageUrl}" alt="${name}">
        </div>
        <div class="product__info">
            <h3 class="product__name">${name}</h3>
            <p class="product__price">S/ ${price}</p>
        </div>
    `;
    
    catalogGrid.appendChild(productCard);
    
    // Re-aplicar animaciones
    animateOnScroll();
}

// Ejemplo de uso (descomenta para probar):
// addProduct('Jean Clásico', '150.00', 'ruta/a/tu/imagen.jpg');

console.log('🎉 Jervils Website cargado correctamente');
console.log('💡 Tip: Para agregar productos, usa la función addProduct(nombre, precio, urlImagen)');