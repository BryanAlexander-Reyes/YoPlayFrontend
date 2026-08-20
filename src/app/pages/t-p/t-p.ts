import { Component } from '@angular/core';

type EstadoTorneo = 'Activo' | 'Por definirse';

interface TorneoParticipante {
  nombre: string;
  imagen: string;
  ubicacion: string;
  inscripcion: string;
  premiacion: string;
  estado: EstadoTorneo;
}

@Component({
  selector: 'app-t-p',
  imports: [],
  templateUrl: './t-p.html',
  styleUrl: './t-p.css',
})
export class TP {
  readonly torneos: TorneoParticipante[] = [
    {
      nombre: 'Torneo Futsal Casanare',
      imagen: '/images/Rectangle%2014.png',
      ubicacion: 'Yopal, Casanare.',
      inscripcion: '$50.000 (Equipo)',
      premiacion: '$1.500.000',
      estado: 'Por definirse',
    },
    {
      nombre: 'Torneo Voleibol',
      imagen: '/images/Rectangle%2015.png',
      ubicacion: 'Yopal, Casanare.',
      inscripcion: '$30.000 (Personal)',
      premiacion: '$2.000.000',
      estado: 'Activo',
    },
    {
      nombre: 'Torneo Pardos (Voley)',
      imagen: '/images/Rectangle%2016.png',
      ubicacion: 'Yopal, Casanare.',
      inscripcion: '$50.000 (Equipo)',
      premiacion: '$1.500.000',
      estado: 'Por definirse',
    },
  ];

  mostrarFixture(torneo: TorneoParticipante): boolean {
    return torneo.estado === 'Activo';
  }
}
