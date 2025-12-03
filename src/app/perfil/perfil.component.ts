import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Users, Friends } from '../tablas';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, RouterLink],
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

  friendReq : Friends = {
    ID_User1: 0,
    ID_User2: 0,
    Fecha: new Date()
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

  juegosLista: any = []
  amigosLista: any = []
  solicitudesLista: any = []
  dataUser = []
  dataSource: any = [];
  _isOwner: boolean = false;
  friendsData = []
  requestData = []

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

    this.userDB.getFriendList(this.id_perfil).subscribe(
      {
        next: response=>{

      this.dataSource=response;
      this.friendsData = this.dataSource['friends']
      /* console.log(this.friendsData) */

    },
    error: error=>console.log(error)
  }
    );

    this.userDB.getHistory(this.id_perfil).subscribe({
        next: response=>{
        this.dataSource=response;
/*         console.log(this.dataSource) */
        this.ListarJuegos(this.dataSource['sales'])
      },
        complete:()=>console.info(),
        error: error=>console.log(error)})


    this.userDB.getFriendList(this.id_perfil).subscribe({
        next: response=>{
        this.dataSource=response;
/*         console.log("FriendList")
        console.log(this.dataSource) */
        this.ListarAmigos(this.dataSource['friends'])
      },
        complete:()=>console.info(),
        error: error=>console.log(error)})

    this.userDB.getFriendRequest(this.id_perfil).subscribe({
        next: response=>{
        this.dataSource=response;
        console.log("FriendRequest")
        console.log(this.dataSource)
      this.ListarSolicitudes(this.dataSource['requests'])
      },
        complete:()=>console.info(),
        error: error=>console.log(error)})
  }

  cargarDatos():void{
    console.log("Este perfil no es mio")
    this._isOwner = false;
    this.userDB.getSingleUser(this.id_perfil, this.userCookie).subscribe(
      {
        next: response=>{

      this.dataSource=response;
      this.infoUser = this.dataSource['user']

    },
    error: error=>console.log(error)
  }
    );
  }

  ListarJuegos(historialLista : any = []):void{
    this.userDB.getGames().subscribe({
        next: response=>{
        this.dataSource=response;
/*         console.log(this.dataSource) */
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
/*       console.log("JuegosLista")
      console.log(this.juegosLista) */
  }

  ListarAmigos(amigos : any = []):void{
    this.userDB.getUsers(this.userCookie).subscribe({
        next: response=>{
        this.dataSource=response;
        for(const item of this.dataSource['users']){
          for(const amigo of amigos){
            if(item.ID_User == amigo.ID_User2){
              this.amigosLista.push(item)
            }
          }
        }

      },
        complete:()=>console.info(),
        error: error=>console.log(error)})
  }

  ListarSolicitudes(solicitudes: any = []):void{
    this.userDB.getUsers(this.userCookie).subscribe({
        next: response=>{
        this.dataSource=response;
        for(const item of this.dataSource['users']){
          for(const solicitud of solicitudes){
            if(item.ID_User == solicitud.ID_User){
              this.solicitudesLista.push(item)
            }
          }
        }

      },
        complete:()=>console.info(),
        error: error=>console.log(error)})
        console.log("SolicitudesLista")
        console.log(this.solicitudesLista)
  }

  Perfil(_idUser : number){
    this.router.navigate(['/catalogo/']).then(() => { this.router.navigate(['/perfil/'+ _idUser])})
  }


  FriendRequeso(id_amigo:number){
    this.friendReq = {
      ID_User1: this.userCookie.ID_User,
      ID_User2: id_amigo,
      Fecha: new Date()
    }

    this.userDB.sendFriendRequest(this.friendReq).subscribe(
      {
        next: response=>{

      this.dataSource=response;
      console.log(this.dataSource)
    },
    error: error=>console.log(error)
  }
    );
  }

  AceptarRequeso(id_amigo:number){
    this.friendReq = {
      ID_User1: this.userCookie.ID_User,
      ID_User2: id_amigo,
      Fecha: new Date()
    }

    this.userDB.acceptFriend(this.friendReq).subscribe(
      {
        next: response=>{

      this.dataSource=response;
      console.log(this.dataSource)
    },
    error: error=>console.log(error)
  }
    );


  }

  Bloquear(){
    this.friendReq = {
      ID_User1: this.userCookie.ID_User,
      ID_User2: this.infoUser.ID_User,
      Fecha: new Date()
    }
    this.userDB.blockSomeone(this.friendReq).subscribe(
      {
        next: response=>{

      this.dataSource=response;
      console.log(this.dataSource)
    },
    error: error=>console.log(error)
  }
    );
  }

}
