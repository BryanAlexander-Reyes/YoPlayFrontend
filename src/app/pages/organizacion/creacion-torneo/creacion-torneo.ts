import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Torneo {
  Lugar:string;
  tipo_deporte:string;
  divicion:string;
  flayer: File | null;
}
interface premiacion{
   premiacion:string;
}
@Component({
  selector: 'app-creacion-torneo',
  imports: [FormsModule],
  templateUrl: './creacion-torneo.html',
  styleUrl: './creacion-torneo.css',
})
export class CreacionTorneo {

    contador:number=0
  
    sumarcontador():void{
      this.contador=this.contador+1
      console.log(this.contador)
    }
    restarcontador():void{
      if(this.contador>0){
      this.contador=this.contador-1
      console.log(this.contador)
      }
    }

    premiaciones:premiacion[]=[
      {
        premiacion:'',
      }
    ];
    agregarpremio():void{
      this.premiaciones.push({
        premiacion:''
      });
    }
quitarpremiacion(index: number): void {
    if (this.premiaciones.length > 1) {
        this.premiaciones.splice(index, 1);
    }
}
}
