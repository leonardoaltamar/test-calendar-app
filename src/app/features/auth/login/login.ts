import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [CardModule, FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule, PasswordModule, FloatLabelModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    loginForm: FormGroup;

    constructor(private router: Router) {
        this.loginForm = new FormGroup({
            username: new FormControl<string>('', [Validators.required]),
            password: new FormControl<string>('', [Validators.required])
        });
    }

    onSubmit() {
        if(this.loginForm.valid){
            this.router.navigate(['/calendar']);
        }
    }
}
