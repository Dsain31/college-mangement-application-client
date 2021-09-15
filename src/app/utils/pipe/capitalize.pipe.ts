import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  /**
   * This pipe will return string with first character uppercase and remaining lowercase
   *
   * @param value:string
   */
  transform(value: string) {
    if (value) {
      return value.trim().charAt(0).toUpperCase() + value.trim().slice(1);
    }
    return value;
  }
}
