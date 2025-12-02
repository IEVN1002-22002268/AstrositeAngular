import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import { Users } from '../tablas';

@Component({
  selector: 'app-busqueda-amigos',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './busqueda-amigos.component.html',
  styleUrl: './busqueda-amigos.component.css'
})
export class BusquedaAmigosComponent {
  dataSource:any=[];
  usersData:any=[];
  terminoBusqueda: string = '';

  constructor(public userDB:ApiService, private router:Router) { }

  ngOnInit(): void {
     this.userDB.getUsers().subscribe(
      {
        next: response=>{

      this.dataSource=response;
      this.usersData = this.dataSource['users']
      console.log(this.usersData)
    },
    error: error=>console.log(error)
  }
    );

}

  Perfil(_idUser : number){
    this.router.navigate(['/perfil/'+ _idUser])
  }

}
