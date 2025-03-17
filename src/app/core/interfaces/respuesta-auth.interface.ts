import { IUsuario } from './usuario.interface';

/**
 * Interfaz que define la estructura de la respuesta de autenticación
 */
export interface IRespuestaAuth {
  status: boolean;
  mensaje: string;
  token?: string;
  user?: IUsuario;
}