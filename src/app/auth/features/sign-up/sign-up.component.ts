import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Users } from '../../../tablas';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  formGroup!: FormGroup;
  dataSource:any=[];

  registroU : Users ={
    Correo : "",
    Username : "",
    Nombre: "",
    Contrasena: "",
    FechaNac : new Date(),
  }

  constructor(private fb: FormBuilder,public userDB:ApiService, private router:Router, private cookieService:CookieService) { }

   ngOnInit():void {
    this.formGroup=this.InitForm();
  }

  InitForm(): FormGroup {
    console.log("InitForm")
    return this.fb.group({
      _correo: [''],
      _username: [''],
      _nombre: [''],
      _fechaNac: [''],
      _contrasenna: [''],
      _contrasennaDos: ['']
    })
  }

  OnSubmit():void {
    console.log("OnSubmit")
    const {_correo, _username, _nombre, _fechaNac, _contrasenna, _contrasennaDos}= this.formGroup.value;

    if(_contrasenna == _contrasennaDos){
      console.log("Las contraseñas coinciden")
      this.registroU.Correo = _correo,
      this.registroU.Username = _username,
      this.registroU.Nombre = _nombre,
      this.registroU.Contrasena = _contrasenna,
      this.registroU.FechaNac = _fechaNac
      this.Agregar();
    }else{
      console.log("Las contraseñas no coinciden");
    }
  }

  Agregar():void {
    console.log("Agregar")
    console.log(this.registroU)
    this.userDB.registrarUsuario(this.registroU).subscribe({
      next: response=>{

      this.dataSource=response; //Se tiene que sacar User de aqui y pasarlos a infoUser
      console.log(this.dataSource)

      if(this.dataSource['exito']){
        this.router.navigate(['/sign-in'])
      }
    },
      complete:()=>console.info(),
      error: error=>console.log(error)})

      this.registroU = {
        Correo : "",
        Username : "",
        Nombre: "",
        Contrasena: "",
        FechaNac : new Date(),
      }
      /* this.router.navigate(['/sign-in']) */
  }
}
