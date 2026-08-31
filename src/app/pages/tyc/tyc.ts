import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Footer } from '../../layout/footer/footer';
import { Header } from "../../layout/header/header";
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-tyc',
  imports: [Footer, Header],
  templateUrl: './tyc.html',
  styleUrl: './tyc.css',
})
export class Tyc implements OnInit {
  tycAceptados = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.tycAceptados = this.authService.estaAutenticado();
  }

  aceptarTerminos(): void {
    if (this.authService.estaAutenticado()) {
      this.tycAceptados = true;
      return;
    }

    this.router.navigate(['/login_usuario']);
  }
}
