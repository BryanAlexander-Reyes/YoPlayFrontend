import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { catchError, finalize, map, of, switchMap } from 'rxjs';
import { MidTorneosService } from '../../services/mid-torneos.service';

interface TorneoParticipante { id: number; nombre: string; imagen: string; ubicacion: string; inscripcion: string; premiacion: string; estado: string; }

@Component({ selector: 'app-t-p', imports: [CommonModule], templateUrl: './t-p.html', styleUrl: './t-p.css' })
export class TP implements OnInit {
  torneos: TorneoParticipante[] = [];
  cargando = true;
  constructor(private readonly midTorneosService: MidTorneosService, private readonly ngZone: NgZone, private readonly changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    const correo = this.obtenerCorreoSesion();
    if (!correo) { this.cargando = false; return; }
    this.midTorneosService.obtenerIdsTorneosInscritos(correo).pipe(
      switchMap((ids) => ids.length === 0 ? of([]) : this.midTorneosService.obtenerTorneos().pipe(map((torneos) => torneos.filter((torneo) => ids.includes(torneo.Id))))),
      catchError(() => of([])),
      finalize(() => { this.cargando = false; this.changeDetector.detectChanges(); }),
    ).subscribe((torneos) => this.ngZone.run(() => {
      this.torneos = torneos.map((torneo) => ({ id: torneo.Id, nombre: torneo.NombreTorneo, imagen: torneo.Imagen || 'assets/falyer1.jpg', ubicacion: torneo.Ubicacion || 'Por confirmar', inscripcion: torneo.Estado === 'Por Confirmar' ? 'Abierta' : 'Cerrada', premiacion: 'Por confirmar', estado: torneo.Estado }));
      this.changeDetector.detectChanges();
    }));
  }

  mostrarFixture(torneo: TorneoParticipante): boolean { return torneo.estado.toLowerCase() === 'en curso'; }
  private obtenerCorreoSesion(): string | null { try { return (JSON.parse(localStorage.getItem('usuarioSesion') ?? '{}') as { correo?: string }).correo?.trim() || null; } catch { return null; } }
}
