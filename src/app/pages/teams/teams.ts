import { Component } from '@angular/core';

interface Equipo {
  nombre: string;
  tipo: string;
  lider: string;
  directorTecnico: string;
  fechaCreacion: string;
  imagen: string | null;
}

@Component({
  selector: 'app-teams',
  imports: [],
  templateUrl: './teams.html',
  styleUrl: './teams.css',
})
export class Teams {
  expandedTeam: string | null = null;

  readonly equipos: Equipo[] = [
    {
      nombre: 'Toros',
      tipo: 'Amateur',
      lider: 'No aplica',
      directorTecnico: 'No aplica',
      fechaCreacion: 'Yopal, 25 de Febrero de 2026.',
      imagen: 'images/image2.png',
    },
    {
      nombre: 'Panteras F.C.',
      tipo: 'Amateur',
      lider: 'No aplica',
      directorTecnico: 'Victor Hugo Barón Rosales.',
      fechaCreacion: 'Yopal, 21 de Junio de 2025.',
      imagen: 'images/panteras.png',
    },
    {
      nombre: 'Spartans Yopal',
      tipo: 'Semi-Profesional',
      lider: 'Gabriela Jiménez.',
      directorTecnico: 'Mateo Cárdenas.',
      fechaCreacion: 'Yopal, 25 de Febrero de 2026.',
      imagen: null,
    },
  ];

  toggleTeamInfo(teamName: string): void {
    this.expandedTeam = this.expandedTeam === teamName ? null : teamName;
  }
}
