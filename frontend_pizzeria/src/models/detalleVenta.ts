// import type { Producto } from './producto'
// import type { Venta } from './venta'

// export interface Detallev {
//   id: number
//   idVenta: number
//   idProducto: number
//   cantidad: number
//   precioUnitario: number
//   subtotal: number
//   venta: Venta
//   producto: Producto
// }
// models/detalleVenta.ts
export interface DetalleVenta {
  id_producto: number
  cantidad: number
  precio_unitario: number
  subtotal: number
}
