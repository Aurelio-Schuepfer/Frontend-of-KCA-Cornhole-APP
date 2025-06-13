import { Injectable } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { AuthModel } from './global-auth.model';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({ providedIn: 'root' })
export class GlobalAuth {
  public isRegisterMode = false;
  public isAuthModalOpen = false;
  public isLoggedIn = false;
  public username: string | null = null;
  public loginModel: AuthModel = { username: '', email: '', password: '', confirmPassword: '', rememberMe: false };
  errorMessage: string = '';
  infoMessage: string = '';
  profileImageUrl: string = localStorage.getItem('profileImageUrl') || 'assets/images/default-profile.png';
  rememberMe = false;

  resetRequested: boolean = false;
  resetEmail: string = '';

  constructor(private authService: AuthService) {
    this.isLoggedIn = !!localStorage.getItem('token');
    this.username = localStorage.getItem('username');
  }

  openLoginModal() {
    if (!this.isAuthModalOpen || this.isRegisterMode) {
      this.isRegisterMode = false;
      this.resetModel();
    }
    this.isAuthModalOpen = true;
  }

  openRegisterModal() {
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
      this.errorMessage = 'Every field is required';
      return;
    }
    if (this.isRegisterMode && this.loginModel.password !== this.loginModel.confirmPassword) {
      this.errorMessage = 'Passwords dont match';
      return;
    }
    if (this.isRegisterMode) {
      this.authService.register(this.loginModel).subscribe({
        next: (res) => {
          this.errorMessage = '';
          if (res.requiresEmailConfirmation) {
            this.infoMessage = 'Bitte bestätige deine E-Mail-Adresse. Du hast eine Bestätigungsmail erhalten.';
          } else {
            this.infoMessage = 'Registrierung erfolgreich!';
          }
          if (successCallback) successCallback();
        },
        error: err => {
          this.infoMessage = '';
          switch (err?.error?.error) {
            case 'USERNAME_TAKEN':
              this.errorMessage = 'Der Benutzername ist bereits vergeben.';
              break;
            case 'EMAIL_TAKEN':
              this.errorMessage = 'Die E-Mail-Adresse ist bereits vergeben.';
              break;
            case 'WEAK_PASSWORD':
              this.errorMessage = 'Das Passwort erfüllt nicht die Anforderungen.';
              break;
            default:
              this.errorMessage = 'Registrierung fehlgeschlagen. Bitte überprüfe deine Eingaben.';
          }
          if (errorCallback) errorCallback();
        }
      });
    } else {
      this.authService.login(this.loginModel).subscribe({
        next: (res) => {
          const token = res.token;
          if (this.loginModel.rememberMe) {
            localStorage.setItem('token', token);
            this.rememberMe = true;
          } else {
            sessionStorage.setItem('token', token);
            localStorage.removeItem('token');
          }
          this.isLoggedIn = true;

          let username = '';
          try {
            const decoded: any = jwtDecode(token);
            username = decoded['unique_name'] || decoded['name'] || decoded['sub'] || '';
          } catch (e) {
            username = '';
          }
          this.username = username;
          localStorage.setItem('username', username);

          this.isAuthModalOpen = false;
          this.errorMessage = '';
          this.infoMessage = '';
          if (successCallback) successCallback();
        },
        error: () => {
          this.infoMessage = '';
          this.errorMessage = 'Login fehlgeschlagen. Bitte überprüfe deine Eingaben.';
          if (errorCallback) errorCallback();
        }
      });
    }
  }

  logout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    localStorage.removeItem('username');
    this.isLoggedIn = false;
    this.username = null;
  }

  resetModel() {
    this.loginModel = { username: '', email: '', password: '', confirmPassword: '', rememberMe: false };
    this.errorMessage = '';
    this.infoMessage = '';
  }

  closeModal() {
    this.isAuthModalOpen = false;
    this.errorMessage = '';
    this.infoMessage = '';
  }

  requestReset() {
    if (!this.resetEmail) {
      this.errorMessage = "Noch ändern";
      return;
    }
    this.authService.requestPasswordReset(this.resetEmail).subscribe({
      next: () => {
        this.errorMessage = '';
        this.resetRequested = true;
        this.infoMessage = "Password Reset Succesful";
      },
      error: () => {
        this.errorMessage = "Password Reset Failed";
        this.resetRequested = false;
      }
    });
  }
}