import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Users } from '../tablas';
import { RouterLink, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cambiar-contrasenna',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './cambiar-contrasenna.component.html',
  styleUrl: './cambiar-contrasenna.component.css'
})
export class CambiarContrasennaComponent {
  formGroup!: FormGroup;
  dataSource:any=[];
  errorContra:boolean = false
  contraCambiada:boolean = false

  newData : Users = {
    Contrasena: ""
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
      _contrasena: [''],
      _contrasenaDos: [''],
    })
  }


  OnSubmit():void {
    console.log("OnSubmit")
    const {_contrasena, _contrasenaDos}= this.formGroup.value;
    if(_contrasena == _contrasenaDos){
      this.newData.Contrasena = _contrasena,
      this.Agregar();
    }else{
      this.errorContra = true
    }


  }

  Agregar():void {
    console.log("Agregar")
    console.log(this.newData)
    this.DB.cambiarContrasena(this.id_user , this.newData).subscribe({
      next: response=>{
      this.dataSource=response;
      console.log(this.dataSource)
    },
      complete:()=>console.info(),
      error: error=>console.log(error)})

      this.contraCambiada = true
  }


}
