import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Reports } from '../tablas';

@Component({
  selector: 'app-reportes-admin',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reportes-admin.component.html',
  styleUrl: './reportes-admin.component.css'
})
export class ReportesAdminComponent {
  dataSource : any = []
  listaReportes : any = []
  tipoReporte : Reports = {
    Tema : ""
  }
  formGroup!: FormGroup;

  selectReporte = [
    "Bugs de juegos",
    "Fallo en la pagina",
    "Problemas con mi perfil",
    "Problemas con un usuario",
    "Error al comprar",
    "Otros"
  ]

  constructor(public pageDB:ApiService, private fb: FormBuilder) { }

  ngOnInit():void{
    this.formGroup=this.InitForm();
  }

  InitForm(): FormGroup {
    return this.fb.group({
      _tema: ['']
    })
  }

  OnSubmit():void {
    const {_tema}= this.formGroup.value;
    this.tipoReporte.Tema = _tema
    console.log(this.tipoReporte)
    this.EnviarRecibir()
  }

  EnviarRecibir(){
    this.pageDB.getReports(this.tipoReporte).subscribe({
      next: response=>{
      this.dataSource=response;
      this.listaReportes = this.dataSource['reports'] /*???*/
      console.log(this.dataSource)
    },
      complete:()=>console.info(),
      error: error=>console.log(error)})
  }
}
