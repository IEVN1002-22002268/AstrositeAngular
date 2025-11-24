import { Routes } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { SignUpComponent } from './auth/features/sign-up/sign-up.component';

export const routes: Routes = [
  { 
    path: 'catalogo', 
    component: CatalogoComponent 
  },
  { 
    path: 'sign-up', 
    component: SignUpComponent 
  },
  // (Opcional) Si entran a la raíz, redirigir al catálogo o a donde quieras
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' }
];
