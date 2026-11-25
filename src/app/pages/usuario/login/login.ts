import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {UsuarioService} from '../../../ApisMidUsuario/usuario.service';}
import { SesionService } from '../../../services/sesion.service';
import { EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authService: UsuarioService,
    private sesionService: SesionService, 
  ) {}
  @Output() irARegistro = new EventEmitter<void>();
  @Output() abrirRecuperarComponent = new EventEmitter<void>();

  goToRegister(): void {
    this.irARegistro.emit();
  }

  abrirRecuperar(): void {
    this.abrirRecuperarComponent.emit();
  }
  email: string = '';
  password: string = '';
  @Output() mostrarSpan = new EventEmitter<void>();

  // contraseña y usuario para prueba
  login(): void {
    this.usuarioService.iniciarSesion(this.email, this.password).subscribe({
      next: (respuesta) => {
        this.sesionService.guardarUsuario(respuesta.id_usuario);

        this.mostrarSpan.emit();

        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1500);
      },
      error:()=>{
        alert('CORREO O CONTRASEÑA SON INCORRECTS');
      }
    });
}
}
