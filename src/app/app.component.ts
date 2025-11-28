import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SignInComponent } from './auth/features/sign-in/sign-in.component';
import { SignUpComponent } from './auth/features/sign-up/sign-up.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { BusquedaAmigosComponent } from './busqueda-amigos/busqueda-amigos.component';
import { CambiarContrasennaComponent } from "./cambiar-contrasenna/cambiar-contrasenna.component";
import { ReporteSoporteTecComponent } from './reporte-soporte-tec/reporte-soporte-tec.component';
import { CarritoComponent } from './carrito/carrito.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'astrosite';
}
