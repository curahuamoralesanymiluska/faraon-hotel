import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Contacto } from '../../components/contacto/contacto';
import { EncabezadoPagina } from '../../shared/encabezado-pagina/encabezado-pagina';

@Component({
  selector: 'app-contacto-page',
  imports: [EncabezadoPagina, Contacto],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-encabezado-pagina
      pagina="Contacto"
      titulo="Hablemos de"
      acento="tu estadía"
      texto="Te respondemos por WhatsApp con disponibilidad y tarifas." />
    <app-contacto />
  `,
})
export class ContactoPage {}
