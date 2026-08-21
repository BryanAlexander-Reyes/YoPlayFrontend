import { Injectable } from '@angular/core';

export interface Torneo {
  id: number;
  imagen: string;
  titulo: string;
  descripcion: string;
  lugar: string;
  fecha: string;
  hora: string;
  premios: string;
}

@Injectable({
  providedIn: 'root',
})
export class TorneosService {
  torneos: Torneo[] = [
    {
      id: 1,
      imagen: 'assets/falyer1.jpg',
      titulo: 'Copa Match Point',
      descripcion: 'Torneo de fútbol para equipos aficionados.',
      lugar: 'Complejo Deportivo El Campín',
      fecha: '25 de agosto de 2026',
      hora: '3:00 PM',
      premios: '$1.000.000 en premios',
    },
    {
      id: 2,
      imagen: 'assets/falyer2.jpg',
      titulo: 'Basket Challenge',
      descripcion: 'Competencia de baloncesto 3x3.',
      lugar: 'Coliseo Deportivo Norte',
      fecha: '28 de agosto de 2026',
      hora: '4:00 PM',
      premios: '$800.000 en premios',
    },
    {
      id: 3,
      imagen: 'assets/falyer3.jpg',
      titulo: 'Open Match Point',
      descripcion: 'Torneo de tenis para jugadores aficionados.',
      lugar: 'Club Deportivo Central',
      fecha: '30 de agosto de 2026',
      hora: '9:00 AM',
      premios: '$700.000 en premios',
    },
    {
      id: 4,
      imagen: 'assets/falyer6.jpg',
      titulo: 'Copa Voleibol',
      descripcion: 'Torneo de voleibol con equipos de diferentes categorías.',
      lugar: 'Complejo Deportivo Simón Bolívar',
      fecha: '2 de septiembre de 2026',
      hora: '2:00 PM',
      premios: '$900.000 en premios',
    },
    {
      id: 5,
      imagen: 'assets/falyer1.jpg',
      titulo: 'Fútbol 5 Night',
      descripcion: 'Torneo nocturno de fútbol 5.',
      lugar: 'Cancha Sintética La 80',
      fecha: '5 de septiembre de 2026',
      hora: '7:00 PM',
      premios: '$1.200.000 en premios',
    },
    {
      id: 6,
      imagen: 'assets/falyer5.jpg',
      titulo: 'Run Challenge',
      descripcion: 'Competencia deportiva de atletismo para todos los niveles.',
      lugar: 'Parque Metropolitano',
      fecha: '8 de septiembre de 2026',
      hora: '7:00 AM',
      premios: '$600.000 en premios',
    },
  ];
  
  obtenerTorneos():Torneo[]{
    return this.torneos;
  }

  obtenerTorneoPorId(id: number): Torneo | undefined {
    return this.torneos.find(torneo => torneo.id === id);}
}
