import { Component, OnInit } from '@angular/core';
import { GlobalAuth } from '../../global-auth';
import { UserProfileService } from '../../user-profile.service'; 
import { Router } from '@angular/router';
type LanguageCode = 'de' | 'en' | 'fr' | 'es';

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
  isCreateTournamentStart: boolean = true;

  tournament = {
    name: '',
    date: '',
    location: '',
    teams: '',
    notes: '',
    private: '',
    format: '',
  };

  languages = [
    { code: 'de' as LanguageCode, label: 'Deutsch' },
    { code: 'en' as LanguageCode, label: 'English' },
    { code: 'fr' as LanguageCode, label: 'Français' },
    { code: 'es' as LanguageCode, label: 'Español' }
  ];

  groups = [
  { name: 'Gruppe A', teams: [{ name: 'Team Rocket' }, { name: 'Team X' }] },
  { name: 'Gruppe B', teams: [{ name: 'Team Y' }, { name: 'Team Z' }] }
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
      tournamentTitle: 'Turnier erstellen',
      name: 'Name',
      nameInfo: 'Gib den Namen deines Turniers ein.',
      date: 'Datum',
      dateInfo: 'Wähle das Datum, an dem das Turnier stattfindet.',
      location: 'Ort',
      locationInfo: 'Gib den Ort an, an dem das Turnier stattfindet.',
      teams: 'Teams (optional)',
      teamsInfo: 'Anzahl der Teams, die teilnehmen können.',
      notes: 'Notizen (optional)',
      notesInfo: 'Füge zusätzliche Informationen oder Regeln für das Turnier hinzu.',
      privateTournament: 'Privates Turnier',
      privateInfo: '<strong>Privat:</strong> Nur eingeladene Personen können teilnehmen, nicht öffentlich gelistet.<br><strong>Öffentlich:</strong> Turnier ist öffentlich gelistet und jeder kann teilnehmen.',
      createTournamentBtn: 'Turnier erstellen',
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
      loginToJoin: 'Melde dich an, um ein Turnier zu erstellen',
      tournamentFormat: 'Format',
      tournamentFormatInfo: 'Solo: Nur Einzelspieler. Duo: Zwei Spieler pro Team.',
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
      tournamentTitle: 'Create a Tournament',
      name: 'Name',
      nameInfo: 'Enter the name of your tournament.',
      date: 'Date',
      dateInfo: 'Select the date when the tournament will take place.',
      location: 'Location',
      locationInfo: 'Enter the location where the tournament will be held.',
      teams: 'Teams (optional)',
      teamsInfo: 'Number of teams that can participate in this tournament.',
      notes: 'Notes (optional)',
      notesInfo: 'Add any additional information or rules for the tournament.',
      privateTournament: 'Private Tournament',
      privateInfo: '<strong>Private:</strong> Only invited people can join, not listed globally.<br><strong>Public:</strong> Tournament is listed globally and everyone can join.',
      createTournamentBtn: 'Create Tournament',
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
      loginToJoin: 'Log in to create a tournament',
      tournamentFormat: 'Format',
      tournamentFormatInfo: 'Solo: A tournament for individuals. Duo: Two players per team.',
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
      tournamentTitle: 'Créer un tournoi',
      name: 'Nom',
      nameInfo: 'Entrez le nom de votre tournoi.',
      date: 'Date',
      dateInfo: 'Sélectionnez la date du tournoi.',
      location: 'Lieu',
      locationInfo: 'Entrez le lieu où se déroulera le tournoi.',
      teams: 'Équipes (optionnel)',
      teamsInfo: 'Nombre d\'équipes pouvant participer à ce tournoi.',
      notes: 'Notes (optionnel)',
      notesInfo: 'Ajoutez des informations ou règles supplémentaires pour le tournoi.',
      privateTournament: 'Tournoi privé',
      privateInfo: '<strong>Privé :</strong> Seules les personnes invitées peuvent participer, non listé publiquement.<br><strong>Public :</strong> Le tournoi est listé publiquement et tout le monde peut participer.',
      createTournamentBtn: 'Créer le tournoi',
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
      loginToJoin: 'Connecte-toi pour créer un tournoi',
      tournamentFormat: 'Format',
      tournamentFormatInfo: 'Solo : Joueurs seuls. Duo : Deux joueurs par équipe.',
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
      tournamentTitle: 'Crear un torneo',
      name: 'Nombre',
      nameInfo: 'Introduce el nombre de tu torneo.',
      date: 'Fecha',
      dateInfo: 'Selecciona la fecha en la que se celebrará el torneo.',
      location: 'Ubicación',
      locationInfo: 'Introduce la ubicación donde se celebrará el torneo.',
      teams: 'Equipos (opcional)',
      teamsInfo: 'Número de equipos que pueden participar en este torneo.',
      notes: 'Notas (opcional)',
      notesInfo: 'Agrega información adicional o reglas para el torneo.',
      privateTournament: 'Torneo privado',
      privateInfo: '<strong>Privado:</strong> Solo personas invitadas pueden unirse, no aparece globalmente.<br><strong>Público:</strong> El torneo aparece globalmente y cualquiera puede unirse.',
      createTournamentBtn: 'Crear torneo',
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
      loginToJoin: 'Inicia sesión para crear un torneo',
      tournamentFormat: 'Formato',
      tournamentFormatInfo: 'Solo: Solo jugadores individuales. Dúo: Dos jugadores por equipo.',
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
    this.setInitialTheme();
    const saved = localStorage.getItem('lang');
    if (saved && ['de', 'en', 'fr', 'es'].includes(saved)) {
      this.selectedLang = saved as LanguageCode;
    }
    this.applyTranslations();  
      this.loadUserProfile(); 
  }

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

   goToProfile() {
    this.router.navigate(['/profile']);
  }

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

  onCreateTournament() {
    if (
      !this.tournament.name ||
      !this.tournament.date ||
      !this.tournament.location ||
      !this.tournament.format || 
      (this.tournament.format !== 'solo' && this.tournament.format !== 'duo') 
    ) {
      alert('Please fill all tournament fields and select a valid format!');
      return;
    }
    alert('Tournament created successfully!');
    this.tournament = { name: '', date: '', location: '', teams: '', notes: '', private: '', format: '', };
    this.isCreateTournamentStart = false;
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

