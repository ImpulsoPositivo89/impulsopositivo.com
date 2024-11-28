// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Manejar el menú de navegación lateral
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        sidebar.classList.toggle('active');
    });

    // Manejar el formulario de contacto si está presente
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aquí puedes agregar la lógica para manejar el formulario, como enviarlo a un servidor
            alert('¡Mensaje enviado! Gracias por contactarte.');
            contactForm.reset();
        });
    }

    // Cargar videos si está en la página de videos
    if (document.getElementById('videos-grid')) {
        fetchVideos();
    }

    // Carrito de Compras
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    const cartCount = document.getElementById('cart-count');

    // Inicializar el carrito desde localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Función para actualizar el contador del carrito
    function updateCartCount() {
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    }

    // Función para guardar el carrito en localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Agregar eBooks y Generadores al carrito
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const title = button.getAttribute('data-title');
            const file = button.getAttribute('data-file');
            const type = button.getAttribute('data-type');

            // Verificar si el ítem ya está en el carrito
            const existingItem = cart.find(item => item.file === file);
            if (!existingItem) {
                cart.push({ title, file, type });
                saveCart();
                updateCartCount();
                alert(`${title} ha sido agregado al carrito.`);
            } else {
                alert(`${title} ya está en tu carrito.`);
            }
        });
    });

    // Actualizar el contador al cargar la página
    updateCartCount();
});
