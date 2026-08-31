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
      imagen: '/assets/falyer1.jpg',
      titulo: 'Liga La Ribera Fútbol 8',
      descripcion: 'Torneo de fútbol 8 para equipos aficionados.',
      lugar: 'Camping de Confiteros',
      fecha: '29 de julio de 2026',
      hora: 'Por confirmar',
      premios: 'Por confirmar',
    },
    {
      id: 2,
      imagen: '/assets/falyer2.jpg',
      titulo: 'Torneo Fútbol Juvenil Amateur',
      descripcion: 'Competencia de fútbol juvenil para equipos amateurs.',
      lugar: 'Calle Cualquiera #123',
      fecha: '16 de junio de 2026',
      hora: 'Por confirmar',
      premios: 'Campeón y subcampeón',
    },
    {
      id: 3,
      imagen: '/assets/falyer3.jpg',
      titulo: 'Copa Fedecoltenis',
      descripcion: 'Circuito nacional abierto de tenis, clase A.',
      lugar: 'Centro de Alto Rendimiento',
      fecha: '22 de julio de 2026',
      hora: 'Por confirmar',
      premios: 'Por confirmar',
    },
    {
      id: 4,
      imagen: '/assets/falyer%204.jpg',
      titulo: 'Torneo Interbarrios Fútbol de Salón',
      descripcion: 'Torneo femenino de fútbol de salón entre barrios.',
      lugar: 'Coliseo Polিসur',
      fecha: '25 de noviembre de 2026',
      hora: '5:00 PM',
      premios: 'Por confirmar',
    },
    {
      id: 5,
      imagen: '/assets/falyer5.jpg',
      titulo: 'Copa Internacional de Voleibol',
      descripcion: 'Competencia internacional de voleibol por categorías.',
      lugar: 'Santiago de Cali',
      fecha: '16 al 21 de julio de 2026',
      hora: 'Por confirmar',
      premios: 'Por confirmar',
    },
    {
      id: 6,
      imagen: '/assets/falyer6.jpg',
      titulo: 'Torneo Mixto de Voleibol 4x4',
      descripcion: 'Torneo mixto de voleibol 4x4 para equipos aficionados.',
      lugar: 'Cancha de voleibol de la sede',
      fecha: '22 de mayo de 2026',
      hora: '8:00 AM',
      premios: 'Por confirmar',
    },
  ];
  
  obtenerTorneos():Torneo[]{
    return this.torneos;
  }

  obtenerTorneoPorId(id: number): Torneo | undefined {
    return this.torneos.find(torneo => torneo.id === id);}
}
