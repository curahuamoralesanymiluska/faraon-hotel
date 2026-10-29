import { ChangeDetectionStrategy, Component, afterNextRender, signal } from '@angular/core';
import { menosMovimiento } from '../../data/efectos.config';

const CLAVE = 'faraon-intro-vista';

/**
 * Presentación de entrada: una pirámide dorada se dibuja, sale el sol sobre ella
 * y aparece el nombre del hotel. Se muestra una sola vez por visita.
 * Un clic la salta, y no aparece si el usuario pidió menos movimiento.
 */
@Component({
  selector: 'app-intro-faraon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (estado() !== 'oculta') {
      <div class="intro" [class.saliendo]="estado() === 'saliendo'" (click)="cerrar()" aria-hidden="true">
        <svg class="piramide" viewBox="0 0 200 150" fill="none">
          <circle class="sol" cx="100" cy="34" r="12" />
          <path class="trazo" d="M10 140 L100 50 L190 140 Z" />
          <path class="trazo trazo--interior" d="M55 95 H145 M33 117 H167 M100 50 V140" />
        </svg>
        <span class="nombre">Faraōn</span>
        <span class="sub">Class Hotel</span>
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
      gap: 6px;
      background: radial-gradient(circle at 50% 45%, #3A2616 0%, var(--espresso-2) 65%);
      cursor: pointer;
      transition: opacity 0.7s ease, visibility 0.7s ease;
    }
    .saliendo { opacity: 0; visibility: hidden; }
    .piramide { width: min(220px, 50vw); overflow: visible; }
    .trazo {
      stroke: var(--dorado);
      stroke-width: 1.6;
      stroke-linejoin: round;
      stroke-dasharray: 420;
      stroke-dashoffset: 420;
      animation: dibujar 1.3s ease forwards;
    }
    .trazo--interior {
      stroke-width: 0.9;
      opacity: 0.6;
      animation-delay: 0.6s;
    }
    .sol {
      fill: var(--dorado);
      opacity: 0;
      filter: drop-shadow(0 0 12px rgba(247, 212, 142, 0.9));
      animation: amanecer 1s ease 1.1s forwards;
    }
    .nombre {
      font-family: var(--font-serif);
      font-size: clamp(44px, 9vw, 72px);
      font-weight: 600;
      line-height: 1;
      color: var(--dorado);
      opacity: 0;
      letter-spacing: 0.3em;
      animation: aparecer 1s ease 1.3s forwards;
    }
    .sub {
      font-size: 12px;
      letter-spacing: 0.5em;
      text-transform: uppercase;
      color: var(--texto-claro);
      opacity: 0;
      animation: aparecer 1s ease 1.6s forwards;
    }
    @keyframes dibujar { to { stroke-dashoffset: 0; } }
    @keyframes amanecer {
      from { opacity: 0; transform: translateY(14px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes aparecer {
      to { opacity: 1; letter-spacing: 0.08em; }
    }
  `,
})
export class IntroFaraon {
  protected readonly estado = signal<'visible' | 'saliendo' | 'oculta'>('oculta');

  constructor() {
    afterNextRender(() => {
      let yaVista = false;
      try {
        yaVista = sessionStorage.getItem(CLAVE) === '1';
        sessionStorage.setItem(CLAVE, '1');
      } catch {
        /* sin almacenamiento: se muestra igual */
      }
      if (yaVista || menosMovimiento()) return;

      this.estado.set('visible');
      setTimeout(() => this.cerrar(), 2700);
    });
  }

  protected cerrar(): void {
    if (this.estado() !== 'visible') return;
    this.estado.set('saliendo');
    setTimeout(() => this.estado.set('oculta'), 700);
  }
}
