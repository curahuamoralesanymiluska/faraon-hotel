import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Revelar } from '../efectos/revelar';
import { Icon } from '../icon/icon';

/**
 * Título de cada módulo dentro del Inicio, con un enlace a su página completa.
 * Toma los colores claros u oscuros de la sección donde se coloca.
 */
@Component({
  selector: 'app-titulo-seccion',
  imports: [RouterLink, Revelar, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="titulo-seccion" appRevelar>
      <div class="textos">
        <div class="macron"></div>
        <span class="eyebrow">{{ eyebrow() }}</span>
        <h2 class="titulo">{{ titulo() }} <em class="oro-brillo">{{ acento() }}</em></h2>
      </div>
      @if (enlace()) {
        <a class="ver-mas" [routerLink]="enlace()">
          {{ textoEnlace() }} <app-icon name="flecha" [size]="16" [trazo]="2" />
        </a>
      }
    </div>
  `,
  styles: `
    .titulo-seccion {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 48px;
    }
    .textos { display: flex; flex-direction: column; gap: 14px; }
    .ver-mas {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      min-height: 44px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      text-decoration: none;
      color: var(--caramelo-oscuro);
      border-bottom: 1px solid currentColor;
    }
    :host-context(.oscuro) .ver-mas { color: var(--dorado); }
    .ver-mas app-icon { transition: transform 0.3s ease; }
    .ver-mas:hover app-icon { transform: translateX(4px); }
  `,
})
export class TituloSeccion {
  readonly eyebrow = input('');
  readonly titulo = input.required<string>();
  readonly acento = input('');
  /** Ruta de la página completa del módulo (opcional). */
  readonly enlace = input<string>();
  readonly textoEnlace = input('Ver más');
}
