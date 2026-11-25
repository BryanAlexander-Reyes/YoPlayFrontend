import { Injectable } from '@angular/core';
import { RequestManagerUsuario } from './request-manager';
import { Observable } from 'rxjs';
import { UsuarioAuth, UsuarioSesion } from '../models/usuario-auth';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    constructor(private requestManager: RequestManagerUsuario){}


    public iniciarSesion(usuario: UsuarioAuth): Observable<UsuarioSesion> {
        return this.requestManager.post<UsuarioSesion>('api/login', usuario);
    }
}