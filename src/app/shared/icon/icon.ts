import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Íconos lineales propios (trazo 24x24) para mantener un estilo uniforme. */
const ICONOS = {
  wifi: 'M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01',
  auto: 'M5 16v-5l2-5h10l2 5v5M3 16h18v2H3zM7 18v2M17 18v2M5 11h14',
  comida: 'M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9zM17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 3v3M12 3v3',
  spa: 'M12 21c-4-2-7-5-7-9 3 0 5 1.5 7 4 2-2.5 4-4 7-4 0 4-3 7-7 9zM12 16c-1.5-2-1.5-5 0-8 1.5 3 1.5 6 0 8z',
  cama: 'M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 14h18M7 9V6h4v3',
  reloj: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2',
  ubicacion: 'M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12zM12 6.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z',
  telefono: 'M4 5h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 14l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 3 6a1 1 0 0 1 1-1z',
  avion: 'M2 16l20-6-3-3-6 2-6-4-2 1 4 5-4 1-2-1-1 1zM3 20h18',
  montana: 'M3 20l6-12 4 7 3-4 5 9zM17 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4z',
  copas: 'M8 3l1 6a3 3 0 0 1-6 0l1-6zM6 12v9M4 21h4M16 3l-1 6a3 3 0 0 0 6 0l-1-6zM18 12v9M16 21h4',
  flecha: 'M5 12h14M13 6l6 6-6 6',
  imagen: 'M4 4h16v16H4zM9 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM20 16l-5-5-10 9',
  giro360: 'M3 12a9 4 0 1 0 18 0a9 4 0 1 0-18 0M12 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM16 7.6l2.4.6-.6 2.3',
  facebook: 'M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z',
  instagram: 'M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM17.5 6.5h.01',
  tiktok: 'M14 3v11a3.5 3.5 0 1 1-3.5-3.5M14 3c.5 3 2.5 5 5 5',
  menu: 'M4 7h16M4 12h16M4 17h16',
  cerrar: 'M6 6l12 12M18 6L6 18',
  calendario: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  personas: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21a7 7 0 0 1 14 0M17 11a3 3 0 1 0 0-6M22 21a5 5 0 0 0-5-5',
  check: 'M5 12l5 5 9-10',
} as const;

export type IconName = keyof typeof ICONOS;

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: inline-flex; flex: none' },
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="trazo()"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true">
      <path [attr.d]="ruta()" />
    </svg>
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input(24);
  readonly trazo = input(1.5);
  protected readonly ruta = computed(() => ICONOS[this.name()]);
}
