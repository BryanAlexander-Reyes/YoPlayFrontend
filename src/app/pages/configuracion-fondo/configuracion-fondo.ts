import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-configuracion-fondo',
  imports: [FormsModule],
  templateUrl: './configuracion-fondo.html',
  styleUrl: './configuracion-fondo.css',
})
export class ConfiguracionFondo {
  modoClaro: boolean = false;
    cambiartema(): void {
        if (this.modoClaro) {
            document.body.classList.add('tema-claro');
            document.body.classList.remove('tema-oscuro');
        } else {
            document.body.classList.add('tema-oscuro');
            document.body.classList.remove('tema-claro');
        }
    }
}