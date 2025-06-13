import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { GlobalAuth } from '../../global-auth';
import { UserProfileService } from '../../Services/user-profile.service';
import { Router } from '@angular/router';
import { TournamentService } from '../../Services/tournament.service';
type LanguageCode = 'de' | 'en' | 'fr' | 'es';

@Component({
  selector: 'app-join-tournament',
  standalone: false,
  templateUrl: './join-tournament.component.html',
  styleUrl: './join-tournament.component.scss',
})
export class JoinTournamentComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  isNavOpen: boolean = false;
  hasTournament = false;
  isTournamentRegisterOpen = false;
  expandedId: number | null = null;
  username: string | null = null;
  selectedTournamentId: number | null = null;
  selectedTournament: any = null;
  detailsModalVisible: boolean = false;
  joinStatus: string = 'join';
  searchTerm: string = '';
  filteredTournaments: any[] = [];
  showPassword = false;
  showConfirmPassword = false;
  selectedTournamentForJoin: number | null = null;
  selectedCurrentTeams: number = 0;
  selectedMaxTeams: number = 0;
  selectedTournamentImage: string | null = null;

  joinFeedback: { message: string; type: 'success' | 'error' } | null = null;
  showCelebration = false;

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
      tournamentTitle: 'Turnier beitreten',
      name: 'Name',
      nameInfo: 'Gib den Namen deines Turniers ein.',
      date: 'Datum',
      dateInfo: 'Wähle das Datum, an dem das Turnier stattfindet.',
      location: 'Ort',
      locationInfo: 'Gib den Ort an, an dem das Turnier stattfindet.',
      teams: 'Teams',
      teamsInfo: 'Anzahl der Teams, die teilnehmen können.',
      notes: 'Notizen',
      notesInfo:
        'Füge zusätzliche Informationen oder Regeln für das Turnier hinzu.',
      privateTournament: 'Privates Turnier',
      privateInfo:
        '<strong>Privat:</strong> Nur eingeladene Personen können teilnehmen, nicht öffentlich gelistet.<br><strong>Öffentlich:</strong> Turnier ist öffentlich gelistet und jeder kann teilnehmen.',
      createTournamentBtn: 'Turnier erstellen',
      privacyPolicy: 'Datenschutz',
      termsOfService: 'Nutzungsbedingungen',
      contact: 'Kontakt',
      join: 'Beitreten',
      leave: 'Verlassen',
      details: 'Details',
      detailsFor: 'Details für',
      rules: 'Regeln',
      close: 'Schließen',
      meetingPoint: 'Treffpunkt',
      searchPlaceholder: 'Turnier suchen ...',
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
      loginToJoin: 'Melde dich an, um einem Turnier beizutreten',
      Formattitle: 'Format',
      TeamName: 'Wähle einen Namen für dein Team',
      TeamNameInfo:
        'Bitte wähle einen kurzen und passenden Teamnamen. Beleidigende oder zu lange Namen sind nicht erlaubt. Der gewählte Name wird während des gesamten Turniers verwendet.',
      back: 'Zurück',
      Particitant: 'Teilnehmer',
      tournamentFull: 'Das Turnier ist voll',
      joinSuccess: 'Erfolgreich dem Turnier beigetreten!',
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
      tournamentTitle: 'Join a Tournament',
      name: 'Name',
      nameInfo: 'Enter the name of your tournament.',
      date: 'Date',
      dateInfo: 'Select the date when the tournament will take place.',
      location: 'Location',
      locationInfo: 'Enter the location where the tournament will be held.',
      teams: 'Teams',
      teamsInfo: 'Number of teams that can participate in this tournament.',
      notes: 'Notes',
      notesInfo: 'Add any additional information or rules for the tournament.',
      privateTournament: 'Private Tournament',
      privateInfo:
        '<strong>Private:</strong> Only invited people can join, not listed globally.<br><strong>Public:</strong> Tournament is listed globally and everyone can join.',
      createTournamentBtn: 'Create Tournament',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      contact: 'Contact',
      join: 'Join',
      leave: 'Leave',
      details: 'Details',
      detailsFor: 'Details for',
      rules: 'Rules',
      close: 'Close',
      meetingPoint: 'Meeting Point',
      searchPlaceholder: 'Search tournament ...',
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
      loginToJoin: 'Log in to join a tournament',
      Formattitle: 'format',
      TeamName: 'Choose a name for your team',
      TeamNameInfo:
        'Choose a short and appropriate name for your team. Offensive or overly long names wont be accepted. This name will represent your team throughout the tournament.',
      back: 'Back',
      Particitant: 'Participant',
      tournamentFull: 'Tournament is full',
      joinSuccess: 'Successfully joined the tournament!',
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
      tournamentTitle: 'Rejoindre un tournoi',
      name: 'Nom',
      nameInfo: 'Entrez le nom de votre tournoi.',
      date: 'Date',
      dateInfo: 'Sélectionnez la date du tournoi.',
      location: 'Lieu',
      locationInfo: 'Entrez le lieu où se déroulera le tournoi.',
      teams: 'Équipes',
      teamsInfo: "Nombre d'équipes pouvant participer à ce tournoi.",
      notes: 'Notes',
      notesInfo:
        'Ajoutez des informations ou règles supplémentaires pour le tournoi.',
      privateTournament: 'Tournoi privé',
      privateInfo:
        '<strong>Privé :</strong> Seules les personnes invitées peuvent participer, non listé publiquement.<br><strong>Public :</strong> Le tournoi est listé publiquement et tout le monde peut participer.',
      createTournamentBtn: 'Créer le tournoi',
      privacyPolicy: 'Politique de confidentialité',
      termsOfService: "Conditions d'utilisation",
      contact: 'Contact',
      join: 'Rejoindre',
      leave: 'Quitter',
      details: 'Détails',
      detailsFor: 'Détails pour',
      rules: 'Règles',
      close: 'Fermer',
      meetingPoint: 'Point de rencontre',
      searchPlaceholder: 'Rechercher un tournoi ...',
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
      loginToJoin: 'Connecte-toi pour rejoindre un tournoi',
      Formattitle: 'format',
      TeamName: 'Choisis un nom pour ton équipe',
      TeamNameInfo:
        'Choisis un nom court et respectueux pour ton équipe. Les noms offensants ou trop longs ne seront pas acceptés. Ce nom sera utilisé pendant tout le tournoi.',
      back: 'Retour',
      Particitant: 'Participant',
      tournamentFull: 'Le tournoi est complet',
      joinSuccess: 'Inscription réussie au tournoi !',
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
      tournamentTitle: 'Unirse a un torneo',
      name: 'Nombre',
      nameInfo: 'Introduce el nombre de tu torneo.',
      date: 'Fecha',
      dateInfo: 'Selecciona la fecha en la que se celebrará el torneo.',
      location: 'Ubicación',
      locationInfo: 'Introduce la ubicación donde se celebrará el torneo.',
      teams: 'Equipos',
      teamsInfo: 'Número de equipos que pueden participar en este torneo.',
      notes: 'Notas',
      notesInfo: 'Agrega información adicional o reglas para el torneo.',
      privateTournament: 'Torneo privado',
      privateInfo:
        '<strong>Privado:</strong> Solo personas invitadas pueden unirse, no aparece globalmente.<br><strong>Público:</strong> El torneo aparece globalmente y cualquiera puede unirse.',
      createTournamentBtn: 'Crear torneo',
      privacyPolicy: 'Política de privacidad',
      termsOfService: 'Términos de servicio',
      contact: 'Contacto',
      join: 'Unirse',
      leave: 'Salir',
      details: 'Detalles',
      detailsFor: 'Detalles de',
      rules: 'Reglas',
      close: 'Cerrar',
      meetingPoint: 'Punto de encuentro',
      searchPlaceholder: 'Buscar torneo ...',
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
      loginToJoin: 'Inicia sesión para unirte a un torneo',
      Formattitle: 'formato',
      TeamName: 'Elige un nombre para tu equipo',
      TeamNameInfo:
        'Elige un nombre corto y apropiado para tu equipo. No se permiten nombres ofensivos ni demasiado largos. Este nombre se usará durante todo el torneo.',
      back: 'Atrás',
      Particitant: 'Participante',
      tournamentFull: 'El torneo está completo',
      joinSuccess: '¡Te has unido al torneo con éxito!',
    },
  };

  t = this.translations[this.selectedLang];

  userProfile: any = null;
  isProfileLoading = false;

  showResetForm = false;
  resetEmail = '';
  resetRequested = false;
  showTournamentView: boolean = false;
  showTournamentListFade: boolean = false;
  lastView: 'list' | 'single' = 'list';

  showImageModal: boolean = false;
  players = [
    {
      name: 'Lena Schmidt',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      team: 'CornStars',
    },
    {
      name: 'Tom Wagner',
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      team: 'Baggers',
    },
    {
      name: 'Julia Becker',
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
      team: 'Board Kings',
    },
    {
      name: 'Kevin Braun',
      image: 'https://randomuser.me/api/portraits/men/12.jpg',
      team: 'Bean Baggers',
    },
    {
      name: 'Sarah Neumann',
      image: 'assets/images/default-profile.png',
      team: 'Cornhole Crew',
    },
    {
      name: 'Chris Müller',
      image: 'https://randomuser.me/api/portraits/men/27.jpg',
      team: 'Bag Masters',
    },
  ];

  @ViewChild('confettiCanvas', { static: false })
  confettiCanvasRef!: ElementRef<HTMLCanvasElement>;
  private confettiActive = false;
  private confettiTimeout: any;

  teamNameValue: string = '';
  hideTeamNameInput = false;

  constructor(
    public globalAuth: GlobalAuth,
    private userProfileService: UserProfileService,
    private router: Router,
    private tournamentService: TournamentService
  ) {}

  ngOnInit(): void {
    this.setInitialTheme();
    this.loadJoinedTournaments();
    const saved = localStorage.getItem('lang');
    if (saved && ['de', 'en', 'fr', 'es'].includes(saved)) {
      this.selectedLang = saved as LanguageCode;
    }
    this.applyTranslations();
    this.filteredTournaments = this.tournaments;
    this.loadUserProfile();
    this.showTournamentView = false;

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

  ngAfterViewInit(): void {
    if (this.showCelebration) {
      this.startConfetti();
    }
  }

  ngOnDestroy(): void {
    this.stopConfetti();
  }

  goToProfile() {
    this.router.navigate(['/profile']);
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

  setInitialTheme() {
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

  tournaments = [
    {
      id: 1,
      name: 'Spring Clash',
      date: '2025-05-20',
      location: 'Berlin',
      meetingPoint: 'Alexanderplatz',
      maxTeams: 16,
      currentTeams: 10,
      rules: 'Standard Cornhole rules apply.',
      notes: 'Bring your own bags.',
      format: 'Solo',
    },
    {
      id: 2,
      name: 'Summer Showdown',
      date: '2025-06-15',
      location: 'Hamburg',
      meetingPoint: 'Hauptbahnhof',
      maxTeams: 20,
      currentTeams: 19,
      rules: 'Double elimination format.',
      notes: 'Snacks will be provided.',
      format: 'Solo',
    },
    {
      id: 3,
      name: 'Spring Clash',
      date: '2025-05-20',
      location: 'Berlin',
      meetingPoint: 'Alexanderplatz',
      maxTeams: 16,
      currentTeams: 10,
      rules: 'Standard Cornhole rules apply.',
      notes: 'Bring your own bags.',
      format: 'Duo',
    },
    {
      id: 4,
      name: 'Summer Showdown',
      date: '2025-06-15',
      location: 'Hamburg',
      meetingPoint: 'Hauptbahnhof',
      maxTeams: 20,
      currentTeams: 19,
      rules: 'Double elimination format.',
      notes: 'Snacks will be provided.',
      format: 'Duo',
    },
    {
      id: 5,
      name: 'Spring Clash',
      date: '2025-05-20',
      location: 'Berlin',
      meetingPoint: 'Alexanderplatz',
      maxTeams: 16,
      currentTeams: 10,
      rules: 'Standard Cornhole rules apply.',
      notes: 'Bring your own bags.',
      format: 'Solo',
    },
    {
      id: 6,
      name: 'Summer Showdown',
      date: '2025-06-15',
      location: 'Hamburg',
      meetingPoint: 'Hauptbahnhof',
      maxTeams: 20,
      currentTeams: 19,
      rules: 'Double elimination format.',
      notes: 'Snacks will be provided.',
      format: 'Solo',
    },
    {
      id: 7,
      name: 'Spring Clash',
      date: '2025-05-20',
      location: 'Berlin',
      meetingPoint: 'Alexanderplatz',
      maxTeams: 16,
      currentTeams: 10,
      rules: 'Standard Cornhole rules apply.',
      notes: 'Bring your own bags.',
      format: 'Duo',
    },
    {
      id: 8,
      name: 'Summer Showdown',
      date: '2025-06-15',
      location: 'Hamburg',
      meetingPoint: 'Hauptbahnhof',
      maxTeams: 20,
      currentTeams: 19,
      rules: 'Double elimination format.',
      notes: 'Snacks will be provided.',
      format: 'Solo',
    },
    {
      id: 9,
      name: 'Spring Clash',
      date: '2025-05-20',
      location: 'Berlin',
      meetingPoint: 'Alexanderplatz',
      maxTeams: 16,
      currentTeams: 10,
      rules: 'Standard Cornhole rules apply.',
      notes: 'Bring your own bags.',
      format: 'Duo',
    },
    {
      id: 10,
      name: 'Summer Showdown',
      date: '2025-06-15',
      location: 'Hamburg',
      meetingPoint: 'Hauptbahnhof',
      maxTeams: 20,
      currentTeams: 19,
      rules: 'Double elimination format.',
      notes: 'Snacks will be provided.',
      format: 'Solo',
    },
    {
      id: 11,
      name: 'Spring Clash',
      date: '2025-05-20',
      location: 'Berlin',
      meetingPoint: 'Alexanderplatz',
      maxTeams: 16,
      currentTeams: 10,
      rules: 'Standard Cornhole rules apply.',
      notes: 'Bring your own bags.',
      format: 'Solo',
    },
    {
      id: 12,
      name: 'Summer Showdown',
      date: '2025-06-15',
      location: 'Hamburg',
      meetingPoint: 'Hauptbahnhof',
      maxTeams: 20,
      currentTeams: 20,
      rules: 'Double elimination format.',
      notes: 'Snacks will be provided.',
      format: 'Duo',
    },
  ];

  joinTournament(tournamentId: number, currentTeams: number, maxTeams: number) {
    let joinedTournaments = this.getJoinedTournaments();

    if (joinedTournaments.includes(tournamentId)) {
      joinedTournaments = joinedTournaments.filter((id) => id !== tournamentId);
      localStorage.setItem(
        'joinedTournaments',
        JSON.stringify(joinedTournaments)
      );
      alert('You left the tournament');
      this.loadJoinedTournaments();
      return;
    }

    if (currentTeams >= maxTeams) {
      alert('The tournament is full');
      return;
    }

    if (this.showTournamentView) {
      this.lastView = 'single';
    } else {
      this.lastView = 'list';
    }
    this.selectedTournamentForJoin = tournamentId;
    this.selectedCurrentTeams = currentTeams;
    this.selectedMaxTeams = maxTeams;
    this.isTournamentRegisterOpen = true;
    this.showTournamentView = false;
  }

  joinTournamentfinish() {
    this.hideTeamNameInput = true;
    if (this.selectedCurrentTeams >= this.selectedMaxTeams) {
      this.joinFeedback = {
        message: this.t.tournamentFull || 'Tournament is full',
        type: 'error',
      };
      setTimeout(() => {
        this.joinFeedback = null;
      }, 3000);
      return;
    }
    let joinedTournaments = this.getJoinedTournaments();
    if (
      this.selectedTournamentForJoin &&
      !joinedTournaments.includes(this.selectedTournamentForJoin)
    ) {
      joinedTournaments.push(this.selectedTournamentForJoin);
      localStorage.setItem(
        'joinedTournaments',
        JSON.stringify(joinedTournaments)
      );
      this.loadJoinedTournaments();
    }
    this.joinFeedback = {
      message: this.t.joinSuccess || 'Successfully joined!',
      type: 'success',
    };
    this.showCelebration = true;
    setTimeout(() => {
      this.showCelebration = false;
      this.joinFeedback = null;
      this.isTournamentRegisterOpen = false;
      this.showTournamentView = false;
      this.showTournamentListFade = true;
    }, 3000);
    setTimeout(() => this.startConfetti(), 50);
  }

  openDetails(tournamentId: number): void {
    const found = this.tournaments.find((t) => t.id === tournamentId);
    if (found) {
      this.selectedTournamentId = tournamentId;
      this.selectedTournament = found;
      this.detailsModalVisible = true;
    }
  }

  closeDetails(): void {
    this.detailsModalVisible = false;
    this.selectedTournament = null;
  }

  openTournamentView(tournament: any): void {
    this.selectedTournament = tournament;
    this.selectedTournamentImage = 'assets/images/TournamentFiller.png';
    this.isTournamentRegisterOpen = false;
    this.detailsModalVisible = false;
    this.showTournamentView = true;
  }

  closeTournamentView(): void {
    this.showTournamentView = false;
    this.selectedTournament = null;
    this.selectedTournamentImage = null;
    this.showTournamentListFade = true;
    setTimeout(() => {
      this.showTournamentListFade = false;
    }, 500);
  }

  backFromTeamName() {
    this.isTournamentRegisterOpen = false;
    if (this.lastView === 'single') {
      this.showTournamentView = true;
    } else {
      this.showTournamentView = false;
    }
  }

  isTournamentJoined(tournamentId: number): boolean {
    const joinedTournaments = this.getJoinedTournaments();
    return joinedTournaments.includes(tournamentId);
  }

  private loadJoinedTournaments(): void {
    const joinedTournaments = this.getJoinedTournaments();
    this.selectedTournamentId =
      joinedTournaments.length > 0 ? joinedTournaments[0] : null;
  }

  private getJoinedTournaments(): number[] {
    const joinedTournaments = localStorage.getItem('joinedTournaments');
    return joinedTournaments ? JSON.parse(joinedTournaments) : [];
  }
  toggleLangDropdown() {
    this.langDropdownOpen = !this.langDropdownOpen;
  }

  setLang(code: string) {
    this.selectedLang = code as LanguageCode;
    localStorage.setItem('lang', code);
    this.applyTranslations();
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

  onSearch(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredTournaments = this.tournaments;
      return;
    }
    this.filteredTournaments = this.tournaments.filter(
      (tour) =>
        tour.name.toLowerCase().includes(term) ||
        tour.location.toLowerCase().includes(term) ||
        tour.meetingPoint.toLowerCase().includes(term)
    );
  }

  openImageModal() {
    this.showImageModal = true;
  }
  closeImageModal() {
    this.showImageModal = false;
  }

  onTeamNameInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.teamNameValue = value;
    if (value && value.trim().length > 0) {
      this.hideTeamNameInput = true;
    }
  }

  private startConfetti() {
    if (this.confettiActive) return;
    this.confettiActive = true;
    const canvas = document.getElementById(
      'confetti-canvas'
    ) as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const confettiCount = window.innerWidth < 768 ? 60 : 180;
    const confettiColors = [
      '#ffecb3',
      '#ff9800',
      '#b3e5fc',
      '#03a9f4',
      '#c8e6c9',
      '#4caf50',
      '#ffcdd2',
      '#e91e63',
      '#fff9c4',
      '#ffeb3b',
    ];
    const confetti: any[] = [];

    for (let i = 0; i < confettiCount; i++) {
      let xPos;
      if (Math.random() < 0.7) {
        xPos = Math.random() * canvas.width * 0.6;
      } else {
        xPos = canvas.width * 0.6 + Math.random() * canvas.width * 0.4; // 30% rechts
      }
      confetti.push({
        x: xPos,
        y: Math.random() * -canvas.height,
        r: 6 + Math.random() * 10,
        d: 8 + Math.random() * 12,
        color:
          confettiColors[Math.floor(Math.random() * confettiColors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngle: 0,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
      });
    }

    let angle = 0;
    let tiltAngle = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < confetti.length; i++) {
        const c = confetti[i];
        ctx.beginPath();
        ctx.lineWidth = c.r;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r / 3, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.d);
        ctx.stroke();
      }
      update();
    };

    const update = () => {
      angle += 0.01;
      tiltAngle += 0.1;
      for (let i = 0; i < confetti.length; i++) {
        const c = confetti[i];
        c.y += (Math.cos(angle + c.d) + 3 + c.r / 2) * 0.8;
        c.x += Math.sin(angle);
        c.tiltAngle += c.tiltAngleIncremental;
        c.tilt = Math.sin(c.tiltAngle) * 15;

        if (c.y > canvas.height) {
          if (Math.random() < 0.7) {
            c.x = Math.random() * canvas.width * 0.6;
          } else {
            c.x = canvas.width * 0.6 + Math.random() * canvas.width * 0.4;
          }
          c.y = -10;
        }

        if (c.x > canvas.width + 30) c.x = -30;
        if (c.x < -30) c.x = canvas.width + 30;
      }
    };

    const animate = () => {
      if (!this.confettiActive) return;
      draw();
      requestAnimationFrame(animate);
    };

    animate();
    this.confettiTimeout = setTimeout(() => this.stopConfetti(), 2500);
  }

  private stopConfetti() {
    this.confettiActive = false;
    const canvas = document.getElementById(
      'confetti-canvas'
    ) as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    if (this.confettiTimeout) clearTimeout(this.confettiTimeout);
  }
}
