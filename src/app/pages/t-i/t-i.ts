import { Component } from '@angular/core';

interface TorneoInscrito {
  nombre: string;
  imagen: string;
  ubicacion: string;
  inscripcion: string;
  premiacion: string;
}

@Component({
  selector: 'app-t-i',
  imports: [],
  templateUrl: './t-i.html',
  styleUrl: './t-i.css',
  })
  export class TI {
    readonly torneos: TorneoInscrito[] = [
      {
        nombre: 'Torneo Futsal Casanare',
        imagen: '/images/Rectangle%2014.png',
        ubicacion: 'Yopal, Casanare.',
        inscripcion: '$50.000 (Equipo)',
        premiacion: '$1.500.000',
      },
      {
        nombre: 'Torneo Voleibol',
        imagen: '/images/Rectangle%2015.png',
        ubicacion: 'Yopal, Casanare.',
        inscripcion: '$30.000 (Personal)',
        premiacion: '$2.000.000',
      },
      {
        nombre: 'Torneo Pardos (Voley)',
        imagen: '/images/Rectangle%2016.png',
        ubicacion: 'Yopal, Casanare.',
        inscripcion: '$50.000 (Equipo)',
        premiacion: '$1.500.000',
      },
    ];
  }
