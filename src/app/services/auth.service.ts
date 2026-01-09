import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

// Interfaces
export interface AuthResponse {
  token: string;
  email: string;
}

export interface UserCredentials {  // <-- export
  email: string;
  password: string;
}

export interface UserRegister extends UserCredentials {  // <-- export
  name: string;
}

export interface User {  // <-- export
  email: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private tokenKey = 'auth_token';
  private emailKey = 'user_email';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // --- SESIÓN ---
  private saveToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  private loadToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  getToken(): string | null {
    return this.loadToken();
  }

  isLoggedIn(): boolean {
    return this.isBrowser && !!this.getToken();
  }

  getUserEmail(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(this.emailKey);
    }
    return null;
  }

  getUser(): User | null {
    const email = this.getUserEmail();
    return email ? { email } : null;
  }

  // --- REGISTRO ---
  register(credentials: UserRegister): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, credentials).pipe(
      tap(response => {
        this.saveToken(response.token);
        if (this.isBrowser) {
          localStorage.setItem(this.emailKey, response.email);
        }
        console.log('Registro exitoso:', response);
      })
    );
  }

  // --- LOGIN ---
  login(credentials: UserCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        this.saveToken(response.token);
        if (this.isBrowser) {
          localStorage.setItem(this.emailKey, response.email);
        }
        console.log('Login exitoso:', response);
      })
    );
  }

  // --- LOGOUT ---
  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.emailKey);
    }
    this.router.navigate(['/login']);
  }
}
