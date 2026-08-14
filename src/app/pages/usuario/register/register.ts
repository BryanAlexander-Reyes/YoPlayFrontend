import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [NgIf],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {

mostrarSegundoFormulario = false;

siguiente(): void {
  this.mostrarSegundoFormulario = true;
}

}
