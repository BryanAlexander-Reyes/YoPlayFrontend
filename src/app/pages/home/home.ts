import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef, AfterViewInit, NgZone, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MidTorneoResumen, MidTorneosService } from '../../services/mid-torneos.service';
import { catchError, finalize, of } from 'rxjs';

interface TorneoHome {
  id: number;
  imagen: string;
  titulo: string;
  descripcion: string;
  lugar: string;
  fecha: string;
  hora: string;
  premios: string;
  categoria: string;
  estado: 'disponible' | 'inscripcion' | 'mio' | 'oculto';
}

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  nombre = 'Usuario';
  torneos: TorneoHome[] = [];
  cargandoTorneos = true;
  errorTorneos = false;
  usuarioAutenticado = false;
  mostrarVideo = false;
  videoTerminado = false;
  videoFadingOut = false;
  mostrarOverlay = false;
  videoUrl = 'assets/videos/PRESENTACION.mp4?reload=' + Date.now();
  private keyboardUnsubscribe?: () => void;
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  constructor(
    private readonly router: Router,
    private readonly midTorneosService: MidTorneosService,
    private readonly ngZone: NgZone,
    private readonly changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const usuario = localStorage.getItem('usuarioSesion');
    this.usuarioAutenticado = !!usuario;

    if (usuario) {
      const parsed = JSON.parse(usuario);
      this.nombre = parsed?.nombre || this.nombre;
    }

    // Forzar el estado del video en cada carga para que el video se muestre
    // cuando el usuario no está autenticado y se reinicie como una presentación nueva.
    this.mostrarVideo = !this.usuarioAutenticado;
    this.videoTerminado = false;
    this.mostrarOverlay = false;

    this.cargarTorneos();
  }

  ngAfterViewInit(): void {
    // Cuando la vista está lista, intentar reproducir el video
    if (this.mostrarVideo && this.videoElement?.nativeElement) {
      this.ngZone.runOutsideAngular(() => {
        const video = this.videoElement.nativeElement;

        // Edge suele bloquear el primer intento si el elemento no se vuelve a preparar desde cero.
        video.src = this.videoUrl;
        video.muted = true;
        video.playsInline = true;
        video.pause();
        video.currentTime = 0;
        video.load();

        // Prevenir clic derecho en el video
        video.oncontextmenu = (e: any) => {
          e.preventDefault();
          return false;
        };

        // Prevenir teclado durante el video
        const handleKeydown = (e: KeyboardEvent): void => {
          if (this.mostrarVideo && !this.videoTerminado) {
            // Prevenir espacios, 'p' y otras teclas de control
            if (e.code === 'Space' || e.key === 'p' || e.key === 'P' ||
                e.key === 'm' || e.key === 'M' || e.key === 'f' || e.key === 'F') {
              e.preventDefault();
            }
          }
        };

        document.addEventListener('keydown', handleKeydown, true);
        this.keyboardUnsubscribe = () => {
          document.removeEventListener('keydown', handleKeydown, true);
        };

        const intentarReproducir = (): void => {
          if (video.readyState >= 2) {
            void video.play().catch((error) => {
              console.log('Error en autoplay, intentando nuevamente:', error);
              setTimeout(() => {
                video.currentTime = 0;
                void video.play().catch((e) => console.log('Fallo al reintentar play:', e));
              }, 600);
            });
          } else {
            setTimeout(() => {
              intentarReproducir();
            }, 250);
          }
        };

        requestAnimationFrame(() => {
          intentarReproducir();
        });
      });
    }
  }

  ngOnDestroy(): void {
    // Limpiar event listeners al destruir componente
    if (this.keyboardUnsubscribe) {
      this.keyboardUnsubscribe();
    }
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

  private cargarTorneos(): void {
    this.cargandoTorneos = true;
    this.errorTorneos = false;

    this.midTorneosService.obtenerTorneos().pipe(
      catchError(() => {
        this.errorTorneos = true;
        return of([] as MidTorneoResumen[]);
      }),
      finalize(() => {
        this.cargandoTorneos = false;
        this.changeDetector.detectChanges();
      }),
    ).subscribe((torneos) => {
      // Fuerza la actualización de la vista una vez que XHR/fetch entrega la respuesta.
      // Evita que el estado de carga se quede renderizado si la respuesta llega fuera de Zone.js.
      this.ngZone.run(() => {
        this.torneos = torneos.map((torneo) => this.mapearTorneo(torneo));
        this.changeDetector.detectChanges();
      });
    });
  }

  private mapearTorneo(torneo: MidTorneoResumen): TorneoHome {
    return {
      id: torneo.Id,
      imagen: torneo.Imagen || 'assets/falyer1.jpg',
      titulo: torneo.NombreTorneo,
      descripcion: torneo.DescripcionTorneo || 'Sin descripción disponible.',
      lugar: torneo.Ubicacion || 'Por confirmar',
      fecha: torneo.FechaInicio || 'Por confirmar',
      hora: 'Por confirmar',
      premios: 'Por confirmar',
      categoria: torneo.NombreDeporte || 'General',
      estado: this.obtenerEstado(torneo),
    };
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

  private obtenerEstado(torneo: MidTorneoResumen): 'disponible' | 'inscripcion' | 'mio' | 'oculto' {
    if (this.esTorneoPropio(torneo)) return 'mio';

    // El MID denomina "Por Confirmar" a los torneos futuros: son los que están
    // disponibles para inscripción. Los que ya comenzaron permanecen disponibles
    // para consulta en la primera sección.
    const estado = torneo.Estado?.toLowerCase();
    if (estado === 'por confirmar') return 'inscripcion';
    if (estado === 'finalizado') return 'oculto';
    return 'disponible';
  }

  private esTorneoPropio(torneo: MidTorneoResumen): boolean {
    const usuario = this.obtenerUsuarioSesion();
    if (!usuario) return false;

    const idUsuario = usuario['id'] ?? usuario['Id'] ?? usuario['idUsuario'];
    return idUsuario !== undefined &&
      (torneo.IdUsuario === idUsuario || torneo.idUsuario === idUsuario || torneo.UsuarioCreador === idUsuario);
  }

  private obtenerUsuarioSesion(): Record<string, unknown> | null {
    const usuario = localStorage.getItem('usuarioSesion');
    if (!usuario) return null;

    try {
      return JSON.parse(usuario) as Record<string, unknown>;
    } catch {
      return null;
    }
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

  onVideoEnded(): void {
    // Desaparecer el video inmediatamente y mostrar el home con transición
    this.mostrarVideo = false;
    this.mostrarOverlay = true;
    this.videoTerminado = true;
    // Remover el overlay después de que la animación de fade out termine
    setTimeout(() => {
      this.mostrarOverlay = false;
    }, 500);
  }

  skipVideo(): void {
    // Mismo comportamiento que cuando termina el video
    this.mostrarVideo = false;
    this.mostrarOverlay = true;
    this.videoTerminado = true;
    // Remover el overlay después de que la animación de fade out termine
    setTimeout(() => {
      this.mostrarOverlay = false;
    }, 500);
  }
}

