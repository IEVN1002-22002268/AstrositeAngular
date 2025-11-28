import { Routes } from '@angular/router';

import { SignUpComponent } from './auth/features/sign-up/sign-up.component';
import { RecuperarCuentaComponent } from './recuperar-cuenta/recuperar-cuenta.component';
import { CodigoVerificacionComponent } from './codigo-verificacion/codigo-verificacion.component';
import { ConfigCuentaComponent } from './config-cuenta/config-cuenta.component';
import { MetodoPagoComponent } from './metodo-pago/metodo-pago.component';

export const routes: Routes = [
  {
    path: 'sign-up',
    component: SignUpComponent
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


  // (Opcional) Si entran a la raíz, redirigir al catálogo o a donde quieras
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' }
];

