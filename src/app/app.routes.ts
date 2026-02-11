import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { authGuard } from './guards/authentication/auth-guard';
import { AddNewSeafarer } from './pages/add-new-seafarer/add-new-seafarer';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: Home,
        title: 'Home - Seafarer Management',
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: Login,
        title: 'Login',
    },
    {
        path: 'addnewseafarer',
        component: AddNewSeafarer,
        title: 'Add New Seafarer',
        canActivate: [authGuard]
    },
    {
        path: 'editseafarer/:id',
        component: AddNewSeafarer,
        title: 'Edit Seafarer',
        canActivate: [authGuard]
    }
];