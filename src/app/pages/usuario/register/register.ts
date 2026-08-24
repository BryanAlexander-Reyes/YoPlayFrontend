import { Component, EventEmitter, Output } from '@angular/core';
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

@Component({
  selector: 'app-register',
  imports: [NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor (private fb:FormBuilder){
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

  tipoDocumento=[
    {valor: 'CC', nombre:'cedula de ciudadania'},
    {valor: 'TI', nombre:'tarjeta de identidad'},
    {valor: 'CE', nombre:'cedula de extranjeria'},
  ];

  @Output() irALogin = new EventEmitter<void>();
  @Output() irValidadorComponent =new EventEmitter<void>();



  mostrarSegundoFormulario = false;

  siguiente() {
    this.mostrarSegundoFormulario = true;
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
