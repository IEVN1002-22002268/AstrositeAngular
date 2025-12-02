import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  listaCarrito = [1, 2, 3]

  dataSource:any=[];
  carritoLista : any = []

  constructor (public gamesDB:ApiService, private router:Router, private cookieService:CookieService) {}

  ngOnInit(): void {
    if(this.cookieService.get('carrito')){
      this.carritoLista = JSON.parse(this.cookieService.get('carrito'))
      console.log(this.carritoLista)
    }

  }

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
