import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Sideuser } from '../../pages/sideuser/sideuser';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, Sidebar, Footer, RouterOutlet, Sideuser],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  isUserMenuOpen = false;
  isClosingUserMenu = false;

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
}
