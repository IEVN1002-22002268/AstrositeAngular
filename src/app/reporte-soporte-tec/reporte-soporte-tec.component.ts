import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Reports } from '../tablas';


@Component({
  selector: 'app-reporte-soporte-tec',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reporte-soporte-tec.component.html',
  styleUrl: './reporte-soporte-tec.component.css'
})
export class ReporteSoporteTecComponent {
  formGroup!: FormGroup;
  dataSource:any=[];

  regReporte : Reports = {
    Correo: "",
    Tema: "",
    Descripcion: "",
    Imagen: ""
  }

  constructor(private fb: FormBuilder,public reportDB:ApiService) { }

  tipoReporte = [
    "Bugs de juegos",
    "Fallo en la pagina",
    "Problemas con mi perfil",
    "Problemas con un usuario",
    "Error al comprar",
    "Otros"
  ]


  ngOnInit():void {
    this.formGroup=this.InitForm();
  }


  InitForm(): FormGroup {
    console.log("InitForm")
    return this.fb.group({
      _correo: [''],
      _tema: [''],
      _descripcion: [''],
      _imagen: [''],
    })
  }


  OnSubmit():void {
    console.log("OnSubmit")
    const {_correo, _tema, _descripcion, _imagen}= this.formGroup.value;

    this.regReporte.Correo = _correo,
    this.regReporte.Tema = _tema,
    this.regReporte.Descripcion = _descripcion,
    this.regReporte.Imagen = _imagen,
    this.Agregar();

  }

  Agregar():void {
    console.log("Agregar")
    console.log(this.regReporte)
    this.reportDB.enviarReporte(this.regReporte).subscribe({
      next: response=>{
      this.dataSource=response;
      console.log(this.dataSource)
    },
      complete:()=>console.info(),
      error: error=>console.log(error)})

      this.regReporte = {
        Correo: "",
        Tema: "",
        Descripcion: "",
        Imagen: ""
      }
  }
}
