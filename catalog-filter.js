// ========== FILTROS DEL CATÁLOGO ==========
document.addEventListener('DOMContentLoaded', function() {
    const dropdownButtons = document.querySelectorAll('.filter__dropdown');
    const productCards = document.querySelectorAll('.product__card');
    
    // Manejar dropdowns con aria-expanded
    dropdownButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Cerrar otros dropdowns
            dropdownButtons.forEach(btn => {
                if (btn !== button) {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle este dropdown
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            this.classList.toggle('active');
        });
    });
    
    // Cerrar dropdowns al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.filter__group')) {
            dropdownButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-expanded', 'false');
            });
        }
    });
    
    // Filtrar por tallas
    const sizeCheckboxes = document.querySelectorAll('[data-filter="size"] input[type="checkbox"]');
    sizeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applySizeFilter);
    });
    
    // Ordenar por precio
    const sortRadios = document.querySelectorAll('[data-filter="sort"] input[type="radio"]');
    sortRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const sortValue = this.value;
            const sortButton = this.closest('.filter__group').querySelector('.filter__dropdown span');
            
            // Actualizar texto del botón
            if (sortValue === 'price-low') {
                sortButton.textContent = 'Ordenar por: Precio: Menor a Mayor';
            } else if (sortValue === 'price-high') {
                sortButton.textContent = 'Ordenar por: Precio: Mayor a Menor';
            } else {
                sortButton.textContent = 'Ordenar por: Destacados';
            }
            
            sortProducts(sortValue);
        });
    });
    
    // Función para filtrar por talla
    function applySizeFilter() {
        const selectedSizes = Array.from(sizeCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        
        productCards.forEach(card => {
            if (selectedSizes.length === 0) {
                // Si no hay filtros, mostrar todos
                card.classList.remove('hide');
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                // Verificar si el producto tiene alguna de las tallas seleccionadas
                const cardSizes = card.getAttribute('data-sizes');
                
                // Si el producto no tiene data-sizes, no filtrarlo (mostrar por defecto)
                if (!cardSizes) {
                    card.classList.remove('hide');
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    return;
                }
                
                const sizes = cardSizes.split(',');
                const hasSize = selectedSizes.some(size => sizes.includes(size));
                
                if (hasSize) {
                    card.classList.remove('hide');
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => card.classList.add('hide'), 300);
                }
            }
        });
    }
    
    // Función para ordenar productos
    function sortProducts(sortValue) {
        const catalogGrid = document.querySelector('.catalog__grid');
        const productsArray = Array.from(productCards);
        
        productsArray.sort((a, b) => {
            const priceA = parseFloat(a.getAttribute('data-price') || a.querySelector('.product__price').textContent.replace('S/ ', '').replace(',', ''));
            const priceB = parseFloat(b.getAttribute('data-price') || b.querySelector('.product__price').textContent.replace('S/ ', '').replace(',', ''));
            
            if (sortValue === 'price-low') {
                return priceA - priceB;
            } else if (sortValue === 'price-high') {
                return priceB - priceA;
            } else {
                // Featured - orden original
                return 0;
            }
        });
        
        // Reorganizar en el DOM
        productsArray.forEach(card => {
            catalogGrid.appendChild(card);
        });
    }
});

console.log('✅ Filtros del catálogo cargados correctamente');
console.log('♿ Accesibilidad mejorada con aria-expanded');