import { Component, OnInit } from '@angular/core';
import { GlobalAuth } from '../../global-auth';
import { UserProfileService } from '../../Services/user-profile.service';
import { Router } from '@angular/router';
import { TournamentService } from '../../Services/tournament.service';
import { Tournament } from '../../tournament.interface';

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
  hasTournament = false;
  username: string | null = null;
  showPassword = false;
  showConfirmPassword = false;
  isOpen = true;
  editSelected = true;
  participantsSelected = false;
  bracketSelected = false;
  scheduleSelected = false;
  extendedSelected = false;
  resultsSelected = false;
  presentSelected = false;
  selectedImage: File | undefined = undefined;
  editName = false;
  editDate = false;
  editLocation = false;
  editTeams = false;
  editNotes = false;
  editFormat = false;
  editPrivate = false;
  editOrganizer = false;
  showConfirm = false;
  confirmPassword = '';
  passwordInvalid = false;
  cancelSuccess = false;
  activeBtn = 'edit';
  showImageModal = false;
  modalImageSrc = '';
  searchQuery = '';
  inviteQuery = '';
  guestName = '';
  guestTeam = '';
  maxParticipants = 32;
  editIndex: number | null = null;
  showSuccess = false;

  tournament = {
    id: '',
    name: '',
    date: '',
    location: '',
    teams: '',
    notes: '',
    rules: '',
    private: false,
    format: '',
    organizer: '',
    fee: '',
  };

  languages = [
    { code: 'de' as LanguageCode, label: 'Deutsch' },
    { code: 'en' as LanguageCode, label: 'English' },
    { code: 'fr' as LanguageCode, label: 'Français' },
    { code: 'es' as LanguageCode, label: 'Español' },
  ];

  players = [
    {
      name: 'Anna König',
      team: 'Red Hawks',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      name: 'Ben Müller',
      team: 'Blue Wolves',
      avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
    },
    {
      name: 'Clara Schmidt',
      team: 'Green Snakes',
      avatar: 'https://randomuser.me/api/portraits/women/18.jpg',
    },
    {
      name: 'David Weber',
      team: '',
      avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    },
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
      tournamentTitle: 'Turnier erstellen',
      name: 'Name',
      nameInfo: 'Gib den Namen deines Turniers ein.',
      organizer: 'Veranstalter (optional)',
      organizerInfo:
        'Der Veranstalter ist die Person oder Organisation, die das Turnier plant, organisiert und durchführt.',
      date: 'Datum',
      dateInfo: 'Wähle das Datum, an dem das Turnier stattfindet.',
      location: 'Ort',
      locationInfo: 'Gib den Ort an, an dem das Turnier stattfindet.',
      teams: 'Teams (optional)',
      teamsInfo: 'Anzahl der Teams, die teilnehmen können.',
      notes: 'Notizen (optional)',
      notesInfo:
        'Füge zusätzliche Informationen oder Regeln für das Turnier hinzu.',
      privateTournament: 'Privat',
      privateInfo:
        '<strong>Privat:</strong> Nur eingeladene Personen können teilnehmen, nicht öffentlich gelistet.<br><strong>Öffentlich:</strong> Turnier ist öffentlich gelistet und jeder kann teilnehmen.',
      fee: 'Startgebühr (optional)',
      feeInfo: 'Betrag, den Teilnehmende für die Teilnahme zahlen müssen.',
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
      tournamentFormatInfo:
        'Solo: Nur Einzelspieler. Duo: Zwei Spieler pro Team.',
      editNametitle: 'Name des Turniers',
      editDatetitle: 'Veranstaltungsdatum',
      editLocationtitle: 'Austragungsort',
      editNotestitle: 'Hinweise zum Turnier',
      editTeamstitle: 'Max Anzahl an Teams',
      editFormattitle: 'Turnierformat',
      editPrivatetitle: 'Privates',
      editorganizertitle: 'Veranstalter',
      edit: 'Bearbeiten',
      participants: 'Teilnehmer',
      bracket: 'Turnierbaum',
      schedule: 'Spielplan',
      Advanced: 'Erweitert',
      present: 'Präsentieren',
      results: 'Ergebnisse',
      cancelTournament: 'Turnier abbrechen',
      cancelButton: 'Turnier abbrechen',
      title: 'Bist du sicher?',
      description:
        'Bitte gib dein Passwort ein, um dieses Turnier abzubrechen:',
      placeholder: 'Passwort eingeben',
      confirmBtn: 'Bestätigen',
      cancelBtn: 'Abbrechen',
      error: 'Falsches Passwort. Bitte erneut versuchen.',
      successTitle: 'Turnier abgebrochen',
      successText: 'Das Turnier wurde erfolgreich abgebrochen.',
      okBtn: 'OK',
      sponsorsLabel: 'Sponsoren',
      sponsorsAdd: 'Sponsor hinzufügen',
      sponsorNamePlaceholder: 'Sponsor Name...',
      sponsorSelectLogo: 'Sponsor Logo auswählen',
      sponsorLogoAlt: 'Sponsor Logo',
      partnersLabel: 'Partner',
      partnersAdd: 'Partner hinzufügen',
      partnerNamePlaceholder: 'Partner Name...',
      partnerSelectLogo: 'Partner Logo auswählen',
      partnerLogoAlt: 'Partner Logo',
      fullscreenExit: 'x',
      fullscreenAlt: 'Vollbild Logo',
      participantsLabel: 'Teilnehmer',
      searchPlaceholder: 'Suche Spieler oder Team...',
      avatarAlt: 'Avatar',
      noTeam: 'Kein Team',
      namePlaceholder: 'Name',
      teamPlaceholder: 'Team',
      invitePlayersLabel: 'Spieler einladen',
      invitePlaceholder: 'E-Mail oder Nutzername',
      inviteButton: 'Einladen',
      addGuestLabel: 'Gast hinzufügen',
      guestNamePlaceholder: 'Name',
      guestTeamPlaceholder: 'Teamname',
      addGuestButton: 'Gast hinzufügen',
      participantsCount: 'Teilnehmer',
      withoutTeamCount: 'Ohne Team',
      advancedSettingsLabel: 'Erweiterte Einstellungen',
      ageGroupsLabel: 'Altersklassen',
      all: 'Alle',
      adults: 'Erwachsene',
      seniors: 'Senioren',
      skillLevelLabel: 'Skill-Level',
      beginner: 'Anfänger',
      advanced: 'Fortgeschritten',
      pro: 'Profi',
      prizesLabel: 'Preisgelder oder Sachpreise',
      prizesPlaceholder: 'Geldpreis oder Medaillen',
      leagueLabel: 'Liga des Turniers',
      leaguePlaceholder: 'Liga des Turniers',
      tournamentcreatesucces: 'Turnier erfolgreich erstellt',
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
      tournamentTitle: 'Create a Tournament',
      name: 'Name',
      nameInfo: 'Enter the name of your tournament.',
      organizer: 'Organizer  (optional)',
      organizerInfo:
        'The organizer is the person or organization responsible for planning, managing, and running the tournament.',
      date: 'Date',
      dateInfo: 'Select the date when the tournament will take place.',
      location: 'Location',
      locationInfo: 'Enter the location where the tournament will be held.',
      teams: 'Teams (optional)',
      teamsInfo: 'Number of teams that can participate in this tournament.',
      notes: 'Notes (optional)',
      notesInfo: 'Add any additional information or rules for the tournament.',
      privateTournament: 'Private',
      privateInfo:
        '<strong>Private:</strong> Only invited people can join, not listed globally.<br><strong>Public:</strong> Tournament is listed globally and everyone can join.',
      fee: 'Entry Fee (optional)',
      feeInfo: 'Amount participants must pay to join the tournament.',
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
      tournamentFormatInfo:
        'Solo: A tournament for individuals. Duo: Two players per team.',
      editNametitle: 'Tournament Name',
      editDatetitle: 'Event Date',
      editLocationtitle: 'Tournament Location',
      editNotestitle: 'Tournament Notes',
      editTeamstitle: 'Max Number of Teams',
      editFormattitle: 'Tournament Format',
      editPrivatetitle: 'Private',
      editorganizertitle: 'Organizer',
      edit: 'Customize',
      participants: 'Participants',
      bracket: 'Tournament Bracket',
      schedule: 'Match Schedule',
      Advanced: 'Advanced',
      present: 'Present',
      results: 'Results',
      cancelTournament: 'Cancel Tournament',
      cancelButton: 'Cancel Tournament',
      title: 'Are you sure?',
      description: 'Please enter your password to cancel this tournament:',
      placeholder: 'Enter your password',
      confirmBtn: 'Confirm',
      cancelBtn: 'Cancel',
      error: 'Wrong password. Please try again.',
      successTitle: 'Tournament Cancelled',
      successText: 'The tournament has been successfully cancelled.',
      okBtn: 'OK',
      sponsorsLabel: 'Sponsors',
      sponsorsAdd: 'Add Sponsor',
      sponsorNamePlaceholder: 'Sponsor name...',
      sponsorSelectLogo: 'Select sponsor logo',
      sponsorLogoAlt: 'Sponsor logo',
      partnersLabel: 'Partners',
      partnersAdd: 'Add Partner',
      partnerNamePlaceholder: 'Partner name...',
      partnerSelectLogo: 'Select partner logo',
      partnerLogoAlt: 'Partner logo',
      fullscreenExit: 'x',
      fullscreenAlt: 'Fullscreen logo',
      participantsLabel: 'Participants',
      searchPlaceholder: 'Search player or team...',
      avatarAlt: 'Avatar',
      noTeam: 'No team',
      namePlaceholder: 'Name',
      teamPlaceholder: 'Team',
      invitePlayersLabel: 'Invite players',
      invitePlaceholder: 'Email or username',
      inviteButton: 'Invite',
      addGuestLabel: 'Add guest',
      guestNamePlaceholder: 'Name',
      guestTeamPlaceholder: 'Team name',
      addGuestButton: 'Add guest',
      participantsCount: 'Participants',
      withoutTeamCount: 'Without team',
      advancedSettingsLabel: 'Advanced settings',
      ageGroupsLabel: 'Age groups',
      all: 'All',
      adults: 'Adults',
      seniors: 'Seniors',
      skillLevelLabel: 'Skill level',
      beginner: 'Beginner',
      advanced: 'Advanced',
      pro: 'Pro',
      prizesLabel: 'Cash prizes or awards',
      prizesPlaceholder: 'Cash prize or medals',
      leagueLabel: 'Tournament league',
      leaguePlaceholder: 'Tournament league',
      tournamentcreatesucces: 'Tournament successfully created',
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
      tournamentTitle: 'Créer un tournoi',
      name: 'Nom',
      nameInfo: 'Entrez le nom de votre tournoi.',
      organizer: 'Organisateur (optionnel)',
      organizerInfo:
        'L’organisateur est la personne ou l’organisation qui planifie, gère et supervise le tournoi.',
      date: 'Date',
      dateInfo: 'Sélectionnez la date du tournoi.',
      location: 'Lieu',
      locationInfo: 'Entrez le lieu où se déroulera le tournoi.',
      teams: 'Équipes (optionnel)',
      teamsInfo: "Nombre d'équipes pouvant participer à ce tournoi.",
      notes: 'Notes (optionnel)',
      notesInfo:
        'Ajoutez des informations ou règles supplémentaires pour le tournoi.',
      privateTournament: 'Privé',
      privateInfo:
        '<strong>Privé :</strong> Seules les personnes invitées peuvent participer, non listé publiquement.<br><strong>Public :</strong> Le tournoi est listé publiquement et tout le monde peut participer.',
      fee: 'Frais d’inscription (optionnel)',
      feeInfo: 'Montant que les participants doivent payer pour s’inscrire.',
      createTournamentBtn: 'Créer le tournoi',
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
      loginToJoin: 'Connecte-toi pour créer un tournoi',
      tournamentFormat: 'Format',
      tournamentFormatInfo:
        'Solo : Joueurs seuls. Duo : Deux joueurs par équipe.',
      editNametitle: 'Nom du tournoi',
      editDatetitle: 'Date de l’événement',
      editLocationtitle: 'Lieu du tournoi',
      editNotestitle: 'Remarques sur le tournoi	',
      editTeamstitle: 'Nombre max d’équipes',
      editFormattitle: 'Format du tournoi',
      editPrivatetitle: 'Tournoi privé (par défaut : public)',
      editorganizertitle: 'Organisateur',
      edit: 'Personnaliser',
      participants: 'Participants',
      bracket: 'Arbre du tournoi',
      schedule: 'Calendrier des matchs',
      Advanced: 'Avancé',
      present: 'Présenter',
      results: 'Résultats',
      cancelTournament: 'Annuler le tournoi',
      cancelButton: 'Annuler le tournoi',
      title: 'Es-tu sûr ?',
      description:
        'Veuillez entrer votre mot de passe pour annuler ce tournoi :',
      placeholder: 'Entrez votre mot de passe',
      confirmBtn: 'Confirmer',
      cancelBtn: 'Annuler',
      error: 'Mot de passe incorrect. Veuillez réessayer.',
      successTitle: 'Tournoi annulé',
      successText: 'Le tournoi a été annulé avec succès.',
      okBtn: 'OK',
      sponsorsLabel: 'Sponsors',
      sponsorsAdd: 'Ajouter un sponsor',
      sponsorNamePlaceholder: 'Nom du sponsor...',
      sponsorSelectLogo: 'Sélectionner le logo du sponsor',
      sponsorLogoAlt: 'Logo du sponsor',
      partnersLabel: 'Partenaires',
      partnersAdd: 'Ajouter un partenaire',
      partnerNamePlaceholder: 'Nom du partenaire...',
      partnerSelectLogo: 'Sélectionner le logo du partenaire',
      partnerLogoAlt: 'Logo du partenaire',
      fullscreenExit: 'x',
      fullscreenAlt: 'Logo en plein écran',
      participantsLabel: 'Participants',
      searchPlaceholder: 'Rechercher un joueur ou une équipe...',
      avatarAlt: 'Avatar',
      noTeam: 'Pas d’équipe',
      namePlaceholder: 'Nom',
      teamPlaceholder: 'Équipe',
      invitePlayersLabel: 'Inviter des joueurs',
      invitePlaceholder: 'Email ou nom d’utilisateur',
      inviteButton: 'Inviter',
      addGuestLabel: 'Ajouter un invité',
      guestNamePlaceholder: 'Nom',
      guestTeamPlaceholder: 'Nom de l’équipe',
      addGuestButton: 'Ajouter un invité',
      participantsCount: 'Participants',
      withoutTeamCount: 'Sans équipe',
      advancedSettingsLabel: 'Paramètres avancés',
      ageGroupsLabel: 'Catégories d’âge',
      all: 'Tous',
      adults: 'Adultes',
      seniors: 'Seniors',
      skillLevelLabel: 'Niveau de compétence',
      beginner: 'Débutant',
      advanced: 'Avancé',
      pro: 'Pro',
      prizesLabel: 'Prix en argent ou en nature',
      prizesPlaceholder: 'Prix en argent ou médailles',
      leagueLabel: 'Ligue du tournoi',
      leaguePlaceholder: 'Ligue du tournoi',
      tournamentcreatesucces: 'Tournoi créé avec succès',
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
      tournamentTitle: 'Crear un torneo',
      name: 'Nombre',
      nameInfo: 'Introduce el nombre de tu torneo.',
      organizer: 'Organizador  (opcional)',
      organizerInfo:
        'El organizador es la persona u organización que planifica, gestiona y dirige el torneo.',
      date: 'Fecha',
      dateInfo: 'Selecciona la fecha en la que se celebrará el torneo.',
      location: 'Ubicación',
      locationInfo: 'Introduce la ubicación donde se celebrará el torneo.',
      teams: 'Equipos (opcional)',
      teamsInfo: 'Número de equipos que pueden participar en este torneo.',
      notes: 'Notas (opcional)',
      notesInfo: 'Agrega información adicional o reglas para el torneo.',
      privateTournament: 'Privado',
      privateInfo:
        '<strong>Privado:</strong> Solo personas invitadas pueden unirse, no aparece globalmente.<br><strong>Público:</strong> El torneo aparece globalmente y cualquiera puede unirse.',
      fee: 'Cuota de inscripción (opcional)',
      feeInfo: 'Monto que deben pagar los participantes para unirse al torneo.',
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
      tournamentFormatInfo:
        'Solo: Solo jugadores individuales. Dúo: Dos jugadores por equipo.',
      editNametitle: 'Nombre del torneo',
      editDatetitle: 'Fecha del evento',
      editLocationtitle: 'Lugar del torneo',
      editNotestitle: 'Notas sobre el torneo',
      editTeamstitle: 'Número de equipos',
      editFormattitle: 'Formato del torneo',
      editPrivatetitle: 'Torneo privado (por defecto: público)',
      editorganizertitle: 'Organizador',
      edit: 'Personalizar',
      participants: 'Participantes',
      bracket: 'Cuadro del torneo',
      schedule: 'Calendario de partidos',
      Advanced: 'Avanzado',
      present: 'Presentar',
      results: 'Resultados',
      cancelTournament: 'Cancelar torneo',
      cancelButton: 'Cancelar torneo',
      title: '¿Estás seguro?',
      description: 'Por favor ingresa tu contraseña para cancelar este torneo:',
      placeholder: 'Ingresa tu contraseña',
      confirmBtn: 'Confirmar',
      cancelBtn: 'Cancelar',
      error: 'Contraseña incorrecta. Inténtalo de nuevo.',
      successTitle: 'Torneo cancelado',
      successText: 'El torneo ha sido cancelado con éxito.',
      okBtn: 'OK',
      sponsorsLabel: 'Patrocinadores',
      sponsorsAdd: 'Añadir patrocinador',
      sponsorNamePlaceholder: 'Nombre del patrocinador...',
      sponsorSelectLogo: 'Seleccionar logo del patrocinador',
      sponsorLogoAlt: 'Logo del patrocinador',
      partnersLabel: 'Socios',
      partnersAdd: 'Añadir socio',
      partnerNamePlaceholder: 'Nombre del socio...',
      partnerSelectLogo: 'Seleccionar logo del socio',
      partnerLogoAlt: 'Logo del socio',
      fullscreenExit: 'x',
      fullscreenAlt: 'Logo a pantalla completa',
      participantsLabel: 'Participantes',
      searchPlaceholder: 'Buscar jugador o equipo...',
      avatarAlt: 'Avatar',
      noTeam: 'Sin equipo',
      namePlaceholder: 'Nombre',
      teamPlaceholder: 'Equipo',
      invitePlayersLabel: 'Invitar jugadores',
      invitePlaceholder: 'Correo electrónico o nombre de usuario',
      inviteButton: 'Invitar',
      addGuestLabel: 'Añadir invitado',
      guestNamePlaceholder: 'Nombre',
      guestTeamPlaceholder: 'Nombre del equipo',
      addGuestButton: 'Añadir invitado',
      participantsCount: 'Participantes',
      withoutTeamCount: 'Sin equipo',
      advancedSettingsLabel: 'Configuración avanzada',
      ageGroupsLabel: 'Grupos de edad',
      all: 'Todos',
      adults: 'Adultos',
      seniors: 'Personas mayores',
      skillLevelLabel: 'Nivel de habilidad',
      beginner: 'Principiante',
      advanced: 'Avanzado',
      pro: 'Profesional',
      prizesLabel: 'Premios en efectivo o en especie',
      prizesPlaceholder: 'Premio en efectivo o medallas',
      leagueLabel: 'Liga del torneo',
      leaguePlaceholder: 'Liga del torneo',
      tournamentcreatesucces: 'Torneo creado con éxito',
    },
  };

  t = this.translations[this.selectedLang];

  userProfile: any = null;
  isProfileLoading = false;
  showResetForm = false;
  resetEmail = '';
  resetRequested = false;

  advancedSettings = {
    ageGroup: '',
    skillLevel: '',
    prizes: '',
    league: '',
    partnerLink: '',
    playerRoles: [],
    sponsorLogo: null as File | null,
    partnerLogo: null as File | null,
    sponsorName: '',
  };

  sponsors: { name: string; logoUrl: string | null }[] = [];
  partners: { name: string; logoUrl: string | null }[] = [];
  fullscreenImageUrl: string | null = null;

  constructor(
    public globalAuth: GlobalAuth,
    private userProfileService: UserProfileService,
    private router: Router,
    private tournamentService: TournamentService
  ) {}

  ngOnInit(): void {
    this.setInitialTheme();
    const saved = localStorage.getItem('lang');
    if (saved && ['de', 'en', 'fr', 'es'].includes(saved)) {
      this.selectedLang = saved as LanguageCode;
    }
    this.applyTranslations();
    this.loadUserProfile();

    const savedTournaments = JSON.parse(
      localStorage.getItem('tournaments') || '[]'
    );
    this.hasTournament =
      Array.isArray(savedTournaments) && savedTournaments.length > 0;

    this.tournament = {
      id: '',
      name: '',
      date: '',
      location: '',
      teams: '',
      notes: '',
      rules: '',
      private: false,
      format: '',
      organizer: '',
      fee: '',
    };
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

  goToProfile() {
    this.router.navigate(['/profile']);
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

    if (!this.tournament.id) {
      this.tournament.id =
        't_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
    }

    // Initialisiere alle Felder
    const tournamentObj = {
      ...this.tournament,
      participants: [],
      bracket: null,
      results: [],
      schedule: [],
      rules: this.tournament.rules || '',
    };

    const all = JSON.parse(localStorage.getItem('tournaments') || '[]');
    const idx = all.findIndex((t: any) => t.id === tournamentObj.id);
    if (idx >= 0) {
      all[idx] = tournamentObj;
    } else {
      all.push(tournamentObj);
    }
    localStorage.setItem('tournaments', JSON.stringify(all));

    this.tournamentService.setTournament(tournamentObj);
    this.showSuccess = true;

    setTimeout(() => {
      this.showSuccess = false;
      this.router.navigate(['/manage']);
    }, 3000);
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

  editSelect() {
    this.editSelected = true;
    this.participantsSelected = false;
    this.bracketSelected = false;
    this.scheduleSelected = false;
    this.extendedSelected = false;
    this.resultsSelected = false;
    this.presentSelected = false;
  }

  participantsSelect() {
    this.editSelected = false;
    this.participantsSelected = true;
    this.bracketSelected = false;
    this.scheduleSelected = false;
    this.extendedSelected = false;
    this.resultsSelected = false;
    this.presentSelected = false;
  }
  bracketSelect() {
    this.editSelected = false;
    this.participantsSelected = false;
    this.bracketSelected = true;
    this.scheduleSelected = false;
    this.extendedSelected = false;
    this.resultsSelected = false;
    this.presentSelected = false;
  }
  scheduleSelect() {
    this.editSelected = false;
    this.participantsSelected = false;
    this.bracketSelected = false;
    this.scheduleSelected = true;
    this.extendedSelected = false;
    this.resultsSelected = false;
    this.presentSelected = false;
  }
  extendedSelect() {
    this.editSelected = false;
    this.participantsSelected = false;
    this.bracketSelected = false;
    this.scheduleSelected = false;
    this.extendedSelected = true;
    this.resultsSelected = false;
    this.presentSelected = false;
  }
  presentSelect() {
    this.editSelected = false;
    this.participantsSelected = false;
    this.bracketSelected = false;
    this.scheduleSelected = false;
    this.extendedSelected = false;
    this.resultsSelected = false;
    this.presentSelected = true;
  }
  resultsSelect() {
    this.editSelected = false;
    this.participantsSelected = false;
    this.bracketSelected = false;
    this.scheduleSelected = false;
    this.extendedSelected = false;
    this.resultsSelected = true;
    this.presentSelected = false;
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
  confirmCancel() {
    const correctPassword = 'Passwort123';
    if (this.confirmPassword.trim() === '') {
      this.passwordInvalid = true;
      this.cancelSuccess = false;
      return;
    }

    if (this.confirmPassword === correctPassword) {
      this.passwordInvalid = false;
      this.cancelSuccess = true;
    } else {
      this.passwordInvalid = true;
      this.cancelSuccess = false;
    }
  }

  closeDialog() {
    this.showConfirm = false;
    this.confirmPassword = '';
    this.passwordInvalid = false;
    this.cancelSuccess = false;
  }

  showImage(imageSrc: string) {
    this.modalImageSrc = imageSrc;
    this.showImageModal = true;
  }

  closeImageModal() {
    this.showImageModal = false;
    this.modalImageSrc = '';
  }

  showPlayerInfo(player: any) {
    alert(`Hier noch Funktion mit Backend machen`);
  }

  teamColors = new Map<string, string>();
  usedColors: string[] = [];

  filteredPlayers() {
    const query = this.searchQuery.toLowerCase();
    return this.players.filter(
      (player) =>
        player.name.toLowerCase().includes(query) ||
        (player.team && player.team.toLowerCase().includes(query))
    );
  }

  kickPlayer(event: MouseEvent, player: any) {
    event.stopPropagation();
    this.players = this.players.filter((p) => p !== player);
  }

  addGuest() {
    if (!this.guestName.trim()) return;

    const newGuest = {
      name: this.guestName.trim(),
      team: this.guestTeam.trim() || '',
      avatar: 'assets/images/default-profile.png',
    };

    this.players.push(newGuest);
    this.guestName = '';
    this.guestTeam = '';
  }

  countPlayersWithoutTeam() {
    return this.players.filter((p) => !p.team || p.team.trim() === '').length;
  }

  getTeamColor(team: string): string {
    if (!team) return 'transparent';

    if (!this.teamColors.has(team)) {
      const newColor = this.generateUniqueColor();
      this.teamColors.set(team, newColor);
    }

    return this.teamColors.get(team)!;
  }

  generateUniqueColor(): string {
    const colors = [
      '#f44336',
      '#2196f3',
      '#4caf50',
      '#ff9800',
      '#9c27b0',
      '#00bcd4',
      '#ff5722',
      '#8bc34a',
      '#ffc107',
      '#673ab7',
      '#3f51b5',
      '#e91e63',
    ];

    const available = colors.filter((c) => !this.usedColors.includes(c));
    const color = available.length
      ? available[0]
      : `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    this.usedColors.push(color);
    return color;
  }
  toggleEdit(event: MouseEvent, index: number) {
    event.stopPropagation();
    if (this.editIndex === index) {
      this.editIndex = null;
    } else {
      this.editIndex = index;
    }
  }

  addSponsor() {
    this.sponsors.push({ name: '', logoUrl: null });
  }

  addPartner() {
    this.partners.push({ name: '', logoUrl: null });
  }

  deleteSponsor(index: number) {
    this.sponsors.splice(index, 1);
  }

  deletePartner(index: number) {
    this.partners.splice(index, 1);
  }

  isValidImage(file: File): boolean {
    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    return allowed.includes(file.type);
  }

  onSponsorFileSelected(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file || !this.isValidImage(file)) {
      alert('Nur JPG, PNG, GIF, WebP erlaubt!');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    this.sponsors[index].logoUrl = objectUrl;
  }

  onPartnerFileSelected(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file || !this.isValidImage(file)) {
      alert('Nur JPG, PNG, GIF, WebP erlaubt!');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    this.partners[index].logoUrl = objectUrl;
  }

  openFullscreen(imageUrl: string) {
    this.fullscreenImageUrl = imageUrl;
  }

  closeFullscreen(event?: Event) {
    if (event) event.stopPropagation();
    this.fullscreenImageUrl = null;
  }
}
