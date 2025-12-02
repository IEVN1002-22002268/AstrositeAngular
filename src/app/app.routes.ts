import { Routes } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { SignUpComponent } from './auth/features/sign-up/sign-up.component';
import { SignInComponent } from './auth/features/sign-in/sign-in.component';
import { BusquedaAmigosComponent } from './busqueda-amigos/busqueda-amigos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { CambiarContrasennaComponent } from './cambiar-contrasenna/cambiar-contrasenna.component';
import { CodigoVerificacionComponent } from './codigo-verificacion/codigo-verificacion.component';
import { ReporteSoporteTecComponent } from './reporte-soporte-tec/reporte-soporte-tec.component';
import { ConfigCuentaComponent } from './config-cuenta/config-cuenta.component';
import { RecuperarCuentaComponent } from './recuperar-cuenta/recuperar-cuenta.component';
import { UsuariosBloqueadosComponent } from './usuarios-bloqueados/usuarios-bloqueados.component';
import { CarritoComponent } from './carrito/carrito.component';
import { HistorialComprasComponent } from './historial-compras/historial-compras.component';
import { MetodoPagoComponent } from './metodo-pago/metodo-pago.component';


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
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'recuperar-cuenta',
    component: RecuperarCuentaComponent
  },
  {
    path: 'codigoveri',
    component: CodigoVerificacionComponent
  },
  {
    path: 'config-cuenta',
    component: ConfigCuentaComponent
  },
  {
    path: 'pago',
    component: MetodoPagoComponent
  },
  {
    path: 'cambiar-contrasena',
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
  {
    path: 'juego/:id',
    component: SingleProductComponent
  },
  {
    path: 'perfil/:id',
    component: PerfilComponent
  },
  // (Opcional) Si entran a la raíz, redirigir al catálogo o a donde quieras
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' }
];

