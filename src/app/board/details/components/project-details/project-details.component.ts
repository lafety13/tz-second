import {Component, inject, OnInit} from '@angular/core';
import {DatePipe, NgClass, NgIf} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {DetailsProjectStateService} from '../../services/details-project-state.service';

@Component({
  selector: 'app-project-details',
  imports: [DatePipe, RouterLink, NgClass, NgIf],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private detailsProjectStateService = inject(DetailsProjectStateService);
  project = this.detailsProjectStateService.project;

  ngOnInit() {
    const currentId = this.route.snapshot.params['id'];
    this.detailsProjectStateService.loadById(currentId);
  }
}
