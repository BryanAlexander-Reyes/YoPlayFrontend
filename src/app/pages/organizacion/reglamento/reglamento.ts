import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface reglamento {
  regla: string;
}

@Component({
  selector: 'app-reglamento',
  imports: [FormsModule],
  templateUrl: './reglamento.html',
  styleUrl: './reglamento.css',
})
export class Reglamento {

  reglamentos: reglamento[] = [
    {
      regla: '',
    }
  ];

  agregaregla(): void {
    this.reglamentos.push({
      regla: ''
    });
  }

eliminaregla(index: number): void {
  if (this.reglamentos.length > 1) {
    this.reglamentos.splice(index, 1);
  }
}
}