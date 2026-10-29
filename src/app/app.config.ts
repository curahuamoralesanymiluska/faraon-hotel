import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEsPe from '@angular/common/locales/es-PE';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

// Fechas en español de Perú (ej. "29 oct.")
registerLocaleData(localeEsPe);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: LOCALE_ID, useValue: 'es-PE' },
    provideRouter(
      routes,
      // Los parámetros de la URL (?llegada=...) llegan como inputs del componente de la página
      withComponentInputBinding(),
      // Al cambiar de página vuelve arriba; los enlaces con #ancla bajan a esa sección
      withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' }),
    ),
  ],
};
