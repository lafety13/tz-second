import {Component, EventEmitter, inject, Output} from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder} from '@angular/forms';
import {debounceTime, map} from 'rxjs';
import {NONE_OPTION, Option} from '../../../../shared/common.interfaces';
import {ProjectStatus} from '../../interfaces/card.interface';

@Component({
  selector: 'app-card-list-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './card-list-filter.component.html',
  styleUrl: './card-list-filter.component.scss'
})
export class CardListFilterComponent {
  private fb = inject(UntypedFormBuilder);
  form = this.fb.group({
    status: [NONE_OPTION],
    name: [''],
    owner: ['']
  });
  options: Option[] = [
    {
      id: NONE_OPTION,
      title: 'All',
    },
    {
      id: 'In Progress',
      title: 'In Progress',
    },
    {
      id: 'Completed',
      title: 'Completed',
    },
    {
      id: 'Postponed',
      title: 'Postponed',
    },
    {
      id: 'Pending',
      title: 'Pending',
    }
  ]
  @Output() filterOwner = this.form.get('owner')!.valueChanges.pipe(
    debounceTime(200),
  );
  @Output() filterName = this.form.get('name')!.valueChanges.pipe(
    debounceTime(200),
  );
  @Output() filterStatus = this.form.get('status')!.valueChanges.pipe(
    debounceTime(200),
    map((item: string) => {
      if (item === NONE_OPTION) {
        return null;
      }
      return item as ProjectStatus;
    })
  );
  @Output() reset = new EventEmitter();

  onResetFilter() {
    this.form.reset({
      status: [NONE_OPTION],
    });
    this.reset.emit();
  }
}
