/* enrutar el componente login */
import { Routes } from "@angular/router";
import { Login } from "./login/login";


export const authRoutes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];