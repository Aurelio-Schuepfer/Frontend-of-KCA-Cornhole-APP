import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-statsplayer',
  standalone: false,
  templateUrl: './statsplayer.component.html',
  styleUrl: './statsplayer.component.scss',
})
export class StatsplayerComponent implements OnInit {
  isNavOpen: boolean = false;
  expandedId: number | null = null;
  isAuthModalOpen = false;
  authForm!: FormGroup;
  isRegisterMode = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.setInitialTheme();
    this.initForm();
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
  players = [
    {
      name: 'Lena Schmidt',
      wins: 12,
      losses: 3,
      matchesPlayed: 15,
      points: 265,
      image: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    {
      name: 'Tom Wagner',
      wins: 8,
      losses: 7,
      matchesPlayed: 15,
      points: 198,
      image: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    {
      name: 'Julia Becker',
      wins: 15,
      losses: 0,
      matchesPlayed: 15,
      points: 300,
      image: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    {
      name: 'Kevin Braun',
      wins: 5,
      losses: 10,
      matchesPlayed: 15,
      points: 145,
      image: 'https://randomuser.me/api/portraits/men/12.jpg'
    },
    {
      name: 'Sarah Neumann',
      wins: 10,
      losses: 5,
      matchesPlayed: 15,
      points: 220,
    },
    {
      name: 'Chris Müller',
      wins: 7,
      losses: 8,
      matchesPlayed: 15,
      points: 174,
      image: 'https://randomuser.me/api/portraits/men/27.jpg'
    }
  ];
  
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
      console.log('Registering user:', this.authForm.value);
    } else {
      console.log('Logging in user:', this.authForm.value);
    }
  }
  closeModal(): void {
    this.isAuthModalOpen = false;
  }
}
