import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-busqueda-amigos',
  imports: [CommonModule],
  templateUrl: './busqueda-amigos.component.html',
  styleUrl: './busqueda-amigos.component.css'
})
export class BusquedaAmigosComponent {
  listaUsuarios = [1, 2, 3];
}
