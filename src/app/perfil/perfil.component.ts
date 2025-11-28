import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  juegosDelUsuario = [1, 2];
  amigosDelUsuario = [1, 2, 3];
  solicitudesDelUsuario = [1, 2, 3];

  mostrarSolicitudes: boolean = false;
}
