import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateType'
})
export class DateTypePipe implements PipeTransform {
  transform(value: string): string {
    if (!value || value === '        ' || value === '' || !value || value === '0       ') {
      return ' ';
    } else if (!value.length || value.length !== 8) {
      return value;
    }
    let year = '';
    let month = '';
    let day = '';
    const date = value;
    if (date.slice(0, 4) ) {
      year = date.slice(0, 4) + '/';
    }
    if (date.slice(4, 6)) {
      month = date.slice(4, 6) + '/';
    }
    if (date.slice(6, 8)) {
      day = date.slice(6, 8);
    }
    return year + month + day;
  }

}
