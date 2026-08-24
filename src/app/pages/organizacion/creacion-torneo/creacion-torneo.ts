import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  flayer: string | null;
}

@Component({
  selector: 'app-creacion-torneo',
  imports: [FormsModule],
  templateUrl: './creacion-torneo.html',
  styleUrl: './creacion-torneo.css'
})
export class CreacionTorneo implements OnInit {

  constructor(private router: Router) {}

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

  crearTorneo(): void {

    if (this.contador <= 0) {
      console.log('Debe ingresar la cantidad de equipos');
      return;
    }

    if (!this.lugar.trim()) {
      console.log('Debe ingresar el lugar del torneo');
      return;
    }

    if (!this.deportes[0].deporte) {
      console.log('Debe seleccionar un deporte');
      return;
    }

    if (!this.diviciones[0].etapa) {
      console.log('Debe seleccionar una división');
      return;
    }

    if (
      this.diviciones[0].etapa === 'grupos' &&
      !this.validargrupos(this.diviciones[0])
    ) {
      console.log('La cantidad de grupos debe ser un número par entre 2 y 8');
      return;
    }

    const torneo: Torneo = {
      lugar: this.lugar,
      premiaciones: this.premiaciones,
      tipo_deporte: this.deportes[0].deporte,
      divicion: this.diviciones,
      cantidadEquipos: this.contador,
      objetivo: this.objetivo,
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      flayer: this.flayer
    };

    const torneosGuardados: Torneo[] = JSON.parse(
      localStorage.getItem('torneos') || '[]'
    );

    torneosGuardados.push(torneo);

    localStorage.setItem(
      'torneos',
      JSON.stringify(torneosGuardados)
    );

    console.log('Torneo creado:', torneo);
    console.log('Todos los torneos:', torneosGuardados);

    this.router.navigate(['/reglamento'], {
      state: {
        mensaje: '¡Torneo creado correctamente!'
      }
    });
  }

  ngOnInit(): void {

    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras.state?.['mensaje']) {

      this.mensaje = navigation.extras.state['mensaje'];

      this.mostrarMensaje = true;

      setTimeout(() => {
        this.mostrarMensaje = false;
      }, 4000);
    }
  }
  registrarTorneo(): void {
  const torneo = {
    lugar: this.lugar,
    premiaciones: this.premiaciones,
    tipo_deporte: this.deportes[0].deporte,
    division: {
      etapa: this.diviciones[0].etapa,
      cantidad_grupos: this.diviciones[0].cantidad_grupos
    },
    cantidad_equipos: this.contador,
    objetivo: this.objetivo,
    fecha_inicio: this.fechaInicio,
    fecha_fin: this.fechaFin
  };

  localStorage.setItem(
    'torneo',
    JSON.stringify(torneo, null, 2)
  );

  console.log('TORNEO EN JSON:');
  console.log(JSON.stringify(torneo, null, 2));

  console.log('OBJETO DEL TORNEO:');
  console.log(torneo);

  this.router.navigate(['/reglamento'], {
    state: {
      mensaje: '¡Torneo creado correctamente!'
    }
  });
}
}