import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PolvoDorado } from '../efectos/polvo-dorado';
import { Friso } from '../efectos/friso';

/** Banda oscura con el título de cada página interna (Habitaciones, Servicios, etc.). */
@Component({
  selector: 'app-encabezado-pagina',
  imports: [RouterLink, PolvoDorado, Friso],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="encabezado-pagina oscuro">
      @if (imagen()) {
        <img class="fondo" [src]="imagen()" alt="" />
      }
      <div class="velo"></div>
      <svg class="piramide" viewBox="0 0 400 300" fill="none" aria-hidden="true">
        <circle class="sol" cx="200" cy="58" r="22" />
        <path d="M20 290 L200 110 L380 290 Z" />
        <path class="linea" d="M110 200 H290 M65 245 H335 M155 155 H245 M200 110 V290" />
      </svg>
      <app-polvo-dorado [densidad]="5" />
      <div class="container contenido">
        <nav aria-label="Ruta" class="migas">
          <a routerLink="/">Inicio</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{{ pagina() }}</span>
        </nav>
        <div class="macron"></div>
        <h1 class="titulo">{{ titulo() }} <em class="oro-brillo">{{ acento() }}</em></h1>
        @if (texto()) {
          <p>{{ texto() }}</p>
        }
      </div>
    </header>
    <app-friso />
  `,
  styles: `
    .encabezado-pagina {
      position: relative;
      overflow: hidden;
      background: var(--espresso-2);
    }
    .fondo {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 78% 40%;
    }
    .velo {
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, rgba(30, 20, 12, 0.95) 0%, rgba(30, 20, 12, 0.75) 60%, rgba(30, 20, 12, 0.55) 100%);
    }
    .piramide {
      position: absolute;
      right: max(24px, calc((100% - 1240px) / 2));
      bottom: 0;
      width: 360px;
      stroke: rgba(247, 212, 142, 0.35);
      stroke-width: 1.2;
      stroke-linejoin: round;
    }
    .piramide .linea { stroke-width: 0.8; opacity: 0.7; }
    .sol {
      fill: rgba(247, 212, 142, 0.85);
      stroke: none;
      transform-origin: 200px 58px;
      filter: drop-shadow(0 0 18px rgba(247, 212, 142, 0.8));
      animation: latido-sol 5s ease-in-out infinite;
    }
    @keyframes latido-sol {
      0%, 100% { transform: scale(1); opacity: 0.75; }
      50% { transform: scale(1.12); opacity: 1; }
    }
    @media (max-width: 900px) { .piramide { display: none; } }
    .contenido {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding-top: 72px;
      padding-bottom: 64px;
    }
    .migas {
      display: flex;
      gap: 10px;
      font-size: 12px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--texto-claro);
      a { color: var(--dorado); text-decoration: none; }
      a:hover { text-decoration: underline; }
    }
    .titulo { font-size: clamp(40px, 5.5vw, 68px); }
    p { margin: 0; max-width: 560px; font-size: 16px; line-height: 1.7; color: var(--texto-claro); }
  `,
})
export class EncabezadoPagina {
  readonly pagina = input.required<string>();
  readonly titulo = input.required<string>();
  readonly acento = input('');
  readonly texto = input('');
  readonly imagen = input<string | undefined>('assets/img/hero.jpg');
}
