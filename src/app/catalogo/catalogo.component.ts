import { Component } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  imports: [],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
  listaJuegos = [
    { titulo: 'Project Sunnight', desc: 'Horror survival zombies sandbox', descuento: '10% OFF', img: 'td-wall.jpg' },
    { titulo: 'Reto Chef UTL',  desc: 'RPG futurista mundo abierto',     descuento: '20% OFF', img: 'wall-nat.jpg' }, // Cambié el nombre para que veas la diferencia
    { titulo: 'Party VR', desc: 'Horror survival zombies sandbox', descuento: '10% OFF', img: 'td-wall.jpg' },
    { titulo: 'Otro Juego', desc: 'Horror survival zombies sandbox', descuento: '10% OFF', img: 'wall-nat.jpg' }
  ];
}
