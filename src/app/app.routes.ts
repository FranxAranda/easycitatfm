import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardLayoutComponent} from './components/dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoriesFormComponent } from './components/categories-form/categories-form.component';
import { PostsFormComponent } from './components/posts-form/posts-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CitasComponent } from './citas/citas';
import { NuevaCitaComponent } from './nueva-cita/nueva-cita';

// 👇 1. IMPORTANTE: Importamos tu guardia de seguridad
import { authGuard } from './guards/auth.guard'; 

export const routes: Routes = [
  // 1. Redirigir la raíz al login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // 2. Rutas de Autenticación (Públicas)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // 3. Rutas Protegidas (Con candado)
  {
    path: 'app', 
    component: DashboardLayoutComponent,
    canActivate: [authGuard], // 👈 2. AQUÍ ESTÁ EL CANDADO MAESTRO
    children: [
      // Ruta por defecto del layout: /app -> dashboard
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
      
      // Rutas Hijas (Solo accesibles si tienes token)
      { path: 'dashboard', component: DashboardComponent },
      { path: 'categories', component: CategoriesFormComponent },
      { path: 'posts', component: PostsFormComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'citas', component: CitasComponent },
      { path: 'nueva-cita/:tipo', component: NuevaCitaComponent }
    ]
  },
  
  // 4. Ruta Catch-all (Cualquier ruta inventada va al login)
  { path: '**', redirectTo: 'login' } 
];