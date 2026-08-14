// brayan importaciones
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/usuario/login/login';
import { SpanComponent } from './pages/spancomponent/spancomponent';
import { RegisterComponent } from './pages/usuario/register/register';
import { ValidadorComponente } from './pages/validador-componente/validador-componente';
   
// Importación de componentes y de Layout para la página.
import { Presentation } from './pages/presentation/presentation';
import { Home } from './pages/home/home';
import { Tyc } from './pages/tyc/tyc';
import { Layout } from './layout/layout/layout';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        component: Layout,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                redirectTo: '/main',
                pathMatch: 'full',
            },
            {
                path: 'main',
                component: Presentation
            },
            {
                path: 'home',
                component: Home
            }
        ]
    },
    {
        path: 'main',
        component: Presentation
    },
    {
        path: 'tyc',
        component: Tyc
    },
   {
        path:'login',
        component:LoginComponent
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'span',
        component:SpanComponent
    },
    {
        path:'validador',
        component:ValidadorComponente
    },
];
