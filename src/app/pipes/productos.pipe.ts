import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productos'
})
export class ProductosPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
