import { Component } from '@angular/core';

@Component({
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.html',
  styleUrl: './stats.css',
})
export class Stats {
  promedioJugador = {
  titulo: 'Tu promedio como jugador',
  descripcion: '¡Tu desempeño como jugador, en nuestra plataforma, es excelente!',

  resumen: {
    torneos: 7,

    deportes: [
      {
        nombre: 'Voley',
        cantidad: 4
      },
      {
        nombre: 'Fútbol',
        cantidad: 2
      },
      {
        nombre: 'Baloncesto',
        cantidad: 1
      }
      ]
    },

    rendimiento: {
      torneos: {
        participados: 7,
        porcentaje: 42
      },

      partidos: {
        jugados: 40,
        ganados: 26,
        porcentaje: 65
      }
    }
  };

  // Control del selector "General"
  mostrarOpciones = false;

  toggleOpciones(): void {
    this.mostrarOpciones = !this.mostrarOpciones;
  }
};
