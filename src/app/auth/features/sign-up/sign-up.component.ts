import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Users } from '../../../tablas';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  formGroup!: FormGroup;

  registroU : Users ={
    correo : "",
    username : "",
    nombre: "",
    contrasenna: "",
    fechaNac : new Date(),
    foto: "",
    descripcion: "",
    telefono: 0
  }

  constructor(private fb: FormBuilder,public userDB:ApiService, private router:Router) { }

   ngOnInit():void {
    this.formGroup=this.InitForm();
  }

  InitForm(): FormGroup {
    console.log("InitForm")
    return this.fb.group({
      correo: [''],
      username: [''],
      nombre: [''],
      fechaNac: [''],
      contrasenna: [''],
      contrasennaDos: ['']
    })
  }

  OnSubmit():void {
    console.log("OnSubmit")
    const {correo, username, nombre, fechaNac, contrasenna, contrasennaDos}= this.formGroup.value;

    if(contrasenna == contrasennaDos){
      console.log("Las contraseñas coinciden")
      this.registroU.correo = correo,
      this.registroU.username = username,
      this.registroU.nombre = nombre,
      this.registroU.contrasenna = contrasenna,
      this.registroU.fechaNac = fechaNac,
      this.registroU.foto = "",
      this.registroU.descripcion = "",
      this.registroU.telefono = 0
      this.Agregar();
    }else{
      console.log("Las contraseñas no coinciden");
    }
  }

  Agregar():void {
    console.log("Agregar")
    console.log(this.registroU)
    this.userDB.registrarUsuario(this.registroU).subscribe({
      next:()=>console.log(),
      complete:()=>console.info(),
      error: error=>console.log(error)})

      this.registroU = {
        correo : "",
        username : "",
        nombre: "",
        contrasenna: "",
        fechaNac : new Date(),
        foto: "",
        descripcion: "",
        telefono: 0
      }
      /* this.router.navigate(['/sign-in']) */
  }
}
