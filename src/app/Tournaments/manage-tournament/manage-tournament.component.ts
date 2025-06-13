import { Component, OnInit } from '@angular/core';
import { GlobalAuth } from '../../global-auth';
import { UserProfileService } from '../../Services/user-profile.service';
import { Router } from '@angular/router';
import { TournamentService } from '../../Services/tournament.service';

type LanguageCode = 'de' | 'en' | 'fr' | 'es';

@Component({
  selector: 'app-manage-tournament',
  templateUrl: './manage-tournament.component.html',
  styleUrl: './manage-tournament.component.scss',
  standalone: false,
})
export class ManageTournamentComponent implements OnInit {
  isNavOpen: boolean = false;
  expandedId: number | null = null;
  hasTournament = false;

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
  editFee = false;
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
  phaseNotSelected = true;
  onlyGroupSelected  = false;
  groupAndKoSelected = false;
  onlyKoPhaseSelected = false;
  tournament: any;
  showMobileWarning = false;

  rounds: any[][] = [];

  languages = [
    { code: 'de' as LanguageCode, label: 'Deutsch' },
    { code: 'en' as LanguageCode, label: 'English' },
    { code: 'fr' as LanguageCode, label: 'Français' },
    { code: 'es' as LanguageCode, label: 'Español' },
  ];

