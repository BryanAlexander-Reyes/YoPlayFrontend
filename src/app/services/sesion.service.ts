import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SesionService {
  private readonly STORAGE_KEY = 'usuarioSesion';

  public guardarUsuario(idUsuario: number): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify({ id_usuario: idUsuario }));
  }

  public obtenerUsuario(): { id_usuario: number } | null {
    const usuario = localStorage.getItem(this.STORAGE_KEY);
    if (!usuario) {
      return null;
    }
    return JSON.parse(usuario);
  }
  public estaAutenticado(): boolean {
    return this.obtenerUsuario() !== null;
  }

  public cerrarSesion(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
