import { Routes } from '@angular/router';
import { CreacionTorneo } from './pages/organizacion/creacion-torneo/creacion-torneo';
import { RegistroEquipos } from './pages/organizacion/registro-equipos/registro-equipos';
import { Reglamento } from './pages/organizacion/reglamento/reglamento';

export const routes: Routes = [
{
  path: '',
  redirectTo: 'reglamento',
  pathMatch: 'full'
},
{
    path:'torneo',
    component:CreacionTorneo
},
{
    path:'registro',
    component:RegistroEquipos
},
{
    path:'reglamento',
    component:Reglamento
}
];
