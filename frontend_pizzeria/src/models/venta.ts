import type { Cliente } from './cliente'
import { Usuario } from './usuario'

export interface Venta {
  id: number
  idUsuario: number
  idCliente: number
  fecha: Date
  total: number
  usuario: Usuario
  cliente: Cliente
}
