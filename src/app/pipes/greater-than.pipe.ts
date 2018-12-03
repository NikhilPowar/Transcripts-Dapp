import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'greaterThan' })
export class GreaterThanPipe implements PipeTransform {
  transform(arr: number[], start: number) {
    return arr.filter(n => n >= start);
  }
}
