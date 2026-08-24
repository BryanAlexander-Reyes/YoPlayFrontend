import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router"; 
interface Miembro {
  nombre: string;
  posicion: string;
  numero: string;
}
interface datos {
  nombreequipo:string,
  categoria:string,
  region:string,
  nombreCapitan:string,
  documentoCapitan:string,
  correoCapitan:string,
}

@Component({
  selector: 'app-registro-equipos',
  imports: [FormsModule],
  templateUrl: './registro-equipos.html',
  styleUrl: './registro-equipos.css',
})
export class RegistroEquipos {

  constructor(private router:Router){}


  registrarEquipo(){
    this.router.navigate(['/torneo'],{
      state:{
        mensaje:'!equipo registrado correctamento¡'
      }
    })
  }
   
  dato:datos[]=[
    {
  nombreequipo:'',
  categoria:'',
  region:'',
  nombreCapitan:'',
  documentoCapitan:'',
  correoCapitan:'',
    }
  ]
  miembros: Miembro[] = [
    {
      nombre: '',
      posicion: '',
      numero: ''
    },  
    {
      nombre: '',
      posicion: '',
      numero: ''
    },
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
