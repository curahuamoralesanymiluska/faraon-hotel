import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EXPERIENCIAS, SERVICIOS } from '../../data/hotel.data';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon/icon';
import { Revelar } from '../../shared/efectos/revelar';
import { PolvoDorado } from '../../shared/efectos/polvo-dorado';

/** Servicios del hotel + banner oscuro de experiencias. */
@Component({
  selector: 'app-servicios',
  imports: [Icon, RouterLink, Revelar, PolvoDorado],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="seccion">
      <div class="container">
        <ng-content select="[encabezado]" />
        <div class="grid">
          @for (s of servicios; track s.titulo) {
            <div class="servicio" [appRevelar]="($index % 3) * 120">
              <span class="servicio__icono"><app-icon [name]="s.icono" /></span>
              <div>
                <h3>{{ s.titulo }}</h3>
                <p>{{ s.descripcion }}</p>
              </div>
            </div>
          }
        </div>

        <div class="banner oscuro" appRevelar>
          <app-polvo-dorado [densidad]="10" />
          <div class="banner__texto">
            <h2 class="titulo">Experiencias <em class="oro-brillo">a tu medida</em></h2>
            <p>Organizamos tu llegada, tus paseos y tus celebraciones para que solo te preocupes por disfrutar.</p>
            <a routerLink="/contacto" class="btn btn--dorado">Consultar</a>
          </div>
          <ul class="banner__items">
            @for (e of experiencias; track e.titulo) {
              <li>
                <span class="banner__icono"><app-icon [name]="e.icono" [size]="28" [trazo]="1.4" /></span>
                {{ e.titulo }}
              </li>
            }
          </ul>
        </div>
      </div>
    </section>
  `,
  styles: `
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 40px 48px;
    }
    .servicio {
      display: flex;
      gap: 18px;
      h3 { margin: 0 0 6px; font-family: var(--font-serif); font-size: 24px; font-weight: 600; line-height: 1.15; }
      p { margin: 0; font-size: 14px; color: var(--texto-suave); }
    }
    .servicio__icono {
      width: 52px;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: none;
      border: 1px solid var(--borde);
      border-radius: 14px;
      background: #fff;
      color: var(--caramelo-oscuro);
      transition: background-color 0.3s ease, color 0.3s ease;
    }
    .servicio:hover .servicio__icono { background: var(--caramelo); color: #fff; border-color: var(--caramelo); transform: rotate(-6deg) scale(1.06); }
    .servicio__icono { transition: background-color 0.3s ease, color 0.3s ease, transform 0.4s ease; }

    .banner {
      margin-top: 96px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 40px;
      padding: 48px;
      border-radius: var(--radio-lg);
      background: var(--espresso);
      position: relative;
      overflow: hidden;
    }
    .banner__texto, .banner__items { position: relative; }
    .banner__texto {
      flex: 1 1 360px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
      .titulo { font-size: clamp(32px, 3.5vw, 44px); }
      p { margin: 0; max-width: 420px; color: var(--texto-claro); line-height: 1.7; }
    }
    .banner__items {
      flex: 1 1 420px;
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 20px;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        text-align: center;
        font-size: 13px;
        line-height: 1.4;
        color: var(--texto-claro);
      }
    }
    .banner__icono {
      width: 64px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--dorado);
      border-radius: 50%;
      color: var(--dorado);
    }
    @media (max-width: 720px) {
      .banner { margin-top: 64px; padding: 32px 24px; }
    }
  `,
})
export class Servicios {
  protected readonly servicios = SERVICIOS;
  protected readonly experiencias = EXPERIENCIAS;
}
