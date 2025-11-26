import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios-bloqueados',
  imports: [CommonModule],
  templateUrl: './usuarios-bloqueados.component.html',
  styleUrl: './usuarios-bloqueados.component.css'
})
export class UsuariosBloqueadosComponent {
  listaBloqueados = [1, 2, 3]
}
