import { Component, EventEmitter, Output } from '@angular/core';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-register',
  imports: [NgIf],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {

  tipoDocumento=[
    {valor: 'CC', nombre:'cedula de ciudadania'},
    {valor: 'TI', nombre:'tarjeta de identidad'},
    {valor: 'CE', nombre:'cedula de extranjeria'},
  ];

  @Output() irALogin = new EventEmitter<void>();

  mostrarSegundoFormulario = false;

  siguiente(): void {
    this.mostrarSegundoFormulario = true;
  }
  volverALogin(){
    this.irALogin.emit();
  }

}
