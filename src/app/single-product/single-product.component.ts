import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Games } from '../tablas';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-single-product',
  imports: [CommonModule],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent {

//---------ID's de la URL
  tem:any;
  id_juego:number = 0;

//---------Datos del juego
  infoJuego: Games = {
    ID_Juego: 0,
    Nombre: "",
    Descripcion: "",
    Imagen: "",
    Precio: 0,
    Descuento: 0,
    Genero: "",
    Plataforma: "",
    Clasificacion: ""
  }

  //--------Carrito cookie
  carrito: any = []

  _yaCarrito: boolean = false;
  precioFinal:number = 0;
  dataSource: any = [];
  constructor(public gamesDB:ApiService, private cookieService:CookieService, private location: Location) { }

  ngOnInit():void{
    this.tem = this.location.path().split('/')
    this.id_juego = this.tem[2]

    this.gamesDB.getSingleGame(this.id_juego).subscribe(
      {
        next: response=>{

      this.dataSource=response;
      console.log(this.dataSource)
      this.infoJuego = this.dataSource['game']
      this.precioFinal = this.infoJuego.Precio - ((this.infoJuego.Precio * this.infoJuego.Descuento) / 100)
    },
    error: error=>console.log(error)
  }
    );

    this.DesactivarBoton()
  }

  AgregarCarrito():void{
    if(this.cookieService.get('carrito')){
      this.carrito = JSON.parse(this.cookieService.get('carrito'))
      this.carrito.push(this.infoJuego)
      this.cookieService.set('carrito', JSON.stringify(this.carrito), { path : '/'})
    }else{
      this.carrito.push(this.infoJuego)
      this.cookieService.set('carrito', JSON.stringify(this.carrito), { path : '/'})
    }
    this.DesactivarBoton()
  }

  DesactivarBoton():void{
    if(this.cookieService.get('carrito')){
      this.carrito = JSON.parse(this.cookieService.get('carrito'))
      console.log(this.carrito)
      for (const item of this.carrito) {
        if(this.id_juego == item.ID_Juego){
          this._yaCarrito = true;
        }
      }
    }
  }
}
