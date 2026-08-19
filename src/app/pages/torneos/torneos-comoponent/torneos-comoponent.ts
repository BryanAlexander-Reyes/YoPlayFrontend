import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Card{
  imagen:string;
  titulo:string;
  descripcion:string;
  lugar:string;
  fecha:string;
  hora:string;
}

interface Torneo{
  imagen:string;
  titulo:string;
  descripcion:string;
  lugar:string;
  fecha:string;
  hora:string;
  premios:string;
}

@Component({
  selector: 'app-torneos-comoponent',
  imports: [CommonModule],
  templateUrl: './torneos-comoponent.html',
  styleUrl: './torneos-comoponent.css',
})
export class TorneosComponent {
  cards: Card[] = [
  {
    imagen: 'assets/falyer1.jpg',
    titulo: 'Torneo de Fútbol',
    descripcion: 'Participa en nuestro gran torneo deportivo.',
    lugar: 'Cancha El Campín',
    fecha: '25 de agosto de 2026',
    hora: '3:00 PM'
  },
  {
    imagen: 'assets/falyer3.jpg',
    titulo: 'Torneo de Baloncesto',
    descripcion: 'Demuestra tus habilidades en la cancha.',
    lugar: 'Coliseo Deportivo',
    fecha: '27 de agosto de 2026',
    hora: '5:00 PM'
  },
  {
    imagen: 'assets/falyer2.jpg',
    titulo: 'Competencia de Tenis',
    descripcion: 'Una jornada llena de deporte y competencia.',
    lugar: 'Club Deportivo Norte',
    fecha: '30 de agosto de 2026',
    hora: '9:00 AM'
  },
  {
    imagen: 'assets/falyer4.jpg',
    titulo: 'Torneo de Voleibol',
    descripcion: 'Forma tu equipo y participa en el torneo.',
    lugar: 'Complejo Deportivo Central',
    fecha: '2 de septiembre de 2026',
    hora: '2:00 PM'
  },
  {
    imagen: 'assets/falyer5.jpg',
    titulo: 'Competencia de Natación',
    descripcion: 'Compite junto a otros deportistas.',
    lugar: 'Piscina Olímpica',
    fecha: '5 de septiembre de 2026',
    hora: '8:00 AM'
  },
  {
    imagen: 'assets/falyer6.jpg',
    titulo: 'Carrera Deportiva',
    descripcion: 'Prepárate para una nueva experiencia deportiva.',
    lugar: 'Parque Metropolitano',
    fecha: '8 de septiembre de 2026',
    hora: '7:00 AM'
  }
];
torneos: Torneo[] = [
  {
    imagen: 'assets/falyer1.jpg',
    titulo: 'Copa Match Point',
    descripcion: 'Torneo de fútbol para equipos aficionados.',
    lugar: 'Complejo Deportivo El Campín',
    fecha: '25 de agosto de 2026',
    hora: '3:00 PM',
    premios: '$1.000.000 en premios'
  },
  {
    imagen: 'assets/falyer2.jpg',
    titulo: 'Basket Challenge',
    descripcion: 'Competencia de baloncesto 3x3.',
    lugar: 'Coliseo Deportivo Norte',
    fecha: '28 de agosto de 2026',
    hora: '4:00 PM',
    premios: '$800.000 en premios'
  },
  {
    imagen: 'assets/falyer3.jpg',
    titulo: 'Open Match Point',
    descripcion: 'Torneo de tenis para jugadores aficionados.',
    lugar: 'Club Deportivo Central',
    fecha: '30 de agosto de 2026',
    hora: '9:00 AM',
    premios: '$700.000 en premios'
  },
  {
    imagen: 'assets/falyer6.jpg',
    titulo: 'Copa Voleibol',
    descripcion: 'Torneo de voleibol con equipos de diferentes categorías.',
    lugar: 'Complejo Deportivo Simón Bolívar',
    fecha: '2 de septiembre de 2026',
    hora: '2:00 PM',
    premios: '$900.000 en premios'
  },
  {
    imagen: 'assets/falyer1.jpg',
    titulo: 'Fútbol 5 Night',
    descripcion: 'Torneo nocturno de fútbol 5.',
    lugar: 'Cancha Sintética La 80',
    fecha: '5 de septiembre de 2026',
    hora: '7:00 PM',
    premios: '$1.200.000 en premios'
  },
  {
    imagen: 'assets/falyer5.jpg',
    titulo: 'Run Challenge',
    descripcion: 'Competencia deportiva de atletismo para todos los niveles.',
    lugar: 'Parque Metropolitano',
    fecha: '8 de septiembre de 2026',
    hora: '7:00 AM',
    premios: '$600.000 en premios'
  }
];
torneoActual: number = 0;

siguiente(): void {
  if (this.torneos.length === 0) {
    return;
  }

  this.torneoActual =
    (this.torneoActual + 1) % this.torneos.length;
}

anterior(): void {
  if (this.torneos.length === 0) {
    return;
  }

  this.torneoActual =
    (this.torneoActual - 1 + this.torneos.length) %
    this.torneos.length;
}

irATorneo(index: number): void {
  this.torneoActual = index;
}
}
