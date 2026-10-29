import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Resenas } from '../../components/resenas/resenas';
import { EncabezadoPagina } from '../../shared/encabezado-pagina/encabezado-pagina';

@Component({
  selector: 'app-resenas-page',
  imports: [EncabezadoPagina, Resenas],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-encabezado-pagina
      pagina="Reseñas"
      titulo="Lo que dicen"
      acento="nuestros huéspedes"
      imagen="assets/img/habitaciones/suite-faraon.jpg" />
    <app-resenas />
  `,
})
export class ResenasPage {}
