import { Component, OnInit } from '@angular/core';
import { GlobalAuth } from '../../global-auth';
import { UserProfileService } from '../../Services/user-profile.service';
import { Router } from '@angular/router';
type LanguageCode = 'de' | 'en' | 'fr' | 'es';
import { TournamentService } from '../../Services/tournament.service';

@Component({
  selector: 'app-terms-of-service',
  standalone: false,
  templateUrl: './terms-of-service.component.html',
  styleUrl: './terms-of-service.component.scss',
})
export class TermsOfServiceComponent {
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
    { code: 'es' as LanguageCode, label: 'Español' },
  ];

  selectedLang: LanguageCode = 'en';
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
      termsTitle: 'Allgemeine Geschäftsbedingungen',
      termsIntro:
        'Willkommen bei KCA Cornhole Tournaments! Bitte lesen Sie unsere Allgemeinen Geschäftsbedingungen sorgfältig durch.',
      termsSection1: '1. Einführung',
      termsSection1Text:
        'Diese Allgemeinen Geschäftsbedingungen regeln die Nutzung unserer Plattform und die Teilnahme an unseren Cornhole-Turnieren. Indem Sie unsere Dienste nutzen, erklären Sie sich mit diesen Bedingungen einverstanden.',
      termsSection2: '2. Teilnahmebedingungen',
      termsSection2Text:
        'Um an einem Turnier teilzunehmen, müssen Sie ein registriertes Mitglied sein und die festgelegten Teilnahmebedingungen akzeptieren. Diese beinhalten die Einhaltung der Turnierregeln und den respektvollen Umgang mit anderen Teilnehmern.',
      termsSection3: '3. Rechte und Pflichten',
      termsSection3Text:
        'Sie erklären sich damit einverstanden, unsere Plattform nicht für illegale oder unzulässige Aktivitäten zu nutzen. Sie sind dafür verantwortlich, Ihre Zugangsdaten sicher zu verwahren und keinen unbefugten Zugang zu Ihrem Konto zu gewähren.',
      termsSection4: '4. Haftungsausschluss',
      termsSection4Text:
        'Wir übernehmen keine Haftung für Schäden, die durch die Teilnahme an unseren Turnieren entstehen, es sei denn, diese Schäden resultieren aus grober Fahrlässigkeit oder Vorsatz unsererseits.',
      termsSection5: '5. Änderungen der Geschäftsbedingungen',
      termsSection5Text:
        'Wir behalten uns das Recht vor, diese Allgemeinen Geschäftsbedingungen jederzeit zu ändern. Alle Änderungen werden auf dieser Seite veröffentlicht und treten sofort in Kraft.',
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
      termsTitle: 'Terms of Service',
      termsIntro:
        'Welcome to KCA Cornhole Tournaments! Please read our Terms of Service carefully.',
      termsSection1: '1. Introduction',
      termsSection1Text:
        'These Terms of Service govern the use of our platform and participation in our cornhole tournaments. By using our services, you agree to these terms.',
      termsSection2: '2. Participation Requirements',
      termsSection2Text:
        'To participate in a tournament, you must be a registered member and accept the specified participation requirements. This includes compliance with tournament rules and respectful interaction with other participants.',
      termsSection3: '3. Rights and Obligations',
      termsSection3Text:
        'You agree not to use our platform for illegal or unauthorized activities. You are responsible for keeping your login credentials secure and not allowing unauthorized access to your account.',
      termsSection4: '4. Disclaimer',
      termsSection4Text:
        'We accept no liability for damages arising from participation in our tournaments unless such damages result from gross negligence or intent on our part.',
      termsSection5: '5. Changes to the Terms',
      termsSection5Text:
        'We reserve the right to change these Terms of Service at any time. All changes will be published on this page and take effect immediately.',
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
      termsTitle: "Conditions d'utilisation",
      termsIntro:
        "Bienvenue sur KCA Cornhole Tournaments ! Veuillez lire attentivement nos conditions d'utilisation.",
      termsSection1: '1. Introduction',
      termsSection1Text:
        "Ces conditions d'utilisation régissent l'utilisation de notre plateforme et la participation à nos tournois de cornhole. En utilisant nos services, vous acceptez ces conditions.",
      termsSection2: '2. Conditions de participation',
      termsSection2Text:
        'Pour participer à un tournoi, vous devez être membre enregistré et accepter les conditions de participation spécifiées. Cela inclut le respect des règles du tournoi et des interactions respectueuses avec les autres participants.',
      termsSection3: '3. Droits et obligations',
      termsSection3Text:
        "Vous acceptez de ne pas utiliser notre plateforme à des fins illégales ou non autorisées. Vous êtes responsable de la sécurité de vos identifiants et de ne pas permettre l'accès non autorisé à votre compte.",
      termsSection4: '4. Clause de non-responsabilité',
      termsSection4Text:
        "Nous déclinons toute responsabilité pour les dommages résultant de la participation à nos tournois, sauf si ces dommages résultent d'une négligence grave ou d'une intention de notre part.",
      termsSection5: '5. Modifications des conditions',
      termsSection5Text:
        "Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. Toutes les modifications seront publiées sur cette page et prendront effet immédiatement.",
      privacyPolicy: 'Politique de confidentialité',
      termsOfService: "Conditions d'utilisation",
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
      termsTitle: 'Términos de servicio',
      termsIntro:
        '¡Bienvenido a KCA Cornhole Tournaments! Por favor, lea atentamente nuestros Términos de Servicio.',
      termsSection1: '1. Introducción',
      termsSection1Text:
        'Estos Términos de Servicio regulan el uso de nuestra plataforma y la participación en nuestros torneos de cornhole. Al utilizar nuestros servicios, usted acepta estos términos.',
      termsSection2: '2. Requisitos de participación',
      termsSection2Text:
        'Para participar en un torneo, debe ser un miembro registrado y aceptar los requisitos de participación especificados. Esto incluye cumplir con las reglas del torneo y tratar a los demás participantes con respeto.',
      termsSection3: '3. Derechos y obligaciones',
      termsSection3Text:
        'Usted acepta no utilizar nuestra plataforma para actividades ilegales o no autorizadas. Es responsable de mantener seguras sus credenciales de acceso y de no permitir el acceso no autorizado a su cuenta.',
      termsSection4: '4. Exención de responsabilidad',
      termsSection4Text:
        'No aceptamos ninguna responsabilidad por los daños derivados de la participación en nuestros torneos, a menos que dichos daños resulten de negligencia grave o dolo por nuestra parte.',
      termsSection5: '5. Cambios en los términos',
      termsSection5Text:
        'Nos reservamos el derecho de cambiar estos Términos de Servicio en cualquier momento. Todos los cambios se publicarán en esta página y entrarán en vigor de inmediato.',
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
    },
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
    private tournamentService: TournamentService
  ) {}
  ngOnInit(): void {
    this.applyTranslations();
    const savedTournaments = JSON.parse(
      localStorage.getItem('tournaments') || '[]'
    );
    this.hasTournament =
      Array.isArray(savedTournaments) && savedTournaments.length > 0;
    this.tournamentService.tournament$.subscribe((t) => {
      const savedTournaments = JSON.parse(
        localStorage.getItem('tournaments') || '[]'
      );
      this.hasTournament =
        !!t || (Array.isArray(savedTournaments) && savedTournaments.length > 0);
    });
  }

  loadUserProfile() {
    this.isProfileLoading = true;
    this.userProfileService.getProfile().subscribe({
      next: (data) => {
        this.userProfile = data;
        this.isProfileLoading = false;
      },
      error: () => {
        this.isProfileLoading = false;
      },
    });
  }

  saveUserProfile(updated: { name: string; email: string; image?: File }) {
    this.isProfileLoading = true;
    this.userProfileService.updateProfile(updated).subscribe({
      next: (data) => {
        this.userProfile = data;
        this.isProfileLoading = false;
        alert('Profil saved!');
      },
      error: () => {
        this.isProfileLoading = false;
        alert('Error Saving!');
      },
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
      },
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
      case 'de':
        return 'https://flagcdn.com/w40/de.png';
      case 'en':
        return 'https://flagcdn.com/w40/gb.png';
      case 'fr':
        return 'https://flagcdn.com/w40/fr.png';
      case 'es':
        return 'https://flagcdn.com/w40/es.png';
      default:
        return '';
    }
  }

  applyTranslations() {
    this.t = this.translations[this.selectedLang];
  }
}
