import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, input, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CriterioBusqueda, Habitacion } from '../../models/hotel.models';
import { HabitacionesService } from '../../services/habitaciones.service';
import { Icon } from '../../shared/icon/icon';
import { Revelar } from '../../shared/efectos/revelar';

@Component({
  selector: 'app-habitaciones',
  imports: [Icon, DatePipe, RouterLink, Revelar],
  templateUrl: './habitaciones.html',
  styleUrl: './habitaciones.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Habitaciones {
  /** Búsqueda hecha desde la barra de reserva (null = mostrar todas). */
  readonly criterio = input<CriterioBusqueda | null>(null);
  readonly limpiar = output<void>();
  readonly verTour = output<Habitacion>();

  private readonly servicio = inject(HabitacionesService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly habitaciones = signal<Habitacion[]>([]);

  constructor() {
    effect(() => {
      const c = this.criterio();
      const consulta$ = c ? this.servicio.buscarDisponibles(c) : this.servicio.listar();
      consulta$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((lista) => this.habitaciones.set(lista));
    });
  }

  protected huespedes(c: CriterioBusqueda): number {
    return c.adultos + c.ninos;
  }
}
