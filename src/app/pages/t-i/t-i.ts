import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { catchError, finalize, map, of, switchMap } from 'rxjs';
import { MidTorneosService } from '../../services/mid-torneos.service';

interface TorneoInscrito {
  id: number;
  nombre: string;
  imagen: string;
  ubicacion: string;
  inscripcion: string;
  premiacion: string;
}

@Component({
  selector: 'app-t-i',
  imports: [CommonModule],
  templateUrl: './t-i.html',
  styleUrl: './t-i.css',
  })
export class TI implements OnInit {
  torneos: TorneoInscrito[] = [];
  cargando = true;

  constructor(
    private readonly midTorneosService: MidTorneosService,
    private readonly ngZone: NgZone,
    private readonly changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const correo = this.obtenerCorreoSesion();
    if (!correo) {
      this.cargando = false;
      this.changeDetector.detectChanges();
      return;
    }

    this.midTorneosService.obtenerIdsTorneosInscritos(correo).pipe(
      switchMap((ids) => {
        if (ids.length === 0) return of([]);
        return this.midTorneosService.obtenerTorneos().pipe(
          map((torneos) => torneos.filter((torneo) => ids.includes(torneo.Id))),
        );
      }),
      catchError(() => of([])),
      finalize(() => {
        this.cargando = false;
        this.changeDetector.detectChanges();
      }),
    ).subscribe((torneos) => {
      this.ngZone.run(() => {
        this.torneos = torneos.map((torneo) => ({
          id: torneo.Id,
          nombre: torneo.NombreTorneo,
          imagen: torneo.Imagen || 'assets/falyer1.jpg',
          ubicacion: torneo.Ubicacion || 'Por confirmar',
          inscripcion: torneo.Estado === 'Por Confirmar' ? 'Abierta' : 'Cerrada',
          premiacion: 'Por confirmar',
        }));
        this.changeDetector.detectChanges();
      });
    });
  }

  private obtenerCorreoSesion(): string | null {
    try {
      const usuario = JSON.parse(localStorage.getItem('usuarioSesion') ?? '{}') as { correo?: string };
      return usuario.correo?.trim() || null;
    } catch {
      return null;
    }
  }
}
