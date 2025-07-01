import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { DetalleVenta } from 'src/detalle_venta/entities/detalle_venta.entity';

@Entity('ventas')
export class Venta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date')
  fecha: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
  fechaEliminacion: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.ventas)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @ManyToOne(() => Cliente, (cliente) => cliente.ventas)
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @OneToMany(() => DetalleVenta, (detalle) => detalle.venta, { cascade: true })
  detalleVenta: DetalleVenta[];
}
