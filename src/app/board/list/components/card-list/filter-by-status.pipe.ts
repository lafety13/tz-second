import {Pipe, PipeTransform} from '@angular/core';
import {ProjectCard} from '../../interfaces/card.interface';
import {NONE_OPTION} from '../../../../shared/common.interfaces';

@Pipe({
  name: 'filterByStatus',
})
export class FilterByStatusPipe implements PipeTransform {
    transform(items: ProjectCard[], status: string) {
      if (status === NONE_OPTION) return items;
      return items.filter((project: ProjectCard) => project.status === status);
    }
}
