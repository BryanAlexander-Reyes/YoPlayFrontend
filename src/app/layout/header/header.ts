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

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  closeUserMenu(): void {
    this.isUserMenuOpen = false;
  }
}
