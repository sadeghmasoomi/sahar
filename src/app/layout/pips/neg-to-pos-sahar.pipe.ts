import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'negToPosSahar'
})
export class NegToPosSaharPipe implements PipeTransform {

  transform(val: number): number {
    return Math.abs(val);
  }

}
