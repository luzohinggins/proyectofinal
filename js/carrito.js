const CART_STORAGE_KEY = 'fakeShopCart';

/**
 * Obtiene el carrito de compras actual.
 * @returns {Array}
 */
function getCart() {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
}

/**
 * Guarda el carrito en localStorage.
 * @param {Array} cart
 */
function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartCount();
}

/**
 * Añade un producto al carrito.
 * @param {Object} product
 */
export function addToCart(product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    

    saveCart(cart);

    Swal.fire({
        icon: 'success',
        title: '¡Añadido!',
        text: `${product.title} se agregó al carrito.`,
        timer: 1500,
        showConfirmButton: false
    });
}

/**
 * Elimina un producto del carrito.
 * @param {number} productId
 */
export function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
}

/**
 * Vacía el carrito.
 */
export function clearCart() {
    localStorage.removeItem(CART_STORAGE_KEY);
    updateCartCount();
}

/**
 * Actualiza el contador del carrito en la interfaz.
 */
export function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');

    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
        cartCountElement.classList.toggle('hidden', totalItems === 0);
    }
}

/**
 * Obtiene los items del carrito.
 * @returns {Array}
 */
export function getCartItems() {
    return getCart();
}

/**
 * Actualiza la cantidad de un producto en el carrito.
 * @param {number} productId
 * @param {number} newQuantity
 */
export function updateItemQuantity(productId, newQuantity) {
    let cart = getCart();
    const item = cart.find(i => i.id === productId);

    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            saveCart(cart);
        }
    }
}

document.addEventListener('DOMContentLoaded', updateCartCount);