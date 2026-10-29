import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Icon } from '../../shared/icon/icon';
import { Revelar } from '../../shared/efectos/revelar';

@Component({
  selector: 'app-contacto',
  imports: [ReactiveFormsModule, Icon, Revelar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="seccion">
      <div class="container">
        <ng-content select="[encabezado]" />
        <div class="panel" appRevelar>
          <div class="panel__texto">
            <h2 class="titulo">¿Necesitas ayuda <em class="oro-brillo">para reservar?</em></h2>
            <p>Déjanos tu número y te escribimos por WhatsApp con disponibilidad y tarifas.</p>
          </div>

          @if (enviado()) {
            <div class="exito" role="status">
              <span class="exito__icono"><app-icon name="check" [size]="22" [trazo]="2" /></span>
              <div>
                <strong>¡Gracias!</strong>
                <p>Te escribiremos pronto al {{ form.controls.telefono.value }}.</p>
              </div>
            </div>
          } @else {
            <form class="formulario" [formGroup]="form" (ngSubmit)="enviar()" novalidate>
              <label class="campo" for="telefono">Tu celular</label>
              <div class="fila">
                <input
                  id="telefono"
                  type="tel"
                  inputmode="numeric"
                  maxlength="9"
                  placeholder="9XX XXX XXX"
                  formControlName="telefono"
                  [attr.aria-invalid]="form.controls.telefono.invalid && form.controls.telefono.touched"
                  aria-describedby="telefono-error" />
                <button type="submit" class="btn btn--oscuro">Enviar</button>
              </div>
              @if (form.controls.telefono.invalid && form.controls.telefono.touched) {
                <p id="telefono-error" class="error">Ingresa un celular válido de 9 dígitos que empiece con 9.</p>
              }
              <label class="acepto">
                <input type="checkbox" formControlName="acepto" />
                Acepto el tratamiento de mis datos personales
              </label>
              @if (form.controls.acepto.invalid && form.controls.acepto.touched) {
                <p class="error">Necesitamos tu autorización para contactarte.</p>
              }
            </form>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .panel {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 40px;
      padding: 48px;
      border-radius: var(--radio-lg);
      background: #fff;
      box-shadow: var(--sombra);
    }
    .panel__texto {
      flex: 1 1 340px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      .titulo { font-size: clamp(32px, 3.5vw, 46px); }
      p { margin: 0; max-width: 440px; color: var(--texto-suave); }
    }
    .formulario, .exito { flex: 1 1 420px; }
    .formulario { display: flex; flex-direction: column; gap: 12px; }
    .campo { color: var(--texto-suave); }
    .fila { display: flex; flex-wrap: wrap; gap: 10px; }
    input[type='tel'] {
      flex: 1 1 220px;
      min-height: 50px;
      padding: 14px 20px;
      border: 1px solid var(--borde);
      border-radius: 999px;
      background: var(--crema);
      color: var(--espresso);
      font-family: var(--font-sans);
      font-size: 15px;
      &[aria-invalid='true'] { border-color: #B3261E; }
    }
    .acepto {
      display: flex;
      align-items: center;
      gap: 10px;
      min-height: 44px;
      font-size: 13px;
      color: var(--texto-suave);
      input { width: 18px; height: 18px; accent-color: var(--caramelo); }
    }
    .error { margin: 0; font-size: 13px; color: #B3261E; }
    .exito {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      border-radius: var(--radio-md);
      background: var(--crema);
      p { margin: 2px 0 0; color: var(--texto-suave); }
      strong { font-family: var(--font-serif); font-size: 24px; }
    }
    .exito__icono {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: none;
      border-radius: 50%;
      background: var(--caramelo);
      color: #fff;
    }
    @media (max-width: 720px) {
      .panel { padding: 32px 24px; }
    }
  `,
})
export class Contacto {
  protected readonly enviado = signal(false);

  protected readonly form = inject(NonNullableFormBuilder).group({
    telefono: ['', [Validators.required, Validators.pattern(/^9\d{8}$/)]],
    acepto: [false, Validators.requiredTrue],
  });

  protected enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Más adelante: enviar al backend (POST /api/contactos) o abrir WhatsApp.
    this.enviado.set(true);
  }
}
