// import type { Cliente } from './cliente'
// import { Usuario } from './usuario'

// export interface Venta {
//   id: number
//   idUsuario: number
//   idCliente: number
//   fecha: Date
//   total: number
//   usuario: Usuario
//   cliente: Cliente
// }
// models/venta.ts
//import type { DetalleVenta } from './detalleVenta'
import type { DetalleVenta } from './detalleVenta'

export interface Venta {
  id?: number
  fecha?: string
  total: number
  id_usuario: number
  id_cliente: number
  detalles: DetalleVenta[]
}
