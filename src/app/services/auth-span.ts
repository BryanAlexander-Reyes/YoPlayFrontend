import { SpanAuth }from '../models/span-auth'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpanAuthService {

  constructor() {}

  // Estado mostrado mientras se espera confirmacion
  obtenerEstadoLoading(): SpanAuth {
    return {
      icono: 'fa-solid fa-basketball fa-spin',
      titulo: 'Entrando',
      mensaje: 'bienvenido',
    };
  }

  // Estado mostrado cuando la confirmacion fue exitosa
  obtenerEstadoSuccess(): SpanAuth {
    return {
      icono: 'fa-solid fa-circle-check',
      titulo: 'Correo confirmado',
      mensaje: 'Su cuenta fue verificada correctamente',
    };
  }

  // Estado mostrado cuando la confirmacion fallo
  obtenerEstadoError(): SpanAuth {
    return {
      icono: 'fa-solid fa-circle-xmark',
      titulo: 'No se pudo confirmar',
      mensaje: 'El enlace expiró o no es válido',
    };
  }
  obtenerestadosiguente():SpanAuth {
    return{
      icono:'fa-solid fa-basketball fa-spin',
      titulo:'siguiente proceso',
      mensaje:'equipo registrado'
    }
  }
    obtenerestadosiguente2():SpanAuth {
    return{
      icono:'fa-solid fa-basketball fa-spin',
      titulo:'siguiente proceso',
      mensaje:'torneo terminado'
    }
  }
    obtenerestadosiguente3():SpanAuth {
    return{
      icono:'fa-solid fa-basketball fa-spin',
      titulo:'siguiente proceso',
      mensaje:'reglamento completo'
    }
  }
}