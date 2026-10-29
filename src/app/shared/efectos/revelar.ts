import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

/**
 * Hace que un elemento "emerja de la arena": aparece subiendo y desenfocado
 * cuando entra en pantalla al hacer scroll.
 *
 * Uso: <div appRevelar></div>   o con retraso en ms: <div [appRevelar]="200"></div>
 */
@Directive({
  selector: '[appRevelar]',
  host: { class: 'revelar' },
})
export class Revelar {
  readonly retraso = input(0, {
    alias: 'appRevelar',
    transform: (v: unknown) => Number(v) || 0,
  });

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    let observador: IntersectionObserver | undefined;
    let temporizador: ReturnType<typeof setTimeout> | undefined;

    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') {
        el.classList.add('visible');
        return;
      }
      const retraso = this.retraso();
      if (retraso) el.style.transitionDelay = `${retraso}ms`;

      observador = new IntersectionObserver(
        (entradas) => {
          if (!entradas.some((e) => e.isIntersecting)) return;
          el.classList.add('visible');
          observador?.disconnect();
          // Quita el retraso al terminar, para que el hover responda al instante
          temporizador = setTimeout(() => (el.style.transitionDelay = ''), retraso + 1000);
        },
        { threshold: 0.15 },
      );
      observador.observe(el);
    });

    inject(DestroyRef).onDestroy(() => {
      observador?.disconnect();
      clearTimeout(temporizador);
    });
  }
}
