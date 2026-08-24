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
import { EquiposComponent } from './pages/torneos/equipos/equipos';
import { Fixture } from './pages/torneos/fixture/fixture';
import { InfTorneosComponent } from './pages/torneos/inf-torneos-component/inf-torneos-component';

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
import { TI } from './pages/t-i/t-i';
import { TP } from './pages/t-p/t-p';
import { Stats } from './pages/stats/stats';
import { Teams } from './pages/teams/teams';
import { Privacy } from './pages/privacy/privacy';
import { FAQ } from './pages/faq/faq';
import { Navigator } from './layout/navigator/navigator';


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
        path: 'notificaciones',
        component: Notificacion
      },
      {
        path: 'fondo',
        component: ConfiguracionFondo
      },
      {
        path:'tutoriales',
        component: Tutorial
      },
      {
        path: 'torneos_inscritos',
        component: TI
      },
      {
        path: 'historial',
        component: TP
      },
      {
        path: 'stats',
        component: Stats
      },
      {
        path: 'teams',
        component: Teams
      },
      {
        path: 'privacidad',
        component: Privacy
      },
      {
        path: 'faq',
        component: FAQ
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
  {
    path:'equipos',
    component: EquiposComponent
  },
  {
    path:'fixture',
    component: Fixture
  },
  {
    path:'inf-torneos/:id',
    component: InfTorneosComponent
  },
  {
    path: 'navigator',
    component: Navigator
  }
];
