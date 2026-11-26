import { Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms'
import { HttpClient } from '@angular/common/http';
HttpClient
import { Environment } from '../../../../environments/environments';
import { UsuarioService, } from '../../../ApisMidUsuario/usuario.service'
import { CorreoRegistro, UsuarioRegistro } from '../../../models/usuario-registro';



interface TipoDocumento{
  Id: number;
  TipoDocumento:string;
}
@Component({
  selector: 'app-register',
  imports: [NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent implements OnInit {
  private readonly Document_URL = `${Environment.base}/v1/documento`;
  ngOnInit(): void {
    this.http.get<TipoDocumento[]>(
      this.Document_URL).subscribe({
        next: (respuesta)=>{
          this.tipoDocumento = (respuesta as any).Data;
          console.log('tipos de documentos:', this.tipoDocumento);
        },
        error: (error)=>{
          console.error('Error al consultar los tipos de documentos: ', error);
        }
      }
    );
  }
  
  registerForm: FormGroup;

  constructor (private fb:FormBuilder,
    private http:HttpClient,
    private usuarioService:UsuarioService,
  ){
    this.registerForm=this.fb.group({
      // formulario1
      email:['', Validators.required],
      password:['', Validators.required],
      confirmPassword:['', Validators.required],

      // formulario2
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      tipoDocumento:['',Validators.required],
      identificacion:['',Validators.required],
      telefono:['',Validators.required],
      fechaNacimiento:['',Validators.required],
      terminos:[false,Validators.required],
    });
  }

  tipoDocumento: TipoDocumento[]=[];

  @Output() irALogin = new EventEmitter<void>();
  @Output() irValidadorComponent =new EventEmitter<string>();



  mostrarSegundoFormulario = false;
  @Input() codigoVerificado=false;

  siguiente() {
    const  controles = this.registerForm.controls;
    
    const camposPrimerPaso=[
      'email',
      'password',
      'confirmPassword'
    ]

    camposPrimerPaso.forEach(campo =>{
      const control = controles[campo];
      if (control){
        control.markAsTouched();
      }else{
        console.error(`No existe el control: ${campo}`);
      }
    });

    if (controles['email'].invalid ||
      controles['password'].invalid ||
      controles['confirmPassword'].invalid
    ){
      return
    }
    if (
      controles['password'].value !==controles['confirmPassword'].value
    ){
      controles['confirmPassword'].setErrors({
        noCoincide:true
      });
      return;
    }

    const solicitud: CorreoRegistro = {
      correo: controles['email'].value,
    };

    this.usuarioService.verificarCorreo(solicitud).subscribe({
      next: respuesta=>{
        console.log(respuesta.Mensaje);
        this.irValidadorComponent.emit(solicitud.correo);
      },
      error: error=>{
        console.error(error);
      }
    });
  }
  mostrarPrimerFormulario(){
    this.mostrarSegundoFormulario=false;
  }
  registrar(){

    const solicitud: UsuarioRegistro ={
          Nombre: this.registerForm.value.nombre,
          apellido: this.registerForm.value.apellido,
          email: this.registerForm.value.email,
          contrasena: this.registerForm.value.password,
          tipo_documento: { id: Number(this.registerForm.value.tipoDocumento) },
          numero_documento: this.registerForm.value.identificacion,
          fecha_nacimiento: this.registerForm.value.fechaNacimiento,
          telefono: this.registerForm.value.telefono,
          terminos: this.registerForm.value.terminos,
      };

    if(this.registerForm.invalid){
      console.log('El formulario tiene errores');
      this.registerForm.markAllAsTouched();
      return;
    }
    if(!this.codigoVerificado){
      console.log('El código no ha sido verificado, no se puede registrar el usuario');
    }else{
      this.usuarioService.registrarUsuario(solicitud).subscribe({
        next: respuesta =>{
        console.log('Usuario Registrado:', respuesta)},
        error: error=>{
           const datos = this.registerForm.value;
    console.log('Todos los datos del registro:');
    console.log(datos)
          console.error(error);
        }
      });
    }
    console.log(solicitud.tipo_documento);
  }
  volverALogin(){
    this.irALogin.emit();
  }

}
