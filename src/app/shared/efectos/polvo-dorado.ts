import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { menosMovimiento } from '../../data/efectos.config';

interface Particula {
  x: number;
  y: number;
  r: number;
  vy: number;
  fase: number;
  brillo: number;
}

/**
 * Polvo de oro flotando, como arena del desierto iluminada.
 * Se coloca encima de un fondo (position: relative) y no bloquea los clics.
 * Se pausa cuando no está en pantalla (ver data/efectos.config.ts).
 */
@Component({
  selector: 'app-polvo-dorado',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `<canvas #lienzo></canvas>`,
  styles: `
    :host { position: absolute; inset: 0; pointer-events: none; display: block; }
    canvas { width: 100%; height: 100%; display: block; }
  `,
})
export class PolvoDorado {
  /** Cantidad de partículas por cada 100.000 px² de área. */
  readonly densidad = input(6);

  private readonly lienzo = viewChild.required<ElementRef<HTMLCanvasElement>>('lienzo');

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (menosMovimiento()) return;

      const canvas = this.lienzo().nativeElement;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let ancho = 0;
      let alto = 0;
      let particulas: Particula[] = [];
      let enPantalla = true;
      let frame = 0;

      const crear = (y = Math.random() * alto): Particula => ({
        x: Math.random() * ancho,
        y,
        r: Math.random() * 1.6 + 0.4,
        vy: Math.random() * 0.25 + 0.08,
        fase: Math.random() * Math.PI * 2,
        brillo: Math.random() * 0.5 + 0.3,
      });

      const ajustar = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        ancho = canvas.clientWidth;
        alto = canvas.clientHeight;
        canvas.width = ancho * dpr;
        canvas.height = alto * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const total = Math.round(((ancho * alto) / 100000) * this.densidad());
        particulas = Array.from({ length: Math.min(total, 140) }, () => crear());
      };

      const dibujar = (t: number) => {
        ctx.clearRect(0, 0, ancho, alto);
        for (const p of particulas) {
          p.y -= p.vy;
          p.x += Math.sin(t / 2200 + p.fase) * 0.15;
          if (p.y < -5) Object.assign(p, crear(alto + 5));
          const titileo = 0.55 + 0.45 * Math.sin(t / 700 + p.fase);
          ctx.beginPath();
          ctx.fillStyle = `rgba(247, 212, 142, ${(p.brillo * titileo).toFixed(3)})`;
          ctx.shadowColor = 'rgba(247, 212, 142, 0.8)';
          ctx.shadowBlur = p.r * 4;
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        if (enPantalla) frame = requestAnimationFrame(dibujar);
      };

      const redimension = new ResizeObserver(ajustar);
      redimension.observe(canvas);

      const visibilidad = new IntersectionObserver(([e]) => {
        enPantalla = e.isIntersecting;
        cancelAnimationFrame(frame);
        if (enPantalla) frame = requestAnimationFrame(dibujar);
      });
      visibilidad.observe(canvas);

      ajustar();
      frame = requestAnimationFrame(dibujar);

      destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        redimension.disconnect();
        visibilidad.disconnect();
      });
    });
  }
}
