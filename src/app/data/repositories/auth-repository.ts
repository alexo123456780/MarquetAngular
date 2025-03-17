import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ICredenciales } from '../../core/interfaces/credenciales.interface';
import { IRespuestaAuth } from '../../core/interfaces/respuesta-auth.interface';
import { IUsuario } from '../../core/interfaces/usuario.interface';
import { IAuthRepository } from '../../domain/repositories/auth-repository.interface';
import { AuthDataSource } from '../datasources/auth-datasource';

@Injectable({
  providedIn: 'root'
})
export class AuthRepository implements IAuthRepository {
  private tokenKey = 'auth_token';
  private userKey = 'user_data';

  constructor(private dataSource: AuthDataSource) {}

  /**
   * Realiza el inicio de sesión con las credenciales proporcionadas
   * @param credenciales Las credenciales del usuario
   * @returns Un Observable con la respuesta de autenticación
   */
  iniciarSesion(credenciales: ICredenciales): Observable<IRespuestaAuth> {
    return this.dataSource.login(credenciales).pipe(
      tap(respuesta => {
        if (respuesta.status && respuesta.token) {
          this.guardarToken(respuesta.token);
          if (respuesta.user) {
            this.guardarUsuario(respuesta.user);
          }
        }
      })
    );
  }

  /**
   * Cierra la sesión del usuario actual
   */
  cerrarSesion(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  /**
   * Verifica si el usuario está autenticado
   * @returns true si el usuario está autenticado, false en caso contrario
   */
  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }

  /**
   * Obtiene el token de autenticación
   * @returns El token de autenticación o null si no existe
   */
  obtenerToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Obtiene los datos del usuario autenticado
   * @returns Los datos del usuario o null si no existe
   */
  obtenerUsuario(): IUsuario | null {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Guarda el token de autenticación en el almacenamiento local
   * @param token El token a guardar
   */
  private guardarToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Guarda los datos del usuario en el almacenamiento local
   * @param usuario El usuario a guardar
   */
  private guardarUsuario(usuario: IUsuario): void {
    localStorage.setItem(this.userKey, JSON.stringify(usuario));
  }
}