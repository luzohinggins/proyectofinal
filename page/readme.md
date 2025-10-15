# 🛍️ 💡LuzShop - Proyecto Demo de eCommerce

Este proyecto es un sitio web funcional tipo eCommerce construido para demostrar habilidades en **Frontend**, consumo de **APIs** y **diseño responsivo** con un enfoque moderno.

## 🚀 Tecnologías Utilizadas

* **HTML5** para la maquetación semántica.
* **Tailwind CSS (CDN)** para estilos rápidos y responsivos.
* **JavaScript (ES6+)** para la interactividad y la lógica de negocio.
* **Fake Store API** para obtener datos de productos.
* **SweetAlert2** para alertas de usuario.
* **JS-Confetti** para efectos visuales (éxito de compra).

## 💡 Estructura y Modularización

El código JavaScript está dividido para una mejor organización:

| Archivo | Rol |
| :--- | :--- |
| `js/api.js` | Funciones para obtener datos de la API. |
| `js/carrito.js` | Lógica para gestionar el estado del carrito (guardado en `localStorage`). |
| `js/app.js` | **Lógica principal:** Carga, renderizado de productos, filtros y manejo de eventos. |

## 📦 Endpoints Clave

| Endpoint | Descripción |
| :--- | :--- |
| `/products` | Todos los productos |
| `/products/categories` | Listado de categorías |
| `/products/category/{nombre}` | Productos filtrados por categoría |

## 🔗 Enlaces Importantes

* **Página principal:** `index.html`
* **Detalle de Producto:** `pages/producto.html` (usa query params para el ID)
* **Carrito de Compras:** `pages/carrito.html`

## 🖼️ Recursos Visuales

Las imágenes de los banners de categoría se encuentran en la carpeta `img/`.

| Imagen | Categoría |
| :--- | :--- |
| `electronics.jpg` | electronics |
| `luxury.jewelri.jpg` | jewelery |
| `menslothing.jpg` | men's clothing |
| `Women’sclothing.jpg` | women's clothing |
