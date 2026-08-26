import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.html',
  styleUrl: './presentation.css',
})
export class Presentation {
  features = [
    {
      emoji: '⚡',
      title: 'Compite en Tiempo Real',
      description: 'Enfréntate a otros jugadores en torneos y desafíos instantáneos.',
    },
    {
      emoji: '💹',
      title: 'Demuestra tu Talento',
      description: 'Conviértete en uno de los mejores de la comunidad.',
    },
    {
      emoji: '🏆',
      title: 'Gana Premios',
      description: 'Participa en eventos y consigue recompensas exclusivas.',
    },
  ];
}