import {
    getProducts,
    getCategories,
    getProductsByCategory
} from './api.js';
import {
    addToCart,
    updateCartCount
} from './carrito.js';

const productsContainer = document.getElementById('products-container');
const categoryNav = document.getElementById('category-nav');
const loadMoreButton = document.getElementById('load-more-btn');
const searchInput = document.getElementById('search-input');
const searchInputMobile = document.getElementById('search-input-mobile');
const categoryBanner = document.getElementById('category-banner');

let allProducts = [];
let filteredProducts = [];
let displayedProductsCount = 9;
const PRODUCTS_PER_LOAD = 9;
let currentCategory = 'all';

document.addEventListener('DOMContentLoaded', async () => {
    allProducts = await getProducts();
    filteredProducts = allProducts;
    await renderCategories();
    renderProducts(filteredProducts.slice(0, displayedProductsCount));
    updateCartCount();

    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', loadMoreProducts);
    }
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    if (searchInputMobile) {
        searchInputMobile.addEventListener('input', debounce(handleSearch, 300));
    }

    if (productsContainer) {
        productsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-btn')) {
                const productId = parseInt(e.target.dataset.id);
                const product = allProducts.find(p => p.id === productId);
                if (product) {
                    addToCart(product);
                }
            }
            if (e.target.classList.contains('view-details-btn')) {
                const productId = parseInt(e.target.dataset.id);
                window.location.href = `./page/producto.html?id=${productId}`;
            }
        });
    }
});

function renderProducts(products) {
    if (!productsContainer) return;
    productsContainer.innerHTML = products.length === 0
        ? '<p class="text-center col-span-full text-gray-500">No se encontraron productos.</p>'
        : '';

    products.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });

    if (loadMoreButton) {
        loadMoreButton.classList.toggle('hidden', displayedProductsCount >= filteredProducts.length);
    }
}

function createProductCard(product) {
    const dolarToPYG = 7300; // Puedes actualizar este valor según el tipo de cambio actual
    const pricePYG = Math.round(product.price * dolarToPYG).toLocaleString('es-PY');
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-[1.02] flex flex-col';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-contain p-4">
        <div class="p-4 flex-1 flex flex-col justify-between">
            <div>
                <h3 class="font-bold text-lg mb-2 truncate">${product.title}</h3>
                <p class="text-gray-600 text-sm mb-3 capitalize">${product.category}</p>
                <p class="text-xl font-extrabold text-indigo-600 mb-1">$${product.price.toFixed(2)} USD</p>
                <p class="text-lg font-bold text-green-600 mb-4">₲${pricePYG} PYG</p>
            </div>
            <div class="flex justify-between items-center mt-auto">
                <button class="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm hover:bg-indigo-700 transition duration-150 view-details-btn" data-id="${product.id}">
                    Ver detalles
                </button>
                <button class="add-to-cart-btn text-indigo-500 hover:text-indigo-700 transition duration-150" data-id="${product.id}" aria-label="Añadir al carrito">
                    <svg class="w-6 h-6 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </button>
            </div>
        </div>
    `;
    return card;
}

async function renderCategories() {
    if (!categoryNav) return;
    categoryNav.innerHTML = '';
    const categories = await getCategories();

    const allBtn = createCategoryButton('Todos', 'all');
    allBtn.addEventListener('click', () => filterProducts('all'));
    categoryNav.appendChild(allBtn);

    categories.forEach(category => {
        const btn = createCategoryButton(category, category);
        btn.addEventListener('click', () => filterProducts(category));
        categoryNav.appendChild(btn);
    });
}

function createCategoryButton(text, category) {
    const btn = document.createElement('button');
    btn.textContent = text.charAt(0).toUpperCase() + text.slice(1);
    btn.dataset.category = category;
    btn.className = 'py-2 px-4 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 transition duration-150 category-filter capitalize';
    return btn;
}

async function filterProducts(category) {
    document.querySelectorAll('.category-filter').forEach(btn => {
        btn.classList.remove('bg-indigo-600', 'text-white');
        btn.classList.add('bg-gray-100', 'text-gray-700');
    });

    const currentBtn = document.querySelector(`[data-category="${category}"]`);
    if (currentBtn) {
        currentBtn.classList.remove('bg-gray-100', 'text-gray-700');
        currentBtn.classList.add('bg-indigo-600', 'text-white');
    }

    currentCategory = category;
    if (category === 'all') {
        filteredProducts = allProducts;
        showCategoryBanner('');
    } else {
        filteredProducts = allProducts.filter(p => p.category === category);
        showCategoryBanner(category);
    }

    displayedProductsCount = PRODUCTS_PER_LOAD;
    renderProducts(filteredProducts.slice(0, displayedProductsCount));
}

function showCategoryBanner(category) {
    if (!categoryBanner) return;
    let imgSrc = '';
    switch (category) {
        case 'electronics':
            imgSrc = './img/electronics.jpg';
            break;
        case 'jewelery':
            imgSrc = './img/jewelery.jpg';
            break;
        case "men's clothing":
            imgSrc = './img/mensclothing.jpg';
            break;
        case "women's clothing":
            imgSrc = './img/womensclothing.jpg';
            break;
        default:
            categoryBanner.innerHTML = '';
            return;
    }
    categoryBanner.innerHTML = `<img src="${imgSrc}" alt="${category}" class="w-full h-48 object-cover rounded-xl mb-6">`;
}

function loadMoreProducts() {
    if (displayedProductsCount < filteredProducts.length) {
        displayedProductsCount += PRODUCTS_PER_LOAD;
        renderProducts(filteredProducts.slice(0, displayedProductsCount));
    }
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
    );
    displayedProductsCount = PRODUCTS_PER_LOAD;
    renderProducts(filteredProducts.slice(0, displayedProductsCount));

    if (loadMoreButton) {
        loadMoreButton.classList.toggle('hidden', filteredProducts.length <= PRODUCTS_PER_LOAD);
    }
}

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}