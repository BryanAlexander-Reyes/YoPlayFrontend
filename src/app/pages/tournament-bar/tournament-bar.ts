import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tournament-bar',
  imports: [CommonModule],
  templateUrl: './tournament-bar.html',
  styleUrl: './tournament-bar.css',
})
export class TournamentBar {
  private router = inject(Router);

  menuItems = [
    { label: 'Torneos en curso', route: '/torneos_encurso' },
    { label: 'Torneos Activos', route: '/torneos_activos' },
  ];

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
