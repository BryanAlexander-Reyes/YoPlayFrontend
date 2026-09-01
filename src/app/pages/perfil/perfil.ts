import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Torneo, TorneosService } from '../../services/auth-services-torneosCurso';
import { HostListener } from '@angular/core';
import { Fixture } from '../torneos/fixture/fixture';

interface perfil{
  nombre:string,
  tipo_documneto:string,
  numero_documneto:number,
  equipo:string,
  Rol:string,
  Estado:string,
}

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, FormsModule, Fixture],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {

  fotoPerfil: string | null = null;
  torneoFixtureId: number | null = null;
  perfilPublico = false;

  readonly torneosPerfil: Torneo[];

  constructor(private readonly torneosService: TorneosService) {
    this.torneosPerfil = this.torneosService.obtenerTorneos().slice(0, 3);
  }

  tieneFotoPerfil(): boolean {
    return Boolean(this.fotoPerfil);
  }

  get estadoPerfil(): string {
    return this.perfilPublico ? 'público' : 'privado';
  }

  abrirFixture(id: number): void {
    this.torneoFixtureId = id;
  }

  cerrarFixture(): void {
    this.torneoFixtureId = null;
  }

  obtenerTorneoPorId(id: number): Torneo | undefined {
    return this.torneosService.obtenerTorneoPorId(id);
  }

  @HostListener('document:keydown.escape')
  cerrarFixtureConEscape(): void {
    if (this.torneoFixtureId !== null) {
      this.cerrarFixture();
    }
  }


  perfiles:perfil=
    {
      nombre:'Kevin Alexander Hernández Sierra',
      tipo_documneto:'Cédula de ciudadanía',
      numero_documneto:1123038372,
      equipo:'No definido',
      Rol:'Usuario',
      Estado:'Activo'
    }
}