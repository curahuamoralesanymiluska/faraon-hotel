# Faraón Class Hotel · Landing page

Landing en **Angular 22** (componentes standalone, signals y formularios reactivos), con la paleta del logo.

## Cómo ejecutarla

```bash
npm install
npm start          # abre http://localhost:4200
npm run build      # versión para producción en dist/
```

## Dónde cambiar el contenido

Todo el texto y los datos están en **`src/app/data/hotel.data.ts`**. Lo que está entre `[CORCHETES]` se reemplaza por los datos reales:

- `HOTEL`: dirección, teléfono, horarios, cifras, distancias y redes sociales.
- `mapaUrl` / `comoLlegarUrl`: cambia `'Ayacucho, Perú'` por la dirección exacta del hotel.
- `HABITACIONES`: nombre, capacidad, descripción y `precio` (en soles; `null` muestra "Consultar tarifa").
- `SERVICIOS`, `EXPERIENCIAS`, `RESENAS`.

## Imágenes

Guárdalas en `public/assets/` y escribe la ruta en `hotel.data.ts`:

| Qué | Carpeta sugerida | Campo |
|---|---|---|
| Portada | `public/assets/img/hero.jpg` | `heroImagen` |
| Recepción / lobby | `public/assets/img/lobby.jpg` | `historiaImagen` |
| Foto de cada habitación | `public/assets/img/habitaciones/` | `imagen` |
| Foto 360° (2:1) | `public/assets/360/` | `panorama` |

Ejemplo: `imagen: 'assets/img/habitaciones/nilo.jpg'`. Si un campo está vacío, se muestra un espacio marcado en su lugar.

## Recorrido 360°

Se usa **Pannellum** (cargado desde el CDN en `src/index.html`). Al agregar `panorama` a una habitación, el botón "Recorrido 360°" abre el visor interactivo.

## Páginas

El Inicio reúne todos los módulos, y cada módulo tiene además su propia página (Angular Router, con carga diferida):

| Ruta | Página | Contenido |
|---|---|---|
| `/` | Inicio | Todo junto: portada, presentación, habitaciones, servicios, ubicación, reseñas y contacto |
| `/habitaciones` | Habitaciones | Cards con recorrido 360°. La barra de reserva llega aquí con `?llegada=…&salida=…&adultos=…&ninos=…` |
| `/servicios` | Servicios | Servicios y experiencias |
| `/ubicacion` | Ubicación | Dirección, distancias y mapa |
| `/resenas` | Reseñas | Opiniones de huéspedes |
| `/contacto` | Contacto | Formulario para que el hotel te escriba |

El menú (`navbar`) y el pie (`footer`) son comunes a todas las páginas (`app.ts`).

> Al publicarla en un hosting, configura que todas las rutas devuelvan `index.html`
> (en GitHub Pages: copia `index.html` como `404.html` dentro de `dist/faraon-hotel/browser`).

## Estructura

```
src/app/
├── app.routes.ts   ← rutas de cada página
├── pages/          ← una carpeta por página (inicio, habitaciones, servicios, ubicacion, resenas, contacto)
├── components/     ← piezas que usan las páginas: navbar, hero, historia, habitaciones,
│                     tour360, ubicacion, servicios, resenas, contacto, footer
├── data/           hotel.data.ts       ← contenido editable
├── models/         hotel.models.ts     ← interfaces
├── services/       habitaciones.service.ts
└── shared/         icon (íconos SVG) y encabezado-pagina (banda con el título de cada página)
```

## Efectos animados

Polvo dorado, intro con pirámide, brillo de oro en los títulos, friso egipcio y aparición al hacer scroll.
Se controlan en `src/app/data/efectos.config.ts`:

- `respetarMovimientoReducido: false` → los efectos se ven siempre (valor actual).
- `respetarMovimientoReducido: true` → se apagan si el visitante desactivó las animaciones en su sistema.

La intro aparece una vez por visita; para verla de nuevo, abre la página en una pestaña nueva.

## Siguiente paso: conectar con Spring Boot

`HabitacionesService` hoy devuelve datos locales. Cuando tengas la API, reemplaza sus métodos por llamadas con `HttpClient` (el ejemplo está comentado en el archivo) y agrega `provideHttpClient()` en `app.config.ts`. Los componentes no necesitan cambios.
