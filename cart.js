// cart.js

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    const checkoutButton = document.getElementById('checkout-button');

    // Obtener el carrito desde localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Función para calcular el total a pagar
    function calculateTotal() {
        let total = 0;
        cart.forEach(item => {
            if (item.type === 'ebook') {
                total += 5; // cada ebook cuesta 5 dólares
            } else if (item.type === 'generador') {
                total += 2; // cada generador cuesta 2 dólares
            }
        });
        return total;
    }

    // Función para actualizar el total a pagar en la sección de cart.html
    function updateTotal() {
        if (totalAmount) {
            totalAmount.textContent = `$${calculateTotal().toFixed(2)}`;
        }
    }

    // Función para mostrar los eBooks y Generadores en el carrito
    function displayCartItems() {
        if (!cartItemsContainer) return;

        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
            updateTotal();
            return;
        }

        cart.forEach((item, index) => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';

            const itemInfoDiv = document.createElement('div');
            itemInfoDiv.className = 'item-info';
            itemInfoDiv.innerHTML = `<h3>${item.title}</h3>`;

            const removeButton = document.createElement('button');
            removeButton.className = 'remove-item-button';
            removeButton.textContent = '🗑️';
            removeButton.setAttribute('data-index', index);
            removeButton.setAttribute('title', 'Eliminar del carrito');

            cartItemDiv.appendChild(itemInfoDiv);
            cartItemDiv.appendChild(removeButton);

            cartItemsContainer.appendChild(cartItemDiv);
        });

        updateTotal();
    }

    // Remover eBooks y Generadores del carrito
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item-button')) {
                const index = e.target.getAttribute('data-index');
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCartItems();
                updateCartCount(); // Actualizar el contador en todas las páginas
                alert('El ítem ha sido removido del carrito.');
            }
        });
    }

    // Función para actualizar el contador del carrito en todas las páginas
    function updateCartCount() {
        const cartCountElements = document.querySelectorAll('#cart-count');
        cartCountElements.forEach(element => {
            element.textContent = cart.length;
        });
    }

    // Manejar el botón "Finalizar Compra"
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Tu carrito está vacío.');
                return;
            }

            // Define aquí tu enlace externo de PayPal.Me
            const checkoutURL = 'https://paypal.me/angelgamer799'; // Reemplaza con tu enlace PayPal.Me

            // Abrir el enlace en una nueva pestaña
            window.open(checkoutURL, '_blank');

            // Opcional: Vaciar el carrito después de redirigir
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
            updateCartCount();
            alert('¡Compra finalizada! Serás redirigido a PayPal.');
        });
    }

    // Mostrar los eBooks y Generadores en el carrito al cargar cart.html
    displayCartItems();
});
