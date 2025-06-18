import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tournament } from '../tournament.interface';

@Injectable({ providedIn: 'root' })
export class TournamentService {
  private tournamentSubject = new BehaviorSubject<Tournament | null>(null);
  tournament$ = this.tournamentSubject.asObservable();

  setTournament(t: Tournament) {
    this.tournamentSubject.next(t);
    const all = JSON.parse(localStorage.getItem('tournaments') || '[]');
    const idx = all.findIndex((x: any) => x.id === t.id);
    if (idx >= 0) all[idx] = t;
    else all.push(t);
    localStorage.setItem('tournaments', JSON.stringify(all));
  }

  getTournament(): Tournament | null {
    return this.tournamentSubject.value;
  }

  loadFromStorage(id: string) {
    const all = JSON.parse(localStorage.getItem('tournaments') || '[]');
    const found = all.find((t: any) => t.id === id);
    if (found) this.tournamentSubject.next(found);
  }
}
