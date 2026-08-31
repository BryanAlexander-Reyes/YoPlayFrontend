import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

interface Menu {
  icono: 'home' | 'cup' | 'ball';
  imagen: string;
  ruta: string;
  label: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  @Output() userMenuToggle = new EventEmitter<void>();

  logoUrl = '/assets/images/logo.png';

  menu: Menu[] = [
    {
      icono: 'home',
      imagen: '/assets/images/1.svg',
      ruta: '/home',
      label: 'Home',
    },
    {
      icono: 'cup',
      imagen: '/assets/images/cup-1-svgrepo-com%20(1).svg',
      ruta: '/torneos',
      label: 'Torneos',
    },
    {
      icono: 'ball',
      imagen: '/assets/images/football-svgrepo-com%20(1).svg',
      ruta: '/deportes',
      label: 'Deportes',
    },
  ];

  toggleUserMenu(): void {
    this.userMenuToggle.emit();
  }
}
