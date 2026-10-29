import { Experiencia, Habitacion, HotelInfo, Resena, Servicio } from '../models/hotel.models';

/*
 * Contenido de la landing en un solo lugar.
 * Todo lo que está entre [CORCHETES] es para reemplazar con los datos reales del hotel.
 * Más adelante, las habitaciones vendrán de la API de Spring Boot (ver HabitacionesService).
 */

export const HOTEL: HotelInfo = {
  nombre: 'Faraón Class Hotel',
  ciudad: '[CIUDAD]',
  direccion: '[Dirección completa del hotel]',
  distrito: '[Distrito, Ciudad]',
  telefono: '[Teléfono / WhatsApp]',
  correo: '[correo@hotel.com]',
  checkIn: '[Hora de entrada]',
  checkOut: '[Hora de salida]',
  // Reemplaza "Ayacucho, Perú" por la dirección exacta del hotel, o pega aquí la URL de "Insertar un mapa".
  mapaUrl: 'https://www.google.com/maps?q=' + encodeURIComponent('Ayacucho, Perú') + '&output=embed',
  comoLlegarUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Ayacucho, Perú'),
  heroImagen: 'assets/img/hero.jpg',
  historiaImagen: 'assets/img/fachada.jpg',
  historia:
    '[Historia breve del hotel: cuándo nació, qué lo hace especial y por qué los huéspedes vuelven.]',
  cifras: [
    { valor: '[N]', etiqueta: 'años de experiencia' },
    { valor: '[N]', etiqueta: 'habitaciones' },
    { valor: '[N]', etiqueta: 'huéspedes al año' },
    { valor: '[N]', etiqueta: 'calificación promedio' },
  ],
  distancias: [
    { lugar: 'Plaza principal', tiempo: '[X] min' },
    { lugar: 'Aeropuerto', tiempo: '[X] min' },
    { lugar: 'Terminal terrestre', tiempo: '[X] min' },
  ],
  redes: {
    facebook: '#',
    instagram: '#',
    tiktok: '#',
  },
};

export const HABITACIONES: Habitacion[] = [
  {
    id: 'clasica',
    nombre: 'Habitación Clásica',
    tipo: 'Simple',
    capacidad: 1,
    descripcion: 'Cómoda y funcional, ideal para viajes de trabajo.',
    precio: null,
    imagen: 'assets/img/habitaciones/clasica.jpg',
    // panorama: 'assets/360/clasica.jpg',
  },
  {
    id: 'nilo',
    nombre: 'Habitación Nilo',
    tipo: 'Doble',
    capacidad: 2,
    descripcion: 'Luz cálida, cama king y baño con tina.',
    precio: null,
    imagen: 'assets/img/habitaciones/nilo.jpg',
  },
  {
    id: 'suite-faraon',
    nombre: 'Suite Faraón',
    tipo: 'Suite',
    capacidad: 4,
    descripcion: 'Muro de piedra, sala de estar y desayuno incluido.',
    precio: null,
    imagen: 'assets/img/habitaciones/suite-faraon.jpg',
  },
];

export const SERVICIOS: Servicio[] = [
  { icono: 'wifi', titulo: 'Wifi de alta velocidad', descripcion: 'En habitaciones y áreas comunes.' },
  { icono: 'auto', titulo: 'Estacionamiento', descripcion: 'Cochera segura para huéspedes.' },
  { icono: 'comida', titulo: 'Restaurante & bar', descripcion: 'Desayuno buffet y carta regional.' },
  { icono: 'spa', titulo: 'Spa', descripcion: 'Masajes y zona de relajación.' },
  { icono: 'cama', titulo: 'Room service', descripcion: 'Atención directa en tu habitación.' },
  { icono: 'reloj', titulo: 'Recepción 24 h', descripcion: 'Siempre alguien para ayudarte.' },
];

export const EXPERIENCIAS: Experiencia[] = [
  { icono: 'avion', titulo: 'Traslado al aeropuerto' },
  { icono: 'montana', titulo: 'Tours por la ciudad' },
  { icono: 'copas', titulo: 'Eventos y celebraciones' },
];

export const RESENAS: Resena[] = [
  { nombre: '[Nombre]', ciudad: '[Ciudad]', texto: '[Reseña real de un huésped]', estrellas: 5 },
  { nombre: '[Nombre]', ciudad: '[Ciudad]', texto: '[Reseña real de un huésped]', estrellas: 5 },
  { nombre: '[Nombre]', ciudad: '[Ciudad]', texto: '[Reseña real de un huésped]', estrellas: 5 },
];
