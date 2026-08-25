import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class EquiposService{
    tablaEquipos=[
    {
      equipo:'Tame',
    },{
      equipo:'Arauca',
    },{
      equipo:'Atlanta',
    },{
      equipo:'Casanare',
    },{
      equipo:'Salpicon',
    },{
      equipo:'Malaga',
    },{
      equipo:'R.A',
    },{
      equipo:'ComboAlphinito',
    },{
      equipo:'Sancocho',
    },{
      equipo:'Almendra',
    },{
      equipo:'Almendra',
    },{
      equipo:'Almendra',
    },
  ];
  constructor(){}
  obtenerEquipos(){
    return this.tablaEquipos;
  }
}