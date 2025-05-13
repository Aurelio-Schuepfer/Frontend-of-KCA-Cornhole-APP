import { Component, OnInit } from '@angular/core';
import { GlobalAuth } from '../../global-auth';
@Component({
  selector: 'app-create-tournament',
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.scss'],
  standalone: false,
})
export class CreateTournamentComponent implements OnInit {
  isNavOpen: boolean = false;
  expandedId: number | null = null;
  username: string | null = null;
  
  tournament = {
    name: '',
    date: '',
    location: ''
  };

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
  onCreateTournament() {
    // Add your tournament creation logic here
    if (!this.tournament.name || !this.tournament.date || !this.tournament.location) {
      alert('Please fill all tournament fields!');
      return;
    }
    // Simulate successful creation
    alert('Tournament created successfully!');
    // Reset form if needed
    this.tournament = { name: '', date: '', location: '' };
  }
}

