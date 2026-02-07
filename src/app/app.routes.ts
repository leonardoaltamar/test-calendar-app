import { Routes } from '@angular/router';
import { Calendar } from './features/calendar/calendar';
import { MainLayout } from './shared/layout/main-layout/main-layout';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
    },
    {
        path: 'calendar',
        component: MainLayout,
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
