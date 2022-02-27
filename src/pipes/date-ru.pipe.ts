import { Pipe, PipeTransform } from '@angular/core';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

@Pipe({
    name: 'DateRu'
})
export class DateRuPipe implements PipeTransform {
    transform(field: NgbDate): string {
        if (!field) {
            return field;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        let day = field?.day ?? '00';
        let month = field?.month ?? '00';
        let year = field?.year ?? '00';

        return `${day}.${month}.${year}`;
    }
}