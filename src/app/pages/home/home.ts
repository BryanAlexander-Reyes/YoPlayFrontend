import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, NgZone, OnDestroy } from '@angular/core';
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
export class Home implements OnInit, AfterViewInit, OnDestroy {
  nombre = 'Usuario';
  torneos: TorneoHome[] = [];
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
    private readonly torneosService: TorneosService,
    private readonly ngZone: NgZone,
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

    this.torneos = this.torneosService.obtenerTorneos().map((torneo) => ({
      ...torneo,
      categoria: this.obtenerCategoria(torneo.titulo),
      estado: this.obtenerEstado(torneo.id),
    }));
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
    if (texto.includes('voleibol')) return 'Vóleibol';
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

