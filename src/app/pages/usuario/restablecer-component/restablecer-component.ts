import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule, Validators } from '@angular/forms';
import { ValidadorComponente } from '../../validador-componente/validador-componente';

@Component({
  selector: 'app-restablecer-component',
  imports: [NgIf, FormsModule, ValidadorComponente],
  templateUrl: './restablecer-component.html',
  styleUrl: './restablecer-component.css',
})
export class RestablecerComponent {
  correo = '';
  contrasena = '';
  verificacionContrasena = '';
  emailVerificado = false;
  codigoVerificado = false;

  restablecer(): void {
    if(!this.correo){
      alert('Ingrese un correo');
      return;
    }
    this.emailVerificado = true;
  }

  confirmarCodigo(): void {
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
    const datos={
      correo: this.correo,
      contrasena:this.contrasena
    };

    console.log(datos);
  }
}
