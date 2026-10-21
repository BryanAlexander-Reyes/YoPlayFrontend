import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { Footer } from '../footer/footer';
import { Navigator } from '../navigator/navigator';
import { Sideuser } from '../../pages/sideuser/sideuser';
import { TournamentBar } from '../../pages/tournament-bar/tournament-bar';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, Navigator, Footer, RouterOutlet, Sideuser, TournamentBar],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout implements OnDestroy {
  isUserMenuOpen = false;
  isClosingUserMenu = false;
  isTournamentMenuOpen = false;
  isClosingTournamentMenu = false;
  showLoginRequiredModal = false;
  private readonly navigationSubscription: Subscription;

  constructor(private readonly router: Router) {
    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.closeLoginRequired();
      }
    });
  }

  ngOnDestroy(): void {
    this.navigationSubscription.unsubscribe();
  }

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

  toggleTournamentMenu(): void {
    if (this.isTournamentMenuOpen) {
      this.closeTournamentMenu();
      return;
    }

    this.isClosingTournamentMenu = false;
    this.isTournamentMenuOpen = true;
  }

  closeTournamentMenu(): void {
    if (!this.isTournamentMenuOpen) {
      return;
    }

    this.isClosingTournamentMenu = true;

    setTimeout(() => {
      this.isTournamentMenuOpen = false;
      this.isClosingTournamentMenu = false;
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
