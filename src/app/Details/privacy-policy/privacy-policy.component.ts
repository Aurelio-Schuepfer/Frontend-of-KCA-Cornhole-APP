import { Component, OnInit } from '@angular/core';
import { GlobalAuth } from '../../global-auth';
@Component({
  selector: 'app-privacy-policy',
  standalone: false,
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {
  websiteName = 'Cornhole App';
  effectiveDate = 'May 7, 2025';
  contactEmail = 'support@cornholeapp.com';
  contactPhone = '(123) 456-7890';
  contactAddress = '123 Cornhole Street, Cornhole City, CO 12345';

  isNavOpen: boolean = false;
  expandedId: number | null = null;
  username: string | null = null;

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
}
