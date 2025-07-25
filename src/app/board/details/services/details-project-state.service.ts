import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProjectCard} from '../../list/interfaces/card.interface';

export interface DetailsProjectState {
  project: ProjectCard | null;
}

@Injectable({ providedIn: 'root' })
export class DetailsProjectStateService {
  private http = inject(HttpClient);
  private state = signal<DetailsProjectState>({ project: null });
  project = computed(() => this.state().project);

  loadById(currentId: string) {
    this.http.get<ProjectCard[]>('data.json').subscribe((res: ProjectCard[]) => {
      const project = res.find(({ id }) => id === currentId);
      this.state.update((state: DetailsProjectState) => ({
        ...state,
        project: project || null
      }))
    })
  }
}
