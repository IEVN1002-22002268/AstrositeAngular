import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Auth } from '../tablas';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-codigo-verificacion',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './codigo-verificacion.component.html',
  styleUrl: './codigo-verificacion.component.css'
})
export class CodigoVerificacionComponent {
  formGroup!: FormGroup;
  dataSource:any=[];

  regAuth :Auth = {
    Correo: "",
    Code: 0
  }

  codigo :string = ""
  userCookie : any = {}

  constructor(private fb: FormBuilder,public DB:ApiService, private cookieService:CookieService, private router:Router) { }

  ngOnInit():void {
    this.formGroup=this.InitForm();
    this.userCookie = JSON.parse(this.cookieService.get('user'))
    this.LlenarAuth(this.userCookie.Correo, 0)

    this.DB.setCodigo(this.regAuth).subscribe({
      next: response=>{
      this.dataSource=response;
      console.log(this.dataSource)
    },
      complete:()=>console.info(),
      error: error=>console.log(error)})
  }

  InitForm(): FormGroup {
    console.log("InitForm")
    return this.fb.group({
      _uno: [''],
      _dos: [''],
      _tres: [''],
      _cuatro: [''],
      _cinco: [''],
      _seis: [''],
    })
  }

  OnSubmit():void {
    console.log("OnSubmit")
    const {_uno, _dos, _tres, _cuatro, _cinco, _seis}= this.formGroup.value;
    const codeTemp : string = _uno + _dos + _tres + _cuatro + _cinco + _seis
    this.LlenarAuth(this.userCookie.Correo, Number(codeTemp))

    this.DB.checkCode(this.regAuth).subscribe({
      next: response=>{
      this.dataSource=response;
      console.log(this.dataSource)
      if(this.dataSource['exito']){
        this.router.navigate(['/cambiar-contrasena'])
      }
    },
      complete:()=>console.info(),
      error: error=>console.log(error)})

  }

  LlenarAuth(_correo : string, _code :number){
    this.regAuth.Correo = _correo,
    this.regAuth.Code = _code

  }
}
