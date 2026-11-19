import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/** Respuesta de GET /api/v1/info-torneo/. */
export interface MidTorneoResumen {
  Id: number;
  NombreDeporte: string;
  NombreTorneo: string;
  Imagen: string;
  DescripcionTorneo: string;
  Ubicacion: string;
  FechaInicio: string;
  Estado: string;
  // Campos opcionales para cuando el MID exponga la relación con el usuario.
  IdUsuario?: number;
  idUsuario?: number;
  UsuarioCreador?: number | string;
}

/** Respuesta de GET /api/v1/info-torneo/:id. */
export interface MidTorneoDetalle {
  Id: number;
  NombreTorneo: string;
  Imagen: string;
  Ubicacion: string;
  Fecha: string;
  Estado: string;
  Premios: Array<{ Descripcion: string }>;
}

export interface MidUsuarioDetalle {
  Nombre: string;
  TipoDocumento: string;
  NumeroDocumento: string;
  Equipo: string;
  Rol: string;
  Estado: string;
}

@Injectable({ providedIn: 'root' })
export class MidTorneosService {
  // En desarrollo Angular redirige /api al MID de localhost:8080 mediante proxy.conf.json.
  // Así el navegador no bloquea la llamada por CORS.
  private readonly apiUrl = '/api/v1/info-torneo';

  constructor(private readonly http: HttpClient) {}

  obtenerTorneos(): Observable<MidTorneoResumen[]> {
    return this.http.get<MidTorneoResumen[]>(`${this.apiUrl}/`);
  }

  obtenerTorneoPorId(id: number): Observable<MidTorneoDetalle> {
    return this.http.get<MidTorneoDetalle>(`${this.apiUrl}/${id}`);
  }

  obtenerIdsTorneosInscritos(correo: string): Observable<number[]> {
    return this.http.get<number[]>('/api/v1/torneos-inscritos', {
      params: { correo },
    });
  }

  obtenerUsuarioPorId(id: number): Observable<MidUsuarioDetalle> {
    return this.http.get<MidUsuarioDetalle>(`/api/v1/usuario/${id}`);
  }
}
