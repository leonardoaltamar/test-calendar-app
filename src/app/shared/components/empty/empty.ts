import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-empty',
    imports: [ButtonModule],
    templateUrl: './empty.html',
    styleUrl: './empty.css',
})
export class Empty {
    constructor(private router: Router) { }
    onBack() {
        this.router.navigate(['/']);
    }
}
