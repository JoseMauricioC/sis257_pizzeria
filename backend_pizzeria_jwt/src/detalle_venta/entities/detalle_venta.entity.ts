import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Venta } from 'src/ventas/entities/venta.entity';
import { Producto } from 'src/productos/entities/producto.entity';

@Entity('detalle_venta')
export class DetalleVenta {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Venta, (venta) => venta.detalleVenta, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_venta' })
  venta: Venta;

  @ManyToOne(() => Producto, (producto) => producto.detalleVenta)
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;

  @Column()
  cantidad: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precioUnitario: number;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;
}