  players = [
  { name: 'Olivia Müller', team: 'Team 1', avatar: 'https://randomuser.me/api/portraits/women/25.jpg' },
  { name: 'David Hoffmann', team: 'Team 1', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { name: 'Greta Wagner', team: 'Team 2', avatar: 'https://randomuser.me/api/portraits/men/12.jpg' },
  { name: 'Clara Schmidt', team: 'Team 2', avatar: 'https://randomuser.me/api/portraits/women/39.jpg' },
  { name: 'Anna Schmidt', team: 'Team 3', avatar: 'https://randomuser.me/api/portraits/women/48.jpg' },
  { name: 'Olivia Weber', team: 'Team 3', avatar: 'https://randomuser.me/api/portraits/women/82.jpg' },
  { name: 'Lukas König', team: 'Team 4', avatar: 'https://randomuser.me/api/portraits/men/53.jpg' },
  { name: 'Isabel Schulz', team: 'Team 4', avatar: 'https://randomuser.me/api/portraits/men/39.jpg' },
  { name: 'Jonas Müller', team: 'Team 5', avatar: 'https://randomuser.me/api/portraits/men/99.jpg' },
  { name: 'Noah König', team: 'Team 5', avatar: 'https://randomuser.me/api/portraits/men/21.jpg' },
  { name: 'Quirin König', team: 'Team 6', avatar: 'https://randomuser.me/api/portraits/men/25.jpg' },
  { name: 'Rosa Hoffmann', team: 'Team 6', avatar: 'https://randomuser.me/api/portraits/men/10.jpg' },
  { name: 'Simon Müller', team: 'Team 7', avatar: 'https://randomuser.me/api/portraits/men/55.jpg' },
  { name: 'Mia Schmidt', team: 'Team 7', avatar: 'https://randomuser.me/api/portraits/women/90.jpg' },
  { name: 'Anna Becker', team: 'Team 8', avatar: 'https://randomuser.me/api/portraits/women/72.jpg' },
  { name: 'Noah Weber', team: 'Team 8', avatar: 'https://randomuser.me/api/portraits/men/98.jpg' },
  { name: 'Olivia Schneider', team: 'Team 9', avatar: 'https://randomuser.me/api/portraits/men/34.jpg' },
  { name: 'Isabel Schulz', team: 'Team 9', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { name: 'Henry Müller', team: 'Team 10', avatar: 'https://randomuser.me/api/portraits/men/33.jpg' },
  { name: 'David Weber', team: 'Team 10', avatar: 'https://randomuser.me/api/portraits/women/71.jpg' },
  { name: 'Klara Schulz', team: 'Team 11', avatar: 'https://randomuser.me/api/portraits/women/83.jpg' },
  { name: 'Lukas Schulz', team: 'Team 11', avatar: 'https://randomuser.me/api/portraits/women/57.jpg' },
  { name: 'Quirin Müller', team: 'Team 12', avatar: 'https://randomuser.me/api/portraits/women/99.jpg' },
  { name: 'Klara Becker', team: 'Team 12', avatar: 'https://randomuser.me/api/portraits/women/70.jpg' },
  { name: 'Rosa Schmidt', team: 'Team 13', avatar: 'https://randomuser.me/api/portraits/men/83.jpg' },
  { name: 'Paul Schneider', team: 'Team 13', avatar: 'https://randomuser.me/api/portraits/men/69.jpg' },
  { name: 'Simon Müller', team: 'Team 14', avatar: 'https://randomuser.me/api/portraits/men/63.jpg' },
  { name: 'Henry Weber', team: 'Team 14', avatar: 'https://randomuser.me/api/portraits/women/30.jpg' },
  { name: 'Tina Weber', team: 'Team 15', avatar: 'https://randomuser.me/api/portraits/women/63.jpg' },
  { name: 'Anna Müller', team: 'Team 15', avatar: 'https://randomuser.me/api/portraits/men/15.jpg' },
  { name: 'Henry Weber', team: 'Team 16', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { name: 'Ben Weber', team: 'Team 16', avatar: 'https://randomuser.me/api/portraits/men/76.jpg' },
  { name: 'David Müller', team: 'Team 17', avatar: 'https://randomuser.me/api/portraits/men/6.jpg' },
  { name: 'Greta König', team: 'Team 17', avatar: 'https://randomuser.me/api/portraits/men/60.jpg' },
  { name: 'Noah König', team: 'Team 18', avatar: 'https://randomuser.me/api/portraits/men/92.jpg' },
  { name: 'Anna Schmidt', team: 'Team 18', avatar: 'https://randomuser.me/api/portraits/men/51.jpg' },
  { name: 'Isabel Weber', team: 'Team 19', avatar: 'https://randomuser.me/api/portraits/women/14.jpg' },
  { name: 'Greta Schmidt', team: 'Team 19', avatar: 'https://randomuser.me/api/portraits/women/55.jpg' },
  { name: 'Jonas Schulz', team: 'Team 20', avatar: 'https://randomuser.me/api/portraits/men/82.jpg' },
  { name: 'Isabel König', team: 'Team 20', avatar: 'https://randomuser.me/api/portraits/women/22.jpg' },
  { name: 'Paul Hoffmann', team: 'Team 21', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { name: 'Emma Schulz', team: 'Team 21', avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
  { name: 'Ben Becker', team: 'Team 22', avatar: 'https://randomuser.me/api/portraits/men/77.jpg' },
  { name: 'Tina Becker', team: 'Team 22', avatar: 'https://randomuser.me/api/portraits/women/77.jpg' },
  { name: 'Felix Schneider', team: 'Team 23', avatar: 'https://randomuser.me/api/portraits/men/44.jpg' },
  { name: 'Emma Becker', team: 'Team 23', avatar: 'https://randomuser.me/api/portraits/women/88.jpg' },
  { name: 'Jonas Schneider', team: 'Team 24', avatar: 'https://randomuser.me/api/portraits/men/33.jpg' },
  { name: 'Mia Hoffmann', team: 'Team 24', avatar: 'https://randomuser.me/api/portraits/women/99.jpg' },
  { name: 'Paul König', team: 'Team 25', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { name: 'Clara Becker', team: 'Team 25', avatar: 'https://randomuser.me/api/portraits/women/66.jpg' },
  { name: 'Felix Hoffmann', team: 'Team 26', avatar: 'https://randomuser.me/api/portraits/men/88.jpg' },
  { name: 'Emma Wagner', team: 'Team 26', avatar: 'https://randomuser.me/api/portraits/women/11.jpg' },
  { name: 'Ben Schulz', team: 'Team 27', avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
  { name: 'Greta Schulz', team: 'Team 27', avatar: 'https://randomuser.me/api/portraits/women/33.jpg' },
  { name: 'Jonas Becker', team: 'Team 28', avatar: 'https://randomuser.me/api/portraits/men/66.jpg' },
  { name: 'Tina Schulz', team: 'Team 28', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Simon Schulz', team: 'Team 29', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' },
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
      privacyPolicy: 'Datenschutz',
      termsOfService: 'Nutzungsbedingungen',
      contact: 'Kontakt',
      editNametitle: 'Name des Turniers',
      editDatetitle: 'Veranstaltungsdatum',
      editLocationtitle: 'Austragungsort',
      editNotestitle: 'Hinweise zum Turnier',
      editTeamstitle: 'Max Anzahl an Teams',
      editFormattitle: 'Turnierformat',
      editPrivatetitle: 'Privates Turnier (Standard: öffentlich)',
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
      description: 'Bitte gib dein Passwort ein, um dieses Turnier abzubrechen:',
      placeholder: 'Passwort eingeben',
      confirmBtn: 'Bestätigen',
      cancelBtn: 'Abbrechen',
      error: 'Falsches Passwort. Bitte erneut versuchen.',
      successTitle: 'Turnier abgebrochen',
      successText: 'Das Turnier wurde erfolgreich abgebrochen.',
      okBtn: 'OK',
      sponsorsLabel: "Sponsoren",
      sponsorsAdd: "Sponsor hinzufügen",
      sponsorNamePlaceholder: "Sponsor Name...",
      sponsorSelectLogo: "Sponsor Logo auswählen",
      sponsorLogoAlt: "Sponsor Logo",
      partnersLabel: "Partner",
      partnersAdd: "Partner hinzufügen",
      partnerNamePlaceholder: "Partner Name...",
      partnerSelectLogo: "Partner Logo auswählen",
      partnerLogoAlt: "Partner Logo",
      fullscreenExit: "x",
      fullscreenAlt: "Vollbild Logo",
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
      tournamentResultsTitle: "Turnier-Ergebnisse",
      rank: "Platz",
      team: "Team",
      players: "Spieler",
      matches: "Spiele",
      wins: "Siege",
      losses: "Niederlagen",
      points: "Punkte",
      editHallFields: 'Halle bearbeiten',
      hallEditorTitle: 'Hallenfeld-Editor',
      addField: 'Feld hinzufügen',
      field: 'Feld',
      clickFieldToSelect: 'Klicke auf ein Feld, um es auszuwählen',
      randomizer: 'Zufallsgenerator',
      editFeetitle: 'Startgeld bearbeiten',
      choosePhase: 'Wähle deine Phase',
      onlygroup: 'nur Gruppenphase',
      onlykophase: 'nur K.O.-Phase',
      groupandko: 'Gruppen- und K.O.-Phase',
      Team: 'Team',
      Games: 'Spiele',
      Points: 'Punkte',
      Throws: '1 Punkt',
      Hits: '3 Punkte',
      Accuracy: 'Trefferrate',
      Diff: 'Differenz',
      Group: 'Gruppe',
      mobileWarning: 'Die Turnierverwaltung ist auf dem Desktop empfohlen, da sie auf Mobilgeräten nicht optimal funktioniert.',
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
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      contact: 'Contact',
      editNametitle: 'Tournament Name',
      editDatetitle: 'Event Date',
      editLocationtitle: 'Tournament Location',
      editNotestitle: 'Tournament Notes',
      editTeamstitle: 'Max Number of Teams',
      editFormattitle: 'Tournament Format',
      editPrivatetitle: 'Private Tournament (default: public)',
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
      tournamentResultsTitle: "Tournament Results",
      rank: "Rank",
      team: "Team",
      players: "Player",
      matches: "Matches",
      wins: "Wins",
      losses: "Losses",
      points: "Points",
      editHallFields: 'Edit Hall Fields',
      hallEditorTitle: 'Hall Field Editor',
      addField: 'Add Field',
      field: 'Field',
      clickFieldToSelect: 'Click a field to select',
      randomizer: 'Randomizer',
      editFeetitle: 'Edit fee',
      choosePhase: 'Choose your phase',
      onlygroup: 'Group stage only',
      onlykophase: 'Knockout stage only',
      groupandko: 'Group & knockout stage',
      Team: 'Team',
      Games: 'Games',
      Points: 'Points',
      Throws: 'Throws',
      Hits: '1 Point',
      Accuracy: '3 Point',
      Diff: 'Difference',
      Group: 'Group',
      mobileWarning: 'Managing tournaments is recommended on desktop, as the experience on mobile is not optimal.',
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
      privacyPolicy: 'Politique de confidentialité',
      termsOfService: 'Conditions d\'utilisation',
      contact: 'Contact',
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
      description: 'Veuillez entrer votre mot de passe pour annuler ce tournoi :',
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
      guestTeamPlaceholder: "Nom de l’équipe",
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
      tournamentResultsTitle: "Résultats du tournoi",
      rank: "Rang",
      team: "Équipe",
      players: "Joueurs",
      matches: "Matchs",
      wins: "Victoires",
      losses: "Défaites",
      points: "Points",
      editHallFields: 'Modifier les terrains',
      hallEditorTitle: 'Éditeur de terrains',
      addField: 'Ajouter un terrain',
      field: 'Terrain',
      clickFieldToSelect: 'Cliquez sur un terrain pour le sélectionner',
      randomizer: 'Randomiseur',
      editFeetitle: 'Modifier les frais',
      choosePhase: 'Choisis ta phase',
      onlygroup: 'Phase de groupes uniquement',
      onlykophase: 'Phase à élimination directe uniquement',
      groupandko: 'Phase de groupes et à élimination directe',
      Team: 'Équipe',
      Games: 'Matchs',
      Points: 'Points',
      Throws: '1 Point',
      Hits: '3 Point',
      Accuracy: 'Précision',
      Diff: 'Différence',
      Group: 'Groupe',
      mobileWarning: 'La gestion du tournoi est recommandée sur ordinateur, car l’expérience mobile n’est pas optimale.',
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
      privacyPolicy: 'Política de privacidad',
      termsOfService: 'Términos de servicio',
      contact: 'Contacto',
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
      tournamentResultsTitle: "Resultados del torneo",
      rank: "Puesto",
      team: "Equipo",
      players: "Jugadores",
      matches: "Partidos",
      wins: "Victorias",
      losses: "Derrotas",
      points: "Puntos",
      editHallFields: 'Editar campos de la sala',
      hallEditorTitle: 'Editor de campos',
      addField: 'Agregar campo',
      field: 'Campo',
      clickFieldToSelect: 'Haz clic en un campo para seleccionarlo',
      randomizer: 'Aleatorizador',
      editFeetitle: 'Modificar cuota',
      choosePhase: 'Elige tu fase',
      onlygroup: 'Solo fase de grupos',
      onlykophase: 'Solo fase eliminatoria',
      groupandko: 'Fase de grupos y eliminatoria',
      Team: 'Equipo',
      Games: 'Partidos',
      Points: 'Puntos',
      Throws: '1 	Punto',
      Hits: '3 Punto',
      Accuracy: 'Aciertos',
      Diff: 'Diferencia',
      Group: 'Grupo',
      mobileWarning: 'Se recomienda gestionar el torneo en escritorio, ya que la experiencia en móvil no es óptima.',
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

  randomizerStartTime: string = '10:00';
  randomizerEndTime: string = '18:00';

  constructor(
    public globalAuth: GlobalAuth,
    private userProfileService: UserProfileService,
    private router: Router,
    private tournamentService: TournamentService,
      ) {}

ngOnInit(): void {
    this.checkMobileWarning();
    window.addEventListener('resize', this.checkMobileWarning);
    this.setInitialTheme();
    const saved = localStorage.getItem('lang');
    if (saved && ['de', 'en', 'fr', 'es'].includes(saved)) {
      this.selectedLang = saved as LanguageCode;
    }
    this.applyTranslations();  
    this.loadUserProfile(); 

    const teams = this.getTeamsFromPlayers(this.players);
    this.rounds = this.generateRounds(teams);

    this.tournamentService.tournament$.subscribe(t => {
    this.tournament = t;
    });

    this.loadSavedTournaments();
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.checkMobileWarning);
  }

  checkMobileWarning = () => {
    this.showMobileWarning = window.innerWidth < 900;
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

matchSchedule = [
  { time: '10:00', teamA: 'Team 1', teamB: 'Team 2', fieldIdx: 0 },
  { time: '10:45', teamA: 'Team 3', teamB: 'Team 4', fieldIdx: 1 },
  { time: '11:30', teamA: 'Team 5', teamB: 'Team 6', fieldIdx: 2 },
  { time: '12:15', teamA: 'Team 7', teamB: 'Team 8', fieldIdx: 3 },
  { time: '13:00', teamA: 'Team 9', teamB: 'Team 10', fieldIdx: 0 },
];

hallFields: { x: number; y: number }[] = [
  { x: 20, y: 20 },
  { x: 60, y: 20 },
  { x: 20, y: 60 },
  { x: 60, y: 60 },
];
selectedFieldIdx: number | null = null;

selectField(idx: number) {
  this.selectedFieldIdx = idx;
}

addField() {
  this.hallFields.push({ x: 40 + Math.random() * 40, y: 40 + Math.random() * 40 });
}

removeField(idx: number) {
  this.hallFields.splice(idx, 1);
  this.matchSchedule.forEach(m => { if (m.fieldIdx === idx) m.fieldIdx});
}

getTeams(): string[] {
  const teams = Array.from(new Set(this.players.map(p => p.team)));
  return teams;
}

randomizeMatches() {
  const teams = this.getTeams().filter(t => t && t.trim() !== '');
  if (teams.length < 2) {
    alert('Not enough teams to create matches.');
    return;
  }
  
  const start = this.randomizerStartTime || '10:00';
  const end = this.randomizerEndTime || '18:00';
  const [startHour, startMin] = start.split(':').map(Number);
  const [endHour, endMin] = end.split(':').map(Number);
  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;
  if (endMinutes <= startMinutes) {
    alert('End time must be after start time.');
    return;
  }

  const shuffled = [...teams].sort(() => Math.random() - 0.5);
  const matches = [];
  const matchDuration = 45; // minutes per match
  const fieldCount = this.hallFields.length;
  const fieldTimes: number[] = Array(fieldCount).fill(startMinutes);
  for (let i = 0; i < shuffled.length; i += 2) {
    const teamA = shuffled[i];
    const teamB = shuffled[i + 1] || '';
    let minIdx = 0;
    for (let f = 1; f < fieldCount; f++) {
      if (fieldTimes[f] < fieldTimes[minIdx]) minIdx = f;
    }
    const matchTime = fieldTimes[minIdx];
    if (matchTime + matchDuration > endMinutes + 1) break; 
    matches.push({
      time: (Math.floor(matchTime / 60)).toString().padStart(2, '0') + ':' + (matchTime % 60).toString().padStart(2, '0'),
      teamA,
      teamB,
      fieldIdx: minIdx
    });
    fieldTimes[minIdx] += matchDuration;
  }
  this.matchSchedule = matches;
}

    editSelect()
    {
      this.resetPhaseFlags();
      this.editSelected = true;
      this.participantsSelected = false;
      this.bracketSelected = false;
      this.scheduleSelected = false;
      this.extendedSelected = false;
      this.resultsSelected = false;
      this.presentSelected = false;
    }

    participantsSelect()
    {
      this.resetPhaseFlags();
      this.editSelected = false;
      this.participantsSelected = true;
      this.bracketSelected = false;
      this.scheduleSelected = false;
      this.extendedSelected = false;
      this.resultsSelected = false;
      this.presentSelected = false;
    }
    bracketSelect()
    {
      this.resetPhaseFlags();
      this.editSelected = false;
      this.participantsSelected = false;
      this.bracketSelected = true;
      this.scheduleSelected = false;
      this.extendedSelected = false;
      this.resultsSelected = false;
      this.presentSelected = false;
    }
    scheduleSelect()
    {
      this.resetPhaseFlags();
      this.editSelected = false;
      this.participantsSelected = false;
      this.bracketSelected = false;
      this.scheduleSelected = true;
      this.extendedSelected = false;
      this.resultsSelected = false;
      this.presentSelected = false;
    }
    extendedSelect()
    {
      this.resetPhaseFlags();
      this.editSelected = false;
      this.participantsSelected = false;
      this.bracketSelected = false;
      this.scheduleSelected = false;
      this.extendedSelected = true;
      this.resultsSelected = false;
      this.presentSelected = false;
    }
    presentSelect()
    {
      this.resetPhaseFlags();
      this.editSelected = false;
      this.participantsSelected = false;
      this.bracketSelected = false;
      this.scheduleSelected = false;
      this.extendedSelected = false;
      this.resultsSelected = false;
      this.presentSelected = true;
    }
    resultsSelect()
    {
      this.resetPhaseFlags();
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
    return this.players.filter(player =>
      player.name.toLowerCase().includes(query) ||
      (player.team && player.team.toLowerCase().includes(query))
    );
  }

  kickPlayer(event: MouseEvent, player: any) {
    event.stopPropagation();
    this.players = this.players.filter(p => p !== player);
  }

  addGuest() {
    if (!this.guestName.trim()) return;

    const newGuest = {
      name: this.guestName.trim(),
      team: this.guestTeam.trim() || '',
      avatar: 'assets/images/default-profile.png'
    };

    this.players.push(newGuest);
    this.guestName = '';
    this.guestTeam = '';
  }

  countPlayersWithoutTeam() {
    return this.players.filter(p => !p.team || p.team.trim() === '').length;
  }

  getTeamColor(team: string): string {
    if (!team) return 'transparent';

    if (!this.teamColors.has(team)) {
      const newColor = this.generateUniqueColor();
      this.teamColors.set(team, newColor);
      this.usedColors.push(newColor); 
    }

    return this.teamColors.get(team)!;
  }

  generateUniqueColor(): string {
    const colors = [
      '#f44336', '#2196f3', '#4caf50', '#ff9800',
      '#9c27b0', '#00bcd4', '#ff5722', '#8bc34a',
      '#ffc107', '#673ab7', '#3f51b5', '#e91e63'
    ];

    const available = colors.filter(c => !this.usedColors.includes(c));
    if (available.length) {
      return available[0];
    }
    // Generate a truly unique color if all are used
    let color;
    do {
      color = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
    } while (this.usedColors.includes(color));
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

  getTeamResults() {
    const teamMap = new Map<string, any[]>();

    for (const player of this.players) {
      const team = player.team || player.name;
      if (!teamMap.has(team)) {
        teamMap.set(team, []);
      }
      teamMap.get(team)!.push(player);
    }

    const results = Array.from(teamMap.entries()).map(([teamName, players], i) => {
      // Ensure color is assigned for every team
      this.getTeamColor(teamName);
      return {
        teamName: teamName,
        players: players,
        matches: 5,
        wins: 100 - i,
        losses: i,
        points: 300 - i * 10,
      };
    });

    return results.sort((a, b) => b.points - a.points);
  }

dropListId = 'match-schedule-drop-list';

defaultMatch() {
  return {
    time: '14:00',
    teamA: this.getTeams()[0] || '',
    teamB: this.getTeams()[1] || '',
    fieldIdx: this.hallFields.length > 0 ? 0 : -1
  };
}

addMatch() {
  this.matchSchedule.push(this.defaultMatch());
}

deleteMatch(index: number) {
  this.matchSchedule.splice(index, 1);
}

removeMatch(index: number) {
  this.matchSchedule.splice(index, 1);
}

onMatchChange(index: number) {
}

onDragStart(index: number) {
}

onDrop(event: any) {
  if (event.previousIndex === event.currentIndex) return;
  const prev = this.matchSchedule[event.previousIndex];
  const curr = this.matchSchedule[event.currentIndex];
  const tempTime = prev.time;
  prev.time = curr.time;
  curr.time = tempTime;
  const moved = this.matchSchedule.splice(event.previousIndex, 1)[0];
  this.matchSchedule.splice(event.currentIndex, 0, moved);
}

hallEditorOpen = false;
hallWidth = 400;
hallHeight = 200;

openHallEditor() {
  this.hallEditorOpen = true;
}

closeHallEditor() {
  this.hallEditorOpen = false;
}

onFieldDrop(event: any) {
  if (event.previousIndex === event.currentIndex) return;
  const moved = this.hallFields.splice(event.previousIndex, 1)[0];
  this.hallFields.splice(event.currentIndex, 0, moved);
}

moveMatchUp(idx: number) {
  if (idx > 0) {
    const temp = this.matchSchedule[idx - 1];
    this.matchSchedule[idx - 1] = this.matchSchedule[idx];
    this.matchSchedule[idx] = temp;
  }
}

moveMatchDown(idx: number) {
  if (idx < this.matchSchedule.length - 1) {
    const temp = this.matchSchedule[idx + 1];
    this.matchSchedule[idx + 1] = this.matchSchedule[idx];
    this.matchSchedule[idx] = temp;
  }
}

draggedFieldIdx: number | null = null;
dragOffset = { x: 0, y: 0 };
isDragging = false;
hallRect: DOMRect | null = null;

startDragField(idx: number, event: MouseEvent | TouchEvent) {
  event.preventDefault();
  this.draggedFieldIdx = idx;
  this.isDragging = true;
  const hall = document.querySelector('.cornhole-hall-bg') as HTMLElement;
  if (hall) this.hallRect = hall.getBoundingClientRect();
  let clientX = 0, clientY = 0;
  if (event instanceof MouseEvent) {
    clientX = event.clientX;
    clientY = event.clientY;
  } else if (event.touches && event.touches.length > 0) {
    clientX = event.touches[0].clientX;
    clientY = event.touches[0].clientY;
  }
  const field = this.hallFields[idx];
  if (this.hallRect) {
    const fieldPx = {
      x: (field.x / 100) * this.hallRect.width,
      y: (field.y / 100) * this.hallRect.height,
    };
    this.dragOffset = {
      x: clientX - (this.hallRect.left + fieldPx.x),
      y: clientY - (this.hallRect.top + fieldPx.y),
    };
  }
  window.addEventListener('mousemove', this.onHallMouseMoveBound);
  window.addEventListener('mouseup', this.onHallMouseUpBound);
  window.addEventListener('touchmove', this.onHallMouseMoveBound, { passive: false });
  window.addEventListener('touchend', this.onHallMouseUpBound);
}

onHallMouseMove = (event: MouseEvent | TouchEvent) => {
  if (this.draggedFieldIdx === null || !this.isDragging || !this.hallRect) return;
  let clientX = 0, clientY = 0;
  if (event instanceof MouseEvent) {
    clientX = event.clientX;
    clientY = event.clientY;
  } else if (event.touches && event.touches.length > 0) {
    clientX = event.touches[0].clientX;
    clientY = event.touches[0].clientY;
    event.preventDefault();
  }
  let newX = clientX - this.hallRect.left - this.dragOffset.x;
  let newY = clientY - this.hallRect.top - this.dragOffset.y;
  const fieldW = 120, fieldH = 60;
  newX = Math.max(0, Math.min(newX, this.hallRect.width - fieldW));
  newY = Math.max(0, Math.min(newY, this.hallRect.height - fieldH));
  const percentX = (newX / this.hallRect.width) * 100;
  const percentY = (newY / this.hallRect.height) * 100;
  this.hallFields[this.draggedFieldIdx] = { x: percentX, y: percentY };
};

onHallMouseUp = (event: MouseEvent | TouchEvent) => {
  this.isDragging = false;
  this.draggedFieldIdx = null;
  window.removeEventListener('mousemove', this.onHallMouseMoveBound);
  window.removeEventListener('mouseup', this.onHallMouseUpBound);
  window.removeEventListener('touchmove', this.onHallMouseMoveBound);
  window.removeEventListener('touchend', this.onHallMouseUpBound);
};

onHallMouseDown(idx: number, event: MouseEvent | TouchEvent) {
  this.startDragField(idx, event);
}

onHallMouseMoveBound = (e: any) => this.onHallMouseMove(e);
onHallMouseUpBound = (e: any) => this.onHallMouseUp(e);

saveFee() {
  if (this.tournament) {
    this.tournamentService.setTournament(this.tournament);
  }
  this.editFee = false;
}

selectPhase(phase: string) {
  this.phaseNotSelected = false;
  this.onlyGroupSelected = false;
  this.onlyKoPhaseSelected = false;
  this.groupAndKoSelected = false;
  if (phase === 'Group') {
    this.onlyGroupSelected = true;
    this.generateGroups();
    this.generateGroupMatches();
    this.updateGroupTables();
  }
  if (phase === 'Ko') {
    this.onlyKoPhaseSelected = true;
  }
  if (phase === 'groupAndKo') {
    this.groupAndKoSelected = true;
    this.generateGroups();
    this.generateGroupMatches();
    this.updateGroupTables();
  }
}

getRounds(participantCount: number) {
  let rounds = [];
  let currentRoundTeams = this.players.slice();

  if (currentRoundTeams.length < 2) return [];

  while (currentRoundTeams.length > 1) {
    let matches = [];
    for (let i = 0; i < currentRoundTeams.length; i += 2) {
      matches.push([
        currentRoundTeams[i],
        currentRoundTeams[i + 1] || { name: 'TBD', team: '', avatar: '' },
      ]);
    }
    rounds.push(matches);
    currentRoundTeams = new Array(Math.ceil(currentRoundTeams.length / 2)).fill({ name: 'TBD', team: '', avatar: '' });
  }

  return rounds;
}

  groupCount = 4; 
  groupSize = 0;
  groupMatches: any[] = [];
  groupTables: any[] = [];
  advancingTeams: any[] = [];

  teamsPerGroup: number = 4;

  getTeamNames(): string[] {
    const teamSet = new Set<string>();
    this.players.forEach(p => {
      if (p.team && p.team.trim() !== '') teamSet.add(p.team);
    });
    return Array.from(teamSet);
  }

  generateGroups() {
  const teamNames = this.getTeamNames();
  const shuffled = [...teamNames].sort(() => Math.random() - 0.5);
  this.groups = [];

  for (let i = 0; i < shuffled.length; i += this.teamsPerGroup) {
    const teamObjects = shuffled.slice(i, i + this.teamsPerGroup).map(name => ({
      name,
      games: 0,
      points: 0,
      throws: 0,
      hits: 0,
      accuracy: 0,
      diff: 0
    }));

    this.groups.push({
      name: `Group ${Math.floor(i / this.teamsPerGroup) + 1}`,
      teams: teamObjects
    });
  }
}

  generateGroupMatches() {
    this.groupMatches = this.groups.map((group: any) => {
      const matches: any[] = [];
      for (let i = 0; i < group.teams.length; i++) {
        for (let j = i + 1; j < group.teams.length; j++) {
          matches.push({
            teamA: group.teams[i],
            teamB: group.teams[j],
            scoreA: null,
            scoreB: null
          });
        }
      }
      return { groupName: group.name, matches };
    });
  }

  updateGroupTables() {
    this.groupTables = this.groups.map((group: any, gIdx: number) => {
      const table = group.teams.map((team: any) => ({
        team,
        points: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        played: 0
      }));
      const matches = this.groupMatches[gIdx].matches;
      matches.forEach((match: any) => {
        if (match.scoreA !== null && match.scoreB !== null) {
          const teamA = table.find((t: any) => t.team === match.teamA);
          const teamB = table.find((t: any) => t.team === match.teamB);
          teamA.played++;
          teamB.played++;
          teamA.goalsFor += match.scoreA;
          teamA.goalsAgainst += match.scoreB;
          teamB.goalsFor += match.scoreB;
          teamB.goalsAgainst += match.scoreA;
          if (match.scoreA > match.scoreB) {
            teamA.points += 3;
          } else if (match.scoreA < match.scoreB) {
            teamB.points += 3;
          } else {
            teamA.points += 1;
            teamB.points += 1;
          }
        }
      });
      table.sort((a: any, b: any) =>
        b.points - a.points ||
        (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst) ||
        b.goalsFor - a.goalsFor
      );
      return { groupName: group.name, table };
    });
    this.updateAdvancingTeams();
  }

  updateAdvancingTeams() {
    this.advancingTeams = [];
    this.groupTables.forEach((groupTable: any) => {
      this.advancingTeams.push(groupTable.table[0].team);
      if (groupTable.table[1]) this.advancingTeams.push(groupTable.table[1].team);
    });
  }

  getKoPairings() {
    const pairings = [];
    for (let i = 0; i < this.groupCount; i++) {
      const first = this.groupTables[i]?.table[0]?.team;
      const second = this.groupTables[(i + 1) % this.groupCount]?.table[1]?.team;
      if (first && second) {
        pairings.push([first, second]);
      }
    }
    return pairings;
  }
  getPlayersForTeam(teamName: string) {
  return this.players.filter(player => player.team === teamName);
}

groups = [
  {
    name: 'Group A',
    teams: [
      {
        name: 'Team 1',
        games: 3,
        points: 6,
        throws: 50,
        hits: 30,
        accuracy: 60,
        diff: 10
      },
      {
        name: 'Team 2',
        games: 3,
        points: 4,
        throws: 48,
        hits: 28,
        accuracy: 58,
        diff: 5
      }
    ]
  },
  {
    name: 'Group B',
    teams: [
      {
        name: 'Team 3',
        games: 3,
        points: 5,
        throws: 52,
        hits: 29,
        accuracy: 56,
        diff: 7
      }
    ]
  }
];

getTeamsForBracket() {
  const uniqueTeams = new Map<string, { name: string; team: string; avatar: string }>();
  for (const p of this.players) {
    if (!uniqueTeams.has(p.team)) {
      uniqueTeams.set(p.team, {
        name: p.team,
        team: p.team,
        avatar: p.avatar, 
      });
    }
  }
  return Array.from(uniqueTeams.values());
}

getTeamsFromPlayers(players: any[]) {
    const map = new Map<string, any>();
    players.forEach(p => {
      if (!map.has(p.team)) {
        map.set(p.team, {
          name: p.team,
          team: p.team,
          avatar: p.avatar
        });
      }
    });
    return Array.from(map.values());
  }

  generateRounds(teams: any[]) {
    let rounds = [];
    let currentRoundTeams = [...teams];

    while (currentRoundTeams.length > 1) {
      let matches = [];
      for (let i = 0; i < currentRoundTeams.length; i += 2) {
        matches.push([
          currentRoundTeams[i],
          currentRoundTeams[i + 1] || { name: 'TBD', team: '', avatar: '' }
        ]);
      }
      rounds.push(matches);
      currentRoundTeams = new Array(matches.length).fill({ name: 'TBD', team: '', avatar: '' });
    }

    return rounds;
  }

advanceWinner(roundIndex: number, matchIndex: number) {
  if (roundIndex >= this.rounds.length - 1) return;

  const match = this.rounds[roundIndex][matchIndex];
  if (!match[0].confirmed || !match[1].confirmed) return;

  const winnerIndex = match[0].score >= match[1].score ? 0 : 1;

  const nextRound = this.rounds[roundIndex + 1];
  const nextMatchIndex = Math.floor(matchIndex / 2);
  const nextTeamIndex = matchIndex % 2 === 0 ? 0 : 1;

  if (!nextRound[nextMatchIndex]) nextRound[nextMatchIndex] = [{}, {}];

  nextRound[nextMatchIndex][nextTeamIndex] = { ...match[winnerIndex], score: null, confirmed: false };
}
resetPhaseFlags() {
    this.phaseNotSelected = true;
    this.onlyGroupSelected = false;
    this.groupAndKoSelected = false;
    this.onlyKoPhaseSelected = false;
  }

showTournamentMenu: boolean = false;

// --- Tournament Storage ---
savedTournaments: any[] = [];
selectedTournamentId: string | null = null;

saveTournamentToStorage(tournament: any) {
  if (!tournament || !tournament.id) return;
  const all = JSON.parse(localStorage.getItem('tournaments') || '[]');
  const idx = all.findIndex((t: any) => t.id === tournament.id);
  if (idx >= 0) {
    all[idx] = tournament;
  } else {
    all.push(tournament);
  }
  localStorage.setItem('tournaments', JSON.stringify(all));
  this.loadSavedTournaments();
}

loadSavedTournaments() {
  this.savedTournaments = JSON.parse(localStorage.getItem('tournaments') || '[]');
}

selectTournament(id: string) {
  const found = this.savedTournaments.find(t => t.id === id);
  if (found) {
    this.tournament = found;
    this.selectedTournamentId = id;
  }
}

// Call this after creating or editing a tournament
createOrUpdateTournament() {
  if (!this.tournament) return;
  if (!this.tournament.id) {
    this.tournament.id = 't_' + Date.now();
  }
  this.saveTournamentToStorage(this.tournament);
}
}

