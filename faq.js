// ========== FAQ ACCORDION ==========

document.addEventListener('DOMContentLoaded', function() {
    // Habilitar accordion solo cuando JS esta disponible (progressive enhancement)
    document.body.classList.add('js-enabled');

    const faqQuestions = document.querySelectorAll('.faq__question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq__answer');
            const icon = this.querySelector('.faq__icon');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            // Cerrar todas las demas preguntas
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    const otherItem = otherQuestion.parentElement;
                    const otherAnswer = otherItem.querySelector('.faq__answer');
                    const otherIcon = otherQuestion.querySelector('.faq__icon');

                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherItem.classList.remove('active');
                    otherAnswer.style.maxHeight = null;
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });

            // Toggle la pregunta actual
            if (isExpanded) {
                this.setAttribute('aria-expanded', 'false');
                faqItem.classList.remove('active');
                answer.style.maxHeight = null;
                icon.style.transform = 'rotate(0deg)';
            } else {
                this.setAttribute('aria-expanded', 'true');
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
});
