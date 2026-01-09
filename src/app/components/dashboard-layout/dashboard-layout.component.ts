import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router'; // <--- AÑADIR Router
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {
  isDark = false;
  
  // CORREGIDO: Las rutas deben empezar por /app/
  menuItems = [
    { name: 'Dashboard', route: '/app/dashboard', icon: 'dashboard' },
    { name: 'Categorías', route: '/app/categories', icon: 'category' },
    { name: 'Posts', route: '/app/posts', icon: 'article' },
    { name: 'Perfil', route: '/app/profile', icon: 'person' }, 
  ];

  constructor(
    public authService: AuthService,
    private router: Router // <--- INYECTAR ROUTER
  ) {}

  ngOnInit() {
    // Recuperar tema guardado
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      this.isDark = true;
      document.body.classList.add('dark-mode');
    }
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    const body = document.body;
    if (this.isDark) {
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }

  logout() {
    this.authService.logout(); // Borra el token
    this.router.navigate(['/login']); // <--- REDIRIGE AL LOGIN
  }
}