import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sales, Users, Games } from '../tablas';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-historial-compras',
  imports: [CommonModule, RouterLink],
  templateUrl: './historial-compras.component.html',
  styleUrl: './historial-compras.component.css'
})
export class HistorialComprasComponent {
  dataSource:any=[];
  juegosLista: any = []
  id_user : any;
  userCookie : Users = {
    ID_User: 0,
    Correo: '',
    Username: '',
    Nombre: ''
  }
  salesData : Sales = {
    ID_User: 0,
    Fecha: new Date(),
    ID_Juego: 0,
    PrecioTotal: 0,
    Descuento: 0
  }

    constructor(public DB:ApiService, private cookieService:CookieService) { }

  ngOnInit():void {
    this.userCookie = JSON.parse(this.cookieService.get('user'))
    this.id_user = this.userCookie.ID_User
    this.DB.getHistory(this.id_user).subscribe({
        next: response=>{
        this.dataSource=response;
        console.log(this.dataSource)
        this.ListarJuegos(this.dataSource['sales'])
      },
        complete:()=>console.info(),
        error: error=>console.log(error)})
  }


  ListarJuegos(historialLista : any = []):void{
    this.DB.getGames().subscribe({
        next: response=>{
        this.dataSource=response;
        console.log(this.dataSource)
        for(const item of this.dataSource['games']){
          for(const histo of historialLista){
            if(item.ID_Juego == histo.ID_Juego){
              item.Precio = histo.Descuento
              this.juegosLista.push(item)
            }
          }
        }

      },
        complete:()=>console.info(),
        error: error=>console.log(error)})
      console.log(this.juegosLista)
  }
}
