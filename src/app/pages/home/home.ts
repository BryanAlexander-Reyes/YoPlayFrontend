import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Tournament {
  id: number;
  name: string;
  sport: string;
  participants: number;
  maxParticipants: number;
  entryFee: number;
  prize: number;
  status: 'Abierto' | 'Próximo' | 'Activo';
}

interface Activity {
  id: number;
  title: string;
  description: string;
  type: 'victory' | 'defeat' | 'tournament' | 'achievement';
  icon: string;
  result: string;
  resultType: 'win' | 'loss' | 'neutral';
  time: string;
}

interface UserStats {
  points: number;
  ranking: number;
  wins: number;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  userName: string = 'Jugador';
  userStats: UserStats = {
    points: 2450,
    ranking: 47,
    wins: 23,
  };

  tournaments: Tournament[] = [
    {
      id: 1,
      name: 'Torneo de Fútbol 5v5',
      sport: 'Fútbol',
      participants: 12,
      maxParticipants: 16,
      entryFee: 100,
      prize: 500,
      status: 'Próximo',
    },
    {
      id: 2,
      name: 'Copa de Básquetbol',
      sport: 'Básquetbol',
      participants: 8,
      maxParticipants: 8,
      entryFee: 150,
      prize: 750,
      status: 'Activo',
    },
    {
      id: 3,
      name: 'Desafío de Tenis',
      sport: 'Tenis',
      participants: 5,
      maxParticipants: 20,
      entryFee: 75,
      prize: 350,
      status: 'Abierto',
    },
    {
      id: 4,
      name: 'Campeonato de Voleibol',
      sport: 'Voleibol',
      participants: 15,
      maxParticipants: 16,
      entryFee: 120,
      prize: 600,
      status: 'Próximo',
    },
  ];

  recentActivity: Activity[] = [
    {
      id: 1,
      title: 'Victoria en Fútbol',
      description: 'Ganaste el partido contra Carlos Mendez',
      type: 'victory',
      icon: '⚽',
      result: '+120 puntos',
      resultType: 'win',
      time: 'Hace 2 horas',
    },
    {
      id: 2,
      title: 'Derrota en Básquetbol',
      description: 'Perdiste contra el equipo de Juan García',
      type: 'defeat',
      icon: '🏀',
      result: '-50 puntos',
      resultType: 'loss',
      time: 'Hace 5 horas',
    },
    {
      id: 3,
      title: 'Nuevo Logro',
      description: 'Alcanzaste el nivel Oro en Fútbol',
      type: 'achievement',
      icon: '🏅',
      result: '+200 puntos',
      resultType: 'win',
      time: 'Ayer',
    },
    {
      id: 4,
      title: 'Torneo Completado',
      description: 'Finalizaste el Torneo de Tenis',
      type: 'tournament',
      icon: '🎯',
      result: '+300 puntos',
      resultType: 'win',
      time: 'Hace 3 días',
    },
  ];

  ngOnInit() {
    // Aquí puedes conectar con servicios para obtener datos reales
    // this.userService.getUserStats().subscribe(...)
    // this.tournamentService.getAvailableTournaments().subscribe(...)
    // this.activityService.getRecentActivity().subscribe(...)
  }
}
