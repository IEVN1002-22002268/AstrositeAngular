import { Routes } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { SignUpComponent } from './auth/features/sign-up/sign-up.component';
import { BusquedaAmigosComponent } from './busqueda-amigos/busqueda-amigos.component';
import { PerfilComponent } from './perfil/perfil.component';

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
    path: 'mi-perfil', 
    component: PerfilComponent 
  },
  { 
    path: 'sign-up', 
    component: SignUpComponent 
  },
  // (Opcional) Si entran a la raíz, redirigir al catálogo o a donde quieras
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' }
];
