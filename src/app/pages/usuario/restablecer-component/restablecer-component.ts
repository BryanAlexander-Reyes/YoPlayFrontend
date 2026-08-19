import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    this.emailVerificado = true;
  }

  confirmarCodigo(): void {
    this.codigoVerificado = true;
  }
}
