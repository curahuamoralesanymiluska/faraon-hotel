import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Ubicacion } from '../../components/ubicacion/ubicacion';
import { EncabezadoPagina } from '../../shared/encabezado-pagina/encabezado-pagina';

@Component({
  selector: 'app-ubicacion-page',
  imports: [EncabezadoPagina, Ubicacion],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-encabezado-pagina
      pagina="Ubicación"
      titulo="Ubicación"
      acento="& mapa"
      texto="Cerca de lo que quieres visitar y fácil de encontrar."
      imagen="assets/img/fachada.jpg" />
    <app-ubicacion />
  `,
})
export class UbicacionPage {}
