import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'includesValue'})
export class IncludesValuePipe implements PipeTransform {
    transform(options: string[], value: string, caseMatch: boolean = false) {
        if (!value) {
            return options;
        }
        if (caseMatch) {
            return options.filter(option => option.includes(value));
        } else {
            return options.filter(option => option.toLowerCase().includes(value.toLowerCase()));
        }
    }
}
