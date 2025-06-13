import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GlobalAuth } from '../global-auth';
import { UserProfileService } from '../Services/user-profile.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { TournamentService } from '../Services/tournament.service';
type LanguageCode = 'de' | 'en' | 'fr' | 'es';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userProfile: any = null;
  isLoading = false;
  showChangePw = false;
  newPassword = '';
  pwChanged = false;
  selectedImage: File | undefined = undefined;
  editName = false;
  editEmail = false;
  editBio = false;
  showPassword = false;
  showConfirmPassword = false;
  isNavOpen = false;
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
      heroTitle: 'Spielen. Wettkämpfen. Gewinnen.',
      heroSubtitle:
        'Organisiere oder trete Cornhole-Turnieren ganz einfach bei – powered by KCA.',
      createTournamentBtn: 'Turnier erstellen',
      joinTournamentBtn: 'Turnier beitreten',
      feature1Title: '🏆 Eigenes Turnier erstellen',
      feature1Text:
        'Passe Ort, Zeit, Regeln, Teams und mehr an. Perfekt für lockere Spiele und Profi-Turniere.',
      feature2Title: '🤝 Turnieren in deiner Nähe beitreten',
      feature2Text:
        'Finde lokale Events oder nimm an digitalen Matches teil. Im Team oder allein – du entscheidest.',
      feature3Title: '📊 Spielerstatistiken verfolgen',
      feature3Text:
        'Sieh Siege, Punkte und Leistungen in Echtzeit. Deine Stats, deine Reise, deine Story.',
      aboutAppTitle: 'Über KCA Cornhole Tournaments',
      aboutAppText:
        'KCA Cornhole Tournaments wurde für die Community gebaut. Ob Gartenpartie oder Arena-Championship – wir geben dir die Tools für ein episches Erlebnis.',
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
      changeProfileImage: 'Profilbild ändern',
      editName: 'Name ändern',
      editEmail: 'E-Mail ändern',
      editBio: 'Biographie ändern',
      bio: 'Biographie',
      gamesPlayed: 'Gespielte Matches',
      matchesWon: 'Gewonnene Matches',
      matchesLost: 'Verlorene Matches',
      points: 'Erspielte Punkte',
      winRate: 'Siegquote',
      partner: 'Partner',
      statsDescription:
        'Hier findest du deine wichtigsten Cornhole-Statistiken:',
      statsLabels: {
        gamesPlayed: 'Alle Matches, die du gespielt hast.',
        matchesWon: 'Alle Matches, die du gewonnen hast.',
        matchesLost: 'Alle Matches, die du verloren hast.',
        points: 'Alle Punkte, die du insgesamt erzielt hast.',
        winRate: 'Dein prozentualer Anteil an Siegen.',
        partner: 'Dein häufigster Spielpartner.',
      },
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
      heroTitle: 'Play. Compete. Win.',
      heroSubtitle:
        'Organize or join Cornhole tournaments with ease – powered by KCA.',
      createTournamentBtn: 'Create Tournament',
      joinTournamentBtn: 'Join Tournament',
      feature1Title: '🏆 Create Your Own Tournament',
      feature1Text:
        'Customize location, time, rules, teams, and more. Perfect for both casual games and pro brackets.',
      feature2Title: '🤝 Join Tournaments Near You',
      feature2Text:
        'Find local events or join digital matchups. Team up or go solo – you choose your game.',
      feature3Title: '📊 Track Player Stats',
      feature3Text:
        'See wins, points, and performance evolve in real time. Your stats, your journey, your story.',
      aboutAppTitle: 'About KCA Cornhole Tournaments',
      aboutAppText:
        "KCA Cornhole Tournaments was built for the community. Whether you're hosting backyard battles or arena-level championships – we give you the tools to make it epic.",
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
      changeProfileImage: 'Change profile image',
      editName: 'Edit name',
      editEmail: 'Edit email',
      editBio: 'Edit biography',
      bio: 'Biography',
      gamesPlayed: 'Matches Played',
      matchesWon: 'Matches Won',
      matchesLost: 'Matches Lost',
      points: 'Total Points',
      winRate: 'Win Rate',
      partner: 'Partner',
      statsDescription: 'Here are your most important Cornhole statistics:',
      statsLabels: {
        gamesPlayed: 'All matches you have played.',
        matchesWon: 'All matches you have won.',
        matchesLost: 'All matches you have lost.',
        points: 'All points you have scored in total.',
        winRate: 'Your win percentage.',
        partner: 'Your most frequent partner.',
      },
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
      heroTitle: 'Jouer. Concourir. Gagner.',
      heroSubtitle:
        'Organisez ou rejoignez des tournois de Cornhole facilement – propulsé par KCA.',
      createTournamentBtn: 'Créer un tournoi',
      joinTournamentBtn: 'Rejoindre un tournoi',
      feature1Title: '🏆 Créez votre propre tournoi',
      feature1Text:
        "Personnalisez le lieu, l'heure, les règles, les équipes et plus encore. Parfait pour les parties amicales et les tournois pro.",
      feature2Title: '🤝 Rejoignez des tournois près de chez vous',
      feature2Text:
        'Trouvez des événements locaux ou participez à des matchs numériques. En équipe ou en solo – à vous de choisir.',
      feature3Title: '📊 Suivez les statistiques des joueurs',
      feature3Text:
        'Voyez les victoires, les points et les performances évoluer en temps réel. Vos stats, votre parcours, votre histoire.',
      aboutAppTitle: 'À propos de KCA Cornhole Tournaments',
      aboutAppText:
        'KCA Cornhole Tournaments a été créé pour la communauté. Que vous organisiez des parties dans le jardin ou des championnats en arène – nous vous donnons les outils pour rendre cela épique.',
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
      changeProfileImage: 'Changer la photo de profil',
      editName: 'Modifier le nom',
      editEmail: "Modifier l'e-mail",
      editBio: 'Modifier la biographie',
      bio: 'Biographie',
      gamesPlayed: 'Parties jouées',
      matchesWon: 'Matchs gagnés',
      matchesLost: 'Matchs perdus',
      points: 'Points marqués',
      winRate: 'Taux de victoire',
      partner: 'Partenaire',
      statsDescription:
        'Voici vos statistiques Cornhole les plus importantes :',
      statsLabels: {
        gamesPlayed: 'Toutes les parties que vous avez jouées.',
        matchesWon: 'Toutes les parties que vous avez gagnées.',
        matchesLost: 'Toutes les parties que vous avez perdues.',
        points: 'Tous les points que vous avez marqués au total.',
        winRate: 'Votre pourcentage de victoires.',
        partner: 'Votre partenaire le plus fréquent.',
      },
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
      heroTitle: 'Jugar. Competir. Ganar.',
      heroSubtitle:
        'Organiza o únete a torneos de Cornhole fácilmente – powered by KCA.',
      createTournamentBtn: 'Crear torneo',
      joinTournamentBtn: 'Unirse a un torneo',
      feature1Title: '🏆 Crea tu propio torneo',
      feature1Text:
        'Personaliza ubicación, hora, reglas, equipos y más. Perfecto para juegos casuales y torneos profesionales.',
      feature2Title: '🤝 Únete a torneos cerca de ti',
      feature2Text:
        'Encuentra eventos locales o únete a partidas digitales. En equipo o solo – tú eliges.',
      feature3Title: '📊 Sigue las estadísticas de los jugadores',
      feature3Text:
        'Mira victorias, puntos y rendimiento en tiempo real. Tus estadísticas, tu viaje, tu historia.',
      aboutAppTitle: 'Sobre KCA Cornhole Tournaments',
      aboutAppText:
        'KCA Cornhole Tournaments fue creado para la comunidad. Ya sea en el jardín o en campeonatos de arena – te damos las herramientas para hacerlo épico.',
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
      passwordChanged: '¡Contraseña cambiada!',
      changeProfileImage: 'Cambiar imagen de perfil',
      editName: 'Editar nombre',
      editEmail: 'Editar correo',
      editBio: 'Editar biografía',
      bio: 'Biografía',
      gamesPlayed: 'Partidas jugadas',
      matchesWon: 'Partidas ganadas',
      matchesLost: 'Partidas perdidas',
      points: 'Puntos conseguidos',
      winRate: 'Porcentaje de victorias',
      partner: 'Compañero',
      statsDescription:
        'Aquí están tus estadísticas más importantes de Cornhole:',
      statsLabels: {
        gamesPlayed: 'Todas las partidas que has jugado.',
        matchesWon: 'Todas las partidas que has ganado.',
        matchesLost: 'Todas las partidas que has perdido.',
        points: 'Todos los puntos que has conseguido en total.',
        winRate: 'Tu porcentaje de victorias.',
        partner: 'Tu compañero más frecuente.',
      },
    },
  };

  t = this.translations[this.selectedLang];

  isProfileLoading = false;

  showResetForm = false;
  resetEmail = '';
  resetRequested = false;

  username: string = '';
  email: string = '';
  isLoggedIn: boolean = false;

  @ViewChild('avatarInput') avatarInput!: ElementRef<HTMLInputElement>;

  constructor(
    public globalAuth: GlobalAuth,
    private userProfileService: UserProfileService,
    private router: Router,
    private tournamentService: TournamentService
  ) {}

  ngOnInit(): void {
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
    this.setInitialTheme();
    const saved = localStorage.getItem('lang');
    if (saved && ['de', 'en', 'fr', 'es'].includes(saved)) {
      this.selectedLang = saved as LanguageCode;
    }
    this.applyTranslations();

    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        console.log('Decoded JWT:', decoded);
        this.username =
          decoded['unique_name'] || decoded['name'] || decoded['sub'] || '';
        this.isLoggedIn = true;
        this.userProfile = {
          name:
            decoded['unique_name'] || decoded['name'] || decoded['sub'] || '',
          email:
            decoded['email'] || decoded['mail'] || decoded['user_email'] || '',
          imageUrl:
            localStorage.getItem('profileImageUrl') ||
            'assets/images/default-profile.png',
          gamesPlayed: decoded['gamesPlayed'] || 0,
          matchesWon: decoded['matchesWon'] || 0,
          matchesLost: decoded['matchesLost'] || 0,
          points: decoded['points'] || 0,
          winRate: decoded['winRate'] || 0,
          partner: decoded['partner'] || '',
          bio: decoded['bio'] || '',
        };
        this.userProfileService.getProfile().subscribe({
          next: (data) => {
            console.log('Backend-Profile:', data);
            let backendEmail = data?.email || data?.mail || data?.user_email;
            this.userProfile = {
              ...this.userProfile,
              email: backendEmail || this.userProfile.email,
              name: data?.name || this.userProfile.name,
              bio: data?.bio || this.userProfile.bio,
              imageUrl: data?.imageUrl || this.userProfile.imageUrl,
            };
          },
          error: () => {},
        });
      } catch (e) {
        this.username = '';
        this.isLoggedIn = false;
      }
    }
  }
  loadProfile() {
    this.isLoading = true;
    this.userProfileService.getProfile().subscribe({
      next: (data) => {
        if (!data || !data.name) {
          this.userProfile = {
            name: this.username || 'Demo User',
            email: this.email || 'demo@example.com',
            imageUrl:
              localStorage.getItem('profileImageUrl') ||
              'assets/images/default-profile.png',
            gamesPlayed: 12,
            matchesWon: 5,
            matchesLost: 7,
            points: 123,
            winRate: 41,
            partner: 'Erika Musterfrau',
            bio: 'Cornhole-Fan seit 2015.',
          };
        } else {
          this.userProfile = data;
        }
        this.isLoading = false;
        if (this.userProfile.imageUrl) {
          localStorage.setItem('profileImageUrl', this.userProfile.imageUrl);
          this.globalAuth.profileImageUrl = this.userProfile.imageUrl;
        }
      },
      error: () => {
        this.userProfile = {
          name: this.username || 'Demo User',
          email: this.email || 'demo@example.com',
          imageUrl:
            localStorage.getItem('profileImageUrl') ||
            'assets/images/default-profile.png',
          gamesPlayed: 12,
          matchesWon: 5,
          matchesLost: 7,
          points: 123,
          winRate: 41,
          partner: 'Erika Musterfrau',
          bio: 'Cornhole-Fan seit 2015.',
        };
        this.isLoading = false;
      },
    });
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userProfile.imageUrl = e.target.result;
        localStorage.setItem('profileImageUrl', e.target.result);
        this.globalAuth.profileImageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfile() {
    alert('Profil gespeichert! (Demo)');
  }

  changePassword() {
    if (!this.newPassword) return;
    this.pwChanged = true;
    this.showChangePw = false;
    this.newPassword = '';
    setTimeout(() => (this.pwChanged = false), 2000);
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

  toggleTheme(): void {
    const body = document.body;
    const theme = body.classList.contains('light-mode') ? 'dark' : 'light';
    body.classList.toggle('light-mode');
    localStorage.setItem('theme', theme);
  }

  setInitialTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
    }
  }

  get isDarkMode(): boolean {
    return !document.body.classList.contains('light-mode');
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

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  onLoginSuccess(token: string) {
    localStorage.setItem('token', token);
    let username = '';
    try {
      const decoded: any = jwtDecode(token);
      username =
        decoded['unique_name'] || decoded['name'] || decoded['sub'] || '';
    } catch (e) {
      username = '';
    }
    this.username = username;
    this.isLoggedIn = true;
    localStorage.setItem('username', username);
    this.loadProfile();
  }
}
