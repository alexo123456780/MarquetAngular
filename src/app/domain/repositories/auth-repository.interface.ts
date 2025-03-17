import { Observable } from 'rxjs';
import { ICredenciales } from '../../core/interfaces/credenciales.interface';
import { IRespuestaAuth } from '../../core/interfaces/respuesta-auth.interface';
import { IUsuario } from '../../core/interfaces/usuario.interface';

/**
 * Interfaz que define las operaciones disponibles para el repositorio de autenticación
 */
export interface IAuthRepository {
  /**
   * Realiza el inicio de sesión con las credenciales proporcionadas
   * @param credenciales Las credenciales del usuario
   * @returns Un Observable con la respuesta de autenticación
   */
  iniciarSesion(credenciales: ICredenciales): Observable<IRespuestaAuth>;
  
  /**
   * Cierra la sesión del usuario actual
   */
  cerrarSesion(): void;
  
  /**
   * Verifica si el usuario está autenticado
   * @returns true si el usuario está autenticado, false en caso contrario
   */
  estaAutenticado(): boolean;
  
  /**
   * Obtiene el token de autenticación
   * @returns El token de autenticación o null si no existe
   */
  obtenerToken(): string | null;
  
  /**
   * Obtiene los datos del usuario autenticado
   * @returns Los datos del usuario o null si no existe
   */
  obtenerUsuario(): IUsuario | null;
}