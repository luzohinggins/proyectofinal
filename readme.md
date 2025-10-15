# ✨ LuzShop Demo | Proyecto Frontend Moderno

¡Bienvenido a LuzShop Demo!  
Este proyecto representa el cierre de mi formación en Frontend, donde el objetivo fue crear una tienda online **100% dinámica**, rápida y con una experiencia de usuario moderna, usando **JavaScript puro** y **Tailwind CSS**.

---

## 🚀 Visión y Logros

- **Renderizado Dinámico Total:**  
  El header, los banners y el catálogo se generan desde `app.js` tras consumir la API.  
  No hay productos estáticos en el HTML.

- **Header Inteligente:**  
  El header es fijo y responsivo, con categorías cargadas dinámicamente, buscador y carrito.  
  Incluye la opción **"Ver Todos"** para navegar fácilmente por todo el catálogo.

- **Banners Dinámicos:**  
  Un carrusel de banners rotativo cada 2 segundos, usando imágenes locales y enlazando a cada categoría.

- **Catálogo por Categoría:**  
  Cada categoría se muestra en un carrusel horizontal con portada grande y flechas de navegación.  
  El diseño divide la sección en portada (1/3) y carrusel navegable (2/3).

- **Carrito Persistente:**  
  Los productos seleccionados se guardan en `localStorage` y el contador se actualiza en tiempo real.

- **Checkout y Detalle:**  
  SweetAlert2 para alertas y confetti en el checkout.  
  Página de detalle de producto con información completa y botón de añadir al carrito.

- **Precios Locales:**  
  Todos los precios se muestran en **Guaraníes Paraguayos (PYG)**, calculados automáticamente.

---

## 🎨 Características Clave

| Característica         | Decisión Técnica                                                                 |
|-----------------------|----------------------------------------------------------------------------------|
| Header Fijo           | Sticky, responsivo, con categorías dinámicas, buscador y carrito con contador.   |
| Banners Dinámicos     | Carrusel CSS/JS, rotación automática, enlaza a cada categoría.                   |
| Catálogo Agrupado     | Portada grande + carrusel horizontal con flechas, por cada categoría.            |
| Carrito Persistente   | Lógica en `js/carrito.js`, usando localStorage.                                  |
| Checkout con Éxito    | SweetAlert2 + js-confetti para experiencia de compra divertida.                  |
| Detalle de Producto   | Página dedicada, consumo por ID desde la URL.                                    |

---

## ⚙️ Estructura del Proyecto

- **index.html**  
  Esqueleto con contenedores principales (`header`, `main`, `footer`). Todo el contenido se inyecta desde JS.

- **js/app.js**  
  Renderiza el header, banners, carruseles y maneja eventos (clicks, búsqueda).

- **js/api.js**  
  Funciones asíncronas para consumir la [FakeStoreAPI](https://fakestoreapi.com/products).

- **js/carrito.js**  
  Lógica de carrito, persistencia y contador global.

- **img/**  
  Imágenes de portada por categoría:  
  - `electronics.jpg`  
  - `jewelery.jpg`  
  - `mensclothing.jpg`  
  - `womensclothing.jpg`

- **page/**  
  Páginas de detalle de producto y carrito.

---

## 💻 Instalación y Personalización

1. Descarga el proyecto y asegúrate de tener todas las imágenes en `/img`.
2. Abre `index.html` en tu navegador.
3. ¡Listo para explorar!

**Tip:**  
Para cambiar la moneda local, modifica la variable `dolarToPYG` en `js/app.js`.

---

¡Explora, aprende y disfruta el código tanto como yo disfruté creándolo!

