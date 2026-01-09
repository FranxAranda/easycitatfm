import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitaService, Cita } from '../services/cita.service';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './citas.html',
  styleUrls: ['./citas.css']
})
export class CitasComponent implements OnInit {

  citas: Cita[] = [];
  loading: boolean = true; 

  constructor(private citaService: CitaService) {}

  ngOnInit() {
    this.cargarCitas();
  }

  // Carga las citas (con un pequeño retardo para que se vea el spinner al refrescar)
  cargarCitas() {
    this.loading = true; 
    
    const usuarioActual = localStorage.getItem('user_email');

    // 👇 Truco visual: Esperamos 300ms para que veas el spinner girar
    setTimeout(() => {
      this.citaService.getCitas(usuarioActual || '').subscribe({
        next: (datosBackend) => {
          this.citas = datosBackend;
          this.loading = false;
          console.log('🔄 Lista actualizada');
        },
        error: (e) => {
          console.error('Error al traer citas:', e);
          this.loading = false; 
        }
      });
    }, 300);
  }

  // 1. Ver detalles
  verDetalle(cita: Cita) {
    const fecha = new Date(cita.date).toLocaleString();
    alert(`📋 DETALLES DE LA CITA\n\nServicio: ${cita.service}\nFecha: ${fecha}\nUsuario: ${cita.user}`);
  }

  // 2. Borrado INSTANTÁNEO
  cancelarCita(id: string | undefined, event: Event) {
    event.stopPropagation(); 

    if (!id) return;

    if (confirm('¿Está seguro de que desea cancelar esta cita?')) {
      // Nota: NO ponemos this.loading = true para que sea instantáneo visualmente
      
      this.citaService.deleteCita(id).subscribe({
        next: () => {
          console.log('Borrado en servidor OK. Actualizando vista local...');
          
          // 👇 MAGIA: Borramos la tarjeta de la pantalla al instante
          // Sin esperar a recargar toda la lista del servidor
          this.citas = this.citas.filter(cita => cita._id !== id);
        },
        error: (err) => {
          console.error('Error al borrar:', err);
          alert('Hubo un error al intentar borrar la cita.');
        }
      });
    }
  }
}