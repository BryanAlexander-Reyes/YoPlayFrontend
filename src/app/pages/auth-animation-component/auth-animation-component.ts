import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../usuario/login/login';
import { RegisterComponent } from '../usuario/register/register';
import {RestablecerComponent} from '../usuario/restablecer-component/restablecer-component'

@Component({
  selector: 'app-auth-animation-component',
  imports: [CommonModule, FormsModule, LoginComponent, RegisterComponent, RestablecerComponent],
  templateUrl: './auth-animation-component.html',
  styleUrl: './auth-animation-component.css',
})
export class AuthAnimationComponent {
  mostrarRestablecer=false;

  abrirModal(){
    this.mostrarRestablecer=true;
  };
  cerrarRecuperar(){
      this.mostrarRestablecer=false;
    }

  registroActivo: boolean = false;

  mostrarRegistro(): void {
    this.registroActivo = true;
  }

  mostrarLogin(): void {
    this.registroActivo = false;
  }
}
