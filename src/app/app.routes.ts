import { Routes } from '@angular/router';
import {BoardComponent} from './board/list/components/board/board.component';
import {CreateProjectComponent} from './board/create/components/create-project/create-project.component';
import {ProjectDetailsComponent} from './board/details/components/project-details/project-details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'board',
    pathMatch: 'full'
  },
  {
    path: 'board',
    loadComponent: () => BoardComponent
  },
  {
    path: 'projects/:id',
    loadComponent: () => ProjectDetailsComponent
  }
];
