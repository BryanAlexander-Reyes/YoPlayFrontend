import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-sideuser',
  imports: [CommonModule],
  templateUrl: './sideuser.html',
  styleUrl: './sideuser.css',
})
export class Sideuser {
  private router = inject(Router);
  private authService = inject(AuthService);

  @Output() logoutConfirmed = new EventEmitter<void>();

  currentMenu: 'main' | 'general' | 'config' | 'help' = 'main';
  showLogoutModal = false;

  openMenu(menu: 'main' | 'general' | 'config' | 'help'): void {
    this.currentMenu = menu;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  openLogoutModal(): void {
    this.showLogoutModal = true;
  }

  closeLogoutModal(): void {
    this.showLogoutModal = false;
  }

  confirmLogout(): void {
    this.authService.cerrarSesion();
    this.showLogoutModal = false;
    this.logoutConfirmed.emit();
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }
}
