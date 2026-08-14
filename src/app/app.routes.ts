// brayan importaciones
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/usuario/login/login';
import { SpanComponent } from './pages/spancomponent/spancomponent';
import { RegisterComponent } from './pages/usuario/register/register';
import { ValidadorComponente } from './pages/validador-componente/validador-componente';

export const routes: Routes = [
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
