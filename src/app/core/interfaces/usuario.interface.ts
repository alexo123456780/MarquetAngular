/**
 * Interfaz que define la estructura de un usuario en el sistema
 */
export interface IUsuario {
  id: number;
  nombre: string;
  email: string;
  rol?: string;
  token?: string;
}