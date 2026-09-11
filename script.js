document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll('.slide');
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    let currentIndex = 0;
    let isAnimating = false;

    // Inicializar carrusel
    slides.forEach((slide, index) => {
        if (index === 0) {
            slide.classList.add('active');
        } else {
            slide.classList.add('slide-right');
        }
    });

    function moveCarousel(newIndex, direction) {
        if (isAnimating || newIndex === currentIndex) return;
        isAnimating = true;

        const currentSlide = slides[currentIndex];
        const nextSlide = slides[newIndex];

        // Remover clases previas
        nextSlide.classList.remove('active', 'slide-left', 'slide-right');
        
        // Colocar la diapositiva entrante en la posición inicial sin animar
        nextSlide.classList.add('no-transition');
        nextSlide.classList.add(direction === 'right' ? 'slide-right' : 'slide-left');
        
        // Forzar un reflow para que el navegador aplique la posición
        void nextSlide.offsetWidth;
        
        // Restaurar transición y mover hacia el centro
        nextSlide.classList.remove('no-transition', 'slide-left', 'slide-right');
        nextSlide.classList.add('active');
        
        // Mover la diapositiva saliente hacia el lado contrario
        currentSlide.classList.remove('active');
        currentSlide.classList.add(direction === 'right' ? 'slide-left' : 'slide-right');
        
        currentIndex = newIndex;

        // Liberar el bloqueo después de que termine la animación
        setTimeout(() => {
            isAnimating = false;
        }, 600); // 600ms coincide con la transición CSS
    }

    btnNext.addEventListener('click', () => {
        let nextIndex = (currentIndex + 1) % slides.length;
        moveCarousel(nextIndex, 'right'); // Mueve hacia adelante
    });

    btnPrev.addEventListener('click', () => {
        let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        moveCarousel(prevIndex, 'left'); // Mueve hacia atrás
    });
});