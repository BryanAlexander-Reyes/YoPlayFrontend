import { DecimalPipe, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Torneo, TorneosService } from '../../../services/auth-services-torneosCurso';
import { ActivatedRoute } from '@angular/router';
import { PuntajeComponent } from '../puntaje-component/puntaje-component';
import { MatTabsModule } from '@angular/material/tabs';

interface Fixtureencuentros {
  id: string;
  equipoA: string | null;
  equipoB: string | null;
  ganador: string | null;
  fecha?: string;
  hora:string;
}

interface FixtureRondas {
  titulo: string;
  encuentros: Fixtureencuentros[];
}

@Component({
  selector: 'app-fixture',
  imports: [DecimalPipe, NgIf, PuntajeComponent, MatTabsModule],
  templateUrl: './fixture.html',
  styleUrl: './fixture.css',
})
export class Fixture implements OnInit{
  torneo: Torneo  | undefined;
  constructor(private torneosService:TorneosService,
    private route:ActivatedRoute
  ){}

  @Input() visualizacion:boolean=true;
  

  ngOnInit(): void {
    const id =Number(
      this.route.snapshot.paramMap.get('id')
    );
    this.torneo=this.torneosService.obtenerTorneoPorId(id);
    
  };

  readonly rondas: FixtureRondas[] = [

        {
      titulo: 'octavos de final',
      encuentros: [
        { id: 'qf-1', equipoA: 'Halcones FC', equipoB: 'Titanes', ganador: null, fecha: 'Sáb 24 Ago', hora:'14:30' },
        { id: 'qf-2', equipoA: 'Dragones', equipoB: 'Aurora', ganador: null, fecha: 'Sáb 24 Ago', hora:'14:30' },
        { id: 'qf-3', equipoA: 'Centauros', equipoB: 'Raptors', ganador: null, fecha: 'Dom 25 Ago', hora:'14:30' },
        { id: 'qf-4', equipoA: 'Fénix', equipoB: 'Lobos del Sur', ganador: null, fecha: 'Dom 25 Ago', hora:'13:30' },
        { id: 'qf-5', equipoA: 'Fénix', equipoB: 'Lobos del Sur', ganador: null, fecha: 'Dom 25 Ago', hora:'14:30' },
        { id: 'qf-6', equipoA: 'Fénix', equipoB: 'Lobos del Sur', ganador: null, fecha: 'Dom 25 Ago', hora:'13:30' },
        { id: 'qf-7', equipoA: 'Fénix', equipoB: 'Lobos del Sur', ganador: null, fecha: 'Dom 25 Ago', hora:'14:30' },
        { id: 'qf-8', equipoA: 'Fénix', equipoB: 'Lobos del Sur', ganador: null, fecha: 'Dom 25 Ago', hora:'13:30'  },
      ],
    },
    {
      titulo: 'Cuartos de final',
      encuentros: [
        { id: 'qf-1', equipoA: null, equipoB: null, ganador: null, fecha: 'Sáb 24 Ago', hora:'15:30' },
        { id: 'qf-2', equipoA: null, equipoB: null, ganador: null, fecha: 'Sáb 24 Ago', hora:'15:30' },
        { id: 'qf-3', equipoA: null, equipoB: null, ganador: null, fecha: 'Dom 25 Ago', hora:'15:30' },
        { id: 'qf-4', equipoA:null, equipoB: null, ganador: null, fecha: 'Dom 25 Ago', hora:'15:30' },
      ],
    },
    {
      titulo: 'Semifinales',
      encuentros: [
        { id: 'sf-1', equipoA: null, equipoB: null, ganador: null, fecha: 'Sáb 31 Ago', hora:'16:30' },
        { id: 'sf-2', equipoA: null, equipoB: null, ganador: null, fecha: 'Dom 1 Sep', hora:'16:30' },
      ],
    },
    {
      titulo: 'Final',
      encuentros: [{ id: 'f-1', equipoA: null, equipoB: null, ganador: null, fecha: 'Sáb 7 Sep', hora:'13:00' }],
    },
  ];

  seleccionarGanador(roundIndex: number, matchIndex: number, team: string | null): void {
    if (!team) return;

    const match = this.rondas[roundIndex].encuentros[matchIndex];
    match.ganador = match.ganador === team ? null : team;

    if (roundIndex < this.rondas.length - 1) {
      const nextMatch = this.rondas[roundIndex + 1].encuentros[Math.floor(matchIndex / 2)];
      const slot = matchIndex % 2 === 0 ? 'equipoA' : 'equipoB';
      nextMatch[slot] = match.ganador;
      nextMatch.ganador = null;
    }
  }

  restaurarFixture(): void {
    this.rondas.slice(0, -1).forEach((rondas) => {
      rondas.encuentros.forEach((encuentros) => (encuentros.ganador = null));
    });
    this.rondas.slice(1).forEach((rondas) => {
      rondas.encuentros.forEach((encuentros) => {
        encuentros.equipoA = null;
        encuentros.equipoB = null;
        encuentros.ganador = null;
      });
    });
  }
}
