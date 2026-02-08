import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
    selector: 'app-navbar',
    imports: [CommonModule, MenuModule],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css',
    providers: [MessageService]
})
export class Navbar {
    private messageService = inject(MessageService);
    private router = inject(Router);
    items: MenuItem[] | undefined = [
        {
            label: 'Opciones',
            items: [                
                {
                    label: 'Cerrar sesión',
                    icon: 'pi pi-sign-out',
                    command: () => {
                        this.router.navigate(['/auth/login']);
                    }
                }
            ]
        }
    ];
}
