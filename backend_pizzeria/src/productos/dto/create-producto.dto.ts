import { ApiProperty } from '@nestjs/swagger';

export class CreateProductoDto {
  @ApiProperty()
  readonly imagen_url: string;
  @ApiProperty()
  readonly nombre: string;
  @ApiProperty()
  readonly descripcion: string;
  @ApiProperty()
  readonly precio: number;
  @ApiProperty()
  readonly stock: number;
}
