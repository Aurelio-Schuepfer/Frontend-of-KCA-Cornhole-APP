import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AuthModel } from './global-auth.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GlobalAuth {
  public isRegisterMode = false;
  public isAuthModalOpen = false;
  public isLoggedIn = false;
  public username: string | null = null;
  public loginModel: AuthModel = { username: '', email: '', password: '', confirmPassword: '' };

  constructor(private authService: AuthService) {
    this.isLoggedIn = !!localStorage.getItem('token');
    this.username = localStorage.getItem('username');
  }

  openLoginModal() {
    // Nur zurücksetzen, wenn Modal geschlossen ist oder im Register-Modus
    if (!this.isAuthModalOpen || this.isRegisterMode) {
      this.isRegisterMode = false;
      this.resetModel();
    }
    this.isAuthModalOpen = true;
  }

  openRegisterModal() {
    // Nur zurücksetzen, wenn Modal geschlossen ist oder im Login-Modus
    if (!this.isAuthModalOpen || !this.isRegisterMode) {
      this.isRegisterMode = true;
      this.resetModel();
    }
    this.isAuthModalOpen = true;
  }

  toggleMode(event: Event) {
    event.preventDefault();
    this.isRegisterMode = !this.isRegisterMode;
    this.resetModel();
  }

  onSubmit(successCallback?: () => void, errorCallback?: () => void) {
    if (!this.loginModel.username || !this.loginModel.password ||
      (this.isRegisterMode && (!this.loginModel.email || !this.loginModel.confirmPassword))) {
      alert('Bitte alle Felder ausfüllen');
      return;
    }
    if (this.isRegisterMode && this.loginModel.password !== this.loginModel.confirmPassword) {
      alert('Passwörter stimmen nicht überein');
      return;
    }
    if (this.isRegisterMode) {
      this.authService.register(this.loginModel).subscribe({
        next: (res) => {
          alert('Account erfolgreich erstellt');
          this.username = res.username;
          this.isLoggedIn = true;
          localStorage.setItem('username', res.username);
          this.isAuthModalOpen = false;
          if (successCallback) successCallback();
        },
        error: () => {
          alert('Registrierung fehlgeschlagen');
          if (errorCallback) errorCallback();
        }
      });
    } else {
      this.authService.login(this.loginModel).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this.isLoggedIn = true;
          this.username = res.username;
          localStorage.setItem('username', res.username);
          this.isAuthModalOpen = false;
          if (successCallback) successCallback();
        },
        error: () => {
          alert('Login fehlgeschlagen');
          if (errorCallback) errorCallback();
        }
      });
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.isLoggedIn = false;
    this.username = null;
  }

  resetModel() {
    this.loginModel = { username: '', email: '', password: '', confirmPassword: '' };
  }

  closeModal() {
    this.isAuthModalOpen = false;
  }
}