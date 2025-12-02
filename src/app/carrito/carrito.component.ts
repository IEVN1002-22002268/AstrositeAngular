import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  listaCarrito = [1, 2, 3]

  /*Para guardar un objeto al carrito
  import { CookieService } from 'ngx-cookie-service';
  Añade CookieService al constructor

  carrito = []
  carrito = JSON.parse(this.cookieService.get('carrito') || [])
  carrito.push(Aqui va el objeto del juego)
  this.cookieService.set('carrito', JSON.stringify(carrito))
  console.log(JSON.parse(this.cookieService.get('carrito')))
  */
}
