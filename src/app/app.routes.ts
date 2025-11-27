import { Routes } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { SignUpComponent } from './auth/features/sign-up/sign-up.component';
import { BusquedaAmigosComponent } from './busqueda-amigos/busqueda-amigos.component';
import { CambiarContrasennaComponent } from './cambiar-contrasenna/cambiar-contrasenna.component';
import { ReporteSoporteTecComponent } from './reporte-soporte-tec/reporte-soporte-tec.component';
import { UsuariosBloqueadosComponent } from './usuarios-bloqueados/usuarios-bloqueados.component';
import { CarritoComponent } from './carrito/carrito.component';
import { HistorialComprasComponent } from './historial-compras/historial-compras.component';

export const routes: Routes = [
  {
    path: 'catalogo',
    component: CatalogoComponent
  },
  {
    path: 'busqueda-de-amigos',
    component: BusquedaAmigosComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'cambiar-contraseña',
    component: CambiarContrasennaComponent
  },
  {
    path: 'reporte',
    component: ReporteSoporteTecComponent
  },
  {
    path: 'usuarios-bloqueados',
    component: UsuariosBloqueadosComponent
  },
  {
    path: 'carrito',
    component: CarritoComponent
  },
  {
    path: 'historial',
    component: HistorialComprasComponent
  },
  // (Opcional) Si entran a la raíz, redirigir al catálogo o a donde quieras
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' }
];
