
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


let allProducts = [];
let displayedProductsCount = 9; 
const PRODUCTS_PER_LOAD = 9;

document.addEventListener('DOMContentLoaded', async () => {
  
    allProducts = await getProducts();
    await renderCategories();
    renderProducts(allProducts.slice(0, displayedProductsCount));


    loadMoreButton.addEventListener('click', loadMoreProducts);
    searchInput.addEventListener('input', debounce(handleSearch, 300));

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
            window.location.href = `/pages/producto.html?id=${productId}`;
        }
    });

    updateCartCount();
});


@param {Array} products
 
function renderProducts(products) {
    if (!productsContainer) return;


    productsContainer.innerHTML = products.length === 0 ? '<p class="text-center col-span-full text-gray-500">No se encontraron productos.</p>' : '';

    products.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });

 
    if (loadMoreButton) {
        loadMoreButton.classList.toggle('hidden', displayedProductsCount >= allProducts.length);
    }
}


 @param {Object} product
 @returns {HTMLElement}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-[1.02]';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-contain p-4">
        <div class="p-4">
            <h3 class="font-bold text-lg mb-2 truncate">${product.title}</h3>
            <p class="text-gray-600 text-sm mb-3 capitalize">${product.category}</p>
            <p class="text-xl font-extrabold text-indigo-600 mb-4">$${product.price.toFixed(2)}</p>
            <div class="flex justify-between items-center">
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


@param {string} text
@param {string} category
@returns {HTMLElement} 

function createCategoryButton(text, category) {
    const btn = document.createElement('button');
    btn.textContent = text.charAt(0).toUpperCase() + text.slice(1);
    btn.dataset.category = category;
    btn.className = 'py-2 px-4 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 transition duration-150 category-filter capitalize';
    return btn;
}


@param {string} category

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


    let filtered = [];
    if (category === 'all') {
        filtered = allProducts;
    } else {
      
        filtered = allProducts.filter(p => p.category === category);
    }


    displayedProductsCount = PRODUCTS_PER_LOAD;
    renderProducts(filtered.slice(0, displayedProductsCount));

}



function loadMoreProducts() {
    if (displayedProductsCount < allProducts.length) {
        displayedProductsCount += PRODUCTS_PER_LOAD;
        renderProducts(allProducts.slice(0, displayedProductsCount));
    }
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
    );


    displayedProductsCount = PRODUCTS_PER_LOAD;
    renderProducts(filteredProducts.slice(0, displayedProductsCount));

   
    if (loadMoreButton) {
        loadMoreButton.classList.toggle('hidden', filteredProducts.length <= PRODUCTS_PER_LOAD);
    }
}


 @param {Function} func
 @param {number} delay

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}