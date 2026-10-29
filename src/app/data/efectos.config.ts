/**
 * Configuración de los efectos animados (polvo dorado, intro, brillo de oro, friso...).
 *
 * respetarMovimientoReducido:
 *   true  → si el visitante tiene desactivadas las animaciones en su sistema
 *           (Windows: Accesibilidad › Efectos visuales › Efectos de animación),
 *           la web apaga los efectos. Es lo recomendado para una web pública.
 *   false → los efectos se muestran siempre.
 */
export const EFECTOS = {
  respetarMovimientoReducido: false,

  /**
   * introUnaVezPorPestana:
   *   false → la intro con el logo sale cada vez que se abre o recarga la página.
   *   true  → sale solo la primera vez en cada pestaña del navegador.
   */
  introUnaVezPorPestana: false,
};

/** true si hay que mostrar la web sin animaciones. */
export function menosMovimiento(): boolean {
  if (!EFECTOS.respetarMovimientoReducido || typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
