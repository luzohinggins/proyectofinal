import { getProducts, getCategories } from './api.js';
import { addToCart, updateCartCount } from './carrito.js';

const categoryImages = {
    'electronics': './img/electronics.jpg',
    'jewelery': './img/jewelery.jpg',
    "men's clothing": './img/mensclothing.jpg',
    "women's clothing": './img/womensclothing.jpg'
};

const headerEl = document.getElementById('main-header');
const bannerSection = document.getElementById('dynamic-banner-container');
const catalogSection = document.getElementById('catalog-container');

let allProducts = [];
let allCategories = [];
let currentBanner = 0;
let bannerInterval = null;

// Renderiza el header con logo, categorías, buscador y carrito
function renderHeader(categories) {
    headerEl.innerHTML = `
        <div class="container mx-auto p-4 flex flex-row items-center justify-between">
            <a href="index.html" class="text-3xl font-extrabold text-indigo-600 tracking-wider">💡LuzShop</a>
            <nav class="flex space-x-3 mx-6" id="header-categories-nav">
                <button class="py-2 px-4 rounded-full text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition duration-150 category-filter capitalize" data-category="all">Ver Todos</button>
                ${categories.map(cat => `
                    <button class="py-2 px-4 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 transition duration-150 category-filter capitalize"
                        data-category="${cat}">${cat.charAt(0).toUpperCase() + cat.slice(1)}</button>
                `).join('')}
            </nav>
            <div class="flex items-center space-x-4 flex-1 justify-end">
                <input type="text" id="search-input" placeholder="Buscar productos..."
                    class="w-64 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150">
                <a href="./page/carrito.html" class="relative text-gray-700 hover:text-indigo-600 transition duration-150 p-2" aria-label="Ir al Carrito">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    <span id="cart-count" class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full hidden">0</span>
                </a>
            </div>
        </div>
    `;
    // Eventos de categorías
    headerEl.querySelectorAll('.category-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.dataset.category === 'all') {
                catalogSection.scrollIntoView({ behavior: 'smooth' });
                renderCategorizedCarousels(allCategories, allProducts);
                markActiveCategory('all');
            } else {
                renderCategorizedCarousels([btn.dataset.category], allProducts);
                markActiveCategory(btn.dataset.category);
                catalogSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    // Evento de búsqueda
    const searchInput = headerEl.querySelector('#search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
}

function markActiveCategory(category) {
    headerEl.querySelectorAll('.category-filter').forEach(btn => {
        btn.classList.remove('bg-indigo-600', 'text-white');
        btn.classList.add('bg-gray-100', 'text-gray-700');
    });
    const currentBtn = headerEl.querySelector(`[data-category="${category}"]`);
    if (currentBtn) {
        currentBtn.classList.remove('bg-gray-100', 'text-gray-700');
        currentBtn.classList.add('bg-indigo-600', 'text-white');
    }
}

// Banner dinámico
function renderBanner(categories) {
    const banners = categories.map(cat => ({
        src: categoryImages[cat],
        alt: cat.charAt(0).toUpperCase() + cat.slice(1),
        category: cat
    }));
    bannerSection.innerHTML = `
        <div class="banner-container mx-auto shadow-xl mb-2 cursor-pointer" id="banner-click">
            <img id="banner-img" class="banner-img" src="${banners[0].src}" alt="${banners[0].alt}" style="opacity:1;">
            <div class="banner-text pointer-events-none">
                <h1 class="text-4xl md:text-5xl font-extrabold mb-3">¡OFERTAS DE VERANO!</h1>
                <p class="text-xl opacity-90 mb-6">Encuentra los mejores productos a precios increíbles.</p>
            </div>
        </div>
    `;
    const bannerImg = document.getElementById('banner-img');
    const bannerClick = document.getElementById('banner-click');
    if (bannerInterval) clearInterval(bannerInterval);
    bannerInterval = setInterval(() => {
        currentBanner = (currentBanner + 1) % banners.length;
        bannerImg.style.opacity = 0;
        setTimeout(() => {
            bannerImg.src = banners[currentBanner].src;
            bannerImg.alt = banners[currentBanner].alt;
            bannerImg.setAttribute('data-category', banners[currentBanner].category);
            bannerImg.style.opacity = 1;
        }, 500);
    }, 2000);
    bannerClick.addEventListener('click', () => {
        renderCategorizedCarousels([banners[currentBanner].category], allProducts);
        markActiveCategory(banners[currentBanner].category);
        catalogSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// Carruseles por categoría agrupados
function renderCategorizedCarousels(categories, products) {
    catalogSection.innerHTML = '';
    categories.forEach(category => {
        const categoryProducts = products.filter(p => p.category === category);
        catalogSection.appendChild(createCategorySection(category, categoryProducts));
    });
}

function createCategorySection(category, products) {
    const portadaImg = categoryImages[category];
    const section = document.createElement('section');
    section.className = 'mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-center';

    // Columna izquierda: portada/banner
    const portadaDiv = document.createElement('div');
    portadaDiv.className = 'col-span-1 flex flex-col items-center justify-center';
    portadaDiv.innerHTML = `
        <img src="${portadaImg}" alt="${category}" class="w-full h-56 object-cover rounded-xl shadow-md mb-4">
        <h2 class="text-2xl font-bold text-indigo-700 capitalize mb-2">${category}</h2>
        <button class="bg-indigo-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-indigo-700 transition">Ver todos</button>
    `;
    portadaDiv.querySelector('button').addEventListener('click', () => {
        catalogSection.scrollIntoView({ behavior: 'smooth' });
        renderCategorizedCarousels([category], allProducts);
        markActiveCategory(category);
    });

    // Columna derecha: carrusel con flechas
    const carruselDiv = document.createElement('div');
    carruselDiv.className = 'col-span-2 flex flex-col items-center';
    carruselDiv.innerHTML = `
        <div class="flex items-center w-full">
            <button class="carousel-arrow mr-2" aria-label="Anterior">&#8592;</button>
            <div class="overflow-hidden w-full">
                <div class="carousel-products" style="width:100%;"></div>
            </div>
            <button class="carousel-arrow ml-2" aria-label="Siguiente">&#8594;</button>
        </div>
    `;
    const carousel = carruselDiv.querySelector('.carousel-products');
    products.forEach(product => {
        carousel.appendChild(createProductCard(product));
    });

    // Carrusel funcional
    let scrollIndex = 0;
    const visibleCards = 3;
    const arrowPrev = carruselDiv.querySelector('.carousel-arrow[aria-label="Anterior"]');
    const arrowNext = carruselDiv.querySelector('.carousel-arrow[aria-label="Siguiente"]');
    function updateCarousel() {
        const total = products.length;
        const maxIndex = Math.max(0, total - visibleCards);
        carousel.style.transform = `translateX(-${scrollIndex * (carousel.firstChild?.offsetWidth + 24 || 0)}px)`;
        arrowPrev.disabled = scrollIndex === 0;
        arrowNext.disabled = scrollIndex >= maxIndex;
    }
    arrowPrev.addEventListener('click', () => {
        if (scrollIndex > 0) scrollIndex--;
        updateCarousel();
    });
    arrowNext.addEventListener('click', () => {
        if (scrollIndex < products.length - visibleCards) scrollIndex++;
        updateCarousel();
    });
    setTimeout(updateCarousel, 100); // Espera a que se rendericen los cards

    section.appendChild(portadaDiv);
    section.appendChild(carruselDiv);
    return section;
}

// Card de producto
function createProductCard(product) {
    const dolarToPYG = 7300;
    const pricePYG = Math.round(product.price * dolarToPYG).toLocaleString('es-PY');
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-lg overflow-hidden w-64 flex-shrink-0 flex flex-col';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="w-full h-40 object-contain p-4">
        <div class="p-4 flex-1 flex flex-col justify-between">
            <h3 class="font-bold text-lg mb-2 truncate">${product.title}</h3>
            <p class="text-lg font-bold text-green-600 mb-2">₲${pricePYG} PYG</p>
            <div class="flex justify-between items-center mt-auto">
                <button class="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm hover:bg-indigo-700 transition duration-150 view-details-btn" data-id="${product.id}">
                    Ver detalles
                </button>
                <button class="add-to-cart-btn text-indigo-500 hover:text-indigo-700 transition duration-150" data-id="${product.id}" aria-label="Añadir al carrito">
                    <svg class="w-6 h-6 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </button>
            </div>
        </div>
    `;
    card.querySelector('.add-to-cart-btn').addEventListener('click', () => addToCart(product));
    card.querySelector('.view-details-btn').addEventListener('click', () => {
        window.location.href = `./page/producto.html?id=${product.id}`;
    });
    return card;
}

// Búsqueda de productos
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    let productsToShow = allProducts;
    const activeBtn = headerEl.querySelector('.category-filter.bg-indigo-600');
    let filteredCategory = null;
    if (activeBtn) filteredCategory = activeBtn.dataset.category;
    if (filteredCategory && filteredCategory !== 'all') {
        productsToShow = productsToShow.filter(p => p.category === filteredCategory);
    }
    const filtered = productsToShow.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
    );
    if (filteredCategory === 'all' || !filteredCategory) {
        renderCategorizedCarousels(allCategories, filtered);
    } else {
        renderCategorizedCarousels([filteredCategory], filtered);
    }
}

// Utilidad debounce
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Inicialización principal
document.addEventListener('DOMContentLoaded', async () => {
    allProducts = await getProducts();
    allCategories = await getCategories();
    renderHeader(allCategories);
    renderBanner(allCategories);
    renderCategorizedCarousels(allCategories, allProducts);
    updateCartCount();
});