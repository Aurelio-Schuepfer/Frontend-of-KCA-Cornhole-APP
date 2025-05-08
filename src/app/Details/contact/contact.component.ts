import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
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