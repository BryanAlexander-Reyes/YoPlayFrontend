import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { TorneosService, Torneo } from '../../../services/auth-services-torneosCurso';

@Component({
  selector: 'app-torneos-comoponent',
  imports: [CommonModule],
  templateUrl: './torneos-comoponent.html',
  styleUrl: './torneos-comoponent.css',
})
export class TorneosComponent implements OnInit {
  torneos: Torneo[] = [];
  torneoActual: number = 0;
  modo: string = 'informacion';
  showAccessDenied = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private torneosService: TorneosService,
  ) {}

  ngOnInit(): void {
    this.torneos = this.torneosService.obtenerTorneos();
    this.modo = this.activatedRoute.snapshot.data['modo'] || 'informacion';
    this.showAccessDenied = false;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('usuarioSesion');
  }

  accionTorneo(id: number): void {
    if (this.modo === 'informacion') {
      this.router.navigate(['/inf-torneos', id]);
      return;
    }

    if (this.modo === 'inscripcion') {
      if (!this.isLoggedIn()) {
        this.showAccessDenied = true;
        return;
      }

      this.showAccessDenied = false;
      this.router.navigate(['/inscripcion', id]);
    }
  }

  goToLogin(): void {
    this.showAccessDenied = false;
    this.router.navigate(['/login_usuario']);
  }

  closeAccessDenied(): void {
    this.showAccessDenied = false;
  }

  siguiente(): void {
    if (this.torneos.length === 0) {
      return;
    }

    this.torneoActual = (this.torneoActual + 1) % this.torneos.length;
  }

  anterior(): void {
    if (this.torneos.length === 0) {
      return;
    }

    this.torneoActual = (this.torneoActual - 1 + this.torneos.length) % this.torneos.length;
  }

  irATorneo(index: number): void {
    this.torneoActual = index;
  }
}
