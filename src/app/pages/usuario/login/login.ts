import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import  {Router} from '@angular/router'
import { AuthService } from '../../../services/auth';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
    constructor(private router:Router, private authService:AuthService){}

  email:string='';
  password:string='';

  // contraseña y usuario para prueba
  login (): void{

    const autenticado=this.authService.iniciarSesion(this.email, this.password);
    if(!autenticado){
      alert ('Correo o contraseña incorrecta')
      return;
    }
    const usuario=this.authService.obtenerUsuario();
    alert (`Bienvenido al sistema ${usuario?.nombre}\nrol: ${usuario?.rol}`)


    this.router.navigate(['/home'])
  }

  goToRegister():void{
  this.router.navigate(['/register'])
  }

}
