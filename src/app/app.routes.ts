// Barrerra importaciones
import { CreacionTorneo } from './pages/organizacion/creacion-torneo/creacion-torneo';
import { RegistroEquipos } from './pages/organizacion/registro-equipos/registro-equipos';
import { Reglamento } from './pages/organizacion/reglamento/reglamento';
import { Perfil } from './pages/perfil/perfil';
// brayan importaciones
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/usuario/login/login';
import { SpanComponent } from './pages/spancomponent/spancomponent';
import { RegisterComponent } from './pages/usuario/register/register';
import { ValidadorComponente } from './pages/validador-componente/validador-componente';
import { TorneosComponent } from './pages/torneos/torneos-comoponent/torneos-comoponent';
import { RestablecerComponent } from './pages/usuario/restablecer-component/restablecer-component';

// Importación de componentes y de Layout para la página.
import { Presentation } from './pages/presentation/presentation';
import { Home } from './pages/home/home';
import { Tyc } from './pages/tyc/tyc';
import { Layout } from './layout/layout/layout';
import { authGuard } from './guards/auth-guard';
import { Sideuser } from './pages/sideuser/sideuser';
import { AuthAnimationComponent } from './pages/auth-animation-component/auth-animation-component';
import { Notificacion } from './pages/notificacion/notificacion';
import { ConfiguracionFondo } from './pages/configuracion-fondo/configuracion-fondo';
import { Tutorial } from './pages/tutorial/tutorial';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
      },
      {
        path: 'main',
        component: Presentation,
      },
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'torneo',
        component: CreacionTorneo,
      },
      {
        path: 'registro',
        component: RegistroEquipos,
      },
      {
        path: 'reglamento',
        component: Reglamento,
      },
      {
        path: 'perfil',
        component: Perfil,
      },
      {
        path: 'notificacion',
        component:Notificacion
      },
      {
        path: 'fondo',
        component:ConfiguracionFondo
      },
      {
        path:'tutorial',
        component:Tutorial
      }
    ],
  },
  {
    path: 'tyc',
    component: Tyc,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'span',
    component: SpanComponent,
  },
  {
    path: 'validador',
    component: ValidadorComponente,
  },
  {
    path: 'torneo',
    component: CreacionTorneo,
  },
  {
    path: 'registro',
    component: RegistroEquipos,
  },
  {
    path: 'reglamento',
    component: Reglamento,
  },
  {
    path: 'perfil',
    component: Perfil,
  },
  {
    path: 'user',
    component: Sideuser,
  },
  {
    path: 'animation',
    component: AuthAnimationComponent,
  },
  {
    path: 'torneos',
    component: TorneosComponent,
  },
  {
    path: 'restablecer',
    component: RestablecerComponent,
  },
];
