import { ChangeDetectionStrategy, Component, DOCUMENT, inject } from '@angular/core';
import { menosMovimiento } from './data/efectos.config';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { IntroFaraon } from './shared/efectos/intro-faraon';

/** Estructura común a todas las páginas: menú arriba, la página activa y el pie. */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, IntroFaraon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-navbar />
    <main>
      <router-outlet />
    </main>
    <app-footer />
    <app-intro-faraon />
  `,
})
export class App {
  constructor() {
    // Apaga las animaciones solo si la configuración lo pide (data/efectos.config.ts)
    if (menosMovimiento()) inject(DOCUMENT).documentElement.classList.add('menos-movimiento');
  }
}
