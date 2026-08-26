import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigator',
  imports: [RouterModule],
  templateUrl: './navigator.html',
  styleUrl: './navigator.css',
})
export class Navigator {
  @Output() userMenuToggle = new EventEmitter<void>();

  toggleUserMenu(): void {
    this.userMenuToggle.emit();
  }
}
