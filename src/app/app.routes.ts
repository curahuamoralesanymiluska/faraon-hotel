import { Routes } from '@angular/router';

/**
 * Cada módulo es una página independiente.
 * Se cargan bajo demanda (lazy loading): solo se descarga la página que se visita.
 */
export const routes: Routes = [
  {
    path: '',
    title: 'Faraón Class Hotel',
    loadComponent: () => import('./pages/inicio/inicio-page').then((m) => m.InicioPage),
  },
  {
    path: 'habitaciones',
    title: 'Habitaciones · Faraón Class Hotel',
    loadComponent: () => import('./pages/habitaciones/habitaciones-page').then((m) => m.HabitacionesPage),
  },
  {
    path: 'servicios',
    title: 'Servicios · Faraón Class Hotel',
    loadComponent: () => import('./pages/servicios/servicios-page').then((m) => m.ServiciosPage),
  },
  {
    path: 'ubicacion',
    title: 'Ubicación · Faraón Class Hotel',
    loadComponent: () => import('./pages/ubicacion/ubicacion-page').then((m) => m.UbicacionPage),
  },
  {
    path: 'resenas',
    title: 'Reseñas · Faraón Class Hotel',
    loadComponent: () => import('./pages/resenas/resenas-page').then((m) => m.ResenasPage),
  },
  {
    path: 'contacto',
    title: 'Contacto · Faraón Class Hotel',
    loadComponent: () => import('./pages/contacto/contacto-page').then((m) => m.ContactoPage),
  },
  { path: '**', redirectTo: '' },
];
