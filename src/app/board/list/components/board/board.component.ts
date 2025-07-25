import {Component, inject, OnInit} from '@angular/core';
import {CardsStateService} from '../../services/cards-state.service';
import {CardListComponent} from '../card-list/card-list.component';
import {CardListFilterComponent} from '../card-list-filter/card-list-filter.component';
import {ProjectStatus} from '../../interfaces/card.interface';
import {BoardToolbarComponent} from '../board-toolbar/board-toolbar.component';
import {CreateProjectComponent} from '../../../create/components/create-project/create-project.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogRef} from '@angular/cdk/dialog';

@Component({
  selector: 'app-board',
  imports: [CardListComponent, CardListFilterComponent, BoardToolbarComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  providers: [CardsStateService],
})
export class BoardComponent implements OnInit {
  private cardsStateService = inject(CardsStateService);
  private dialog = inject(MatDialog);
  cards = this.cardsStateService.cards;

  ngOnInit() {
    this.cardsStateService.load();
  }

  onFilterStatus(query: ProjectStatus | null) {
    this.cardsStateService.filterByStatus(query);
  }
  onFilterName(query: string) {
    this.cardsStateService.filterByName(query);
  }
  onFilterOwner(query: string) {
    this.cardsStateService.filterByOwner(query);
  }
  onResetFilter() {
    this.cardsStateService.resetFilter();
  }

  onCreateProject() {
    this.dialog.open(CreateProjectComponent, {
      data: {
        onSave: (data: any, ref: DialogRef) => {
          this.cardsStateService.create(data);
          ref.close();
        }
      }
    });
  }
}
