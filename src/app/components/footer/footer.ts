import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HOTEL } from '../../data/hotel.data';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon/icon';
import { Friso } from '../../shared/efectos/friso';

@Component({
  selector: 'app-footer',
  imports: [Icon, RouterLink, Friso],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-friso />
    <footer class="footer">
      <div class="container grid">
        <div class="marca">
          <span class="marca__nombre">Faraōn</span>
          <span class="marca__sub">Class Hotel</span>
          <p>Descanso con clase en {{ hotel.ciudad }}.</p>
        </div>

        <nav aria-label="Enlaces del hotel">
          <h3>Hotel</h3>
          <a routerLink="/habitaciones">Habitaciones</a>
          <a routerLink="/servicios">Servicios</a>
          <a routerLink="/ubicacion">Ubicación</a>
          <a routerLink="/resenas">Reseñas</a>
        </nav>

        <div>
          <h3>Contacto</h3>
          <span>{{ hotel.telefono }}</span>
          <span>{{ hotel.correo }}</span>
          <span>{{ hotel.direccion }}</span>
        </div>

        <div>
          <h3>Síguenos</h3>
          <div class="redes">
            <a [href]="hotel.redes.facebook" aria-label="Facebook"><app-icon name="facebook" [size]="18" [trazo]="1.6" /></a>
            <a [href]="hotel.redes.instagram" aria-label="Instagram"><app-icon name="instagram" [size]="18" [trazo]="1.6" /></a>
            <a [href]="hotel.redes.tiktok" aria-label="TikTok"><app-icon name="tiktok" [size]="18" [trazo]="1.6" /></a>
          </div>
          <a routerLink="/" fragment="reservar" class="btn btn--borde-dorado reservar">Reservar</a>
        </div>
      </div>

      <div class="container legal">
        <span>© {{ anio }} Faraón Class Hotel</span>
        <span>Política de privacidad · Términos y condiciones</span>
      </div>
    </footer>
  `,
  styles: `
    .footer { background: var(--espresso); color: var(--texto-claro); font-size: 14px; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 40px;
      padding-top: 64px;
      padding-bottom: 32px;
      > div, > nav { display: flex; flex-direction: column; align-items: flex-start; gap: 10px; }
    }
    h3 {
      margin: 0 0 4px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: var(--dorado);
    }
    a { text-decoration: none; }
    nav a:hover { color: var(--dorado); }
    .marca__nombre { font-family: var(--font-serif); font-size: 38px; font-weight: 600; line-height: 1; color: var(--dorado); }
    .marca__sub { font-size: 12px; letter-spacing: 0.35em; text-transform: uppercase; color: var(--dorado); }
    .marca p { margin: 6px 0 0; color: #C9B596; }
    .redes { display: flex; gap: 10px; }
    .redes a {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(247, 212, 142, 0.4);
      border-radius: 50%;
      color: var(--dorado);
      transition: background-color 0.3s ease, color 0.3s ease;
      &:hover { background: var(--dorado); color: var(--espresso); }
    }
    .reservar { margin-top: 6px; }
    .legal {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 12px;
      padding-top: 20px;
      padding-bottom: 32px;
      border-top: 1px solid #4A3626;
      font-size: 12px;
      color: #C9B596;
    }
  `,
})
export class Footer {
  protected readonly hotel = HOTEL;
  protected readonly anio = new Date().getFullYear();
}
