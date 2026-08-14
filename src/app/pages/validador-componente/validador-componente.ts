import { Component } from '@angular/core';

@Component({
  selector: 'app-validador-componente',
  imports: [],
  templateUrl: './validador-componente.html',
  styleUrl: './validador-componente.css',
})
export class ValidadorComponente {


  siguienteInput(event: Event, siguiente: HTMLInputElement): void {

  const inputActual = event.target as HTMLInputElement;

  if (inputActual.value.length === 1) {
    siguiente.focus();
  }

}
}
