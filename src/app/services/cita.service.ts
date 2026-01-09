import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // 👈 Importamos HttpParams
import { Observable } from 'rxjs';

export interface Cita {
  _id?: string;
  user: string;
  date: string;
  service: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  
  private apiUrl = 'https://eastycitatfmbackend.onrender.com/api/appointments';

  constructor(private http: HttpClient) {}

  // 👇 Aceptamos el email como parámetro opcional
  getCitas(emailUsuario?: string): Observable<Cita[]> {
    let params = new HttpParams();

    // Si nos pasan un email, lo añadimos a la URL: /api/appointments?user=fran@test.com
    if (emailUsuario) {
      params = params.set('user', emailUsuario);
    }

    // Enviamos la petición con los parámetros
    return this.http.get<Cita[]>(this.apiUrl, { params });
  }

  createCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.apiUrl, cita);
  }

  deleteCita(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}