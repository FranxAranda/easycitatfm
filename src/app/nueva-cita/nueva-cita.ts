import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// 1. IMPORTAMOS EL SERVICIO
import { CitaService } from '../services/cita.service'; 

@Component({
  selector: 'app-nueva-cita',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './nueva-cita.html',
  styleUrls: ['./nueva-cita.css']
})
export class NuevaCitaComponent implements OnInit {
  
  tipo: string = ''; 
  paso: number = 1;
  fecha: string = '';
  hora: string = '';
  notas: string = '';

  // 2. INYECTAMOS EL SERVICIO EN EL CONSTRUCTOR
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private citaService: CitaService 
  ) {}

  ngOnInit() {
    this.tipo = this.route.snapshot.paramMap.get('tipo') || 'generica';
  }

  siguientePaso() {
    if (this.fecha && this.hora) {
      this.paso = 2;
    } else {
      alert('Por favor, selecciona una fecha y una hora.');
    }
  }

  anteriorPaso() {
    this.paso = 1;
  }

 
  confirmarCita() {
  // 1. OBTENER USUARIO REAL
  // Recuperamos el email que guardamos en el Login
  const usuarioActual = localStorage.getItem('user_email');

  // Seguridad: Si no hay usuario, no dejamos guardar
  if (!usuarioActual) {
    alert('Error: No estás identificado. Por favor inicia sesión de nuevo.');
    return;
  }
  
  const fechaCompletaISO = `${this.fecha}T${this.hora}:00`;

  const datosParaBackend = {
    user: usuarioActual, // <--- AQUI ESTÁ EL CAMBIO CLAVE
    date: fechaCompletaISO,
    service: this.tipo === 'medico' ? 'Cita Médico Cabecera' : 'Trámite Ayuntamiento',
    status: 'scheduled' // Mejor usar 'scheduled' (confirmada) que 'pendiente'
  };

  console.log('Enviando al servidor:', datosParaBackend);

  this.citaService.createCita(datosParaBackend).subscribe({
    next: (respuesta) => {
      console.log('¡Guardado con éxito!', respuesta);
      this.paso = 3; 
      
      // Redirigimos un poco más rápido para mejorar la sensación
      setTimeout(() => {
        this.router.navigate(['/app/citas']); 
      }, 2000);
    },
    error: (error) => {
      console.error('Error al guardar:', error);
      alert('Hubo un error al conectar con el servidor.');
    }
  });
}
}