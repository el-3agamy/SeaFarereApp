import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { authGuard } from './guards/authentication/auth-guard';

export const routes: Routes = [
    {
        path: "" ,
        redirectTo : "home" ,
        pathMatch :'full' ,
    } ,
    {
        path : "home" ,
        component : Home ,
        title : "Home" ,
        canActivate :[authGuard]

    } ,

    {
        path : "login" ,
        component : Login ,
        title : "Login" ,
        canActivate : []
    } ,
    
];