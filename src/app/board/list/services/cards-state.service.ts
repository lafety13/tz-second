import {computed, inject, Injectable, signal} from '@angular/core';
import {ProjectCard, ProjectStatus} from '../interfaces/card.interface';
import {HttpClient} from '@angular/common/http';

export interface CardsState {
  cards: ProjectCard[];
  filteredCards: ProjectCard[];
}

const getDefaultState = () => ({
  cards: [],
  filteredCards: []
})

@Injectable()
export class CardsStateService {
  private state = signal<CardsState>(getDefaultState());
  private http = inject(HttpClient);
  cards = computed(() => this.state().filteredCards);

  load() {
    this.http.get<ProjectCard[]>('data.json').subscribe((cards: ProjectCard[]) => {
      this.state.set({ cards, filteredCards: cards });
    });
  }

  filterByStatus(status: ProjectStatus | null) {
    this.state.update((state: CardsState) => ({
      ...state,
      filteredCards: status ? state.cards.filter(filter => filter.status === status) : state.cards,
    }));
  }

  filterByName(name: string) {
    this.state.update((state: CardsState) => ({
      ...state,
      filteredCards: name ? state.cards.filter(filter => filter.owner.toLowerCase().includes(name?.toLowerCase())): state.cards,
    }));
  }

  filterByOwner(owner: string) {
    this.state.update((state: CardsState) => ({
      ...state,
      filteredCards: owner ? state.cards.filter(filter => filter.owner.toLowerCase().includes(owner?.toLowerCase())) : state.cards,
    }));
  }

  resetFilter() {
    this.state.update((state: CardsState) => ({
      ...state,
      filteredCards: state.cards
    }));
  }

  create(data: Omit<ProjectCard, 'id'>) {
    this.state.update((state: CardsState) => ({
      ...state,
      cards: [...state.cards, { id: String(state.cards.length + 1), ...data } as ProjectCard],
      filteredCards: [...state.cards, { id: String(state.cards.length + 1), ...data } as ProjectCard]
    }));
  }
}
