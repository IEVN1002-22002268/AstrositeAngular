import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalogo',
  imports: [FormsModule, CommonModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
  listaJuegosOriginal = [
    { titulo: 'Project Sunnight', desc: 'Horror survival zombies sandbox', descuento: '10% OFF', img: 'td-wall.jpg', plataforma: 'PC' },
    { titulo: 'Reto Chef UTL',  desc: 'RPG futurista mundo abierto',     descuento: '20% OFF', img: 'wall-nat.jpg', plataforma: 'Mobile' }, // Cambié el nombre para que veas la diferencia
    { titulo: 'Party VR', desc: 'Horror survival zombies sandbox', descuento: '10% OFF', img: 'td-wall.jpg', plataforma: '' },
    { titulo: 'Otro Juego', desc: 'Horror survival zombies sandbox', descuento: '10% OFF', img: 'wall-nat.jpg', plataforma: '' }
  ];

  listaJuegos = [...this.listaJuegosOriginal];
  terminoBusqueda: string = '';

  filtrarJuegos() {
    const termino = this.terminoBusqueda.toLowerCase();

    this.listaJuegos = this.listaJuegosOriginal.filter(juego => {
      const titulo = juego.titulo.toLowerCase();
      const descripcion = juego.desc.toLowerCase();

      return titulo.includes(termino) || descripcion.includes(termino);
    });
  }
}
