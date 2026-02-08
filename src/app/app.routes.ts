import { Routes } from '@angular/router';
import { MainLayout } from './shared/layout/main-layout/main-layout';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
    },
    {
        path: 'calendar',
        component: MainLayout,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./features/calendar/calendar').then(m => m.Calendar)
            }
        ]
    },
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth' }
];
