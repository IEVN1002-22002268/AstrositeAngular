import { Component } from '@angular/core';
import { Sales } from '../tablas';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";


@Component({
  selector: 'app-ventas-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './ventas-admin.component.html',
  styleUrl: './ventas-admin.component.css'
})
export class VentasAdminComponent {
  dataSource : any = []
  infoVentas : any = []
  infoUser: any = []
  infoJuegos: any = []

  ventasSimulacion : any = [
    {ID_Juego :1, ID_User: 3, Fecha: "", PrecioTotal: 150, Descuento: 135},
    {ID_Juego :2, ID_User: 3, Fecha: "", PrecioTotal: 100, Descuento: 100},
    {ID_Juego :3, ID_User: 2, Fecha: "", PrecioTotal: 200, Descuento: 160},
    {ID_Juego :3, ID_User: 1, Fecha: "", PrecioTotal: 200, Descuento: 160}
  ]
  listaPro:any = []

  constructor(public pageDB:ApiService) { }

  ngOnInit(): void{
    this.pageDB.getSales().subscribe(
      {
        next: response=>{

      this.dataSource=response;
      this.VentasBD(this.dataSource['ventas'])
      console.log(this.dataSource)
    },
    error: error=>console.log(error)
  }
    );

  this.pageDB.getGames().subscribe(
      {
        next: response=>{

      this.dataSource=response;
      this.JuegosDB(this.dataSource['games'])
      console.log(this.dataSource)
      this.ListadoPro()
    },
    error: error=>console.log(error)
  }
    ); //Tal vez meter este metodo dentro de la anterior peticion


  }

  VentasBD(ventas:any = []){
    this.infoVentas = ventas
  }

  JuegosDB(juegos:any = []){
    this.infoJuegos = juegos
  }

  ListadoPro(){
    for(const venta of this.ventasSimulacion){ //Cambiar ventasSimulacion por infoVentas
      for(const game of this.infoJuegos){
        if(venta.ID_Juego == game.ID_Juego){
          venta.NombreJuego = game.Nombre
          this.listaPro.push(venta)
        }
      }
    }
    console.log(this.ventasSimulacion)

    console.log(this.listaPro)
  }
}
