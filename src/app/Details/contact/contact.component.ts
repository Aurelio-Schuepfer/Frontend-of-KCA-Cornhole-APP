import { Component } from '@angular/core';
import { GlobalAuth } from '../../global-auth';
import { UserProfileService } from '../../Services/user-profile.service'; 
import { Router } from '@angular/router';
import { TournamentService } from '../../Services/tournament.service';

type LanguageCode = 'de' | 'en' | 'fr' | 'es';
@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  isNavOpen: boolean = false;
  expandedId: number | null = null;
  username: string | null = null;
   languages = [
    { code: 'de' as LanguageCode, label: 'Deutsch' },
    { code: 'en' as LanguageCode, label: 'English' },
    { code: 'fr' as LanguageCode, label: 'Français' },
    { code: 'es' as LanguageCode, label: 'Español' }
  ];

  selectedLang: LanguageCode = 'en';
  langDropdownOpen = false;
  showPassword = false;
  showConfirmPassword = false;
  hasTournament = false;

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
      contactTitle: 'Kontaktieren Sie uns',
      contactIntro: 'Wir freuen uns, von Ihnen zu hören! Wenn Sie Fragen haben oder Unterstützung benötigen, erreichen Sie uns über das folgende Formular oder die angegebenen Kontaktinformationen.',
      contactFormTitle: 'Kontaktformular',
      contactName: 'Ihr Name:',
      contactNamePlaceholder: 'Ihr Name',
      contactEmail: 'Ihre E-Mail-Adresse:',
      contactEmailPlaceholder: 'Ihre E-Mail-Adresse',
      contactMessage: 'Nachricht:',
      contactMessagePlaceholder: 'Ihre Nachricht',
      contactSubmit: 'Absenden',
      contactOtherWays: 'Andere Kontaktmöglichkeiten',
      contactOtherIntro: 'Falls Sie eine schnellere Antwort wünschen, können Sie uns auch direkt über die folgenden Kanäle erreichen:',
      contactEmailLabel: 'Email',
      contactPhoneLabel: 'Telefon',
      contactAddressLabel: 'Adresse',
      contactPhone: '+49 123 456 789',
      contactAddress: 'Musterstraße 123, 12345 Musterstadt',
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
      contactTitle: 'Contact Us',
      contactIntro: 'We look forward to hearing from you! If you have any questions or need support, contact us using the form below or the contact information provided.',
      contactFormTitle: 'Contact Form',
      contactName: 'Your Name:',
      contactNamePlaceholder: 'Your Name',
      contactEmail: 'Your Email Address:',
      contactEmailPlaceholder: 'Your Email Address',
      contactMessage: 'Message:',
      contactMessagePlaceholder: 'Your Message',
      contactSubmit: 'Send',
      contactOtherWays: 'Other Ways to Contact',
      contactOtherIntro: 'If you want a quicker response, you can also reach us directly via the following channels:',
      contactEmailLabel: 'Email',
      contactPhoneLabel: 'Phone',
      contactAddressLabel: 'Address',
      contactPhone: '+49 123 456 789',
      contactAddress: 'Musterstraße 123, 12345 Musterstadt',
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
      contactTitle: 'Contactez-nous',
      contactIntro: 'Nous sommes ravis de vous entendre ! Si vous avez des questions ou besoin d\'aide, contactez-nous via le formulaire ci-dessous ou les informations fournies.',
      contactFormTitle: 'Formulaire de contact',
      contactName: 'Votre nom :',
      contactNamePlaceholder: 'Votre nom',
      contactEmail: 'Votre adresse e-mail :',
      contactEmailPlaceholder: 'Votre adresse e-mail',
      contactMessage: 'Message :',
      contactMessagePlaceholder: 'Votre message',
      contactSubmit: 'Envoyer',
      contactOtherWays: 'Autres moyens de contact',
      contactOtherIntro: 'Pour une réponse plus rapide, vous pouvez également nous contacter directement via les canaux suivants :',
      contactEmailLabel: 'Email',
      contactPhoneLabel: 'Téléphone',
      contactAddressLabel: 'Adresse',
      contactPhone: '+49 123 456 789',
      contactAddress: 'Musterstraße 123, 12345 Musterstadt',
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
      contactTitle: 'Contáctanos',
      contactIntro: '¡Esperamos saber de ti! Si tienes preguntas o necesitas ayuda, contáctanos usando el formulario a continuación o la información de contacto proporcionada.',
      contactFormTitle: 'Formulario de contacto',
      contactName: 'Tu nombre:',
      contactNamePlaceholder: 'Tu nombre',
      contactEmail: 'Tu correo electrónico:',
      contactEmailPlaceholder: 'Tu correo electrónico',
      contactMessage: 'Mensaje:',
      contactMessagePlaceholder: 'Tu mensaje',
      contactSubmit: 'Enviar',
      contactOtherWays: 'Otras formas de contacto',
      contactOtherIntro: 'Si deseas una respuesta más rápida, también puedes contactarnos directamente a través de los siguientes canales:',
      contactEmailLabel: 'Email',
      contactPhoneLabel: 'Teléfono',
      contactAddressLabel: 'Dirección',
      contactPhone: '+49 123 456 789',
      contactAddress: 'Musterstraße 123, 12345 Musterstadt',
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