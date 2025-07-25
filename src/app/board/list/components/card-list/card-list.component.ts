import {Component, inject, Input} from '@angular/core';
import {ProjectCard, ProjectStatus} from '../../interfaces/card.interface';
import {CardComponent} from '../card/card.component';
import {Router} from '@angular/router';
import {FilterByStatusPipe} from './filter-by-status.pipe';

@Component({
  selector: 'app-card-list',
  imports: [CardComponent, FilterByStatusPipe],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {
  @Input() cards!: ProjectCard[];
  statuses = Object.values(ProjectStatus);
  private router = inject(Router);

  onCardClick(card: ProjectCard) {
    this.router.navigate(['/projects', card.id]);
  }
}
