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
        imagen: 'YoPlayFrontend/images/Rectangle14.png',
        ubicacion: 'Yopal, Casanare.',
        inscripcion: '$50.000 (Equipo)',
        premiacion: '$1.500.000',
      },
      {
        nombre: 'Torneo Voleibol',
        imagen: 'YoPlayFrontend/images/Rectangle15.png',
        ubicacion: 'Yopal, Casanare.',
        inscripcion: '$30.000 (Personal)',
        premiacion: '$2.000.000',
      },
      {
        nombre: 'Torneo Pardos (Voley)',
        imagen: 'YoPlayFrontend/images/Rectangle16.png',
        ubicacion: 'Yopal, Casanare.',
        inscripcion: '$50.000 (Equipo)',
        premiacion: '$1.500.000',
      },
    ];
  }
