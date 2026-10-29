import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { HOTEL } from '../../data/hotel.data';
import { Icon } from '../../shared/icon/icon';
import { PolvoDorado } from '../../shared/efectos/polvo-dorado';
import { Friso } from '../../shared/efectos/friso';

/** Fecha local en formato yyyy-MM-dd (el que usa <input type="date">). */
function fechaIso(dias = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + dias);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

/** La salida debe ser posterior a la llegada. */
function fechasValidas(grupo: AbstractControl): ValidationErrors | null {
  const llegada = grupo.get('llegada')?.value as string;
  const salida = grupo.get('salida')?.value as string;
  if (!llegada || !salida) return null;
  return salida > llegada ? null : { fechas: true };
}

@Component({
  selector: 'app-hero',
  imports: [ReactiveFormsModule, RouterLink, Icon, PolvoDorado, Friso],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  private readonly router = inject(Router);

  protected readonly hotel = HOTEL;
  protected readonly hoy = fechaIso();
  protected readonly adultos = [1, 2, 3, 4];
  protected readonly ninos = [0, 1, 2, 3];

  protected readonly form = inject(NonNullableFormBuilder).group(
    {
      llegada: [fechaIso(), Validators.required],
      salida: [fechaIso(1), Validators.required],
      adultos: [2, Validators.required],
      ninos: [0],
    },
    { validators: fechasValidas },
  );

  protected enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Lleva a la página de habitaciones con la búsqueda en la URL:
    // /habitaciones?llegada=2026-10-28&salida=2026-10-29&adultos=2&ninos=0
    const v = this.form.getRawValue();
    this.router.navigate(['/habitaciones'], {
      queryParams: { llegada: v.llegada, salida: v.salida, adultos: v.adultos, ninos: v.ninos },
    });
  }
}
