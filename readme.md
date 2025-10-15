# 💡 LuzShop Demo

Tienda online demo desarrollada en JavaScript puro + TailwindCSS.

## Características

- **Header fijo** con logo, categorías dinámicas (desde la API), buscador y carrito.
- **Banners dinámicos** debajo del header, rotan cada 2 segundos y filtran por categoría al hacer click.
- **Catálogo de productos** agrupado por categoría, cada grupo en carrusel horizontal con portada/banner de la categoría.
- **Precios en guaraníes paraguayos** (PYG) calculados automáticamente.
- **Carrito de compras** persistente en localStorage, con contador en el header.
- **Detalle de producto** con toda la información y botón de añadir al carrito.
- **Checkout simulado** con confetti y vaciado de carrito.
- **Footer** con enlaces a redes sociales.

## Estructura

- `index.html`: Solo contenedores, todo el renderizado es dinámico desde JS.
- `js/app.js`: Renderiza header, banners, catálogo y maneja eventos.
- `js/api.js`: Conexión a la API [FakeStoreAPI](https://fakestoreapi.com/products).
- `js/carrito.js`: Lógica de carrito y contador.
- `img/`: Imágenes de portada por categoría.
- `page/`: Detalle de producto y carrito.

## Instalación

Solo necesitas abrir `index.html` en tu navegador.  
Asegúrate de tener las imágenes en la carpeta `/img` con los nombres:
- `electronics.jpg`
- `jewelery.jpg`
- `mensclothing.jpg`
- `womensclothing.jpg`

## Personalización

- Cambia el tipo de cambio en `app.js` (`dolarToPYG`) si lo deseas.
- Puedes agregar más categorías y productos modificando la API o el JS.

---

¿Listo para vender? 🚀
