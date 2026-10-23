import { fromReadableStreamLike } from 'rxjs/internal/observable/innerFrom';
import { UsuarioAuth } from '../models/usuario-auth';
import { Injectable } from '@angular/core';
import { Environment} from '../../../environments/environments'
import { HttpClient } from '@angular/common/http';

interface UsuarioSistemas extends UsuarioAuth {
  password: string;
}

interface LoginResponse {
  mensaje:string,
  id_usuario:number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'usuarioSesion';
  private readonly LOGIN_URL = `${Environment.apiUrl}/api/login`;

  private usuarioSistemas: UsuarioSistemas[] = [
    {
      nombre: 'Brayan Reyes',
      correo: 'bryanreyes47k@gmail.com',
      password: '123456',
    },
    {
      nombre: 'Kevin Alexander Hernández Sierra',
      correo: 'admink@gmail.com',
      password: '123456',
      
    }
  ];

  constructor(private http:HttpClient) {}

  // Metodo para guardar la informacion del usuario

  iniciarSesion(correo:string, password:string){
    return this.http.post<LoginResponse>(
      this.LOGIN_URL,
      {
        correo: correo,
        contrasena: password
      }
    );

    
  }
  guardarUsuario(idUsuario:number ):void{
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify({id_usuario:idUsuario}));
  }

  cerrarSesion(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // METODO PARA SABER SI ES UN USUARIO AUTENTICADO
  estaAutenticado(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) != null;
  }

  // metodo que obtiene el usuario autenticas
  obtenerUsuario(): {id_usuario: number} | null {
    const usuario = localStorage.getItem(this.STORAGE_KEY);
    if (!usuario) {
      return null;
    }
    return JSON.parse(usuario);
  }

  // Metodo para obtener el rol


  // metodo para obtener nombre
  // obtenerNombre(): string {
  //   return this.obtenerUsuario()?.nombre ?? '';
  // }
}

