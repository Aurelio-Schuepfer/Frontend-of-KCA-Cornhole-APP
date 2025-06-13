import { Component, OnInit } from '@angular/core';
import { GlobalAuth } from '../../global-auth';
import { UserProfileService } from '../../Services/user-profile.service';
import { Router } from '@angular/router';
import { TournamentService } from '../../Services/tournament.service';

type LanguageCode = 'de' | 'en' | 'fr' | 'es';
@Component({
  selector: 'app-privacy-policy',
  standalone: false,
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
})
export class PrivacyPolicyComponent {
  websiteName = 'Cornhole App';
  effectiveDate = 'May 7, 2025';
  contactEmail = 'support@cornholeapp.com';
  contactPhone = '(123) 456-7890';
  contactAddress = '123 Cornhole Street, Cornhole City, CO 12345';
  showPassword = false;
  showConfirmPassword = false;
  hasTournament = false;

  isNavOpen: boolean = false;
  expandedId: number | null = null;
  username: string | null = null;

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
      privacyPolicy: 'Datenschutz',
      termsOfService: 'Nutzungsbedingungen',
      contact: 'Kontakt',
      privacyTitle: 'Datenschutzerklärung',
      privacyEffective: 'Gültig ab: ',
      privacyIntro:
        'Bei KCA Cornhole Tournaments ist uns Ihre Privatsphäre besonders wichtig. Diese Datenschutzerklärung beschreibt, welche personenbezogenen Daten wir erheben, wie wir sie verwenden und wie wir Ihre Daten schützen.',
      privacySection1: '1. Welche Daten wir erheben',
      privacySection1Text:
        'Wir erheben personenbezogene Daten, wenn Sie mit unserer Website interagieren, sich für Turniere registrieren oder ein Konto erstellen. Dazu gehören:',
      privacySection1List1:
        'Persönliche Daten: Name, E-Mail-Adresse, Telefonnummer und Profildetails.',
      privacySection1List2:
        'Automatisch erfasste Daten: IP-Adresse, Browsertyp, Geräteinformationen und Nutzungsdaten durch Cookies und Analysetools.',
      privacySection1List3:
        'Zahlungsdaten: Zahlungsdetails für Turnieranmeldungen oder Käufe (verarbeitet über Drittanbieter).',
      privacySection2: '2. Wie wir Ihre Daten verwenden',
      privacySection2Text:
        'Wir verwenden die erhobenen Daten für folgende Zwecke:',
      privacySection2List1:
        'Bereitstellung und Verbesserung unserer Dienste: Organisation und Verwaltung von Cornhole-Turnieren, Erstellung und Verwaltung von Nutzerprofilen, Versand wichtiger Updates.',
      privacySection2List2:
        'Kommunikation: Beantwortung von Anfragen, Versand von Newslettern oder Werbematerialien (Abmeldung jederzeit möglich).',
      privacySection2List3:
        'Analyse: Verständnis von Nutzerpräferenzen und Verbesserung der Website.',
      privacySection3: '3. Weitergabe Ihrer Daten',
      privacySection3Text:
        'Wir geben Ihre personenbezogenen Daten an Drittanbieter weiter, die uns beim Betrieb der Website und der Turniere unterstützen, darunter:',
      privacySection3List1:
        'Zahlungsdienstleister: Für die Abwicklung von Turnieranmeldungen und Zahlungen.',
      privacySection3List2:
        'Analysedienste: Z.B. Google Analytics zur Auswertung des Nutzerverhaltens.',
      privacySection3Text2:
        'Wir verkaufen oder vermieten Ihre Daten nicht an Dritte. Eine Weitergabe erfolgt nur, wenn dies gesetzlich vorgeschrieben ist oder zur Wahrung unserer Rechte.',
      privacySection4: '4. Cookies und Tracking-Technologien',
      privacySection4Text:
        'Unsere Website verwendet Cookies und andere Tracking-Technologien zur Verbesserung der Nutzererfahrung. Cookies sind kleine Dateien, die auf Ihrem Gerät gespeichert werden und uns helfen, Präferenzen, Login-Status und Analysen zu verfolgen.',
      privacySection4ListTitle: 'Verwendete Cookie-Typen:',
      privacySection4List1: 'Essenzielle Cookies für die Funktionalität.',
      privacySection4List2: 'Performance-Cookies für Analysen.',
      privacySection4List3:
        'Funktionale Cookies zur Speicherung von Präferenzen.',
      privacySection4Text2:
        'Sie können Cookies in den Browsereinstellungen deaktivieren. Dies kann jedoch die Nutzung der Website einschränken.',
      privacySection5: '5. Datensicherheit',
      privacySection5Text:
        'Wir setzen angemessene Sicherheitsmaßnahmen ein, um Ihre Daten vor unbefugtem Zugriff, Änderung oder Offenlegung zu schützen. Dennoch kann keine Datenübertragung im Internet zu 100% sicher sein. Mit der Nutzung unserer Website erkennen Sie diese Risiken an.',
      privacySection6: '6. Ihre Rechte',
      privacySection6Text:
        'Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:',
      privacySection6List1:
        'Auskunft: Sie können Auskunft über die von uns gespeicherten Daten verlangen.',
      privacySection6List2:
        'Berichtigung: Sie können die Korrektur unrichtiger oder unvollständiger Daten verlangen.',
      privacySection6List3:
        'Löschung: Sie können die Löschung Ihrer Daten verlangen, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.',
      privacySection6List4:
        'Abmeldung: Sie können sich jederzeit von Marketing-E-Mails abmelden.',
      privacySection6Text2:
        'Zur Ausübung dieser Rechte kontaktieren Sie uns bitte unter <strong>{{ contactEmail }}</strong>.',
      privacySection7: '7. Änderungen dieser Datenschutzerklärung',
      privacySection7Text:
        'Wir können diese Datenschutzerklärung gelegentlich anpassen. Änderungen werden auf dieser Seite mit aktualisiertem Datum veröffentlicht. Bitte prüfen Sie diese Erklärung regelmäßig.',
      privacySection8: '8. Kontakt',
      privacySection8Text:
        'Bei Fragen oder Anliegen zur Datenschutzerklärung oder zur Verarbeitung Ihrer Daten kontaktieren Sie uns bitte unter:',
      privacySection8List1: 'E-Mail: <strong>{{ contactEmail }}</strong>',
      privacySection8List2: 'Telefon: <strong>{{ contactPhone }}</strong>',
      privacySection8List3: 'Adresse: <strong>{{ contactAddress }}</strong>',
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
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      contact: 'Contact',
      privacyTitle: 'Privacy Policy',
      privacyEffective: 'Effective Date: ',
      privacyIntro:
        'At KCA Cornhole Tournaments, your privacy is of paramount importance to us. This Privacy Policy outlines the types of personal information we collect, how we use it, and the steps we take to protect your data.',
      privacySection1: '1. Information We Collect',
      privacySection1Text:
        'We collect personal information when you interact with our website, register for tournaments, or create an account. This includes:',
      privacySection1List1:
        'Personal Information: Name, email address, phone number, and profile details.',
      privacySection1List2:
        'Automatic Data Collection: IP address, browser type, device information, and usage data through cookies and analytics tools.',
      privacySection1List3:
        'Payment Information: Payment details for tournament registration or purchases (processed via third-party payment processors).',
      privacySection2: '2. How We Use Your Data',
      privacySection2Text:
        'We use the information we collect for the following purposes:',
      privacySection2List1:
        'To provide and improve our services: Organize and manage Cornhole tournaments, create and manage user profiles, send important updates.',
      privacySection2List2:
        'For Communication: To respond to customer service requests, send newsletters or promotional materials (you can opt-out at any time).',
      privacySection2List3:
        'For Analytics: To understand user preferences and improve the website experience.',
      privacySection3: '3. Sharing Your Information',
      privacySection3Text:
        'We may share your personal data with third-party service providers who assist in the operation of our website and tournaments, including:',
      privacySection3List1:
        'Payment Processors: For handling tournament registrations and payments.',
      privacySection3List2:
        'Analytics Services: We may use services like Google Analytics to track user behavior on the website.',
      privacySection3Text2:
        'We do not sell or rent your personal data to third parties. However, we may disclose your data if required by law or to protect our legal rights.',
      privacySection4: '4. Cookies and Tracking Technologies',
      privacySection4Text:
        'Our website uses cookies and other tracking technologies to improve user experience. Cookies are small files stored on your device that allow us to track your preferences, login status, and analytics.',
      privacySection4ListTitle: 'Types of Cookies Used:',
      privacySection4List1: 'Essential cookies for website functionality.',
      privacySection4List2: 'Performance cookies for analytics.',
      privacySection4List3:
        'Functional cookies for remembering user preferences.',
      privacySection4Text2:
        'You can disable cookies in your browser settings, but doing so may affect your ability to use some features of the website.',
      privacySection5: '5. Data Security',
      privacySection5Text:
        'We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no data transmission over the internet can be guaranteed to be 100% secure. By using our website, you acknowledge that you understand and accept these risks.',
      privacySection6: '6. Your Rights',
      privacySection6Text:
        'You have the following rights regarding your personal data:',
      privacySection6List1:
        'Access: You can request access to the personal data we hold about you.',
      privacySection6List2:
        'Correction: You can request corrections to any inaccurate or incomplete data.',
      privacySection6List3:
        'Deletion: You can request that we delete your personal data, subject to any legal obligations we may have to retain it.',
      privacySection6List4:
        'Opt-Out: You can opt out of marketing emails and communications at any time.',
      privacySection6Text2:
        'To exercise these rights, please contact us at <strong>{{ contactEmail }}</strong>.',
      privacySection7: '7. Changes to This Privacy Policy',
      privacySection7Text:
        'We may update this Privacy Policy from time to time to reflect changes in our practices or legal obligations. Any changes will be posted on this page with an updated effective date. Please review this policy periodically for any updates.',
      privacySection8: '8. Contact Us',
      privacySection8Text:
        'If you have any questions or concerns about this Privacy Policy or how we handle your personal data, please contact us at:',
      privacySection8List1: 'Email: <strong>{{ contactEmail }}</strong>',
      privacySection8List2: 'Phone: <strong>{{ contactPhone }}</strong>',
      privacySection8List3: 'Address: <strong>{{ contactAddress }}</strong>',
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
      privacyPolicy: 'Politique de confidentialité',
      termsOfService: "Conditions d'utilisation",
      contact: 'Contact',
      privacyTitle: 'Politique de confidentialité',
      privacyEffective: "Date d'entrée en vigueur : ",
      privacyIntro:
        "Chez KCA Cornhole Tournaments, votre vie privée est très importante pour nous. Cette politique de confidentialité décrit les types d'informations personnelles que nous collectons, comment nous les utilisons et les mesures que nous prenons pour protéger vos données.",
      privacySection1: '1. Informations que nous collectons',
      privacySection1Text:
        'Nous collectons des informations personnelles lorsque vous interagissez avec notre site, vous inscrivez à des tournois ou créez un compte. Cela inclut :',
      privacySection1List1:
        'Informations personnelles : nom, adresse e-mail, numéro de téléphone et détails du profil.',
      privacySection1List2:
        "Collecte automatique de données : adresse IP, type de navigateur, informations sur l'appareil et données d'utilisation via des cookies et des outils d'analyse.",
      privacySection1List3:
        "Informations de paiement : détails de paiement pour l'inscription aux tournois ou les achats (traités via des prestataires tiers).",
      privacySection2: '2. Comment nous utilisons vos données',
      privacySection2Text:
        'Nous utilisons les informations collectées aux fins suivantes :',
      privacySection2List1:
        'Fournir et améliorer nos services : organiser et gérer des tournois de Cornhole, créer et gérer des profils utilisateurs, envoyer des mises à jour importantes.',
      privacySection2List2:
        'Communication : répondre aux demandes, envoyer des newsletters ou du matériel promotionnel (désinscription possible à tout moment).',
      privacySection2List3:
        "Analyse : comprendre les préférences des utilisateurs et améliorer l'expérience du site.",
      privacySection3: '3. Partage de vos informations',
      privacySection3Text:
        'Nous pouvons partager vos données personnelles avec des prestataires tiers qui nous aident à exploiter notre site et nos tournois, notamment :',
      privacySection3List1:
        'Prestataires de paiement : pour la gestion des inscriptions et paiements.',
      privacySection3List2:
        "Services d'analyse : nous pouvons utiliser des services comme Google Analytics pour suivre le comportement des utilisateurs.",
      privacySection3Text2:
        "Nous ne vendons ni ne louons vos données à des tiers. Cependant, nous pouvons divulguer vos données si la loi l'exige ou pour protéger nos droits.",
      privacySection4: '4. Cookies et technologies de suivi',
      privacySection4Text:
        "Notre site utilise des cookies et d'autres technologies de suivi pour améliorer l'expérience utilisateur. Les cookies sont de petits fichiers stockés sur votre appareil qui nous permettent de suivre vos préférences, votre statut de connexion et les analyses.",
      privacySection4ListTitle: 'Types de cookies utilisés :',
      privacySection4List1:
        'Cookies essentiels pour la fonctionnalité du site.',
      privacySection4List2: "Cookies de performance pour l'analyse.",
      privacySection4List3:
        'Cookies fonctionnels pour mémoriser les préférences utilisateur.',
      privacySection4Text2:
        'Vous pouvez désactiver les cookies dans les paramètres de votre navigateur, mais cela peut affecter certaines fonctionnalités du site.',
      privacySection5: '5. Sécurité des données',
      privacySection5Text:
        'Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles contre tout accès, modification ou divulgation non autorisé. Cependant, aucune transmission de données sur Internet ne peut être garantie à 100% sécurisée. En utilisant notre site, vous reconnaissez et acceptez ces risques.',
      privacySection6: '6. Vos droits',
      privacySection6Text:
        'Vous disposez des droits suivants concernant vos données personnelles :',
      privacySection6List1:
        "Accès : vous pouvez demander l'accès aux données personnelles que nous détenons à votre sujet.",
      privacySection6List2:
        'Correction : vous pouvez demander la correction de toute donnée inexacte ou incomplète.',
      privacySection6List3:
        'Suppression : vous pouvez demander la suppression de vos données personnelles, sous réserve de toute obligation légale de conservation.',
      privacySection6List4:
        'Désinscription : vous pouvez vous désinscrire des e-mails marketing à tout moment.',
      privacySection6Text2:
        'Pour exercer ces droits, veuillez nous contacter à <strong>{{ contactEmail }}</strong>.',
      privacySection7: '7. Modifications de cette politique de confidentialité',
      privacySection7Text:
        "Nous pouvons mettre à jour cette politique de confidentialité de temps à autre pour refléter les changements dans nos pratiques ou obligations légales. Toute modification sera publiée sur cette page avec une date d'entrée en vigueur mise à jour. Veuillez consulter régulièrement cette politique.",
      privacySection8: '8. Contactez-nous',
      privacySection8Text:
        'Si vous avez des questions ou des préoccupations concernant cette politique de confidentialité ou la manière dont nous traitons vos données personnelles, veuillez nous contacter à :',
      privacySection8List1: 'Email : <strong>{{ contactEmail }}</strong>',
      privacySection8List2: 'Téléphone : <strong>{{ contactPhone }}</strong>',
      privacySection8List3: 'Adresse : <strong>{{ contactAddress }}</strong>',
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
      privacyPolicy: 'Política de privacidad',
      termsOfService: 'Términos de servicio',
      contact: 'Contacto',
      privacyTitle: 'Política de privacidad',
      privacyEffective: 'Fecha de entrada en vigor: ',
      privacyIntro:
        'En KCA Cornhole Tournaments, su privacidad es de suma importancia para nosotros. Esta política de privacidad describe los tipos de información personal que recopilamos, cómo la usamos y las medidas que tomamos para proteger sus datos.',
      privacySection1: '1. Información que recopilamos',
      privacySection1Text:
        'Recopilamos información personal cuando interactúa con nuestro sitio web, se registra en torneos o crea una cuenta. Esto incluye:',
      privacySection1List1:
        'Información personal: nombre, dirección de correo electrónico, número de teléfono y detalles del perfil.',
      privacySection1List2:
        'Recopilación automática de datos: dirección IP, tipo de navegador, información del dispositivo y datos de uso a través de cookies y herramientas de análisis.',
      privacySection1List3:
        'Información de pago: detalles de pago para la inscripción en torneos o compras (procesados a través de terceros).',
      privacySection2: '2. Cómo usamos sus datos',
      privacySection2Text:
        'Utilizamos la información que recopilamos para los siguientes fines:',
      privacySection2List1:
        'Proporcionar y mejorar nuestros servicios: organizar y gestionar torneos de Cornhole, crear y gestionar perfiles de usuario, enviar actualizaciones importantes.',
      privacySection2List2:
        'Comunicación: responder a solicitudes de servicio al cliente, enviar boletines o materiales promocionales (puede darse de baja en cualquier momento).',
      privacySection2List3:
        'Análisis: comprender las preferencias de los usuarios y mejorar la experiencia del sitio web.',
      privacySection3: '3. Compartir su información',
      privacySection3Text:
        'Podemos compartir sus datos personales con proveedores de servicios externos que ayudan en el funcionamiento de nuestro sitio web y torneos, incluyendo:',
      privacySection3List1:
        'Procesadores de pagos: para gestionar inscripciones y pagos de torneos.',
      privacySection3List2:
        'Servicios de análisis: podemos utilizar servicios como Google Analytics para rastrear el comportamiento del usuario en el sitio web.',
      privacySection3Text2:
        'No vendemos ni alquilamos sus datos personales a terceros. Sin embargo, podemos divulgar sus datos si la ley lo exige o para proteger nuestros derechos legales.',
      privacySection4: '4. Cookies y tecnologías de seguimiento',
      privacySection4Text:
        'Nuestro sitio web utiliza cookies y otras tecnologías de seguimiento para mejorar la experiencia del usuario. Las cookies son pequeños archivos almacenados en su dispositivo que nos permiten rastrear sus preferencias, estado de inicio de sesión y análisis.',
      privacySection4ListTitle: 'Tipos de cookies utilizadas:',
      privacySection4List1:
        'Cookies esenciales para la funcionalidad del sitio web.',
      privacySection4List2: 'Cookies de rendimiento para análisis.',
      privacySection4List3:
        'Cookies funcionales para recordar las preferencias del usuario.',
      privacySection4Text2:
        'Puede desactivar las cookies en la configuración de su navegador, pero hacerlo puede afectar su capacidad para utilizar algunas funciones del sitio web.',
      privacySection5: '5. Seguridad de los datos',
      privacySection5Text:
        'Implementamos medidas de seguridad adecuadas para proteger su información personal contra el acceso, alteración o divulgación no autorizados. Sin embargo, ninguna transmisión de datos por Internet puede garantizarse como 100% segura. Al utilizar nuestro sitio web, usted reconoce y acepta estos riesgos.',
      privacySection6: '6. Sus derechos',
      privacySection6Text:
        'Usted tiene los siguientes derechos con respecto a sus datos personales:',
      privacySection6List1:
        'Acceso: puede solicitar acceso a los datos personales que tenemos sobre usted.',
      privacySection6List2:
        'Corrección: puede solicitar correcciones a cualquier dato inexacto o incompleto.',
      privacySection6List3:
        'Eliminación: puede solicitar que eliminemos sus datos personales, sujeto a cualquier obligación legal de retenerlos.',
      privacySection6List4:
        'Exclusión voluntaria: puede optar por no recibir correos electrónicos de marketing y comunicaciones en cualquier momento.',
      privacySection6Text2:
        'Para ejercer estos derechos, contáctenos en <strong>{{ contactEmail }}</strong>.',
      privacySection7: '7. Cambios en esta política de privacidad',
      privacySection7Text:
        'Podemos actualizar esta política de privacidad ocasionalmente para reflejar cambios en nuestras prácticas u obligaciones legales. Cualquier cambio se publicará en esta página con una fecha de entrada en vigor actualizada. Revise esta política periódicamente para ver las actualizaciones.',
      privacySection8: '8. Contáctenos',
      privacySection8Text:
        'Si tiene alguna pregunta o inquietud sobre esta política de privacidad o sobre cómo manejamos sus datos personales, contáctenos en:',
      privacySection8List1:
        'Correo electrónico: <strong>{{ contactEmail }}</strong>',
      privacySection8List2: 'Teléfono: <strong>{{ contactPhone }}</strong>',
      privacySection8List3: 'Dirección: <strong>{{ contactAddress }}</strong>',
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

    this.tournamentService.tournament$.subscribe((t) => {
      const savedTournaments = JSON.parse(
        localStorage.getItem('tournaments') || '[]'
      );
      this.hasTournament =
        !!t || (Array.isArray(savedTournaments) && savedTournaments.length > 0);
    });
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
