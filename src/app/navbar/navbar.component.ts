import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { Users } from '../tablas';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  _isLoggedIn:boolean = false;

  constructor(public userDB:ApiService, private router:Router, private cookieService:CookieService) { }

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


  ngOnInit():void{
    if(this.cookieService.get('user')){ //Si existe la cookie user hay sesion iniciada
      this.infoUser = JSON.parse(this.cookieService.get('user'))
      this._isLoggedIn = true;
    }else{  //si no existe cookie no hay sesion iniciada
      this._isLoggedIn = false;
    }
    console.log("OnInit: " + this._isLoggedIn)
  }

  Perfil(){
    this.router.navigate(['/catalogo/']).then(() => { this.router.navigate(['/perfil/'+ this.infoUser.ID_User])})
  }


  CerrarSesion(){
    this.cookieService.deleteAll()
    this._isLoggedIn = false;
    this.router.navigate(['/sign-in']).then(() => {
    window.location.reload();
  });
  }
}
