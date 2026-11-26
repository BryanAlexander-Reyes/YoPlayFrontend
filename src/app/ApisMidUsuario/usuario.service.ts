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
        return this.requestManager.post<CorreoRegistroResponse>('api/enviarcorreoregistro',correo)
    }

    public enviarCodigoVerificacion(usuario: CodigoVerificacion):Observable<CodigoVerificacionResponse>{
        return this.requestManager.post<CodigoVerificacionResponse>('api/verificarcodigocorreo', usuario);
    }

    public recueperarContrasena(usuario: UsuarioAuth):Observable<UsuarioSesion>{
        return this.requestManager.post<UsuarioSesion>('api/recuperarcontrsena', usuario);
    }

    public cambiarContrasena(usuario: UsuarioAuth): Observable<UsuarioSesion>{
        return this.requestManager.put<UsuarioSesion>('api/cambiarcontrasena', usuario);
    }

    // traer los datos de documentos
    public obtenerDocumentos(): Observable<any> {
        return this.requestManager.getDocumentos<any>('v1/documentos');
    }
}