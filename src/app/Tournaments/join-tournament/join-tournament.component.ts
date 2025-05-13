import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-join-tournament',
  standalone: false,
  templateUrl: './join-tournament.component.html',
  styleUrl: './join-tournament.component.scss'
})
export class JoinTournamentComponent implements OnInit {
  isNavOpen: boolean = false;
  expandedId: number | null = null;
  isAuthModalOpen = false;
  authForm!: FormGroup;
  isRegisterMode = false;
  isLoggedIn = false;
  username: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.setInitialTheme();
    this.initForm();
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  initForm(): void {
    this.authForm = this.fb.group({
      username: ['', Validators.required],
      email: [''],
      password: ['', Validators.required],
      confirmPassword: ['']
    });
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
  ];

  joinTournament(id: number) {
    // Logic to join tournament
  }

  toggleDetails(id: number) {
    this.expandedId = this.expandedId === id ? null : id;
  }

  openLoginModal(): void {
    this.isRegisterMode = false;
    this.isAuthModalOpen = true;
    this.updateValidators();
  }

  openRegisterModal(): void {
    this.isRegisterMode = true;
    this.isAuthModalOpen = true;
    this.updateValidators();
  }

  private updateValidators(): void {
    const emailControl = this.authForm.get('email');
    const confirmPasswordControl = this.authForm.get('confirmPassword');

    if (this.isRegisterMode) {
      emailControl?.setValidators([Validators.required, Validators.email]);
      confirmPasswordControl?.setValidators([Validators.required]);
    } else {
      emailControl?.clearValidators();
      confirmPasswordControl?.clearValidators();
    }

    emailControl?.updateValueAndValidity();
    confirmPasswordControl?.updateValueAndValidity();
  }

  toggleMode(event: Event): void {
    event.preventDefault();
    this.isRegisterMode = !this.isRegisterMode;
    this.updateValidators();
  }

  onSubmit(): void {
    if (this.authForm.invalid) return;

    const { password, confirmPassword } = this.authForm.value;

    if (this.isRegisterMode && password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (this.isRegisterMode) {
      this.authService.register(this.authForm.value).subscribe({
        next: (res) => {
          console.log('Register success:', res);
          alert('Account created successfully');
          this.username = res.username;
          this.closeModal();
        },
        error: (err) => {
          console.error('Register error:', err);
          alert('Registration failed');
        },
      });
    } else {
      this.authService.login(this.authForm.value).subscribe({
        next: (res) => {
          console.log('Login success:', res);
          localStorage.setItem('token', res.token);
          this.isLoggedIn = true;
          this.closeModal();
        },
        error: (err) => {
          console.error('Login error:', err);
          alert('Login failed');
        },
      });
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
  }
  closeModal(): void {
    this.isAuthModalOpen = false;
  }
}
