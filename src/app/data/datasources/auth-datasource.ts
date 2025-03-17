import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICredenciales } from '../../core/interfaces/credenciales.interface';
import { IRespuestaAuth } from '../../core/interfaces/respuesta-auth.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthDataSource {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Realiza la petición de login al servidor
   * @param credenciales Las credenciales del usuario
   * @returns Un Observable con la respuesta del servidor
   */
  login(credenciales: ICredenciales): Observable<IRespuestaAuth> {
    return this.http.post<IRespuestaAuth>(`${this.apiUrl}/login`, credenciales);
  }
}