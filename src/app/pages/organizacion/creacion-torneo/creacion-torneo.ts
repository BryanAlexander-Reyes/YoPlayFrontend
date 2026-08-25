import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SpanAuth } from '../../../models/span-auth';
import { SpanComponent } from '../../spancomponent/spancomponent';
import { SpanAuthService } from '../../../services/auth-span';

interface Deporte {
  deporte: string;
}

interface Divicion {
  etapa: string;
  cantidad_grupos: number | null;
}

interface Premiacion {
  premiacion: string;
}

interface Torneo {
  lugar: string;
  premiaciones: Premiacion[];
  tipo_deporte: string;
  divicion: Divicion[];
  cantidadEquipos: number;
  objetivo: string;
  fechaInicio: string;
  fechaFin: string;
}

@Component({
  selector: 'app-creacion-torneo',
  imports: [FormsModule],
  templateUrl: './creacion-torneo.html',
  styleUrl: './creacion-torneo.css'
})
export class CreacionTorneo{


  spancomponten!:SpanAuth;

  constructor(private router: Router, private span:SpanAuthService){
    this.spancomponten= this.span.obtenerestadosiguente2()
  }
  
  mostrarErrores: boolean = false;
  errorLugar = '';
  errorPremiacion = '';
  errorDeporte = '';
  errorDivision = '';
  errorGrupos = '';
  errorFlayer = '';
  errorEquipos = '';
  errorObjetivo = '';
  errorFechaInicio = '';
  errorFechaFin = '';
  errorFechas = '';



  contador: number = 0;
  lugar: string = '';
  objetivo: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  flayer: string | null = null;

  mensaje: string = '';
  mostrarMensaje: boolean = false;

  opcionesDeportes: string[] = [
    'Fútbol',
    'Baloncesto',
    'Voleibol',
    'Tenis',
    'Béisbol'
  ];

  deportes: Deporte[] = [
    {
      deporte: ''
    }
  ];

  opciondivision: string[] = [
    'grupos',
    'todo contra todo',
    'directa'
  ];

  diviciones: Divicion[] = [
    {
      etapa: '',
      cantidad_grupos: null
    }
  ];

  premiaciones: Premiacion[] = [
    {
      premiacion: ''
    },
    {
      premiacion: ''
    }
  ];

  sumarcontador(): void {
    this.contador++;
    console.log('Cantidad de equipos:', this.contador);
  }

  restarcontador(): void {
    if (this.contador > 0) {
      this.contador--;
      console.log('Cantidad de equipos:', this.contador);
    }
  }

  agregarpremio(): void {
    this.premiaciones.push({
      premiacion: ''
    });
  }

  quitarpremiacion(index: number): void {
    if (this.premiaciones.length > 1) {
      this.premiaciones.splice(index, 1);
    }
  }

  validargrupos(divicion: Divicion): boolean {

    if (divicion.etapa !== 'grupos') {
      return true;
    }

    const cantidad = divicion.cantidad_grupos;

    if (
      cantidad === null ||
      cantidad < 2 ||
      cantidad > 8 ||
      cantidad % 2 !== 0
    ) {
      return false;
    }

    return true;
  }

  seleccionarFlayer(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.flayer = null;
      return;
    }

    const archivo = input.files[0];

    const lector = new FileReader();

    lector.onload = () => {
      this.flayer = lector.result as string;
    };

    lector.readAsDataURL(archivo);
  }
  limpiarErrores(): void {
  this.errorLugar = '';
  this.errorPremiacion = '';
  this.errorDeporte = '';
  this.errorDivision = '';
  this.errorGrupos = '';
  this.errorFlayer = '';
  this.errorEquipos = '';
  this.errorObjetivo = '';
  this.errorFechaInicio = '';
  this.errorFechaFin = '';
  this.errorFechas = '';
}

reglamento(): void {
  this.mostrarErrores = true;

  setTimeout(() => {
    this.mostrarErrores = false;
  }, 5000);

  if (!this.lugar.trim()) return;

  if (this.premiaciones.some(p => !p.premiacion.trim())) return;

  if (!this.deportes[0].deporte) return;

  if (!this.diviciones[0].etapa) return;

  if (
    this.diviciones[0].etapa === 'grupos' &&
    !this.validargrupos(this.diviciones[0])
  ) return;

  if (!this.flayer) return;

  if (this.contador <= 0) return;

  if (!this.objetivo.trim()) return;

  if (!this.fechaInicio || !this.fechaFin) return;

  if (this.fechaFin <= this.fechaInicio) return;

  const torneo: Torneo = {
    lugar: this.lugar,
    premiaciones: this.premiaciones,
    tipo_deporte: this.deportes[0].deporte,
    divicion: this.diviciones,
    cantidadEquipos: this.contador,
    objetivo: this.objetivo,
    fechaInicio: this.fechaInicio,
    fechaFin: this.fechaFin,
  };

  const torneosGuardados: Torneo[] = JSON.parse(
    localStorage.getItem('torneos') || '[]'
  );

  torneosGuardados.push(torneo);

   try {

    localStorage.setItem(
      'torneos',
      JSON.stringify(torneosGuardados)
    );

    console.log('Torneo creado:', torneo);
    console.log('Todos los torneos:', torneosGuardados);

    // Mostrar card de carga
    this.spancomponten = this.span.obtenerestadosiguente();

    // Esperar antes de navegar
    setTimeout(() => {

      this.router.navigate(['/reglamento'], {
        state: {
          mensaje: '¡Torneo creado correctamente!'
        }
      });

    }, 2000);

  } catch (error) {

    console.error('Error al guardar el torneo:', error);

  }
}}