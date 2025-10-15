const CART_STORAGE_KEY = 'fakeShopCart';


@returns {Array}

function getCart() {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
}


@param {Array} cart

function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartCount();
}

@param {Object} product

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

@param {number} productId

export function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
}

export function clearCart() {
    localStorage.removeItem(CART_STORAGE_KEY);
    updateCartCount();
}


export function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');

    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
        cartCountElement.classList.toggle('hidden', totalItems === 0);
    }
}

@returns {Array}

export function getCartItems() {
    return getCart();
}

@param {number} productId
@param {number} newQuantity

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