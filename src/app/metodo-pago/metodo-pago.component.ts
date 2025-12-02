import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Personal_data, Users } from '../tablas';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-metodo-pago',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './metodo-pago.component.html',
  styleUrl: './metodo-pago.component.css'
})
export class MetodoPagoComponent {
  formGroup!: FormGroup;
  dataSource:any=[];
  _user_id: any;
  userCookie: Users = {
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

  regPersonalData : Personal_data = {
    ID_User: 0,
    Tipo: '',
    NumeroTarjeta: '',
    Vigencia: '',
    CVC: '',
    NombrePropietario: '',
    ApellidoPropietario: '',
    Pais: '',
    CP: 0,
  }

  constructor(private fb: FormBuilder,public reportDB:ApiService, private cookieService:CookieService) { }

  pais = [ //Lista de los paises
  "Arabia Saudita",
  "Argentina",
  "Australia",
  "Bélgica",
  "Brasil",
  "Canadá",
  "Chile",
  "China",
  "Colombia",
  "Corea del Sur",
  "Egipto",
  "España",
  "Estados Unidos",
  "Finlandia",
  "Francia",
  "Alemania",
  "India",
  "Italia",
  "Japón",
  "México",
  "Noruega",
  "Nueva Zelanda",
  "Países Bajos",
  "Perú",
  "Polonia",
  "Portugal",
  "Reino Unido",
  "Rusia",
  "Sudáfrica",
  "Suecia",
  "Suiza",
  "Turquía"
  ];

  ngOnInit():void {
    this.formGroup=this.InitForm();

    if(this.cookieService.get('user')){ //Si existe la cookie user hay sesion iniciada
      this.userCookie = JSON.parse(this.cookieService.get('user'))
      this._user_id = this.userCookie.ID_User
    }
  }


  InitForm(): FormGroup {
    console.log("InitForm")
    return this.fb.group({
      _tipo : [''],
      _numeroTarjeta : [''],
      _vigencia : [''],
      _cvc : [''],
      _nombrePropietario : [''],
      _apellidoPropietario : [''],
      _pais : [''],
      _cp : ['']
    })
  }


  OnSubmit():void {
    console.log("OnSubmit")
    const {_tipo, _numeroTarjeta, _vigencia, _cvc, _nombrePropietario, _apellidoPropietario, _pais, _cp}= this.formGroup.value;

    this.regPersonalData.ID_User = this._user_id,
    this.regPersonalData.Tipo = _tipo,
    this.regPersonalData.NumeroTarjeta = _numeroTarjeta,
    this.regPersonalData.Vigencia = _vigencia
    this.regPersonalData.CVC = _cvc,
    this.regPersonalData.NombrePropietario = _nombrePropietario,
    this.regPersonalData.ApellidoPropietario = _apellidoPropietario,
    this.regPersonalData.Pais = _pais,
    this.regPersonalData.CP = _cp
    this.Agregar();

  }

  Agregar():void {
    console.log("Agregar")
    console.log(this.regPersonalData)
    this.reportDB.setPersonalData(this.regPersonalData, this._user_id).subscribe({
      next: response=>{
      this.dataSource=response;
      console.log(this.dataSource)
    },
      complete:()=>console.info(),
      error: error=>console.log(error)})

  }

}
