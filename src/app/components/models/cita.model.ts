// src/app/models/cita.interface.ts
export interface Cita {
  id: string; // Un identificador único
  fecha: string;
  hora: string;
  tipo: 'Medico' | 'Ayuntamiento'; // Ejemplo
  notas?: string;
}