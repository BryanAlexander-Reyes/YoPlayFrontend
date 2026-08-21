import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tutorial',
  imports: [],
  templateUrl: './tutorial.html',
  styleUrl: './tutorial.css',
})
export class Tutorial {
  constructor(private location: Location) {}
  tutoriales = [
    {
        titulo: 'Como crear un torneo',
        video: 'assets/videos/tutorial-torneo.mp4'
    },
    {
        titulo: 'Como crear un reglamento',
        video: 'assets/videos/tutorial-reglamento.mp4'
    },
    {
        titulo: 'Como registrar un equipo',
        video: 'assets/videos/tutorial-registro-equipo.mp4'
    },
    {
        titulo: 'Como ver historial de torneo',
        video: 'assets/videos/tutorial-historial.mp4'
    },
    {
        titulo: 'Como eliminar un torneo',
        video: 'assets/videos/tutorial-eliminar-torneo.mp4'
    },
    {
        titulo: 'Como configurar tus datos',
        video: 'assets/videos/tutorial-configuracion.mp4'
    },
];
tutorialAbierto: number | null = null;
mostrarTutorial(index: number) {
    this.tutorialAbierto =
        this.tutorialAbierto === index ? null : index;
}
  volver(): void {
    this.location.back();
  }
}
