import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'default'
})
export class DefaultPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return 'Имя не определено';
    }
    return value;
  }

}
