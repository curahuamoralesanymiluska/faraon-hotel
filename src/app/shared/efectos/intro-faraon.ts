import { ChangeDetectionStrategy, Component, afterNextRender, signal } from '@angular/core';
import { EFECTOS, menosMovimiento } from '../../data/efectos.config';
import { PolvoDorado } from './polvo-dorado';

const CLAVE = 'faraon-intro-vista';
const LOGO = 'assets/img/logo-dorado.png';

/**
 * Presentación de entrada con el logo del hotel:
 * el logo se descubre de izquierda a derecha, un reflejo de luz lo recorre
 * y queda brillando entre polvo dorado. Sale al abrir o recargar la página
 * (ver data/efectos.config.ts) y un clic la salta.
 */
@Component({
  selector: 'app-intro-faraon',
  imports: [PolvoDorado],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (estado() !== 'oculta') {
      <div class="intro" [class.saliendo]="estado() === 'saliendo'" (click)="cerrar()" aria-hidden="true">
        <app-polvo-dorado [densidad]="14" />
        <div class="halo"></div>
        <div class="logo">
          <img [src]="logo" alt="" />
          <span class="reflejo" [style.mask-image]="'url(' + logo + ')'" [style.-webkit-mask-image]="'url(' + logo + ')'"></span>
        </div>
        <span class="linea"></span>
      </div>
    }
  `,
  styles: `
    .intro {
      position: fixed;
      inset: 0;
      z-index: 200;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 28px;
      background: radial-gradient(circle at 50% 45%, #3A2616 0%, var(--espresso-2) 65%);
      cursor: pointer;
      transition: opacity 0.8s ease, visibility 0.8s ease;
    }
    .saliendo { opacity: 0; visibility: hidden; }

    /* Resplandor dorado detrás del logo */
    .halo {
      position: absolute;
      width: min(720px, 90vw);
      aspect-ratio: 2 / 1;
      border-radius: 50%;
      background: radial-gradient(ellipse, rgba(247, 212, 142, 0.22) 0%, transparent 65%);
      opacity: 0;
      animation: halo 2.6s ease 0.4s forwards;
    }

    .logo {
      position: relative;
      width: min(520px, 78vw);
      /* Se descubre de izquierda a derecha, como arena que se aparta */
      clip-path: inset(0 100% 0 0);
      filter: blur(6px);
      animation: descubrir 1.5s cubic-bezier(0.65, 0, 0.35, 1) 0.2s forwards;
    }
    .logo img { display: block; width: 100%; height: auto; }

    /* Reflejo de luz que recorre solo la forma del logo */
    .reflejo {
      position: absolute;
      inset: 0;
      background: linear-gradient(105deg, transparent 35%, rgba(255, 246, 221, 0.95) 50%, transparent 65%);
      background-size: 250% 100%;
      background-position: 120% 0;
      -webkit-mask-size: 100% 100%;
      mask-size: 100% 100%;
      animation: reflejo 1.2s ease 1.6s forwards;
    }

    /* Línea dorada que se abre bajo el logo */
    .linea {
      position: relative;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--dorado), transparent);
      animation: linea 1s ease 1.4s forwards;
    }

    @keyframes descubrir {
      to { clip-path: inset(0 0 0 0); filter: blur(0); }
    }
    @keyframes reflejo {
      to { background-position: -20% 0; }
    }
    @keyframes halo {
      50% { opacity: 1; transform: scale(1.05); }
      to { opacity: 0.8; transform: scale(1); }
    }
    @keyframes linea {
      to { width: min(260px, 50vw); }
    }
  `,
})
export class IntroFaraon {
  protected readonly logo = LOGO;
  protected readonly estado = signal<'visible' | 'saliendo' | 'oculta'>('oculta');

  constructor() {
    afterNextRender(() => {
      let yaVista = false;
      if (EFECTOS.introUnaVezPorPestana) {
        try {
          yaVista = sessionStorage.getItem(CLAVE) === '1';
          sessionStorage.setItem(CLAVE, '1');
        } catch {
          /* sin almacenamiento: se muestra igual */
        }
      }
      if (yaVista || menosMovimiento()) return;

      this.estado.set('visible');
      setTimeout(() => this.cerrar(), 3200);
    });
  }

  protected cerrar(): void {
    if (this.estado() !== 'visible') return;
    this.estado.set('saliendo');
    setTimeout(() => this.estado.set('oculta'), 800);
  }
}
