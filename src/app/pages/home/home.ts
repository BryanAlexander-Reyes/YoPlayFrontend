import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Torneo, TorneosService } from '../../services/auth-services-torneosCurso';

interface TorneoHome extends Torneo {
  categoria: string;
  estado: 'disponible' | 'inscripcion' | 'mio';
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
  usuarioAutenticado = false;

  constructor(
    private readonly router: Router,
    private readonly torneosService: TorneosService,
  ) {}

  ngOnInit(): void {
    const usuario = localStorage.getItem('usuarioSesion');
    if (usuario) {
      const parsed = JSON.parse(usuario);
      this.nombre = parsed?.nombre || this.nombre;
      this.usuarioAutenticado = true;
    }

    this.torneos = this.torneosService.obtenerTorneos().map((torneo) => ({
      ...torneo,
      categoria: this.obtenerCategoria(torneo.titulo),
      estado: this.obtenerEstado(torneo.id),
    }));
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

  private obtenerCategoria(titulo: string): string {
    const texto = titulo.toLowerCase();
    if (texto.includes('fútbol') || texto.includes('futbol')) return 'Fútbol';
    if (texto.includes('tenis')) return 'Tenis';
    if (texto.includes('voleibol')) return 'Voleibol';
    return 'General';
  }

  private obtenerEstado(id: number): 'disponible' | 'inscripcion' | 'mio' {
    if (id === 6) return 'mio';
    if (id === 4 || id === 5) return 'inscripcion';
    return 'disponible';
  }

  irAIniciarSesion(): void {
    this.router.navigate(['/login_usuario']);
  }

  verMasInformacion(id: number): void {
    this.router.navigate(['/inf-torneos', id]);
  }

  irACrearTorneo(): void {
    this.router.navigate(['/torneo']);
  }
}

