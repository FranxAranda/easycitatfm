import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  nombre: string = '';
  email: string = '';
  telefono: string = '';
  direccion: string = ''; 
  fechaRegistro: string = new Date().toLocaleDateString();

  constructor(private router: Router) {}

  ngOnInit() {
    this.email = localStorage.getItem('user_email') || 'usuario@ejemplo.com';
    this.nombre = localStorage.getItem('user_name') || ''; 
    this.telefono = localStorage.getItem('user_phone') || '';
    this.direccion = localStorage.getItem('user_address') || '';
  }

  guardarDatos() {
    if (this.nombre) localStorage.setItem('user_name', this.nombre);
    if (this.telefono) localStorage.setItem('user_phone', this.telefono);
    if (this.direccion) localStorage.setItem('user_address', this.direccion);
    
    alert('✅ Perfil actualizado correctamente.');
  }

  cerrarSesion() {
    if(confirm('¿Seguro que deseas cerrar sesión?')) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}