import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ICredenciales } from '../../core/interfaces/credenciales.interface';
import { IRespuestaAuth } from '../../core/interfaces/respuesta-auth.interface';
import { IUsuario } from '../../core/interfaces/usuario.interface';
import { IAuthRepository } from '../repositories/auth-repository.interface';
import { AUTH_REPOSITORY } from '../repositories/auth-repository.token';

@Injectable({
  providedIn: 'root'
})
export class AuthUseCase {
  constructor(@Inject(AUTH_REPOSITORY) private authRepository: IAuthRepository) {}

  /**
   * Realiza el inicio de sesión con las credenciales proporcionadas
   * @param credenciales Las credenciales del usuario
   * @returns Un Observable con la respuesta de autenticación
   */
  iniciarSesion(credenciales: ICredenciales): Observable<IRespuestaAuth> {
    return this.authRepository.iniciarSesion(credenciales);
  }

  /**
   * Cierra la sesión del usuario actual
   */
  cerrarSesion(): void {
    this.authRepository.cerrarSesion();
  }

  /**
   * Verifica si el usuario está autenticado
   * @returns true si el usuario está autenticado, false en caso contrario
   */
  estaAutenticado(): boolean {
    return this.authRepository.estaAutenticado();
  }

  /**
   * Obtiene el token de autenticación
   * @returns El token de autenticación o null si no existe
   */
  obtenerToken(): string | null {
    return this.authRepository.obtenerToken();
  }

  /**
   * Obtiene los datos del usuario autenticado
   * @returns Los datos del usuario o null si no existe
   */
  obtenerUsuario(): IUsuario | null {
    return this.authRepository.obtenerUsuario();
  }
}