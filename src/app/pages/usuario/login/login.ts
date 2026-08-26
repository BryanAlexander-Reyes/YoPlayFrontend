import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import  {Router} from '@angular/router'
import { AuthService } from '../../../services/auth';
import { EventEmitter, Output } from '@angular/core';
import {RestablecerComponent} from '../restablecer-component/restablecer-component'
;

@Component({
  selector: 'app-login',
  imports: [FormsModule, ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  
 
  

    constructor(private router:Router, private authService:AuthService){}
    @Output() irARegistro = new EventEmitter<void>();
    @Output() abrirRecuperarComponent = new EventEmitter<void>();
    abrirRecuperar(){
        this.abrirRecuperarComponent.emit();
      };
  email:string='';
  password:string='';
  @Output() mostrarSpan = new EventEmitter<void>();

  // contraseña y usuario para prueba
 login(): void {

  const autenticado = this.authService.iniciarSesion(
    this.email,
    this.password
  );

  if (!autenticado) {
    alert('Correo o contraseña incorrecta');
    return;
  }

  const usuario = this.authService.obtenerUsuario();

  alert(
    `Bienvenido al sistema ${usuario?.nombre}\nrol: ${usuario?.rol}`
  );

  // Mostrar tarjeta de carga
  this.mostrarSpan.emit();

  // Esperar antes de cambiar de página
  setTimeout(() => {
    this.router.navigate(['/home']);
  }, 2000);
}}