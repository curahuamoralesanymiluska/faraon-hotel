import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Habitaciones } from '../../components/habitaciones/habitaciones';
import { Tour360 } from '../../components/tour360/tour360';
import { EncabezadoPagina } from '../../shared/encabezado-pagina/encabezado-pagina';
import { CriterioBusqueda, Habitacion } from '../../models/hotel.models';

@Component({
  selector: 'app-habitaciones-page',
  imports: [EncabezadoPagina, Habitaciones, Tour360],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-encabezado-pagina
      pagina="Habitaciones"
      titulo="Habitaciones"
      acento="& suites"
      texto="Espacios cálidos para descansar de verdad. Mira cada habitación por dentro con el recorrido 360°."
      imagen="assets/img/habitaciones/nilo.jpg" />

    <app-habitaciones [criterio]="criterio()" (limpiar)="verTodas()" (verTour)="tour.set($event)" />

    @if (tour(); as habitacion) {
      <app-tour360 [habitacion]="habitacion" (cerrar)="tour.set(null)" />
    }
  `,
})
export class HabitacionesPage {
  private readonly router = inject(Router);

  // Llegan desde la URL: /habitaciones?llegada=...&salida=...&adultos=...&ninos=...
  readonly llegada = input<string>();
  readonly salida = input<string>();
  readonly adultos = input<string>();
  readonly ninos = input<string>();

  /** Búsqueda activa (null si se entró sin filtros). */
  protected readonly criterio = computed<CriterioBusqueda | null>(() => {
    const llegada = this.llegada();
    const salida = this.salida();
    if (!llegada || !salida) return null;
    return { llegada, salida, adultos: Number(this.adultos() ?? 1), ninos: Number(this.ninos() ?? 0) };
  });

  /** Habitación cuyo recorrido 360° está abierto. */
  protected readonly tour = signal<Habitacion | null>(null);

  protected verTodas(): void {
    this.router.navigate(['/habitaciones']);
  }
}
