import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Sideuser } from '../../pages/sideuser/sideuser';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, Sideuser],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
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
    }, 220);
  }
}
