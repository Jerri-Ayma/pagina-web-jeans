// ========== TIENDAS - DESPLEGABLE DE PAÍS ==========

document.addEventListener('DOMContentLoaded', function() {
    const countryButton = document.getElementById('country-button');
    const countryContent = document.getElementById('country-content');
    
    if (countryButton && countryContent) {
        // Toggle del desplegable con aria-expanded para accesibilidad
        countryButton.addEventListener('click', function() {
            // Obtener el estado actual del atributo aria-expanded
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Cambiar el estado de aria-expanded
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle de la clase active en el botón
            this.classList.toggle('active');
            
            // Toggle de la clase active en el contenido
            countryContent.classList.toggle('active');
        });
        
        // Opcional: Abrir el desplegable por defecto
        // Descomenta las siguientes líneas si quieres que esté abierto al cargar
        /*
        countryButton.classList.add('active');
        countryButton.setAttribute('aria-expanded', 'true');
        countryContent.classList.add('active');
        */
    }
});

// ========== SMOOTH SCROLL PARA ENLACES INTERNOS ==========
// (Si tienes enlaces que llevan a #tiendas desde otras páginas)
if (window.location.hash === '#tiendas') {
    setTimeout(() => {
        const tiendasSection = document.getElementById('tiendas');
        if (tiendasSection) {
            const header = document.getElementById('header');
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = tiendasSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }, 100);
}

console.log('✅ Página de Tiendas cargada correctamente');
console.log('♿ Accesibilidad mejorada con aria-expanded');