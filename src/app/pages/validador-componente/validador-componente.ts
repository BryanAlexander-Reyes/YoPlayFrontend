import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpanAuth } from '../../models/span-auth';
import { UsuarioService } from '../../ApisMidUsuario/usuario.service';
import {CodigoVerificacion, CodigoVerificacionResponse} from '../../models/usuario-registro';
import { I } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-validador-componente',
  imports: [FormsModule],
  templateUrl: './validador-componente.html',
  styleUrl: './validador-componente.css',
})
export class ValidadorComponente {
  constructor(private usuarioService: UsuarioService) {}
  @Output() codigoConfirmado = new EventEmitter<void>();
  
  @Input() estado!:SpanAuth;
  @Input() correo:string = '';
                                                                      
  codigo1 = '';
  codigo2 = '';
  codigo3 = '';
  codigo4 = '';
  codigo5 = '';
  codigo6 = '';
  

  siguienteInput(event: Event, siguiente: HTMLInputElement): void {
    const inputActual = event.target as HTMLInputElement;

    if (inputActual.value.length === 1) {
      siguiente.focus();
    }
  }
  codigoValido(): boolean {
    const codigoIngresado =
      this.codigo1 + this.codigo2 + this.codigo3 + this.codigo4 + this.codigo5 + this.codigo6;

    return /^\d{6}$/.test(codigoIngresado);
  }

  confirmarCodigo(): void {
    if (!this.codigoValido()) {
      return;
    }
    const solicitud: CodigoVerificacion= {
      correo: this.correo,
      codigo: this.codigo1 +
      this.codigo2+
      this.codigo3+
      this.codigo4+
      this.codigo5+
      this.codigo6,
      proposito: 'registro'
    };
    this.usuarioService.verificarCorreo(solicitud).subscribe({
      next: respuesta=>{
        console.log(respuesta.Mensaje);
        this.codigoConfirmado.emit();
      },
      error: error=>{
        console.error(error);
      }
    })
  }
}
