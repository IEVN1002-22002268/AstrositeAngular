import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Users } from '../tablas';
import { RouterLink, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-config-cuenta',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './config-cuenta.component.html',
  styleUrl: './config-cuenta.component.css'
})
export class ConfigCuentaComponent {
  formGroup!: FormGroup;
  dataSource:any=[];

  newData : Users = {
    Correo: "",
    Username: "",
    Nombre: "",
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
  id_user : any;
  constructor(private fb: FormBuilder,public DB:ApiService, private cookieService:CookieService, private router:Router) { }

  ngOnInit():void {
    this.formGroup=this.InitForm();
    this.userCookie = JSON.parse(this.cookieService.get('user'))
    this.id_user = this.userCookie.ID_User
  }

  InitForm(): FormGroup {
    console.log("InitForm")
    return this.fb.group({
      _correo: [''],
      _username: [''],
      _nombre: [''],
      _foto: [''],
      _descripcion: [''],
      _telefono: [''],
    })
  }

  OnSubmit():void {
    console.log("OnSubmit")
    const {_correo, _username, _nombre, _foto, _descripcion, _telefono}= this.formGroup.value;
    if(_correo == ''){
        this.newData.Correo = this.userCookie.Correo
    }else{
        this.newData.Correo = _correo
    }

    if(_username == ''){
      this.newData.Username = this.userCookie.Username
    }else{
      this.newData.Username = _username
    }
    if(_nombre == ''){
          this.newData.Nombre = this.userCookie.Nombre
    }else{
          this.newData.Nombre = _nombre
    }
    if(_descripcion == ''){
      this.newData.Descripcion = this.userCookie.Descripcion
    }else{
          this.newData.Descripcion = _descripcion
    }
    if(_telefono == ''){
        this.newData.Telefono = this.userCookie.Telefono
    }else{
          this.newData.Telefono = _telefono
    }

    this.newData.Foto = _foto,
    this.Agregar();

  }

  Agregar():void {
    console.log("Agregar")
    console.log(this.newData)
    this.DB.modificarUsuario(this.id_user , this.newData).subscribe({
      next: response=>{
      this.dataSource=response;
      console.log(this.dataSource)
    },
      complete:()=>console.info(),
      error: error=>console.log(error)})

      this.newData = {
        Correo: "",
        Username: "",
        Nombre: "",
        Foto: "",
        Descripcion: "",
        Telefono: 0
      }
    this.VolverPerfil()
  }

  VolverPerfil():void{
    this.router.navigate(['/perfil/' + this.userCookie.ID_User])
  }
}
