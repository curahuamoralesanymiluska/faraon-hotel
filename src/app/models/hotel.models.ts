import { IconName } from '../shared/icon/icon';

export interface Habitacion {
  id: string;
  nombre: string;
  tipo: string;
  capacidad: number;
  descripcion: string;
  /** Tarifa por noche en soles. null = aún sin definir (se muestra "Consultar tarifa"). */
  precio: number | null;
  /** Ruta a la foto, por ejemplo 'assets/img/habitaciones/clasica.jpg'. */
  imagen?: string;
  /** Ruta a la foto 360° equirectangular (2:1), por ejemplo 'assets/360/clasica.jpg'. */
  panorama?: string;
}

export interface Servicio {
  icono: IconName;
  titulo: string;
  descripcion: string;
}

export interface Experiencia {
  icono: IconName;
  titulo: string;
}

export interface Resena {
  nombre: string;
  ciudad: string;
  texto: string;
  estrellas: number;
}

export interface Cifra {
  valor: string;
  etiqueta: string;
}

export interface Distancia {
  lugar: string;
  tiempo: string;
}

export interface HotelInfo {
  nombre: string;
  ciudad: string;
  direccion: string;
  distrito: string;
  telefono: string;
  correo: string;
  checkIn: string;
  checkOut: string;
  /** URL de Google Maps en modo "embed" (Compartir › Insertar un mapa). */
  mapaUrl: string;
  /** URL para el botón "Cómo llegar". */
  comoLlegarUrl: string;
  heroImagen?: string;
  historiaImagen?: string;
  historia: string;
  cifras: Cifra[];
  distancias: Distancia[];
  redes: { facebook: string; instagram: string; tiktok: string };
}

/** Lo que el huésped busca desde la barra de reserva. */
export interface CriterioBusqueda {
  llegada: string; // yyyy-MM-dd
  salida: string;  // yyyy-MM-dd
  adultos: number;
  ninos: number;
}
