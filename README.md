# Maria Martha - Book Me

Pagina web profesional para un estudio de maquillaje de novias, disenada para que las clientas conozcan los servicios, resuelvan sus dudas y puedan agendar su cita de manera sencilla.

## Demo

Abre el archivo `index.html` en cualquier navegador para visualizar la pagina. No requiere servidor ni dependencias adicionales.

## Secciones

- **Header** - Navegacion fija con menu responsivo (hamburguesa en movil)
- **Hero** - Presentacion principal con imagen de fondo y llamada a la accion
- **La Experiencia** - Cards con los servicios destacados del estudio
- **Galeria** - Portafolio visual con looks de maquillaje
- **FAQ** - Seccion de preguntas frecuentes con acordeon interactivo
- **Testimonios** - Resenas de clientas con fotos y valoraciones
- **Contacto** - Formulario de reserva e informacion de contacto
- **Footer** - Enlaces, informacion legal y redes sociales

## Tecnologias

- **HTML5** - Estructura semantica
- **CSS3** - Estilos modernos con diseno responsivo
- **JavaScript** - Interactividad (acordeon, menu movil, scroll suave, formulario)
- **Font Awesome** - Iconos vectoriales
- **Google Fonts** - Tipografia Playfair Display + Raleway
- **Formspree** - Procesamiento del formulario de contacto (sin servidor propio)

## Paleta de Colores

| Color | Codigo |
|-------|--------|
| Dorado | `#C9A96E` |
| Crema | `#FFFCF8` |
| Beige | `#F5F0EB` |
| Texto oscuro | `#2C2C2C` |
| Negro | `#1A1A1A` |

## Responsive Design

La pagina se adapta a los siguientes puntos de quiebre:

- **Desktop**: > 992px
- **Tablet**: 768px - 992px
- **Movil**: 480px - 768px
- **Movil pequeno**: < 480px

## Validacion del Formulario

El formulario incluye validacion en el lado del cliente antes de enviar los datos:

- **Email**: Validacion de formato basico (nombre@dominio.com)
- **Telefono movil**: Validacion de numero movil espanol. Acepta:
  - Formato nacional: `612345678` (9 digitos empezando por 6 o 7)
  - Formato internacional: `+34612345678` (con prefijo +34)
- Los errores se muestran en un contenedor rojo sobre el formulario y resaltando cada campo invalido

## Estructura del Proyecto

```
maria-martha/
+-- index.html              # Pagina principal
+-- css/
|   +-- styles.css          # Estilos CSS
+-- js/
|   +-- script.js           # JavaScript (FAQ, menu, formulario)
+-- Dummy Pictures/         # Imagenes de stock
|   +-- gettyimages-*.jpg
|   +-- ...
+-- README.md               # Este archivo
```

## Uso

1. Clona o descarga el repositorio
2. Abre `index.html` en tu navegador
3. Personaliza los textos, imagenes y colores segun tu marca
4. Configura Formspree para activar el formulario de contacto

---

Desarrollado con ❤️ por Maria Martha