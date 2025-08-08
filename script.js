// Ejemplo de funcionalidad básica
document.addEventListener('DOMContentLoaded', function() {
    // Manejo del formulario
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulación de envío (puedes reemplazar con fetch/AJAX)
            const name = document.getElementById('name').value;
            alert(`Gracias ${name}, tu mensaje ha sido enviado. Nos pondremos en contacto pronto.`);
            contactForm.reset();
        });
    }

    // Menú móvil (opcional)
    const mobileMenuButton = document.querySelector('.md\\:hidden');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuButton && navMenu) {
        mobileMenuButton.addEventListener('click', function() {
            navMenu.classList.toggle('hidden');
        });
    }
});