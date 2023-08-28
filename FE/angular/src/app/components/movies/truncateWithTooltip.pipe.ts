import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateWithTooltip'
})
export class TruncateWithTooltipPipe implements PipeTransform {
  transform(value: string, maxLength: number): string {
    if (value.length <= maxLength) {
      return value;
    } else {
      const truncatedValue = value.slice(0, maxLength) + '...';
      return `<span title="${value}">${truncatedValue}</span>`;
    }
  }
}