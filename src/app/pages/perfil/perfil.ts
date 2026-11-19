import { ChangeDetectorRef, Component, HostListener, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, finalize, map, of } from 'rxjs';
import { Torneo } from '../../services/auth-services-torneosCurso';
import { MidTorneosService } from '../../services/mid-torneos.service';
import { Fixture } from '../torneos/fixture/fixture';

interface PerfilUsuario {
  nombre: string;
  tipoDocumento: string;
  numeroDocumento: string;
  equipo: string;
  rol: string;
  estado: string;
}

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, FormsModule, Fixture],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  fotoPerfil: string | null = null;
  torneoFixtureId: number | null = null;
  perfilPublico = false;
  cargandoPerfil = true;
  errorPerfil = false;
  torneosPerfil: Torneo[];
  perfiles: PerfilUsuario = {
    nombre: '', tipoDocumento: '', numeroDocumento: '', equipo: '', rol: '', estado: '',
  };

  constructor(
    private readonly midTorneosService: MidTorneosService,
    private readonly ngZone: NgZone,
    private readonly changeDetector: ChangeDetectorRef,
  ) {
    this.torneosPerfil = [];
  }

  ngOnInit(): void {
    const idUsuario = this.obtenerIdUsuarioSesion();
    if (idUsuario === null) {
      this.cargandoPerfil = false;
      this.errorPerfil = true;
      return;
    }

    this.midTorneosService.obtenerUsuarioPorId(idUsuario).pipe(
      catchError(() => {
        this.errorPerfil = true;
        return of(undefined);
      }),
      finalize(() => {
        this.cargandoPerfil = false;
        this.changeDetector.detectChanges();
      }),
    ).subscribe((usuario) => {
      if (!usuario) return;
      this.ngZone.run(() => {
        this.perfiles = {
          nombre: usuario.Nombre,
          tipoDocumento: usuario.TipoDocumento,
          numeroDocumento: usuario.NumeroDocumento,
          equipo: usuario.Equipo,
          rol: usuario.Rol,
          estado: usuario.Estado,
        };
        this.changeDetector.detectChanges();
      });
    });

    this.cargarTorneosPropios(idUsuario);
  }

  tieneFotoPerfil(): boolean { return Boolean(this.fotoPerfil); }
  get estadoPerfil(): string { return this.perfilPublico ? 'público' : 'privado'; }
  abrirFixture(id: number): void { this.torneoFixtureId = id; }
  cerrarFixture(): void { this.torneoFixtureId = null; }
  obtenerTorneoPorId(id: number): Torneo | undefined {
    return this.torneosPerfil.find((torneo) => torneo.id === id);
  }

  @HostListener('document:keydown.escape')
  cerrarFixtureConEscape(): void {
    if (this.torneoFixtureId !== null) this.cerrarFixture();
  }

  private obtenerIdUsuarioSesion(): number | null {
    try {
      const usuario = JSON.parse(localStorage.getItem('usuarioSesion') ?? '{}') as Record<string, unknown>;
      const valor = usuario['id']
        ?? usuario['Id']
        ?? usuario['idUsuario']
        ?? usuario['IdUsuario']
        ?? usuario['IDUsuario']
        ?? usuario['id_usuario'];
      const id = Number(this.extraerId(valor));
      return Number.isInteger(id) && id > 0 ? id : null;
    } catch {
      return null;
    }
  }

  private extraerId(valor: unknown): unknown {
    if (valor !== null && typeof valor === 'object') {
      const objeto = valor as Record<string, unknown>;
      return objeto['id'] ?? objeto['Id'] ?? objeto['ID'];
    }
    return valor;
  }

  private cargarTorneosPropios(idUsuario: number): void {
    this.midTorneosService.obtenerTorneos().pipe(
      map((torneos) => torneos.filter((torneo) => torneo.IdUsuario === idUsuario)),
      catchError(() => of([])),
    ).subscribe((torneos) => {
      this.ngZone.run(() => {
        this.torneosPerfil = torneos.map((torneo) => ({
          id: torneo.Id,
          imagen: torneo.Imagen || 'assets/falyer1.jpg',
          titulo: torneo.NombreTorneo,
          descripcion: torneo.DescripcionTorneo || '',
          lugar: torneo.Ubicacion || 'Por confirmar',
          fecha: torneo.FechaInicio || 'Por confirmar',
          hora: 'Por confirmar',
          premios: 'Por confirmar',
        }));
        this.changeDetector.detectChanges();
      });
    });
  }
}
