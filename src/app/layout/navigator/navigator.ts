import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigator',
  imports: [RouterModule],
  templateUrl: './navigator.html',
  styleUrl: './navigator.css',
})
export class Navigator {
  @Output() userMenuToggle = new EventEmitter<void>();
  @Output() accessDenied = new EventEmitter<void>();

  constructor(private readonly router: Router) {}

  toggleUserMenu(): void {
    this.userMenuToggle.emit();
  }

  handleTorneoAccess(): void {
    const usuario = localStorage.getItem('usuarioSesion');

    if (usuario) {
      void this.router.navigate(['/torneo']);
      return;
    }

    this.accessDenied.emit();
  }
}
