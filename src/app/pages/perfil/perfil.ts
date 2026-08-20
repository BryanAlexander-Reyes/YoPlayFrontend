import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  imports: [FormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {


  perfiles:perfil=
    {
      nombre:'Kevin Alexander Hernández Sierra',
      tipo_documneto:'Cédula de ciudadanía',
      numero_documneto:1123038372,
      equipo:'No definido',
      Rol:'usuario',
      Estado:'Activo'
    }
}
