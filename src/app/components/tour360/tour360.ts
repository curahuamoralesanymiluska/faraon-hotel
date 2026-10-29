import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  afterNextRender,
  input,
  output,
  viewChild,
} from '@angular/core';
import { Habitacion } from '../../models/hotel.models';
import { Icon } from '../../shared/icon/icon';

/** Pannellum se carga desde el CDN en index.html. */
declare const pannellum: {
  viewer(contenedor: HTMLElement, opciones: Record<string, unknown>): { destroy(): void };
} | undefined;

@Component({
  selector: 'app-tour360',
  imports: [Icon],
  templateUrl: './tour360.html',
  styleUrl: './tour360.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'cerrar.emit()' },
})
export class Tour360 implements OnDestroy {
  readonly habitacion = input.required<Habitacion>();
  readonly cerrar = output<void>();

  private readonly visor = viewChild<ElementRef<HTMLElement>>('visor');
  private readonly botonCerrar = viewChild.required<ElementRef<HTMLButtonElement>>('botonCerrar');
  private instancia?: { destroy(): void };

  constructor() {
    afterNextRender(() => {
      this.botonCerrar().nativeElement.focus();
      const panorama = this.habitacion().panorama;
      const contenedor = this.visor()?.nativeElement;
      if (panorama && contenedor && typeof pannellum !== 'undefined') {
        this.instancia = pannellum.viewer(contenedor, {
          type: 'equirectangular',
          panorama,
          autoLoad: true,
          autoRotate: -2,
          showZoomCtrl: true,
          compass: false,
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.instancia?.destroy();
  }
}
