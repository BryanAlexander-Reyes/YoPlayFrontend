import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface Menu {
  icono: 'home' | 'cup' | 'ball';
  ruta: string;
  label: string;
}

const svgIcons: Record<Menu['icono'], string> = {
  home: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M10.8 3.2a1 1 0 0 1 1.4 0l8.3 7.8a1 1 0 0 1-.7 1.7H18v7.3a1 1 0 0 1-1 1h-3.7v-6.7H10.7v6.7H7a1 1 0 0 1-1-1v-7.3H3.2a1 1 0 0 1-.7-1.7l8.3-7.8Z"/>
    </svg>
  `,
  cup: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M7 4h10v2h1a2 2 0 0 1 2 2v2a4 4 0 0 1-4 4h-1.5l.6 3.5H17a1 1 0 1 1 0 2H7a1 1 0 1 1 0-2h2.4l.6-3.5H8.5A4 4 0 0 1 4.5 10V8a2 2 0 0 1 2-2h1V4Zm2 2v1h6V6H9Zm-1 3a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V8H8v1Z"/>
    </svg>
  `,
  ball: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm0 2a8 8 0 0 0-6.9 3.9l1.8 1 .7-1.2A6.2 6.2 0 0 1 12 6.2c1.5 0 2.9.5 4.1 1.4l.7 1.2 1.8-1A8 8 0 0 0 12 4Zm-6.8 8.7a8 8 0 0 0 13.6 0l-2.1-.8-.8 1.4A6 6 0 0 1 12 18a6 6 0 0 1-4.9-2.7l-.8-1.4-2.1.8Zm5.8-6.2L12 9.7h2.6l.7-2.2 1.9 1.1-.5 1.7h2.1l-1.7 1.6 1 1.7-1.9 1.1-.6-2.1H10l-.6 2.1-1.9-1.1 1-1.7H5.6l-1.7-1.6h2.1l-.5-1.7 1.9-1.1Z"/>
    </svg>
  `,
};

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
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

  getIcon(icono: Menu['icono']): string {
    return svgIcons[icono];
  }
}
