import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { User } from '../../../core/models';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
@Component({
  selector: 'app-login',
  imports: [CardModule, FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule, PasswordModule, FloatLabelModule, ToastModule, MessageModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  providers: [MessageService]
})
export class Login {
    loginForm: FormGroup;

    constructor(private router: Router, private authService: AuthService, private messageService: MessageService) {
        this.loginForm = new FormGroup({
            username: new FormControl<string>('', [Validators.required, Validators.email]),
            password: new FormControl<string>('', [Validators.required])
        });
    }

    onSubmit() {
        if(this.loginForm.valid){
            console.log('pruebva')
            this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
                next: (res: User[]) => {
                    if(res.length > 0){
                        this.authService.saveToken(res[0].token);
                        this.authService.saveUser(res[0]);
                        this.router.navigate(['/calendar']);
                    }else{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrectos' });
                    }
                },
                error: (err) => {
                    console.log(err);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrectos' });
                }
            });
        }else{
            this.loginForm.markAllAsTouched();
        }
    }
}
