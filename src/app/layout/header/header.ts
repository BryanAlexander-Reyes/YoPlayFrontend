import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface UserMenuItem {
  label: string;
  icon?: string;
  action: () => void;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isUserMenuOpen = false;

  userMenuItems: UserMenuItem[] = [
    { label: 'Usuario', action: () => this.navigateTo('usuario') },
    { label: 'Informacion General', action: () => this.navigateTo('info') },
    { label: 'Torneos Inscritos', action: () => this.navigateTo('torneos-inscritos') },
    { label: 'Torneos Participados', action: () => this.navigateTo('torneos-participados') },
    { label: 'Estadisticas (Beta)', action: () => this.navigateTo('estadisticas') },
    { label: 'Equipos', action: () => this.navigateTo('equipos') },
    { label: 'Configuracion', action: () => this.navigateTo('configuracion') },
    { label: 'Ayuda', action: () => this.navigateTo('ayuda') },
    { label: 'Cerrar Sesion', action: () => this.logout() },
  ];

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  closeUserMenu() {
    this.isUserMenuOpen = false;
  }

  navigateTo(route: string) {
    console.log('Navegando a:', route);
    this.closeUserMenu();
  }

  logout() {
    console.log('Cerrando sesion...');
    this.closeUserMenu();
  }
}
