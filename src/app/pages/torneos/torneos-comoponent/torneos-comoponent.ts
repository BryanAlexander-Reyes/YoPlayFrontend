import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TorneosService, Torneo } from '../../../services/auth-services-torneosCurso';





@Component({
  selector: 'app-torneos-comoponent',
  imports: [CommonModule],
  templateUrl: './torneos-comoponent.html',
  styleUrl: './torneos-comoponent.css',
})
export class TorneosComponent implements OnInit{
  torneos:Torneo[]=[];
  torneoActual:number=0;

  constructor(private router: Router,
    private torneosService: TorneosService
  ) {}
  ngOnInit(): void {
    this.torneos = this.torneosService.obtenerTorneos();
  }
  verInfTorneos(id:number): void {
    this.router.navigate(['/inf-torneos', id]);
  }



siguiente(): void {
  if (this.torneos.length === 0) {
    return;
  }

  this.torneoActual =
    (this.torneoActual + 1) % this.torneos.length;
}

anterior(): void {
  if (this.torneos.length === 0) {
    return;
  }

  this.torneoActual =
    (this.torneoActual - 1 + this.torneos.length) %
    this.torneos.length;
}

irATorneo(index: number): void {
  this.torneoActual = index;
}
}
