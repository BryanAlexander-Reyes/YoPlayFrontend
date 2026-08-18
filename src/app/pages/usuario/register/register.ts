import { Component, EventEmitter, Output } from '@angular/core';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-register',
  imports: [NgIf],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {

  @Output() irALogin = new EventEmitter<void>();

  mostrarSegundoFormulario = false;

  siguiente(): void {
    this.mostrarSegundoFormulario = true;
  }
  volverALogin(){
    this.irALogin.emit();
  }

}
