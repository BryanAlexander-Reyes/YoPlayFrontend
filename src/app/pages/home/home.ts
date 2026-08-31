import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface TorneoHome {
  id: number;
  titulo: string;
  descripcion: string;
  lugar: string;
  fecha: string;
  hora: string;
  premios: string;
  categoria: string;
  estado: 'disponible' | 'inscripcion' | 'mio';
  imagen: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  nombre = 'Usuario';
  torneos: TorneoHome[] = [];

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    const usuario = localStorage.getItem('usuarioSesion');
    if (usuario) {
      const parsed = JSON.parse(usuario);
      this.nombre = parsed?.nombre || this.nombre;
    }

    fetch('/torneos-flayers.json')
      .then((response) => response.json())
      .then((data) => {
        this.torneos = Array.isArray(data?.torneos) ? data.torneos : [];
      })
      .catch(() => {
        this.torneos = [];
      });
  }

  get torneosDisponibles(): TorneoHome[] {
    return this.getRandomGroup(this.torneos.filter((torneo) => torneo.estado === 'disponible'));
  }

  get torneosEnInscripcion(): TorneoHome[] {
    return this.getRandomGroup(this.torneos.filter((torneo) => torneo.estado === 'inscripcion'));
  }

  get tusTorneos(): TorneoHome[] {
    return this.getRandomGroup(this.torneos.filter((torneo) => torneo.estado === 'mio'));
  }

  trackTorneo(index: number, torneo: TorneoHome): number {
    return torneo.id;
  }

  private getRandomGroup(items: TorneoHome[]): TorneoHome[] {
    if (items.length <= 3) {
      return items;
    }

    const copy = [...items].sort(() => Math.random() - 0.5);
    return copy.slice(0, 3);
  }

  irAIniciarSesion(): void {
    this.router.navigate(['/login_usuario']);
  }

  irACrearTorneo(): void {
    this.router.navigate(['/torneo']);
  }
}

