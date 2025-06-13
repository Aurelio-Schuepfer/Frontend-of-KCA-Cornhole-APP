import { Component, OnInit } from '@angular/core';
import { GlobalAuth } from '../global-auth';
import { UserProfileService } from '../Services/user-profile.service'; 
import { Router } from '@angular/router';
import { TournamentService } from '../Services/tournament.service';

type LanguageCode = 'de' | 'en' | 'fr' | 'es';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  isNavOpen: boolean = false;
  expandedId: number | null = null;
  username: string | null = null;
  showPassword = false;
  showConfirmPassword = false;
  hasTournament = false;

  languages = [
    { code: 'de' as LanguageCode, label: 'Deutsch' },
    { code: 'en' as LanguageCode, label: 'English' },
    { code: 'fr' as LanguageCode, label: 'Français' },
    { code: 'es' as LanguageCode, label: 'Español' }
  ];

  selectedLang: LanguageCode = 'de';
  langDropdownOpen = false;

  translations: Record<LanguageCode, any> = {
    de: {
      home: 'Home',
      joinTournament: 'Turnier beitreten',
      createTournament: 'Turnier erstellen',
      manageTournaments: 'Turnier verwalten',
      statistics: 'Statistiken',
      about: 'Über',
      logout: 'Logout',
      aboutTitle: 'Über KCA Cornhole Tournaments',
      aboutText: 'Willkommen bei KCA Cornhole Tournaments – deine Anlaufstelle für spannende und gut organisierte Cornhole-Turniere!',
      founders: 'Die Gründer',
      foundersText: 'Christian und Andreas Kiefer sind die Gründer von KCA Cornhole Tournaments. Ihre Leidenschaft für Cornhole führte sie zur Gründung dieses Projekts, um ein echtes Turniererlebnis für alle Spieler zu schaffen. Die beiden Gründer betreiben zudem eine weitere Plattform, die sich auf hochwertige Cornhole-Produkte konzentriert:',
      mission: 'Unsere Mission',
      missionText: 'Unsere Vision ist es, eine lebendige Community rund um das Cornhole-Spiel zu schaffen, in der sich Spieler austauschen, messen und zusammen Spaß haben können. Wir setzen auf einfache, benutzerfreundliche Turnierverwaltung und spannende Events.',
      community: 'Engagement für die Community',
      communityText: 'Wir sind stolz darauf, zahlreiche Events zu unterstützen und die Cornhole-Szene durch unsere Turniere zu bereichern. Unsere Plattform ist für alle Spieler, ob Anfänger oder Profi, ein Ort der Begegnung und des Wettbewerbs.',
      proLink: 'KCA Cornhole Pro',
      register: 'Registrieren',
      login: 'Login',
      username: 'Benutzername',
      usernameOrEmail: 'Benutzername / E-Mail',
      email: 'E-Mail',
      password: 'Passwort',
      confirmPassword: 'Passwort wiederholen',
      createAccount: 'Account erstellen',
      alreadyAccount: 'Schon registriert? Hier einloggen',
      noAccount: 'Kein Account? Hier registrieren',
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
      manageTournaments: 'Manage Tournament',
      statistics: 'Statistics',
      about: 'About',
      logout: 'Logout',
      aboutTitle: 'About KCA Cornhole Tournaments',
      aboutText: 'Welcome to KCA Cornhole Tournaments – your place for exciting and well-organized cornhole tournaments!',
      founders: 'The Founders',
      foundersText: 'Christian and Andreas Kiefer are the founders of KCA Cornhole Tournaments. Their passion for cornhole led them to create this project to offer a real tournament experience for all players. The two founders also run another platform focused on high-quality cornhole products:',
      mission: 'Our Mission',
      missionText: 'Our vision is to create a vibrant community around the game of cornhole, where players can connect, compete, and have fun together. We focus on simple, user-friendly tournament management and exciting events.',
      community: 'Community Engagement',
      communityText: 'We are proud to support numerous events and enrich the cornhole scene through our tournaments. Our platform is a meeting place and competition ground for all players, whether beginners or pros.',
      proLink: 'KCA Cornhole Pro',
      register: 'Register',
      login: 'Login',
      username: 'Username',
      usernameOrEmail: 'Username / Email',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      createAccount: 'Create Account',
      alreadyAccount: 'Already have an account? Login here',
      noAccount: 'No account? Register here',
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
      manageTournaments: 'Gérer le tournoi',
      statistics: 'Statistiques',
      about: 'À propos',
      logout: 'Déconnexion',
      aboutTitle: 'À propos de KCA Cornhole Tournaments',
      aboutText: 'Bienvenue chez KCA Cornhole Tournaments – votre plateforme pour des tournois de cornhole passionnants et bien organisés!',
      founders: 'Les Fondateurs',
      foundersText: 'Christian et Andreas Kiefer sont les fondateurs de KCA Cornhole Tournaments. Leur passion pour le cornhole les a amenés à créer ce projet afin d\'offrir une véritable expérience de tournoi à tous les joueurs. Les deux fondateurs gèrent également une autre plateforme axée sur des produits de cornhole de haute qualité :',
      mission: 'Notre Mission',
      missionText: 'Notre vision est de créer une communauté dynamique autour du jeu de cornhole, où les joueurs peuvent se rencontrer, s\'affronter et s\'amuser ensemble. Nous misons sur une gestion de tournoi simple et conviviale ainsi que sur des événements passionnants.',
      community: 'Engagement Communautaire',
      communityText: 'Nous sommes fiers de soutenir de nombreux événements et d\'enrichir la scène du cornhole grâce à nos tournois. Notre plateforme est un lieu de rencontre et de compétition pour tous les joueurs, débutants ou professionnels.',
      proLink: 'KCA Cornhole Pro',
      register: 'S’inscrire',
      login: 'Connexion',
      username: 'Nom d’utilisateur',
      usernameOrEmail: 'Nom d’utilisateur / E-mail',
      email: 'E-mail',
      password: 'Mot de passe',
      confirmPassword: 'Répéter le mot de passe',
      createAccount: 'Créer un compte',
      alreadyAccount: 'Déjà inscrit ? Se connecter ici',
      noAccount: 'Pas de compte ? S’inscrire ici',
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
      manageTournaments: 'Gestionar el torneo',
      statistics: 'Estadísticas',
      about: 'Acerca de',
      logout: 'Cerrar sesión',
      aboutTitle: 'Sobre KCA Cornhole Tournaments',
      aboutText: 'Bienvenido a KCA Cornhole Tournaments – tu lugar para torneos de cornhole emocionantes y bien organizados!',
      founders: 'Los Fundadores',
      foundersText: 'Christian y Andreas Kiefer son los fundadores de KCA Cornhole Tournaments. Su pasión por el cornhole los llevó a crear este proyecto para ofrecer una verdadera experiencia de torneo para todos los jugadores. Los dos fundadores también gestionan otra plataforma centrada en productos de cornhole de alta calidad:',
      mission: 'Nuestra Misión',
      missionText: 'Nuestra visión es crear una comunidad vibrante en torno al juego de cornhole, donde los jugadores puedan conectarse, competir y divertirse juntos. Nos centramos en una gestión de torneos sencilla y fácil de usar y en eventos emocionantes.',
      community: 'Compromiso con la Comunidad',
      communityText: 'Estamos orgullosos de apoyar numerosos eventos y enriquecer la escena del cornhole a través de nuestros torneos. Nuestra plataforma es un lugar de encuentro y competición para todos los jugadores, ya sean principiantes o profesionales.',
      proLink: 'KCA Cornhole Pro',
      register: 'Registrarse',
      login: 'Iniciar sesión',
      username: 'Nombre de usuario',
      usernameOrEmail: 'Nombre de usuario / Correo',
      email: 'Correo electrónico',
      password: 'Contraseña',
      confirmPassword: 'Repetir contraseña',
      createAccount: 'Crear cuenta',
      alreadyAccount: '¿Ya tienes cuenta? Inicia sesión aquí',
      noAccount: '¿No tienes cuenta? Regístrate aquí',
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
    private router: Router,
    private tournamentService: TournamentService,
  ) {}

  ngOnInit(): void {
    this.setInitialTheme();
    const saved = localStorage.getItem('lang');
    if (saved && ['de', 'en', 'fr', 'es'].includes(saved)) {
      this.selectedLang = saved as LanguageCode;
    }
    this.applyTranslations();
    this.loadUserProfile(); 

    // Check for saved tournaments in localStorage
    const savedTournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
    this.hasTournament = Array.isArray(savedTournaments) && savedTournaments.length > 0;

    this.tournamentService.tournament$.subscribe(t => {
      // Also keep hasTournament true if there are saved tournaments
      const savedTournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
      this.hasTournament = !!t || (Array.isArray(savedTournaments) && savedTournaments.length > 0);
    });
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

   goToProfile() {
    this.router.navigate(['/profile']);
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
