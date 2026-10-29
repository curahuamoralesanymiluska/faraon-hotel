import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HOTEL } from '../../data/hotel.data';
import { Icon } from '../../shared/icon/icon';
import { Revelar } from '../../shared/efectos/revelar';

@Component({
  selector: 'app-ubicacion',
  imports: [Icon, Revelar],
  templateUrl: './ubicacion.html',
  styleUrl: './ubicacion.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Ubicacion {
  protected readonly hotel = HOTEL;
  /** Angular bloquea URLs en iframes por seguridad; esta es fija y nuestra, así que la marcamos como confiable. */
  protected readonly mapa = inject(DomSanitizer).bypassSecurityTrustResourceUrl(HOTEL.mapaUrl);
}
