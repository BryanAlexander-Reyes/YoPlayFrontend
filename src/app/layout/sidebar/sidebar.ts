import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface Menu {
  icono: 'home' | 'cup' | 'ball';
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
  menu: Menu[] = [
    {
      icono: 'home',
      ruta: '/home',
      label: 'Home',
    },
    {
      icono: 'cup',
      ruta: '/torneos',
      label: 'Torneos',
    },
    {
      icono: 'ball',
      ruta: '/deportes',
      label: 'Deportes',
    },
  ];
}
