import { Component, OnInit } from '@angular/core';
import { GlobalAuth } from '../../global-auth';
@Component({
  selector: 'app-statssite',
  standalone: false,
  templateUrl: './statssite.component.html',
  styleUrl: './statssite.component.scss'
})
export class StatssiteComponent {
  isNavOpen: boolean = false;
  expandedId: number | null = null;
  username: string | null = null;

  constructor(public globalAuth: GlobalAuth) {}

  ngAfterViewInit() {
  const cards = document.querySelectorAll('.insight-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        (entry.target as HTMLElement).classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  cards.forEach(card => observer.observe(card));
}


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
  totalPlayers: number = 1204;
  totalTournaments: number = 312;
  matchesPlayed: number = 4578;
  topPlayer: string = 'Max Mustermann';
  avgParticipants: number = 18.4;
  trustedUsers: number = 1212452
}

