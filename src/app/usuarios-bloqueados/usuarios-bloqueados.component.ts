import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import { Users, Friends } from '../tablas';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-usuarios-bloqueados',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './usuarios-bloqueados.component.html',
  styleUrl: './usuarios-bloqueados.component.css'
})
export class UsuariosBloqueadosComponent {
  listaBloqueados = [1, 2, 3]

  dataSource:any=[];
  userCookie:any = []
  usersData:any=[];
  bloqueados:any=[]

  friendReq : Friends = {
    ID_User1: 0,
    ID_User2: 0,
    Fecha: new Date()
  }

  constructor(public userDB:ApiService, private router:Router, private cookieService:CookieService) { }

  ngOnInit(): void {
    this.userCookie = JSON.parse(this.cookieService.get('user'))

    this.userDB.getBlockeds(this.userCookie.ID_User).subscribe(
      {
        next: response=>{

      this.dataSource=response;
      this.usersData = this.dataSource['requests']
      this.ListarBloqueados(this.usersData)
/*       console.log(this.dataSource) */
    },
    error: error=>console.log(error)
  }
    );



}

  ListarBloqueados(bloqs: any = []){
    this.userDB.getUsers(this.userCookie).subscribe({
        next: response=>{
        this.dataSource=response;
        for(const item of this.dataSource['users']){
          for(const solicitud of bloqs){
            if(item.ID_User == solicitud.ID_User){
              this.bloqueados.push(item)
            }
          }
        }

      },
        complete:()=>console.info(),
        error: error=>console.log(error)})
        console.log(this.bloqueados)
  }

  Desbloquear(id_bloq:number){
    this.friendReq.ID_User1 = this.userCookie.ID_User
    this.friendReq.ID_User2 = id_bloq
    this.friendReq.Fecha = new Date()
    this.userDB.cancelRequest(this.friendReq).subscribe({
        next: response=>{
        this.dataSource=response;

      },
        complete:()=>console.info(),
        error: error=>console.log(error)})
  }
}
