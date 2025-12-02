import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Recovery } from '../tablas';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recuperar-cuenta',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './recuperar-cuenta.component.html',
  styleUrl: './recuperar-cuenta.component.css'
})
export class RecuperarCuentaComponent {
  formGroup!: FormGroup;
  dataSource:any=[];

  regRecovery : Recovery = {
    Correo: "",
    Contrasena: ""
  }

  constructor(private fb: FormBuilder,public recoveryDB:ApiService) { }

  ngOnInit():void {
    this.formGroup=this.InitForm();
  }

  InitForm(): FormGroup {
    console.log("InitForm")
    return this.fb.group({
      _correo: [''],
      _contrasena: ['']
    })
  }

  OnSubmit():void {
    console.log("OnSubmit")
    const {_correo, _contrasena}= this.formGroup.value;

    this.regRecovery.Correo = _correo,
    this.regRecovery.Contrasena = _contrasena,
    this.Agregar();

  }

  Agregar():void {
    console.log("Agregar")
    console.log(this.regRecovery)
    this.recoveryDB.recuperarCuenta(this.regRecovery).subscribe({
      next: response=>{
      this.dataSource=response;
      console.log(this.dataSource)
    },
      complete:()=>console.info(),
      error: error=>console.log(error)})

      this.regRecovery = {
        Correo: "",
        Contrasena: ""
      }
  }
}
