import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HABITACIONES } from '../data/hotel.data';
import { CriterioBusqueda, Habitacion } from '../models/hotel.models';

/**
 * Por ahora trabaja con datos locales.
 * Cuando tengas el backend en Spring Boot, cambia los métodos por llamadas HTTP, por ejemplo:
 *
 *   private http = inject(HttpClient);
 *   listar() { return this.http.get<Habitacion[]>('/api/habitaciones'); }
 *   buscarDisponibles(c: CriterioBusqueda) {
 *     return this.http.get<Habitacion[]>('/api/habitaciones/disponibles', { params: { ...c } });
 *   }
 *
 * (y agrega provideHttpClient() en app.config.ts). Los componentes no cambian.
 */
@Injectable({ providedIn: 'root' })
export class HabitacionesService {
  listar(): Observable<Habitacion[]> {
    return of(HABITACIONES);
  }

  buscarDisponibles(criterio: CriterioBusqueda): Observable<Habitacion[]> {
    const huespedes = criterio.adultos + criterio.ninos;
    return of(HABITACIONES.filter((h) => h.capacidad >= huespedes));
  }
}
