import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Miembro {
nombre:string;
posicion:string;
numero:string;
}

interface Datos {
nombreequipo:string;
categoria:string;
region:string;
nombreCapitan:string;
documentoCapitan:string;
correoCapitan:string;
}

@Component({
selector:'app-registro-equipos',
imports:[FormsModule],
templateUrl:'./registro-equipos.html',
styleUrl:'./registro-equipos.css'
})
export class RegistroEquipos {

constructor(private router:Router){}

mostrarErrores:boolean=false;
aceptaTerminos:boolean=false;

dato:Datos[]=[
{
nombreequipo:'',
categoria:'',
region:'',
nombreCapitan:'',
documentoCapitan:'',
correoCapitan:''
}
];

miembros:Miembro[]=[
{
nombre:'',
posicion:'',
numero:''
},
{
nombre:'',
posicion:'',
numero:''
},
{
nombre:'',
posicion:'',
numero:''
}
];

agregarMiembro():void{
this.miembros.push({
nombre:'',
posicion:'',
numero:''
});
}

quitarMiembros(index:number):void{
if(this.miembros.length>1){
this.miembros.splice(index,1);
}
}

registrarEquipo():void{

this.mostrarErrores=true;

const datos=this.dato[0];

const datosEquipoValidos=
datos.nombreequipo.trim()!=='' &&
datos.categoria.trim()!=='' &&
datos.region.trim()!=='' &&
datos.nombreCapitan.trim()!=='' &&
datos.documentoCapitan.trim()!=='' &&
datos.correoCapitan.trim()!=='';

const miembrosValidos=this.miembros.every(
miembro=>
miembro.nombre.trim()!=='' &&
miembro.posicion.trim()!=='' &&
miembro.numero.trim()!==''
);

if(!datosEquipoValidos){
this.ocultarErrores();
return;
}

if(!miembrosValidos){
this.ocultarErrores();
return;
}

if(!this.aceptaTerminos){
this.ocultarErrores();
return;
}

const equipo={
...datos,
miembros:this.miembros,
aceptaTerminos:this.aceptaTerminos
};

localStorage.setItem(
'equipo',
JSON.stringify(equipo)
);

console.log('EQUIPO REGISTRADO:');
console.log(JSON.stringify(equipo,null,2));

this.router.navigate(['/torneos_activos  '],{
state:{
mensaje:'¡Equipo registrado correctamente!'
}
});
}

ocultarErrores():void{
setTimeout(()=>{
this.mostrarErrores=false;
},5000);
}

}