import { Component, Input } from '@angular/core';
import { EquiposService } from '../../../services/auth-service-equipos';
import { CommonModule} from '@angular/common';

interface EquipoPosicion{
    equipo:string;
    pj:number;
    g:number;
    d:number;
    e:number;
    pts:number;
}


@Component({
  selector: 'app-puntaje-component',
  imports: [CommonModule],
  templateUrl: './puntaje-component.html',
  styleUrl: './puntaje-component.css',
})
export class PuntajeComponent {
  @Input() visionPuntajes:boolean=false;

  tablaPosiciones:EquipoPosicion[]=[];
  tablaEquipo:EquiposService[]=[];

  constructor (private equiposService: EquiposService){}
  ngOnInit() :void{
    const equipos=this.equiposService.obtenerEquipos();
    this.tablaPosiciones=equipos.map(equipo=>({
      equipo: equipo.equipo,
      pj:0,
      g:0,
      d:0,
      e:0,
      pts:0,
    }));
  }

  partidoGanado(equipo:EquipoPosicion):void{
    if(this.visionPuntajes) return;
    equipo.pj++;
    equipo.g++;
    equipo.pts+=3;
  }
  partidoDerrota(equipo:EquipoPosicion):void{
    if(this.visionPuntajes) return;
    equipo.d++;
    equipo.pj++;
  }
  partidoEmpate(equipo:EquipoPosicion):void{
    if(this.visionPuntajes) return;
    equipo.pj++;
    equipo.e++;
    equipo.pts++;
  }
}
