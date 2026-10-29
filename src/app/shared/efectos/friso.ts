import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Friso egipcio: una banda con pirámides escalonadas y el disco solar,
 * que avanza muy despacio como una procesión. Sirve de separador entre secciones.
 */
@Component({
  selector: 'app-friso',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'aria-hidden': 'true',
    '[class.claro]': "tono() === 'claro'",
  },
  template: `<div class="banda"></div>`,
  styles: `
    :host {
      display: block;
      background: var(--espresso-2);
      border-top: 1px solid rgba(247, 212, 142, 0.45);
      border-bottom: 1px solid rgba(247, 212, 142, 0.45);
      padding: 3px 0;
    }
    .banda {
      height: 22px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='22' viewBox='0 0 32 22'%3E%3Cpath d='M0 19h6v-4h4v-4h4v-4h4v4h4v4h4v4h6' fill='none' stroke='%23F7D48E' stroke-width='1.2'/%3E%3Ccircle cx='16' cy='3.2' r='1.6' fill='%23F7D48E'/%3E%3C/svg%3E");
      background-repeat: repeat-x;
      background-position: 0 center;
      animation: procesion 60s linear infinite;
    }
    :host(.claro) {
      background: var(--crema-2);
      border-color: rgba(196, 120, 42, 0.45);
    }
    :host(.claro) .banda {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='22' viewBox='0 0 32 22'%3E%3Cpath d='M0 19h6v-4h4v-4h4v-4h4v4h4v4h4v4h6' fill='none' stroke='%23C4782A' stroke-width='1.2'/%3E%3Ccircle cx='16' cy='3.2' r='1.6' fill='%23C4782A'/%3E%3C/svg%3E");
    }
    @keyframes procesion {
      to { background-position: 320px center; }
    }
  `,
})
export class Friso {
  readonly tono = input<'oscuro' | 'claro'>('oscuro');
}
