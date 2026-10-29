import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IsActiveMatchOptions, RouterLink, RouterLinkActive } from '@angular/router';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-navbar',
  imports: [Icon, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  protected readonly abierto = signal(false);

  /** Marca el enlace activo según la página, aunque la URL traiga filtros (?llegada=...). */
  protected readonly opcionesActivo: IsActiveMatchOptions = {
    paths: 'exact',
    queryParams: 'ignored',
    fragment: 'ignored',
    matrixParams: 'ignored',
  };

  protected readonly enlaces = [
    { texto: 'Inicio', ruta: '/' },
    { texto: 'Habitaciones', ruta: '/habitaciones' },
    { texto: 'Servicios', ruta: '/servicios' },
    { texto: 'Ubicación', ruta: '/ubicacion' },
    { texto: 'Reseñas', ruta: '/resenas' },
    { texto: 'Contacto', ruta: '/contacto' },
  ];

  protected alternar(): void {
    this.abierto.update((v) => !v);
  }

  protected cerrar(): void {
    this.abierto.set(false);
  }
}
