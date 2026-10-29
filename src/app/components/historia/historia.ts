import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HOTEL } from '../../data/hotel.data';
import { Icon } from '../../shared/icon/icon';
import { Revelar } from '../../shared/efectos/revelar';

@Component({
  selector: 'app-historia',
  imports: [Icon, Revelar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="seccion">
      <div class="container">
        <div class="panel" appRevelar>
          <div class="panel__foto">
            @if (hotel.historiaImagen) {
              <img class="foto" [src]="hotel.historiaImagen" alt="Fachada iluminada del hotel" />
            } @else {
              <div class="foto-vacia"><app-icon name="imagen" [size]="24" /> Foto: recepción o lobby</div>
            }
          </div>
          <div class="panel__texto">
            <span class="eyebrow">Bienvenido a</span>
            <h2 class="titulo">Faraón <em class="oro-brillo">Class Hotel</em></h2>
            <p>{{ hotel.historia }}</p>
            <dl class="cifras">
              @for (c of hotel.cifras; track c.etiqueta) {
                <div class="cifra" [appRevelar]="300 + $index * 120">
                  <dt>{{ c.etiqueta }}</dt>
                  <dd>{{ c.valor }}</dd>
                </div>
              }
            </dl>
          </div>
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
      padding: 20px;
      background: #fff;
      border-radius: var(--radio-lg);
      box-shadow: var(--sombra);
    }
    .panel__foto {
      flex: 1 1 380px;
      height: 340px;
      border-radius: var(--radio-md);
      overflow: hidden;
      > div { height: 100%; }
    }
    .panel__texto {
      flex: 999 1 420px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      padding: 12px 20px 12px 0;
      p { margin: 0; max-width: 560px; color: var(--texto-suave); line-height: 1.8; }
    }
    .cifras {
      margin: 8px 0 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 20px;
    }
    .cifra {
      display: flex;
      flex-direction: column-reverse;
      gap: 4px;
      padding-top: 12px;
      border-top: 2px solid var(--caramelo);
      dd { margin: 0; font-family: var(--font-serif); font-size: 40px; font-weight: 600; line-height: 1; }
      dt { font-size: 12px; color: var(--texto-suave); }
    }
    @media (max-width: 720px) {
      .panel__texto { padding: 0 8px 12px; }
      .panel__foto { height: 240px; }
    }
  `,
})
export class Historia {
  protected readonly hotel = HOTEL;
}
