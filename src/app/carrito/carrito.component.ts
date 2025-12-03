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
/*   listaCarrito = [1, 2, 3] */
  isCarrito:boolean = false
  dataSource:any=[];
  carritoLista : any = []


  totalPrecio: number = 0;
  totalDescuento:number = 0;
  tempDescuento:number = 0;
  cantidad:number = 0;


  constructor (public gamesDB:ApiService, private router:Router, private cookieService:CookieService) {}

  ngOnInit(): void {
    if(this.cookieService.get('carrito')){
      this.carritoLista = JSON.parse(this.cookieService.get('carrito'))
      console.log(this.carritoLista)
      this.isCarrito = true
      this.CalcularTotales()
    }
  }

  BorrarDelCarrito(id : number){
    for(const item of this.carritoLista){
      if(item.ID_Juego == id){
        const index = this.carritoLista.indexOf(item);
        this.carritoLista.splice(index, 1);
        break;
      }
    }
    this.cookieService.set('carrito', JSON.stringify(this.carritoLista))
    this.CalcularTotales()
  }

  CalcularTotales(){
    this.tempDescuento = 0
    this.totalPrecio = 0
    this.cantidad = 0
      for(const item of this.carritoLista){
        this.totalPrecio +=  item.Precio;
        this.tempDescuento += (item.Precio * item.Descuento) / 100;
        this.cantidad += 1
      }
      this.totalDescuento = this.totalPrecio - this.tempDescuento;

    if(this.carritoLista.length == 0){
      this.isCarrito = false
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
