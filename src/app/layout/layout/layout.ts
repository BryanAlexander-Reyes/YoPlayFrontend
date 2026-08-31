import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';
import { Navigator } from '../navigator/navigator';
import { Sideuser } from '../../pages/sideuser/sideuser';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, Navigator, Footer, RouterOutlet, Sideuser],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  isUserMenuOpen = false;
  isClosingUserMenu = false;
  showLoginRequiredModal = false;

  constructor(private readonly router: Router) {}

  toggleUserMenu(): void {
    if (this.isUserMenuOpen) {
      this.closeUserMenu();
      return;
    }

    this.isClosingUserMenu = false;
    this.isUserMenuOpen = true;
  }

  closeUserMenu(): void {
    if (!this.isUserMenuOpen) {
      return;
    }

    this.isClosingUserMenu = true;

    setTimeout(() => {
      this.isUserMenuOpen = false;
      this.isClosingUserMenu = false;
    }, 260);
  }

  openLoginRequired(): void {
    this.showLoginRequiredModal = true;
  }

  closeLoginRequired(): void {
    this.showLoginRequiredModal = false;
  }

  goToLogin(): void {
    this.closeLoginRequired();
    this.router.navigate(['/login_usuario']);
  }
}
