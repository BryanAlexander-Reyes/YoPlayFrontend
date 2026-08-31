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
      imagen: '/assets/images/Rectangle14.png',
      ubicacion: 'Yopal, Casanare.',
      inscripcion: '$50.000 (Equipo)',
      premiacion: '$1.500.000',
      estado: 'Por definirse',
    },
    {
      nombre: 'Torneo Voleibol',
      imagen: '/assets/images/Rectangle15.png',
      ubicacion: 'Yopal, Casanare.',
      inscripcion: '$30.000 (Personal)',
      premiacion: '$2.000.000',
      estado: 'Activo',
    },
    {
      nombre: 'Torneo Pardos (Voley)',
      imagen: '/assets/images/Rectangle16.png',
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
