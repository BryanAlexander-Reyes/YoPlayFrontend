import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
interface Miembro {
  nombre: string;
  posicion: string;
  numero: string;
}

@Component({
  selector: 'app-registro-equipos',
  imports: [FormsModule],
  templateUrl: './registro-equipos.html',
  styleUrl: './registro-equipos.css',
})
export class RegistroEquipos {
   
  miembros: Miembro[] = [
    {
      nombre: '',
      posicion: '',
      numero: ''
    }
  ];

  agregarMiembro(): void {
    this.miembros.push({
      nombre: '',
      posicion: '',
      numero: ''
    });
  }
  quitarMiembros(index: number):void{
    this.miembros.splice(index,1);
  }
}
