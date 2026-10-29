import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { Historia } from '../../components/historia/historia';
import { Habitaciones } from '../../components/habitaciones/habitaciones';
import { Tour360 } from '../../components/tour360/tour360';
import { Servicios } from '../../components/servicios/servicios';
import { Ubicacion } from '../../components/ubicacion/ubicacion';
import { Resenas } from '../../components/resenas/resenas';
import { Contacto } from '../../components/contacto/contacto';
import { TituloSeccion } from '../../shared/titulo-seccion/titulo-seccion';
import { Habitacion } from '../../models/hotel.models';

/**
 * Página de inicio: reúne todos los módulos del hotel uno tras otro.
 * Cada módulo también tiene su propia página (ver app.routes.ts).
 */
@Component({
  selector: 'app-inicio-page',
  imports: [Hero, Historia, Habitaciones, Tour360, Servicios, Ubicacion, Resenas, Contacto, TituloSeccion],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-historia />

    <app-habitaciones (verTour)="tour.set($event)">
      <app-titulo-seccion
        encabezado
        eyebrow="Nuestras habitaciones"
        titulo="Habitaciones"
        acento="& suites"
        enlace="/habitaciones"
        textoEnlace="Ver todas" />
    </app-habitaciones>

    <app-servicios>
      <app-titulo-seccion
        encabezado
        eyebrow="Servicios"
        titulo="Pensado para"
        acento="tu comodidad"
        enlace="/servicios" />
    </app-servicios>

    <app-ubicacion />

    <app-resenas>
      <app-titulo-seccion
        encabezado
        eyebrow="Reseñas"
        titulo="Lo que dicen"
        acento="nuestros huéspedes"
        enlace="/resenas" />
    </app-resenas>

    <app-contacto />

    @if (tour(); as habitacion) {
      <app-tour360 [habitacion]="habitacion" (cerrar)="tour.set(null)" />
    }
  `,
})
export class InicioPage {
  /** Habitación cuyo recorrido 360° está abierto. */
  protected readonly tour = signal<Habitacion | null>(null);
}
