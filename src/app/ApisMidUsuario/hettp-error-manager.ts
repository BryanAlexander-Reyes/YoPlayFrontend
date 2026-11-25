import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export interface ApiError {
  status: number;
  mensaje: string;
}

@Injectable({
  providedIn: 'root',
})
export class HttpErrorManager {
  public handleError(error: HttpErrorResponse): Observable<never> {
    let mensaje :string;

    switch (error.status) {

      case 0:
        mensaje = 'Error de conexión con el servidor';
        break;

      case 400:
        mensaje = 'Solicitud incorrecta';
        break;

      case 401:
        mensaje = 'Usuario no Autenticado';
        break;

      case 403:
        mensaje = 'Acceso denegado';
        break;

      case 404:
        mensaje = 'Recursos no encontrados';
        break;

      case 409:
        mensaje = 'Conflicto de informacion';
        break;

      case 500:
        mensaje = 'Error interno del servidor';
        break;

      default:
        mensaje ='Error inesperado';
        break;
    }

    if (typeof error.error?.mensaje === 'string') {
      mensaje = error.error.mensaje;
    }

    const apiError: ApiError={
        status: error.status,
        mensaje: mensaje
    };

    return throwError(() => apiError);
  }
}
