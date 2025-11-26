import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SignInComponent } from './auth/features/sign-in/sign-in.component';
import { SignUpComponent } from './auth/features/sign-up/sign-up.component';
import { CambiarContrasennaComponent } from "./cambiar-contrasenna/cambiar-contrasenna.component";
import { ReporteSoporteTecComponent } from './reporte-soporte-tec/reporte-soporte-tec.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, SignInComponent, SignUpComponent, CambiarContrasennaComponent, ReporteSoporteTecComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'astrosite';
}
