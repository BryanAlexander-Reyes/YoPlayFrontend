import { Injectable } from '@angular/core';
import { RequestManagerUsuario } from './request-manager';
import { Observable } from 'rxjs';
import { UsuarioAuth, UsuarioSesion } from '../models/usuario-auth';
import { UsuarioRegistro, UsuarioRegistroResponse } from '../models/usuario-registro';
import { CorreoRegistro, CorreoRegistroResponse } from '../models/usuario-registro';
import { CodigoVerificacion, CodigoVerificacionResponse } from '../models/usuario-registro';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    constructor(private requestManager: RequestManagerUsuario){}


    public iniciarSesion(usuario: UsuarioAuth): Observable<UsuarioSesion> {
        return this.requestManager.post<UsuarioSesion>('api/login', usuario);
    }

    public registrarUsuario(usuario:UsuarioRegistro):Observable<UsuarioRegistroResponse>{
        return this.requestManager.post<UsuarioRegistroResponse>('api/creacion-usuario', usuario);
    }

    public verificarCorreo(correo: CorreoRegistro):Observable<CorreoRegistroResponse>{
        return this.requestManager.post<CorreoRegistroResponse>('api/verificarcodigocorreo',correo)
    }

    public enviarCodigoVerificacion(usuario: CodigoVerificacion):Observable<CodigoVerificacionResponse>{
        return this.requestManager.post<CodigoVerificacionResponse>('api/enviarCorreoRegistro', usuario);
    }
}