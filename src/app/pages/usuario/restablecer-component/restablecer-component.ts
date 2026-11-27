import { Component, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule, Validators } from '@angular/forms';
import { ValidadorComponente } from '../../validador-componente/validador-componente';
import { UsuarioService } from '../../../ApisMidUsuario/usuario.service';
import { CorreoRegistro, CodigoVerificacion } from '../../../models/usuario-registro';
import { cambiarContrasena } from '../../../models/usuario-CambioContrasena';


@Component({
  selector: 'app-restablecer-component',
  imports: [NgIf, FormsModule, ValidadorComponente],
  templateUrl: './restablecer-component.html',
  styleUrl: './restablecer-component.css',
})
export class RestablecerComponent {
  @Output()irALogin = new EventEmitter<void>();

  correo = '';
  contrasena = '';
  verificacionContrasena = '';
  emailVerificado = false;
  codigoVerificado = false;
  private tokenRecuperacion: string = '';

  constructor(private usuarioService: UsuarioService){
  }

  restablecer(): void {

    if(!this.correo){
      alert('Ingrese un correo');
      return;
    }
    const solicitud: CorreoRegistro={
      correo: this.correo
    }
    this.usuarioService.recuperarContrasena(solicitud).subscribe({
      next: respuesta => {
        console.log('Solicitud de restablecimiento enviada:', respuesta);
        this.emailVerificado = true;
      },
      error: error => {
        console.error(error);
      }

    });
    
  }

  confirmarCodigo(token: string): void {
    this.tokenRecuperacion =token;
    this.codigoVerificado = true;
  }

  nuevaContrasena():void{
    if(!this.contrasena){
      alert('ingresa Contraseña')
      return;
    }
    if(this.contrasena !==this.verificacionContrasena){
      alert('La contraseña no coincide')
      return;
    }
    if (!this.tokenRecuperacion){
      alert('No existe un token de recuperacion.');
      return;
    }
    const datos: cambiarContrasena={
      token: this.tokenRecuperacion,
      contrasenaNueva: this.contrasena
    };

    this.usuarioService.cambiarContrasena(datos).subscribe({
      next: respuesta=> {
        alert('Contraseña cambiada con exito');
        this.tokenRecuperacion = '';
        this.contrasena = '';
        this.verificacionContrasena = '';
        this.emailVerificado = false;
        this.codigoVerificado = false;
        this.irALogin.emit();
      },
      error: error=>{
        console.error(error);
        alert(error.error?.mensaje || 'No fue posible actualizar la contraseña');
      }
    });

  }
}
