import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {TorneosService, Torneo} from "../../../services/auth-services-torneosCurso";
import {RegistroEquipos} from "../../organizacion/registro-equipos/registro-equipos";


@Component({
  selector: 'app-inscripcion-componente',
  imports: [CommonModule, RegistroEquipos],
  templateUrl: './inscripcion-componente.html',
  styleUrl: './inscripcion-componente.css',
})
export class InscripcionComponente implements OnInit{
  torneo: Torneo | undefined;
  constructor(private torneosService: TorneosService,
    private route:ActivatedRoute
  ){}
  ngOnInit(): void {
    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );
    this.torneo=this.torneosService.obtenerTorneoPorId(id);
    console.log('el torneo encontrado es:', this.torneo)
  }
}
