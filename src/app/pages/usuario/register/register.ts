import { Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
HttpClient
import { Environment } from '../../../../../environments/environments';

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
    private http:HttpClient
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
      fechaNacimiento:['',Validators.required],
      terminos:[false,Validators.required],
    });
  }

  tipoDocumento: TipoDocumento[]=[];

  @Output() irALogin = new EventEmitter<void>();
  @Output() irValidadorComponent =new EventEmitter<void>();



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
    }
    this.irValidadorComponent.emit();
  }
  mostrarPrimerFormulario(){
    this.mostrarSegundoFormulario=false;
  }
  registrar(){
    if(this.registerForm.invalid){
      console.log('El formulario tiene errores');
      this.registerForm.markAllAsTouched();
      return;
    }
    const datos = this.registerForm.value;
    console.log('Todos los datos del registro:');
    console.log(datos)

    this.irValidadorComponent.emit();
  }
  volverALogin(){
    this.irALogin.emit();
  }

}
