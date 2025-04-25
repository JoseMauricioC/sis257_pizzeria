export class CreateProductoDto {
  readonly imagen_url?: string;
  readonly nombre: string;
  readonly descripcion: string;
  readonly precio: number;
  readonly stock: number;
}
