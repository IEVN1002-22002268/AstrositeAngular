import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Users } from '../tablas';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';

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

  // --------------ID de la url ---------------
  tem:any;
  id_perfil:number = 0;

  // -------------Datos del perfil----------------
  infoUser : Users = {
      ID_User: 0,
      Correo : "",
      Username : "",
      Nombre: "",
      Contrasena: "",
      FechaNac : new Date(),
      Foto: "",
      Descripcion: "",
      Telefono: 0
  }

  userCookie : Users = {
      ID_User: 0,
      Correo : "",
      Username : "",
      Nombre: "",
      Contrasena: "",
      FechaNac : new Date(),
      Foto: "",
      Descripcion: "",
      Telefono: 0
  }

  dataUser = []
  dataSource: any = [];
  _isOwner: boolean = false;

  constructor(public userDB:ApiService, private router:Router, private cookieService:CookieService, private location: Location) { }

  ngOnInit():void{
    this.tem = this.location.path().split('/')
    this.id_perfil = this.tem[2]
    if(this.cookieService.get('user')){ //Si existe la cookie user
      this.userCookie = JSON.parse(this.cookieService.get('user'))

      if(this.userCookie.ID_User == this.id_perfil){ //Si la id del perfil es la propia
        console.log("Este es mi perfil")
        this.infoUser = this.userCookie
        this._isOwner = true;
      }else{ //si no es la propia se cargan los datos de la base de datos
        this.cargarDatos();
      }
    }else{  //si no existe cookie carga los datos de la base de datos
      this.cargarDatos();
    }

  }

  cargarDatos():void{
    console.log("Este perfil no es mio")
    this._isOwner = false;
    this.userDB.getSingleUser(this.id_perfil).subscribe(
      {
        next: response=>{

      this.dataSource=response;
      this.infoUser = this.dataSource['user']

    },
    error: error=>console.log(error)
  }
    );
  }

}
