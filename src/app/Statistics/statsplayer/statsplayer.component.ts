import { Component, OnInit } from '@angular/core';
import { GlobalAuth } from '../../global-auth';
import { UserProfileService } from '../../user-profile.service'; 
import { Router } from '@angular/router';
type LanguageCode = 'de' | 'en' | 'fr' | 'es';

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
    { name: 'Sarah Neumann', wins: 10, losses: 5, matchesPlayed: 15, points: 220,},
    { name: 'Chris Müller', wins: 7, losses: 8, matchesPlayed: 15, points: 174, image: 'https://randomuser.me/api/portraits/men/27.jpg' }
  ];

  filteredPlayers: any[] = this.players;

  languages = [
    { code: 'de' as LanguageCode, label: 'Deutsch' },
    { code: 'en' as LanguageCode, label: 'English' },
    { code: 'fr' as LanguageCode, label: 'Français' },
    { code: 'es' as LanguageCode, label: 'Español' }
  ];

  selectedLang: LanguageCode = 'en';
  langDropdownOpen = false;

  translations: Record<LanguageCode, any> = {
    de: {
      home: 'Home',
      joinTournament: 'Turnier beitreten',
      createTournament: 'Turnier erstellen',
      statistics: 'Statistiken',
      about: 'Über',
      logout: 'Logout',
      login: 'Login',
      register: 'Registrieren',
      username: 'Benutzername',
      usernameOrEmail: 'Benutzername / E-Mail',
      email: 'E-Mail',
      password: 'Passwort',
      confirmPassword: 'Passwort wiederholen',
      createAccount: 'Account erstellen',
      alreadyAccount: 'Schon registriert? Hier einloggen',
      noAccount: 'Kein Account? Hier registrieren',
      statsPlayerTitle: 'Spielerstatistiken',
      searchPlaceholder: 'Nach Spielern suchen',
      wins: 'Siege',
      losses: 'Niederlagen',
      matchesPlayed: 'Spiele',
      points: 'Punkte',
      privacyPolicy: 'Datenschutz',
      termsOfService: 'Nutzungsbedingungen',
      contact: 'Kontakt',
      rememberMe: 'Angemeldet bleiben',
      passwordReset: 'Passwort vergessen?',
      resetEmailLabel: 'E-Mail für Passwort-Reset',
      resetSend: 'Reset-Link senden',
      resetBack: 'Zurück',
      resetSuccess: 'Bitte prüfe dein E-Mail-Postfach!',
      passwordChange: 'Passwort ändern',
      newPassword: 'Neues Passwort',
      save: 'Speichern',
      cancel: 'Abbrechen',
      passwordChanged: 'Passwort geändert!',
    },
    en: {
      home: 'Home',
      joinTournament: 'Join Tournament',
      createTournament: 'Create Tournament',
      statistics: 'Statistics',
      about: 'About',
      logout: 'Logout',
      login: 'Login',
      register: 'Register',
      username: 'Username',
      usernameOrEmail: 'Username / Email',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      createAccount: 'Create Account',
      alreadyAccount: 'Already have an account? Login here',
      noAccount: 'No account? Register here',
      statsPlayerTitle: 'Player Statistics',
      searchPlaceholder: 'Search for players',
      wins: 'Wins',
      losses: 'Losses',
      matchesPlayed: 'Matches Played',
      points: 'Total Points',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      contact: 'Contact',
      rememberMe: 'Remember Me',
      passwordReset: 'Forgot password?',
      resetEmailLabel: 'Email for password reset',
      resetSend: 'Send reset link',
      resetBack: 'Back',
      resetSuccess: 'Please check your email inbox!',
      passwordChange: 'Change password',
      newPassword: 'New password',
      save: 'Save',
      cancel: 'Cancel',
      passwordChanged: 'Password changed!',
    },
    fr: {
      home: 'Accueil',
      joinTournament: 'Rejoindre un tournoi',
      createTournament: 'Créer un tournoi',
      statistics: 'Statistiques',
      about: 'À propos',
      logout: 'Déconnexion',
      login: 'Connexion',
      register: 'S’inscrire',
      username: 'Nom d’utilisateur',
      usernameOrEmail: 'Nom d’utilisateur / E-mail',
      email: 'E-mail',
      password: 'Mot de passe',
      confirmPassword: 'Répéter le mot de passe',
      createAccount: 'Créer un compte',
      alreadyAccount: 'Déjà inscrit ? Se connecter ici',
      noAccount: 'Pas de compte ? S’inscrire ici',
      statsPlayerTitle: 'Statistiques du joueur',
      searchPlaceholder: 'Rechercher des joueurs',
      wins: 'Victoires',
      losses: 'Défaites',
      matchesPlayed: 'Matchs joués',
      points: 'Points',
      privacyPolicy: 'Politique de confidentialité',
      termsOfService: 'Conditions d\'utilisation',
      contact: 'Contact',
      rememberMe: 'Se souvenir de moi',
      passwordReset: 'Mot de passe oublié ?',
      resetEmailLabel: 'E-mail pour réinitialiser le mot de passe',
      resetSend: 'Envoyer le lien',
      resetBack: 'Retour',
      resetSuccess: 'Veuillez vérifier votre boîte mail !',
      passwordChange: 'Changer le mot de passe',
      newPassword: 'Nouveau mot de passe',
      save: 'Enregistrer',
      cancel: 'Annuler',
      passwordChanged: 'Mot de passe changé !',
    },
    es: {
      home: 'Inicio',
      joinTournament: 'Unirse a un torneo',
      createTournament: 'Crear torneo',
      statistics: 'Estadísticas',
      about: 'Acerca de',
      logout: 'Cerrar sesión',
      login: 'Iniciar sesión',
      register: 'Registrarse',
      username: 'Nombre de usuario',
      usernameOrEmail: 'Nombre de usuario / Correo',
      email: 'Correo electrónico',
      password: 'Contraseña',
      confirmPassword: 'Repetir contraseña',
      createAccount: 'Crear cuenta',
      alreadyAccount: '¿Ya tienes cuenta? Inicia sesión aquí',
      noAccount: '¿No tienes cuenta? Regístrate aquí',
      statsPlayerTitle: 'Estadísticas del jugador',
      searchPlaceholder: 'Buscar jugadores',
      wins: 'Victorias',
      losses: 'Derrotas',
      matchesPlayed: 'Partidos jugados',
      points: 'Puntos',
      privacyPolicy: 'Política de privacidad',
      termsOfService: 'Términos de servicio',
      contact: 'Contacto',
      rememberMe: 'Recuérdame',
      passwordReset: 'Olvidaste tu contraseña?',
      resetEmailLabel: 'Correo electrónico para restablecer la contraseña',
      resetSend: 'Enviar enlace',
      resetBack: 'Atrás',
      resetSuccess: '¡Por favor revisa tu correo!',
      passwordChange: 'Cambiar contraseña',
      newPassword: 'Nueva contraseña',
      save: 'Guardar',
      cancel: 'Cancelar',
      passwordChanged: 'Contraseña cambiada!',
    }
  };

  t = this.translations[this.selectedLang];
 userProfile: any = null;
  isProfileLoading = false;

  showResetForm = false;
  resetEmail = '';
  resetRequested = false;

  constructor(
    public globalAuth: GlobalAuth,
    private userProfileService: UserProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Set default image for players without an image
    this.players = this.players.map(player => ({
      ...player,
      image: player.image || 'assets/images/default-profile.png'
    }));
    this.filteredPlayers = this.players;

    this.setInitialTheme();
    const saved = localStorage.getItem('lang');
    if (saved && ['de', 'en', 'fr', 'es'].includes(saved)) {
      this.selectedLang = saved as LanguageCode;
    }
    this.applyTranslations();  
      this.loadUserProfile(); 
  }

  // Profil laden
  loadUserProfile() {
    this.isProfileLoading = true;
    this.userProfileService.getProfile().subscribe({
      next: data => {
        this.userProfile = data;
        this.isProfileLoading = false;
      },
      error: () => {
        this.isProfileLoading = false;
      }
    });
  }

  // Profil speichern (z.B. nach Bearbeitung)
  saveUserProfile(updated: { name: string; email: string; image?: File }) {
    this.isProfileLoading = true;
    this.userProfileService.updateProfile(updated).subscribe({
      next: data => {
        this.userProfile = data;
        this.isProfileLoading = false;
        alert('Profil saved!');
      },
      error: () => {
        this.isProfileLoading = false;
        alert('Error Saving!');
      }
    });
  }

   goToProfile() {
    this.router.navigate(['/profile']);
  }

  requestReset() {
    if (!this.resetEmail) return;
    this.userProfileService.requestPasswordReset(this.resetEmail).subscribe({
      next: () => {
        this.resetRequested = true;
      },
      error: () => {
        alert('Error sending the request link please check the Email');
      }
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

  get isDarkMode(): boolean {
    return !document.body.classList.contains('light-mode');
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
  toggleLangDropdown() {
    this.langDropdownOpen = !this.langDropdownOpen;
  }

  setLang(code: string) {
    if (['de', 'en', 'fr', 'es'].includes(code)) {
      this.selectedLang = code as LanguageCode;
      this.langDropdownOpen = false;
      localStorage.setItem('lang', code);
      this.applyTranslations();
    }
  }

  getFlagUrl(lang: string): string {
  switch (lang) {
    case 'de': return 'https://flagcdn.com/w40/de.png';
    case 'en': return 'https://flagcdn.com/w40/gb.png';
    case 'fr': return 'https://flagcdn.com/w40/fr.png';
    case 'es': return 'https://flagcdn.com/w40/es.png';
    default: return '';
}
}

  applyTranslations() {
    this.t = this.translations[this.selectedLang];
  }
}
