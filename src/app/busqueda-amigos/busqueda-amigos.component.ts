import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import { Users, Friends } from '../tablas';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-busqueda-amigos',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './busqueda-amigos.component.html',
  styleUrl: './busqueda-amigos.component.css'
})
export class BusquedaAmigosComponent {
  dataSource:any=[];
  userCookie:any = []
  usersData:any=[];
  terminoBusqueda: string = '';
  friendReq : Friends = {
    ID_User1: 0,
    ID_User2: 0,
    Fecha: new Date()
  }
  cantidadUsuarios : number = 0;
  constructor(public userDB:ApiService, private router:Router, private cookieService:CookieService) { }

  ngOnInit(): void {
    this.userCookie = JSON.parse(this.cookieService.get('user'))

     this.userDB.getUsers(this.userCookie).subscribe(
      {
        next: response=>{

      this.dataSource=response;
      this.usersData = this.dataSource['users']
      this.cantidadUsuarios = this.usersData.length;
      console.log(this.dataSource)
    },
    error: error=>console.log(error)
  }
    );

}

  Perfil(_idUser : number){
    this.router.navigate(['/perfil/'+ _idUser])
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
}
