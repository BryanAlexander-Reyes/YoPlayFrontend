import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-validador-componente',
  imports: [FormsModule],
  templateUrl: './validador-componente.html',
  styleUrl: './validador-componente.css',
})
export class ValidadorComponente {
  codigo1 = '';
  codigo2 = '';
  codigo3 = '';
  codigo4 = '';
  codigo5 = '';
  codigo6 = '';
  codigoCorrecto = '123456';

  siguienteInput(event: Event, siguiente: HTMLInputElement): void {
    const inputActual = event.target as HTMLInputElement;

    if (inputActual.value.length === 1) {
      siguiente.focus();
    }
  }
  codigoValido(): boolean {
    const codigoIngresado =
      this.codigo1 + this.codigo2 + this.codigo3 + this.codigo4 + this.codigo5 + this.codigo6;

    return codigoIngresado === this.codigoCorrecto;
  }
}
