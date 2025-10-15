const API_BASE_URL = "https://fakestoreapi.com";

/**
 * Muestra u oculta el spinner de carga.
 * @param {boolean} isLoading - Estado de carga.
 */
function toggleLoading(isLoading) {
    const spinner = document.getElementById('spinner');
    if (spinner) {
        spinner.classList.toggle('hidden', !isLoading);
    }
}

/**
 * Obtiene todos los productos.
 * @returns {Promise<Array>} Lista de productos.
 */
export async function getProducts() {
    toggleLoading(true);
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No pudimos cargar los productos. Inténtalo más tarde.',
        });
        return [];
    } finally {
        toggleLoading(false);
    }
}

/**
 * Obtiene un producto por ID.
 * @param {number} id - ID del producto.
 * @returns {Promise<Object>} El objeto producto.
 */
export async function getProductById(id) {
    toggleLoading(true);
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No pudimos cargar el detalle del producto.',
        });
        return null;
    } finally {
        toggleLoading(false);
    }
}

/**
 * Obtiene las categorías de productos.
 * @returns {Promise<Array>} Lista de strings con los nombres de las categorías.
 */
export async function getCategories() {
    try {
        const response = await fetch(`${API_BASE_URL}/products/categories`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}

/**
 * Obtiene productos por categoría.
 * @param {string} category 
 * @returns {Promise<Array>} 
 */
export async function getProductsByCategory(category) {
    toggleLoading(true);
    try {
        const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching products for category ${category}:`, error);
        return [];
    } finally {
        toggleLoading(false);
    }
}