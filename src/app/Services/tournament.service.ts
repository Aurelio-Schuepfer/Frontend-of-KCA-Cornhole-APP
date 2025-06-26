import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tournament } from '../tournament.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TournamentService {
  private tournamentSubject = new BehaviorSubject<Tournament | null>(null);
  tournament$ = this.tournamentSubject.asObservable();
  private apiUrl = 'http://localhost:5245/api/tournaments'; 

  constructor(private http: HttpClient) {}

  setTournament(t: Tournament) {
    this.tournamentSubject.next(t);
  }

  getTournament(): Tournament | null {
    return this.tournamentSubject.value;
  }

  createTournament(t: Tournament): Observable<Tournament> {
    return this.http.post<Tournament>(this.apiUrl, t);
  }

  getTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.apiUrl);
  }

  getTournamentById(id: number): Observable<Tournament> {
    return this.http.get<Tournament>(`${this.apiUrl}/${id}`);
  }

  updateTournament(id: number, t: Tournament): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, t);
  }

  deleteTournament(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
