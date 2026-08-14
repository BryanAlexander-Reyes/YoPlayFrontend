import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpanAuthService } from '../../services/auth-span';
import { SpanAuth } from '../../models/span-auth';


@Component({
  selector: 'app-span-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'./spancomponent.html' ,
  styleUrls: ['./spancomponent.css']
})
export class SpanComponent  implements OnInit{
   
  estado!: SpanAuth;
  constructor (private span:SpanAuthService){}

  ngOnInit():void{
    this.contenido();
  }

  contenido():void{
    this.estado=this.span.obtenerEstadoLoading();
  }

}