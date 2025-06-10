import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './clientes/clientes.module';
import { IngredientesModule } from './ingredientes/ingredientes.module';
import { ProductosModule } from './productos/productos.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { VentasModule } from './ventas/ventas.module';
import { DetalleVentaModule } from './detalle_venta/detalle_venta.module';
import { ProductosIngredientesModule } from './productos_ingredientes/productos_ingredientes.module';
import { ProveedoresIngredientesModule } from './proveedores_ingredientes/proveedores_ingredientes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '*/**/entities/*.{ts|js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ClientesModule,
    IngredientesModule,
    ProductosModule,
    ProveedoresModule,
    UsuariosModule,
    VentasModule,
    DetalleVentaModule,
    ProductosIngredientesModule,
    ProveedoresIngredientesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
