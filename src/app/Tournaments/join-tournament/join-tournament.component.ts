import { Component, OnInit } from '@angular/core';
import { GlobalAuth } from '../../global-auth';

@Component({
  selector: 'app-join-tournament',
  standalone: false,
  templateUrl: './join-tournament.component.html',
  styleUrl: './join-tournament.component.scss'
})
export class JoinTournamentComponent implements OnInit {
  isNavOpen: boolean = false;
  expandedId: number | null = null;
  username: string | null = null;
  selectedTournamentId: number | null = null;
  selectedTournament: any = null;
  detailsModalVisible: boolean = false;
  joinStatus: string = "join";

  constructor(public globalAuth: GlobalAuth) {}

  ngOnInit(): void {
    this.setInitialTheme();
    this.loadJoinedTournaments();
  }

  toggleTheme() {
    const body = document.body;
    const theme = body.classList.contains('light-mode') ? 'dark' : 'light';
    body.classList.toggle('light-mode');
    localStorage.setItem('theme', theme);

    if (theme === 'light') {
      body.classList.add('light-mode');
    } else {
      body.classList.remove('light-mode');
    }
  }

  setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
    }
  }

  toggleNav(): void {
    this.isNavOpen = !this.isNavOpen;
  }

  tournaments = [
    {
      id: 1,
      name: 'Spring Clash',
      date: '2025-05-20',
      location: 'Berlin',
      meetingPoint: 'Alexanderplatz',
      maxTeams: 16,
      currentTeams: 10,
      rules: 'Standard Cornhole rules apply.',
      notes: 'Bring your own bags.'
    },
    {
      id: 2,
      name: 'Summer Showdown',
      date: '2025-06-15',
      location: 'Hamburg',
      meetingPoint: 'Hauptbahnhof',
      maxTeams: 20,
      currentTeams: 19,
      rules: 'Double elimination format.',
      notes: 'Snacks will be provided.'
    },
    {
      id: 3,
      name: 'Spring Clash',
      date: '2025-05-20',
      location: 'Berlin',
      meetingPoint: 'Alexanderplatz',
      maxTeams: 16,
      currentTeams: 10,
      rules: 'Standard Cornhole rules apply.',
      notes: 'Bring your own bags.'
    },
    {
      id: 4,
      name: 'Summer Showdown',
      date: '2025-06-15',
      location: 'Hamburg',
      meetingPoint: 'Hauptbahnhof',
      maxTeams: 20,
      currentTeams: 19,
      rules: 'Double elimination format.',
      notes: 'Snacks will be provided.'
    },
  ];

  joinTournament(tournamentId: number, currentTeams: number, maxTeams: number) {
    let joinedTournaments = this.getJoinedTournaments();

    if (joinedTournaments.includes(tournamentId)) {
      joinedTournaments = joinedTournaments.filter(id => id !== tournamentId);
      localStorage.setItem('joinedTournaments', JSON.stringify(joinedTournaments));
      alert("You left the tournament");
    } else if (currentTeams < maxTeams) {
      joinedTournaments.push(tournamentId);
      localStorage.setItem('joinedTournaments', JSON.stringify(joinedTournaments));
      alert("Successfully joined tournament");
    } else {
      alert("The tournament is full");
    }

    this.loadJoinedTournaments();
  }

  openDetails(tournamentId: number): void {
    const found = this.tournaments.find(t => t.id === tournamentId);
    if (found) {
      this.selectedTournamentId = tournamentId;
      this.selectedTournament = found;
      this.detailsModalVisible = true;
    }
  }

  closeDetails(): void {
    this.detailsModalVisible = false;
    this.selectedTournament = null;
  }

  isTournamentJoined(tournamentId: number): boolean {
  const joinedTournaments = this.getJoinedTournaments();
  return joinedTournaments.includes(tournamentId);
}


  private loadJoinedTournaments(): void {
    const joinedTournaments = this.getJoinedTournaments();
    this.selectedTournamentId = joinedTournaments.length > 0 ? joinedTournaments[0] : null;
  }

  private getJoinedTournaments(): number[] {
    const joinedTournaments = localStorage.getItem('joinedTournaments');
    return joinedTournaments ? JSON.parse(joinedTournaments) : [];
  }
}
