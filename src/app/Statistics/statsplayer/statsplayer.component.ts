import { Component, OnInit } from '@angular/core';
import { GlobalAuth } from '../../global-auth';

@Component({
  selector: 'app-statsplayer',
  standalone: false,
  templateUrl: './statsplayer.component.html',
  styleUrls: ['./statsplayer.component.scss'],
})
export class StatsplayerComponent implements OnInit {
  isNavOpen: boolean = false;
  expandedId: number | null = null;
  searchTerm: string = ''; 
  selectedPlayer: any = null; 

  players = [
    { name: 'Lena Schmidt', wins: 12, losses: 3, matchesPlayed: 15, points: 265, image: 'https://randomuser.me/api/portraits/women/68.jpg' },
    { name: 'Tom Wagner', wins: 8, losses: 7, matchesPlayed: 15, points: 198, image: 'https://randomuser.me/api/portraits/men/45.jpg' },
    { name: 'Julia Becker', wins: 15, losses: 0, matchesPlayed: 15, points: 300, image: 'https://randomuser.me/api/portraits/women/32.jpg' },
    { name: 'Kevin Braun', wins: 5, losses: 10, matchesPlayed: 15, points: 145, image: 'https://randomuser.me/api/portraits/men/12.jpg' },
    { name: 'Sarah Neumann', wins: 10, losses: 5, matchesPlayed: 15, points: 220 },
    { name: 'Chris Müller', wins: 7, losses: 8, matchesPlayed: 15, points: 174, image: 'https://randomuser.me/api/portraits/men/27.jpg' }
  ];

  filteredPlayers: any[] = this.players;
  constructor(public globalAuth: GlobalAuth) {}

  ngOnInit(): void {
    this.setInitialTheme();
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

  onSearch(): void {
    const lowerSearchTerm = this.searchTerm.trim().toLowerCase(); // Entfernt Leerzeichen und macht den Suchbegriff klein
    if (!lowerSearchTerm) {
      this.filteredPlayers = this.players; // Wenn nichts eingegeben wird, alle anzeigen
      this.selectedPlayer = null; // Kein Spieler ausgewählt
    } else {
      // Filtert die Spieler basierend auf dem Suchbegriff
      this.filteredPlayers = this.players.filter(player => player.name.toLowerCase().includes(lowerSearchTerm));
      // Wenn der Spieler gefunden wird, setze ihn als 'selectedPlayer'
      this.selectedPlayer = this.filteredPlayers[0]; // Der erste gefundene Spieler wird hervorgehoben
    }
  }
}
