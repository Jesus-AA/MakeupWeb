# Maria Martha Makeup

Web de Maria Martha, maquilladora y peinadora de novias e invitadas en Madrid. Las clientas ven los servicios y precios, el portafolio y cómo reservar, y contactan por WhatsApp.

## Uso

Abre `index.html` en el navegador. No hace falta servidor ni dependencias. En Netlify se publica tal cual (ver `netlify.toml`), sin paso de build.

## Secciones

- **Inicio**: mensaje principal, botón de reserva por WhatsApp y datos clave.
- **Mi forma de trabajar**: tres puntos que diferencian el servicio.
- **Servicios y tarifas**: pestañas Novias / Invitadas con paquetes nupciales, servicios sueltos y condiciones.
- **Portafolio**: 18 fotos filtrables (Novias, Invitadas, Peinados) con visor a pantalla completa.
- **Cómo reservar**: los 4 pasos, de la consulta al día de la boda.
- **Sobre mí**, **Testimonios** y **Preguntas frecuentes**.
- **Contacto**: WhatsApp, email, teléfono y redes.

## Contacto por WhatsApp

No hay formulario. Cada enlace con el atributo `data-wa` abre WhatsApp con un mensaje ya escrito:

```html
<a href="https://wa.me/34685444317" data-wa="Hola María, me interesa el Paquete Nupcial 1">…</a>
```

Si `data-wa` está vacío se usa el mensaje general. El número y el mensaje general están en `js/modules/utils.js`.

## Precios

Los precios están escritos en `index.html`, en la sección `#servicios`. Las hojas originales están en `Precios/` (fuera de git).

## Fotos del portafolio

Cada foto puede llevar un recorte propio en la cuadrícula, sin modificar el archivo original:

```html
<img src="…" style="--pos: 58% 42%; --zoom: 1.25;">
```

- `--pos`: punto de la foto que queda centrado (horizontal y vertical).
- `--zoom`: ampliación para dejar fuera fondos que distraen.

Al abrir la foto en el visor se ve completa, sin recorte.

## Diseño (dirección "Rosa Cereza")

| Token | Color | Uso |
|-------|-------|-----|
| `--polvo` | `#FBF0EE` | Fondo principal |
| `--nata` | `#FFF9F8` | Secciones claras |
| `--rubor` | `#F3D3CF` | Chips, pestañas, bandas |
| `--rosa` | `#C9788A` | Detalles decorativos |
| `--cereza` | `#8C1D3A` | Botones, enlaces y precios |
| `--tinta` | `#2B1B21` | Texto |

Tipografías: **Instrument Serif** para titulares (con la palabra clave en cursiva) y **Figtree** para el texto.

## Estructura

```
MakeupWeb/
├── index.html
├── favicon.svg
├── css/styles.css
├── js/
│   ├── app.js              # Punto de entrada
│   └── modules/
│       ├── utils.js        # Enlaces de WhatsApp, año del footer
│       ├── header.js       # Menú móvil, enlace activo
│       ├── tabs.js         # Pestañas de tarifas
│       ├── gallery.js      # Filtros y visor del portafolio
│       └── faq.js          # Acordeón de preguntas
├── Fotos Maquillaje/
└── Testimonios/
```
