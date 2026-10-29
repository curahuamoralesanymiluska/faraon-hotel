import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RESENAS } from '../../data/hotel.data';
import { Revelar } from '../../shared/efectos/revelar';

@Component({
  selector: 'app-resenas',
  imports: [Revelar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="seccion oscuro resenas">
      <div class="container">
        <ng-content select="[encabezado]" />
        <div class="grid">
          @for (r of resenas; track $index) {
            <figure class="resena" [class.resena--destacada]="$index === 1" [appRevelar]="$index * 150">
              <div class="resena__avatar" aria-hidden="true">{{ r.nombre.charAt(0) }}</div>
              <div class="resena__estrellas" [attr.aria-label]="r.estrellas + ' de 5 estrellas'">
                {{ '★'.repeat(r.estrellas) }}
              </div>
              <blockquote>{{ r.texto }}</blockquote>
              <figcaption>{{ r.nombre }} · {{ r.ciudad }}</figcaption>
            </figure>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .resenas { background: var(--espresso-2); }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 28px;
    }
    .resena {
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 32px;
      text-align: center;
      border: 1px solid var(--borde-oscuro);
      border-radius: var(--radio-md);
    }
    .resena--destacada { background: var(--espresso); }
    .resena__avatar {
      width: 64px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid var(--dorado);
      border-radius: 50%;
      background: var(--cafe);
      font-family: var(--font-serif);
      font-size: 26px;
      color: var(--dorado);
    }
    .resena__estrellas { color: var(--dorado); letter-spacing: 4px; }
    blockquote {
      margin: 0;
      font-family: var(--font-serif);
      font-size: 21px;
      font-style: italic;
      line-height: 1.45;
      color: #F3E9DA;
    }
    figcaption {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--texto-claro);
    }
  `,
})
export class Resenas {
  protected readonly resenas = RESENAS;
}
