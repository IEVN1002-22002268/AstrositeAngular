import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reporte-soporte-tec',
  imports: [CommonModule],
  templateUrl: './reporte-soporte-tec.component.html',
  styleUrl: './reporte-soporte-tec.component.css'
})
export class ReporteSoporteTecComponent {
  tipoReporte = [
    "Bugs de juegos",
    "Fallo en la pagina",
    "Problemas con mi perfil",
    "Problemas con un usuario",
    "Error al comprar",
    "Otros"
  ]
}
