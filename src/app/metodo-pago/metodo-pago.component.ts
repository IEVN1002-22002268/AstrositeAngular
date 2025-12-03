import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Personal_data, Users, Sales } from '../tablas';
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
  dataSourceTwo:any=[];
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

  carritoCookie: any = []

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

  saleData : Sales = {
    ID_User: 0,
    Fecha: new Date(),
    ID_Juego: 0,
    PrecioTotal: 0,
    Descuento: 0
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

    if(this.cookieService.get('carrito')){ //Si existe la cookie user hay sesion iniciada
      this.carritoCookie = JSON.parse(this.cookieService.get('carrito'))
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

    this.RegistrarVenta();

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

  RegistrarVenta(){
    if(this.cookieService.get('carrito')){ //Si existe la cookie user hay sesion iniciada
      for(const item of this.carritoCookie){
        this.saleData.ID_User = this._user_id,
        this.saleData.Fecha = new Date()
        this.saleData.ID_Juego = item.ID_Juego,
        this.saleData.PrecioTotal = item.Precio,
        this.saleData.Descuento = item.Precio - ((item.Precio * item.Descuento) / 100)

      this.reportDB.setVenta(this.saleData).subscribe({
        next: response=>{
        this.dataSourceTwo=response;
        console.log(this.dataSourceTwo)},
        complete:()=>console.info(),
        error: error=>console.log(error)})
      }
    }
    this.cookieService.delete('carrito')
  }

}
