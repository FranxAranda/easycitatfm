import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para *ngIf
import { Router } from '@angular/router';
import { CitaService, Cita } from '../../services/cita.service'; // Importamos el servicio

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  userName: string = '';
  proximaCita: Cita | null = null; // Aquí guardaremos la cita más cercana
  loading: boolean = true;

  constructor(
    private router: Router,
    private citaService: CitaService
  ) {}

  ngOnInit() {
    // 1. RECUPERAR NOMBRE:
    // Priorizamos el 'user_name' (Fran). Si no existe, cogemos el email, y si no 'Usuario'.
    const nombreGuardado = localStorage.getItem('user_name');
    const emailGuardado = localStorage.getItem('user_email');
    
    // Si tenemos nombre (Fran), lo usamos. Si no, usamos lo que haya antes del @ del email.
    if (nombreGuardado) {
      this.userName = nombreGuardado;
    } else if (emailGuardado) {
      this.userName = emailGuardado.split('@')[0]; 
    } else {
      this.userName = 'Usuario';
    }

    // 2. BUSCAR PRÓXIMA CITA (RECORDATORIO)
    this.cargarProximaCita();
  }

  cargarProximaCita() {
    const usuarioEmail = localStorage.getItem('user_email');
    if(!usuarioEmail) return;

    this.citaService.getCitas().subscribe(citas => {
      // Filtramos las mías
      const misCitas = citas.filter(c => c.user === usuarioEmail);
      
      // Ordenamos por fecha (la más antigua primero)
      // Nota: Para un TFM real, filtraríamos también que la fecha sea futura (> hoy)
      misCitas.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      if (misCitas.length > 0) {
        this.proximaCita = misCitas[0]; // Nos quedamos con la primera
      }
      this.loading = false;
    });
  }

  // --- NAVEGACIÓN ---
  irACita(tipo: string) {
    this.router.navigate(['/app/nueva-cita', tipo]);
  }

  verMisCitas() {
    this.router.navigate(['/app/citas']);
  }
  irAPerfil() {
  this.router.navigate(['/app/profile']);
}
}