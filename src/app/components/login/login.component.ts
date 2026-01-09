import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthService, UserCredentials } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm!: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/app/dashboard']);
    }
  }

  // --- Detectar autocompletado ---
  ngAfterViewInit() {
    // Solo ejecutamos esto si estamos en el navegador para evitar errores en el servidor
    if (typeof document !== 'undefined') {
      setTimeout(() => {
        this.checkAutofill('email');
        this.checkAutofill('password');
      }, 500);
    }
  }

  checkAutofill(controlName: string) {
    // PROTECCIÓN AÑADIDA: Verificamos que 'document' existe antes de usarlo
    if (typeof document !== 'undefined') {
      const inputElement = document.querySelector(`input[formControlName="${controlName}"]`) as HTMLInputElement;
      
      if (inputElement && inputElement.value && this.loginForm.get(controlName)?.value === '') {
        this.loginForm.get(controlName)?.setValue(inputElement.value);
      }
    }
  }

  login() {
    this.error = null;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return; // Añadido return para no continuar si es inválido
    }

    const credentials: UserCredentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.authService.login(credentials).subscribe({
      next: (res) => {
        console.log('Login correcto:', res);

        if (res.token) localStorage.setItem('auth_token', res.token);
        if (res.email) localStorage.setItem('user_email', res.email);

        this.router.navigate(['/app/dashboard']);
      },
      error: (err) => {
        console.error('Error login:', err);
        this.error = err.error?.message || 'Error al iniciar sesión. Verifica tus datos.';
      }
    });
  }
}