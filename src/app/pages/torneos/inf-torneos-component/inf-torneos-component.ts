import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ActivatedRoute } from '@angular/router';
import { Torneo, TorneosService } from '../../../services/auth-services-torneosCurso';
import { EquiposComponent } from '../equipos/equipos'; 
import { Fixture } from '../fixture/fixture';

@Component({
  selector: 'app-inf-torneos-component',
  imports: [CommonModule,EquiposComponent,Fixture],
  templateUrl: './inf-torneos-component.html',
  styleUrl: './inf-torneos-component.css',
})
export class InfTorneosComponent  implements OnInit{
  torneo: Torneo  | undefined;

  constructor (
    private route: ActivatedRoute,
    private torneosService: TorneosService
  ){}

  ngOnInit(): void {
    const id =Number(
      this.route.snapshot.paramMap.get('id')
    );
    this.torneo=this.torneosService.obtenerTorneoPorId(id);
    console.log('torneo encontrado:', this.torneo)
  }

}
