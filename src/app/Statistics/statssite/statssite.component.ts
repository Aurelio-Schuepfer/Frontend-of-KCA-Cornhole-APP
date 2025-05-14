import { Component, OnInit } from '@angular/core';
import { GlobalAuth } from '../../global-auth';

type LanguageCode = 'de' | 'en' | 'fr' | 'es';
@Component({
  selector: 'app-statssite',
  standalone: false,
  templateUrl: './statssite.component.html',
  styleUrl: './statssite.component.scss'
})
export class StatssiteComponent {
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
      statsSiteTitle: 'Website Statistiken',
      statsSiteDesc: 'Entdecke wichtige Statistiken und Einblicke zu KCA Cornhole Turnieren, Spieleraktivität und mehr!',
      totalPlayers: 'Spieler insgesamt',
      totalPlayersDesc: 'Die Gesamtzahl der auf unserer Plattform registrierten Spieler.',
      totalTournaments: 'Turniere insgesamt',
      totalTournamentsDesc: 'Die Anzahl der bisher auf unserer Plattform durchgeführten Turniere.',
      matchesPlayed: 'Gespielte Spiele',
      matchesPlayedDesc: 'Die Gesamtzahl der gespielten Spiele in allen Turnieren.',
      topPlayer: 'Top Spieler',
      topPlayerDesc: 'Der Spieler mit den meisten Siegen.',
      avgParticipants: 'Ø Teilnehmer pro Turnier',
      avgParticipantsDesc: 'Die durchschnittliche Teilnehmerzahl pro Turnier.',
      trustedUsers: 'Vertrauenswürdige Nutzer',
      trustedUsersDesc: 'Nutzer, die unserer Plattform vertrauen und sich regelmäßig einloggen.',
      privacyPolicy: 'Datenschutz',
      termsOfService: 'Nutzungsbedingungen',
      contact: 'Kontakt'
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
      statsSiteTitle: 'Website Insights',
      statsSiteDesc: 'Discover key statistics and insights into KCA Cornhole tournaments, player activity, and more!',
      totalPlayers: 'Total Players',
      totalPlayersDesc: 'The total number of players registered on our platform.',
      totalTournaments: 'Total Tournaments',
      totalTournamentsDesc: 'The number of tournaments held on our platform so far.',
      matchesPlayed: 'Matches Played',
      matchesPlayedDesc: 'The total number of matches played in all tournaments.',
      topPlayer: 'Top Player',
      topPlayerDesc: 'The player with the highest number of victories.',
      avgParticipants: 'Avg. Participants per Tournament',
      avgParticipantsDesc: 'The average number of participants per tournament.',
      trustedUsers: 'Trusted Users',
      trustedUsersDesc: 'Users who trust and regularly log in to our platform.',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      contact: 'Contact'
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
      statsSiteTitle: 'Statistiques du site',
      statsSiteDesc: 'Découvrez les statistiques clés et les informations sur les tournois KCA Cornhole, l\'activité des joueurs et plus encore !',
      totalPlayers: 'Joueurs au total',
      totalPlayersDesc: 'Le nombre total de joueurs inscrits sur notre plateforme.',
      totalTournaments: 'Tournois au total',
      totalTournamentsDesc: 'Le nombre de tournois organisés sur notre plateforme à ce jour.',
      matchesPlayed: 'Matchs joués',
      matchesPlayedDesc: 'Le nombre total de matchs joués dans tous les tournois.',
      topPlayer: 'Meilleur joueur',
      topPlayerDesc: 'Le joueur avec le plus de victoires.',
      avgParticipants: 'Participants moyens par tournoi',
      avgParticipantsDesc: 'Le nombre moyen de participants par tournoi.',
      trustedUsers: 'Utilisateurs de confiance',
      trustedUsersDesc: 'Utilisateurs qui font confiance à notre plateforme et se connectent régulièrement.',
      privacyPolicy: 'Politique de confidentialité',
      termsOfService: 'Conditions d\'utilisation',
      contact: 'Contact'
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
      statsSiteTitle: 'Estadísticas del sitio web',
      statsSiteDesc: 'Descubre estadísticas clave e información sobre los torneos de KCA Cornhole, la actividad de los jugadores y más.',
      totalPlayers: 'Jugadores totales',
      totalPlayersDesc: 'El número total de jugadores registrados en nuestra plataforma.',
      totalTournaments: 'Torneos totales',
      totalTournamentsDesc: 'El número de torneos celebrados en nuestra plataforma hasta ahora.',
      matchesPlayed: 'Partidos jugados',
      matchesPlayedDesc: 'El número total de partidos jugados en todos los torneos.',
      topPlayer: 'Mejor jugador',
      topPlayerDesc: 'El jugador con el mayor número de victorias.',
      avgParticipants: 'Prom. participantes por torneo',
      avgParticipantsDesc: 'El número promedio de participantes por torneo.',
      trustedUsers: 'Usuarios de confianza',
      trustedUsersDesc: 'Usuarios que confían y acceden regularmente a nuestra plataforma.',
      privacyPolicy: 'Política de privacidad',
      termsOfService: 'Términos de servicio',
      contact: 'Contacto'
    }
  };

  t = this.translations[this.selectedLang];

  constructor(public globalAuth: GlobalAuth) {}

  ngAfterViewInit() {
  const cards = document.querySelectorAll('.insight-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        (entry.target as HTMLElement).classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  cards.forEach(card => observer.observe(card));
}


ngOnInit(): void {
    this.setInitialTheme();
    const saved = localStorage.getItem('lang');
    if (saved && ['de', 'en', 'fr', 'es'].includes(saved)) {
      this.selectedLang = saved as LanguageCode;
    }
    this.applyTranslations();  
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

  toggleNav(): void {
    this.isNavOpen = !this.isNavOpen;
  }
  totalPlayers: number = 1204;
  totalTournaments: number = 312;
  matchesPlayed: number = 4578;
  topPlayer: string = 'Max Mustermann';
  avgParticipants: number = 18.4;
  trustedUsers: number = 1212452

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

