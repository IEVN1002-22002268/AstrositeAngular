import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Users } from '../../../tablas';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  formGroup!: FormGroup;

  dataSource:any=[];

  infoUser : Users = {
    id_user : 0,
    Correo : "",
    Username : "",
    Nombre: "",
    Contrasena: "",
    FechaNac : new Date(),
    foto: "",
    descripcion: "",
    telefono: 0
  }

  formLogin = {
    Correo: "",
    Contrasena: ""
  }

  constructor(private fb: FormBuilder,public userDB:ApiService, private router:Router, private cookieService:CookieService) { }

  ngOnInit():void {
    this.formGroup=this.InitForm();
  }

  InitForm(): FormGroup {
    return this.fb.group({
      _correo: [''],
      _contrasena: ['']
    })
  }

  OnSubmit():void{
    const {_correo, _contrasena}= this.formGroup.value;
    this.formLogin.Correo = _correo,
    this.formLogin.Contrasena = _contrasena
    this.Agregar();
  }

  Agregar():void {
    console.log(this.formLogin)
    this.userDB.iniciarSesion(this.formLogin).subscribe({
      next: response=>{

      this.dataSource=response; //Se tiene que sacar User de aqui y pasarlos a infoUser
      console.log(this.dataSource)

      this.cookieService.set('user', JSON.stringify(this.dataSource['user']))
      console.log(JSON.parse(this.cookieService.get('user')))
    },
      complete:()=>console.info(),
      error: error=>console.log(error)})

      this.formLogin = {
        Correo : "",
        Contrasena: ""
      }

      /* this.router.navigate(['/perfil']) */ //Deberia redirigir al perfil si el inicio fue exitoso
  }
}
