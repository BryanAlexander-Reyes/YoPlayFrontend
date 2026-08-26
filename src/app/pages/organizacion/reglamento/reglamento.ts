import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface reglamento {
  regla: string;
}


@Component({
  selector: 'app-reglamento',
  imports: [FormsModule],
  templateUrl: './reglamento.html',
  styleUrl: './reglamento.css',
})
export class Reglamento {

  mostrarErrores:boolean=false;
  aceptar:boolean=false;
  reglamentos: reglamento[] = [
    {
      regla: ''
    }
  ];
  
 

  mostrarvalidar=false;

  idioma: string = 'Español';

  reglamentoEstandar: string = 'FIFA';

  generarPdf: boolean = false;

 

  constructor(private router: Router) {}

  agregaregla(): void {
    this.reglamentos.push({
      regla: ''
    });
  }

  eliminaregla(index: number): void {
    if (this.reglamentos.length > 1) {
      this.reglamentos.splice(index, 1);
    }
  }

  crearReglamento(): void {

    this.mostrarErrores=true;

    if(!this.aceptar){
    this.ocultarerrores();
    return;
    }
    const reglamentoGuardado = {
      reglas: this.reglamentos,
      idioma: this.idioma,
      reglamentoEstandar: this.reglamentoEstandar,
      generarPdf: this.generarPdf,
    };
 
    localStorage.setItem(
      'reglamento',
      JSON.stringify(reglamentoGuardado)
    );
    console.log(JSON.stringify(reglamentoGuardado, null, 2));
    this.mostrarvalidar=true
    setTimeout(() => {

      this.router.navigate(['/torneos_activos'], {
      });

    }, 2000);
  }
  ocultarerrores():void{
    setTimeout(()=>{
      this.mostrarErrores=false;
    },5000);
  }
}