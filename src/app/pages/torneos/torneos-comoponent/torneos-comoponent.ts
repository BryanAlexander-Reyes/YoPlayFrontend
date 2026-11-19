import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Torneo } from '../../../services/auth-services-torneosCurso';
import { catchError, finalize, map, of } from 'rxjs';
import { MidTorneosService } from '../../../services/mid-torneos.service';

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
  cargando = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly midTorneosService: MidTorneosService,
    private readonly ngZone: NgZone,
    private readonly changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.modo = this.activatedRoute.snapshot.data['modo'] || 'informacion';
    this.showAccessDenied = false;

    const estadoBuscado = this.modo === 'inscripcion' ? 'por confirmar' : 'en curso';
    this.midTorneosService.obtenerTorneos().pipe(
      map((torneos) => torneos.filter((torneo) => torneo.Estado.toLowerCase() === estadoBuscado)),
      catchError(() => of([])),
      finalize(() => {
        this.cargando = false;
        this.changeDetector.detectChanges();
      }),
    ).subscribe((torneos) => {
      this.ngZone.run(() => {
        this.torneos = torneos.map((torneo) => ({
          id: torneo.Id,
          imagen: torneo.Imagen || 'assets/falyer1.jpg',
          titulo: torneo.NombreTorneo,
          descripcion: torneo.DescripcionTorneo || '',
          lugar: torneo.Ubicacion || 'Por confirmar',
          fecha: torneo.FechaInicio || 'Por confirmar',
          hora: 'Por confirmar',
          premios: 'Por confirmar',
        }));
        this.torneoActual = 0;
        this.changeDetector.detectChanges();
      });
    });
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
