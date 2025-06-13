import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private tournamentSubject = new BehaviorSubject<any | null>(null);
  tournament$ = this.tournamentSubject.asObservable();

  setTournament(tournament: any) {
    this.tournamentSubject.next(tournament);
  }

  clearTournament() {
    this.tournamentSubject.next(null);
  }

  get hasTournament(): boolean {
    return this.tournamentSubject.value !== null;
  }

  getTournament() {
    return this.tournamentSubject.value;
  }
}
