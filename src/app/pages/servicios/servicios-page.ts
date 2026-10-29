import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Servicios } from '../../components/servicios/servicios';
import { EncabezadoPagina } from '../../shared/encabezado-pagina/encabezado-pagina';

@Component({
  selector: 'app-servicios-page',
  imports: [EncabezadoPagina, Servicios],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-encabezado-pagina
      pagina="Servicios"
      titulo="Servicios"
      acento="& comodidades"
      texto="Todo lo que necesitas durante tu estadía, en un solo lugar." />
    <app-servicios />
  `,
})
export class ServiciosPage {}
