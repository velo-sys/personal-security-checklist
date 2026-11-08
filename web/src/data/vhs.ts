/**
 * Content of the adult education (VHS) course this fork accompanies.
 * Each module links to checklist items (by item ID, shared between languages),
 * so the checklist pages can show which points were covered in the course.
 */
import type { Lang } from '~/i18n';

type L = Record<Lang, string>;

export interface VhsLink {
  title: string;
  url: string;
  description: L;
}

export interface VhsChapter {
  title: L;
  points: Record<Lang, string[]>;
  quote?: L;
  links?: VhsLink[];
}

export interface VhsModule {
  id: string;
  short: string;
  title: L;
  subtitle: L;
  sessions?: L;
  chapters: VhsChapter[];
  takeaways: Record<Lang, string[]>;
  homework?: { title: L; links: VhsLink[] };
  /** Checklist item IDs covered in this module, grouped by section slug */
  items: Record<string, string[]>;
}

export const vhsModules: VhsModule[] = [
  {
    id: 'm1',
    short: 'M1',
    title: {
      de: 'So schützen Sie sich im digitalen Alltag',
      en: 'Protecting Yourself in Everyday Digital Life',
    },
    subtitle: {
      de: 'Modul 1 · Phishing, Passwörter & der zweite Faktor',
      en: 'Module 1 · Phishing, passwords & the second factor',
    },
    chapters: [
      {
        title: { de: 'Warum das Thema wichtig ist', en: 'Why it matters' },
        points: {
          de: [
            'Laut Cybersicherheitsmonitor 2026 des BSI war jede zehnte Person in Deutschland (11 %) allein im vergangenen Jahr von Cyberkriminalität im Alltag betroffen.',
            '88 % der Betroffenen berichten von einem Schaden, ein Drittel verliert Geld.',
            'Nur 14 % informieren sich regelmäßig über das Thema.',
          ],
          en: [
            "According to the German Federal Office for Information Security's (BSI) Cyber Security Monitor 2026, one in ten people in Germany (11%) was affected by cybercrime in the past year alone.",
            '88% of those affected report damage, and one third lose money.',
            'Only 14% keep themselves regularly informed about the topic.',
          ],
        },
      },
      {
        title: { de: '1. Phishing, Social Engineering und KI', en: '1. Phishing, social engineering and AI' },
        quote: {
          de: 'Sie werden nicht gehackt, Sie werden überredet.',
          en: "You don't get hacked, you get talked into it.",
        },
        points: {
          de: [
            'Phishing (Duden): Beschaffung persönlicher Daten anderer Personen (wie Passwort, Kreditkartennummer o. Ä.) mit gefälschten E-Mails oder Websites. Das „ph“ stammt aus dem Hackerjargon (phreaking).',
            'Kanäle: E-Mail, SMS, WhatsApp, Telegram & Co., QR-Codes, Anrufe, Briefe und persönliche Gespräche.',
            'KI macht Fälschungen von Texten, Bildern und Stimmen täuschend echt.',
            'Schädliche Links erkennen: Entscheidend ist der Teil unmittelbar vor dem ersten Schrägstrich. sparkasse.de.sicherheit-kunden.com/login und www.postbank.de.verify-id.top gehören nicht der Bank; sparkasse-sicherheit.de klingt nur echt; bit.ly verkürzt Links und verbirgt das Ziel; paypaI.com mit großem i statt kleinem L sieht in vielen Schriften identisch aus.',
            'Checkliste: Ruhe bewahren · Absender prüfen · Links prüfen · keine Dateianhänge · mit dem vermeintlichen Absender (über einen bekannten Weg) in Verbindung treten.',
          ],
          en: [
            'Phishing: obtaining other people’s personal data (passwords, credit card numbers, etc.) using fake emails or websites. The “ph” comes from hacker jargon (phreaking).',
            'Channels: email, SMS, WhatsApp, Telegram & co., QR codes, phone calls, letters and face-to-face conversations.',
            'AI makes fake texts, images and voices deceptively real.',
            'Spotting malicious links: what matters is the part right before the first slash. sparkasse.de.sicherheit-kunden.com/login and www.postbank.de.verify-id.top do not belong to the bank; sparkasse-sicherheit.de only sounds real; bit.ly shortens links and hides the destination; paypaI.com with a capital i instead of a lower-case L looks identical in many fonts.',
            'Checklist: stay calm · check the sender · check links · no attachments · contact the supposed sender (through a channel you already know).',
          ],
        },
        links: [
          {
            title: 'VirusTotal',
            url: 'https://www.virustotal.com',
            description: { de: 'Adresse oder Datei prüfen lassen', en: 'Check a URL or file' },
          },
          {
            title: 'urlscan.io',
            url: 'https://urlscan.io',
            description: {
              de: 'Ruft die Seite in einer sicheren Umgebung auf, zeigt Bildschirmfoto, echte Zieladresse und Weiterleitungen – gut, um Kurzlinks aufzulösen',
              en: 'Opens the page in a safe environment, shows a screenshot, the real destination and redirects – great for expanding short links',
            },
          },
          {
            title: 'Google Safe Browsing',
            url: 'https://transparencyreport.google.com/safe-browsing/search',
            description: { de: 'Ist die Adresse als gefährlich bekannt?', en: 'Is the address known to be dangerous?' },
          },
          {
            title: 'Fakeshop-Finder (Verbraucherzentrale)',
            url: 'https://www.verbraucherzentrale.de/fakeshopfinder-71560',
            description: {
              de: 'Online-Shops auf Fälschung prüfen',
              en: 'Check online shops for fakes (German consumer centre)',
            },
          },
          {
            title: 'Punycoder',
            url: 'https://www.punycoder.com',
            description: {
              de: 'Wandelt verdächtige Adressen um und macht getarnte Buchstaben sichtbar',
              en: 'Converts suspicious addresses and reveals look-alike characters',
            },
          },
        ],
      },
      {
        title: { de: '2. Passwörter', en: '2. Passwords' },
        points: {
          de: [
            'Wiederverwendung: Aus einem Leck wird Ihre Kombination automatisch bei hunderten anderen Diensten ausprobiert.',
            'Wörterbuch mit Regeln: nicht nur „sommer“, sondern auch „Sommer2025!“ und „S0mm3r“. Deutsche Leak-Hitliste 2025: 123456, 12345678, 565656, hallo123, kaffeetasse, 1234567, passwort, lol123.',
            'Rohes Durchprobieren: Kurze Passwörter fallen in kürzester Zeit.',
            'Lösung: ein Passwortmanager, z. B. KeePassXC am PC, KeePassDX bzw. KeePassDroid unter Android oder der eingebaute Passwortmanager von Firefox – mit Warnung bei bekannten Leaks.',
          ],
          en: [
            'Reuse: after a leak, your combination is automatically tried on hundreds of other services.',
            'Dictionary with rules: not just “summer”, but also “Summer2025!” and “S0mm3r”. German leak top list 2025: 123456, 12345678, 565656, hallo123, kaffeetasse, 1234567, passwort, lol123.',
            'Brute force: short passwords fall in no time.',
            'Solution: a password manager, e.g. KeePassXC on the PC, KeePassDX or KeePassDroid on Android, or Firefox’s built-in password manager – with alerts for known breaches.',
          ],
        },
        links: [
          {
            title: 'KeePassXC',
            url: 'https://keepassxc.org',
            description: {
              de: 'Offline-Passwortmanager für Windows, macOS, Linux',
              en: 'Offline password manager for Windows, macOS, Linux',
            },
          },
          {
            title: 'KeePassDX',
            url: 'https://www.keepassdx.com',
            description: { de: 'KeePass für Android', en: 'KeePass for Android' },
          },
          {
            title: 'Bitwarden',
            url: 'https://bitwarden.com',
            description: { de: 'Passwortmanager mit Synchronisierung', en: 'Password manager with sync' },
          },
        ],
      },
      {
        title: { de: '3. Der zweite Faktor', en: '3. The second factor' },
        points: {
          de: [
            'Kein neues Konzept: Laut homecomputermuseum.de und ratiodata.de startete am 3. September 1983 auf Basis von Btx das erste Online-Banking inklusive TAN-Verfahren (TAN = Transaktionsnummer).',
            'Microsoft nennt über 99,9 % abgewehrte Angriffe auf Konten durch Zwei-Faktor-Authentifizierung.',
            'Varianten: Code per SMS · Code per E-Mail · Code aus einer App (TOTP = Time-based One-Time Password) · Bestätigung per Tastendruck auf einem anderen Gerät · Sicherheitsschlüssel als Datei (.key) · haptischer Sicherheitsschlüssel (FIDO2 = Fast IDentity Online, z. B. YubiKey).',
            'KeePassXC kann TOTP-Codes selbst erzeugen (Eintrag › TOTP einrichten).',
          ],
          en: [
            'Not a new idea: according to homecomputermuseum.de and ratiodata.de, the first online banking in Germany including TAN codes (transaction numbers) launched on 3 September 1983, based on Btx.',
            'Microsoft reports that two-factor authentication blocks over 99.9% of attacks on accounts.',
            'Options: code via SMS · code via email · code from an app (TOTP = time-based one-time password) · push confirmation on another device · security key as a file (.key) · physical security key (FIDO2 = Fast IDentity Online, e.g. YubiKey).',
            'KeePassXC can generate TOTP codes itself (entry › set up TOTP).',
          ],
        },
        links: [
          {
            title: 'Aegis Authenticator',
            url: 'https://getaegis.app',
            description: { de: 'Quelloffene TOTP-App für Android', en: 'Open-source TOTP app for Android' },
          },
          {
            title: '2FAS',
            url: 'https://2fas.com',
            description: { de: 'TOTP-App für Android & iOS', en: 'TOTP app for Android & iOS' },
          },
          {
            title: 'Yubico (YubiKey)',
            url: 'https://www.yubico.com',
            description: { de: 'FIDO2-Sicherheitsschlüssel', en: 'FIDO2 security keys' },
          },
          {
            title: 'Nitrokey',
            url: 'https://www.nitrokey.com',
            description: {
              de: 'FIDO2-Schlüssel aus Deutschland, quelloffen',
              en: 'Open-source FIDO2 keys made in Germany',
            },
          },
        ],
      },
    ],
    takeaways: {
      de: [
        'Bei Zeitdruck und Drohungen: erst recht Ruhe bewahren.',
        'Links prüfen – der Teil vor dem ersten „/“ entscheidet.',
        'Für jeden Dienst ein eigenes, langes Passwort – verwaltet im Passwortmanager.',
        'Überall, wo möglich, einen zweiten Faktor aktivieren.',
      ],
      en: [
        'Under time pressure or threats: stay calm, all the more.',
        'Check links – the part before the first “/” is what counts.',
        'A separate, long password for every service – stored in a password manager.',
        'Enable a second factor wherever possible.',
      ],
    },
    items: {
      authentication: [
        'use-a-strong-password',
        "don't-reuse-passwords",
        'use-a-secure-password-manager',
        'enable-2-factor-authentication',
        'keep-backup-codes-safe',
        'avoid-using-sms-for-2fa',
        'avoid-using-your-pm-to-generate-otps',
        'consider-a-hardware-token',
        'use-passkeys-where-available',
        'consider-offline-password-manager',
        'vhs-choose-your-second-factor',
      ],
      'human-aspect': [
        'verify-recipients',
        'educate-yourself-about-phishing-attacks',
        "don't-trust-your-popup-notifications",
        'install-reputable-software-from-trusted-sources',
        'do-not-assume-a-site-is-secure,-just-because-it-is-`https`',
        'vhs-check-suspicious-links-before-clicking',
        'vhs-be-aware-of-ai-scams',
      ],
      'web-browsing': ['ensure-website-is-legitimate', 'check-for-https', 'beware-of-redirects'],
      messaging: ['verify-your-recipient'],
      'mobile-devices': ['set-up-a-mobile-carrier-pin'],
      'physical-security': ["don't-reveal-info-on-inbound-calls"],
    },
  },
  {
    id: 'm2',
    short: 'M2',
    title: {
      de: 'Datenspuren im Netz',
      en: 'Your Digital Footprint',
    },
    subtitle: {
      de: 'Modul 2 · Was weiß das Internet über Sie?',
      en: 'Module 2 · What does the internet know about you?',
    },
    sessions: {
      de: 'Termin 1: Tracking, Browser, Datenhandel & Datenlecks · Termin 2: Tracking im Smartphone',
      en: 'Session 1: tracking, browsers, data trading & breaches · Session 2: smartphone tracking',
    },
    chapters: [
      {
        title: { de: 'Einleitung: Daten und Tracking', en: 'Introduction: data and tracking' },
        quote: {
          de: 'Daten sind Messwerte, Tracking ist Fährtenlesen.',
          en: 'Data are measurements, tracking is reading the trail.',
        },
        points: {
          de: [
            'Daten (Duden): durch Beobachtungen, Messungen u. a. gewonnene Werte; elektronisch gespeicherte Angaben. Tracking (Duden): Verfolgen, Beobachtung.',
            'Messwerte: Adresse (IP, GPS) · eigenes Gerät (Hardware, Software inkl. Version, Einstellungen, Werbe-ID) · Geräte in der Nähe (WLAN, Bluetooth) · Maus (Bewegung, Klicks, Scrollen).',
            'Erhoben wird auf: Computer (ab Windows 8.1 mit Werbe-ID, macOS, Browser) · Smartphone (Android-Werbe-ID, iOS, OAID bei Huawei & Co.) · E-Mail · Kunden- und Bezahlkarten · Fitnesstracker & Uhren · Sprachassistenten · Autos (teils freiwillig, z. B. Telematik-Tarife) · Fernseher · Haushaltsgeräte.',
            'Beispiel Philips Hue: Erfasst werden laut Datenschutzerklärung Gerätedaten, Anmeldedaten, Standortdaten und „sonstige Informationen über Ihre Nutzung unserer Produkte“ – u. a. um Produkte „durch Analysen zu verbessern“.',
          ],
          en: [
            'Data: values obtained through observation or measurement; electronically stored information. Tracking: following, observing.',
            'Measurements: address (IP, GPS) · your device (hardware, software incl. version, settings, advertising ID) · nearby devices (Wi-Fi, Bluetooth) · mouse (movement, clicks, scrolling).',
            'Collected on: computers (advertising ID since Windows 8.1, macOS, browsers) · smartphones (Android advertising ID, iOS, OAID on Huawei & co.) · email · loyalty and payment cards · fitness trackers & watches · voice assistants · cars (sometimes voluntarily, e.g. telematics insurance) · TVs · household appliances.',
            'Example Philips Hue: according to its privacy policy it collects device data, login data, location data and “other information about your use of our products” – among other things to “improve products through analysis”.',
          ],
        },
      },
      {
        title: { de: 'Tracking im Browser', en: 'Tracking in the browser' },
        points: {
          de: [
            'Immer übertragen: IP-Adresse (ungefährer Standort) · Browsername und Betriebssystem inkl. Versionen · bevorzugte Sprachen · angefragte Adresse und Uhrzeit · Bildschirm- und Fenstergröße · Zeitzone · ob und wie lange die Seite geöffnet war.',
            'Laufend gemessen: Mausbewegungen und -stopps · Klicks, auch ins Leere · Scrolltiefe und -tempo · Verweildauer · Tastatureingaben in Formularfeldern, auch nicht abgeschickte · ob das Fenster im Vordergrund ist · wann Sie die Seite verlassen.',
            'Beispielfall Werbung für einen Scheidungsanwalt: Ein Beitrag über „toxische Beziehungen“ wurde eine Sekunde länger gelesen als der persönliche Durchschnitt, die Maus verweilte kurz über einer Anzeige für Single-Wohnungen, im Suchfeld gab es eine abgebrochene Eingabe – daraus entsteht eine Deutung.',
            'Gegenmaßnahmen: 1. Browsereinstellungen (Suchmaschine ändern – DuckDuckGo, Brave, Startpage, Ecosia; Aktivitätsverfolgung, Cookies) · 2. Erweiterungen (uBlock Origin (Lite), AdGuard, Ghostery, Privacy Badger, DuckDuckGo Privacy Essentials, Adblock (Plus)) · 3. spezielle Browser (Brave, Tor-Browser).',
          ],
          en: [
            'Always transmitted: IP address (approximate location) · browser and OS incl. versions · preferred languages · requested address and time · screen and window size · time zone · whether and for how long the page was open.',
            'Continuously measured: mouse movements and pauses · clicks, even on empty space · scroll depth and speed · dwell time · keystrokes in form fields, even unsent ones · whether the window is in the foreground · when you leave.',
            'Example – an ad for a divorce lawyer: a post about “toxic relationships” was read one second longer than the personal average, the mouse briefly hovered over an ad for single flats, and there was an abandoned search input – together these become an interpretation.',
            'Countermeasures: 1. browser settings (change search engine – DuckDuckGo, Brave, Startpage, Ecosia; activity tracking, cookies) · 2. extensions (uBlock Origin (Lite), AdGuard, Ghostery, Privacy Badger, DuckDuckGo Privacy Essentials, Adblock (Plus)) · 3. special browsers (Brave, Tor Browser).',
          ],
        },
      },
      {
        title: { de: 'Datenhandel & Datenlecks', en: 'Data trading & data breaches' },
        points: {
          de: [
            'Monetarisierung über Datenweiterleitung: Bausteine in Seiten und Apps – Statistik, Schriftarten, Karten, Videos, Werbung (z. B. Google Analytics, Google Maps).',
            'Versteigerung von Werbeplätzen in Echtzeit: Bei eigenen Diensten bleibt die Auktion intern; auf fremden Seiten geht Ihr Profil an alle Bieter, nicht nur an den Gewinner.',
            'Gegenkonzept Freemium: Grundversion kostenlos, Geld kommt von der Bezahlversion (z. B. Cloud-Speicher, Mailanbieter, Passwortmanager). Viele Dienste mischen beides: Gratis mit Werbung, Bezahlstufe ohne.',
            'Datenlecks betreffen nicht nur persönliche Daten, sondern auch Werbe-IDs und Internetverhalten.',
          ],
          en: [
            'Monetisation by passing data on: building blocks in sites and apps – analytics, fonts, maps, videos, ads (e.g. Google Analytics, Google Maps).',
            'Real-time bidding for ad slots: on a company’s own services the auction stays internal; on third-party sites your profile goes to every bidder, not just the winner.',
            'The freemium alternative: the basic version is free, money comes from the paid tier (e.g. cloud storage, email providers, password managers). Many services mix both: free with ads, paid without.',
            'Breaches affect not only personal data but also advertising IDs and browsing behaviour.',
          ],
        },
      },
      {
        title: { de: 'Tracking im Smartphone', en: 'Tracking on smartphones' },
        points: {
          de: [
            'Werbe-ID laut Google: eine eindeutige ID für Werbezwecke, bereitgestellt von den Google-Play-Diensten, vom Nutzer zurücksetz- und löschbar. Sie wird teils weitergegeben, ohne dass der App-Entwickler das bewusst freigegeben hat.',
            'Ein Test von 10 Apps ergab eine Weiterleitung an rund 70 Dritte (Forbrukerrådet „Out of Control“, 2020).',
            'Telematik-Tarif (HUK24 Telematik Plus): Sensor und App zeichnen Fahrdaten auf. Laut Stiftung Warentest (18.01.2022) weist mehr als die Hälfte der Datenschutzerklärungen von Telematik-Tarifen deutliche Mängel auf.',
            'TuneIn Radio integriert zahlreiche Tracking-Bausteine von Drittanbietern (siehe Exodus Privacy).',
            'Google Maps: Ladenbesuch-/Conversion-Tracking für Werbekunden; Live-Verkehr entsteht aus den Bewegungsdaten der Nutzer.',
            'Strava: Die öffentliche Heatmap verriet 2017 den Standort von Militärbasen (The Guardian).',
            'Tracking minimieren: Ab Android 12 lässt sich die Werbe-ID löschen; unter iOS Tracking und personalisierte Werbung ausschalten; Berechtigungen entziehen (ab Android 11 automatisch nach Monaten der Nichtnutzung).',
          ],
          en: [
            'Advertising ID according to Google: a unique ID for advertising, provided by Google Play services, which the user can reset and delete. It is sometimes shared without the app developer consciously enabling it.',
            'A test of 10 apps found data being passed to about 70 third parties (Norwegian Consumer Council, “Out of Control”, 2020).',
            'Telematics insurance (HUK24 Telematik Plus): a sensor and app record driving data. According to Stiftung Warentest (18 Jan 2022), more than half of the privacy policies of telematics tariffs have significant shortcomings.',
            'TuneIn Radio integrates numerous third-party tracking components (see Exodus Privacy).',
            'Google Maps: store visit / conversion tracking for advertisers; live traffic is built from users’ movement data.',
            'Strava: in 2017 its public heatmap revealed the location of military bases (The Guardian).',
            'Minimising tracking: from Android 12 the advertising ID can be deleted; on iOS turn off tracking and personalised ads; revoke permissions (automatic after months of non-use from Android 11).',
          ],
        },
        links: [
          {
            title: 'Exodus Privacy',
            url: 'https://reports.exodus-privacy.eu.org/de/',
            description: {
              de: 'Welche Tracker stecken in einer Android-App?',
              en: 'Which trackers are inside an Android app?',
            },
          },
          {
            title: 'Verbraucherzentrale: App-Tracking abschalten',
            url: 'https://www.verbraucherzentrale.de/wissen/digitale-welt/apps-und-software/android-und-ios-apptracking-abschalten-so-gehts-60451',
            description: { de: 'Anleitung für Android und iOS', en: 'Guide for Android and iOS (German)' },
          },
          {
            title: 'Forbrukerrådet: Out of Control',
            url: 'https://www.forbrukerradet.no/rapporter/out-of-control/',
            description: {
              de: 'Bericht zur Datenweitergabe durch Apps (2020)',
              en: 'Report on data sharing by apps (2020)',
            },
          },
        ],
      },
    ],
    takeaways: {
      de: [
        'Daten sind auch Messwerte, die ein Verhalten abbilden – alles mit Internetverbindung sammelt sie.',
        '„Smart“ oder „KI“ bei einem Produkt deuten darauf hin.',
        'Bezahlt wird für den besten Zeitpunkt der Werbeanzeige; Werbung und/oder ein Premium-Angebot finanzieren die Dienste.',
        'Lecks betreffen sowohl personenbezogene als auch verhaltensbezogene Daten.',
        'Gegenmittel: Einstellungen zu Werbung und Tracking regelmäßig kontrollieren. Ziel sind weniger Spuren und weniger Zuordenbarkeit.',
        'Immer auf dem neuesten Stand bleiben.',
      ],
      en: [
        'Data are also measurements that map behaviour – anything with an internet connection collects them.',
        '“Smart” or “AI” on a product is a hint.',
        'Advertisers pay for the best moment to show an ad; ads and/or a premium tier fund the services.',
        'Breaches affect both personal and behavioural data.',
        'Remedy: check your ad and tracking settings regularly. The goal is fewer traces and less attributability.',
        'Always stay up to date.',
      ],
    },
    homework: {
      title: { de: 'Hausaufgaben', en: 'Homework' },
      links: [
        {
          title: 'Have I Been Pwned',
          url: 'https://haveibeenpwned.com',
          description: { de: 'E-Mail-Adresse auf Leaks prüfen', en: 'Check your email address for breaches' },
        },
        {
          title: 'Leak-Checker Uni Bonn',
          url: 'https://leakchecker.uni-bonn.de',
          description: { de: 'Ergebnis per Mail (vom BSI empfohlen)', en: 'Result via email (recommended by the BSI)' },
        },
        {
          title: 'HPI Identity Leak Checker',
          url: 'https://sec.hpi.de/ilc',
          description: { de: 'Ergebnis per Mail (vom BSI empfohlen)', en: 'Result via email (recommended by the BSI)' },
        },
        {
          title: 'Pwned Passwords',
          url: 'https://haveibeenpwned.com/passwords',
          description: {
            de: 'Passwort prüfen, ob es in Leaks vorkommt',
            en: 'Check whether a password appears in breaches',
          },
        },
        {
          title: 'AmIUnique',
          url: 'https://amiunique.org/fingerprint',
          description: {
            de: 'Fußabdruck des Browsers ansehen. Auffällig sind z. B. ungewöhnliche Versionsnummern im User-Agent, eine sehr spezifische Accept-Liste und viele Sprachen – Lösung: Brave oder den Browser nicht spezifisch konfigurieren, Sprachen auf eine reduzieren.',
            en: 'See your browser fingerprint. Unusual user-agent versions, a very specific Accept list and many languages stand out – fix: use Brave or avoid unusual configuration, and reduce languages to one.',
          },
        },
        {
          title: 'DuckDuckGo',
          url: 'https://duckduckgo.com',
          description: {
            de: 'Nach dem eigenen Namen, der Adresse und E-Mail suchen (auch bei Google)',
            en: 'Search for your own name, address and email (on Google too)',
          },
        },
      ],
    },
    items: {
      'web-browsing': [
        'block-ads',
        'use-a-privacy-respecting-browser',
        'use-a-private-search-engine',
        'remove-unnecessary-browser-addons',
        'understand-your-browser-fingerprint',
        'manage-cookies',
        'block-third-party-cookies',
        'block-third-party-trackers',
        'spoof-user-agent',
        'use-the-tor-browser',
        'vhs-clear-browsing-data-regularly',
      ],
      authentication: ['sign-up-for-breach-alerts'],
      'mobile-devices': [
        'turn-off-connectivity-features-that-aren’t-being-used',
        'keep-app-count-to-a-minimum',
        'app-permissions',
        'use-offline-maps',
        'opt-out-of-personalized-ads',
        'monitor-trackers',
      ],
      'personal-computers': ['disallow-usage-data-from-being-sent-to-the-cloud', 'disable-cortana-or-siri'],
      'smart-home': [
        'understand-what-data-is-collected,-stored-and-transmitted',
        'set-privacy-settings,-and-opt-out-of-sharing-data-with-third-parties',
        'be-wary-of-wearables',
        "avoid-smart-devices-you-don't-need",
      ],
      'social-media': ['check-privacy-settings', 'vhs-reset-ad-personalisation'],
      email: ['disable-automatic-loading-of-remote-content'],
      'physical-security': ['opt-out-of-public-records'],
    },
  },
  {
    id: 'm3',
    short: 'M3',
    title: {
      de: 'Digitale Selbstverteidigung',
      en: 'Digital Self-Defence',
    },
    subtitle: {
      de: 'Modul 3 · Surfen, chatten und speichern ohne Mitleser',
      en: 'Module 3 · Browsing, chatting and storing without eavesdroppers',
    },
    sessions: {
      de: 'Termin 1: Künstliche Intelligenz lokal, Cloud – nein danke · Termin 2: Private Kommunikation, Exkurs Browser',
      en: 'Session 1: local AI, cloud – no thanks · Session 2: private communication, browser excursion',
    },
    chapters: [
      {
        title: { de: '1. Künstliche Intelligenz lokal', en: '1. Running AI locally' },
        points: {
          de: [
            'KI (Duden): Fähigkeit bestimmter Computerprogramme, menschliche Intelligenz nachzuahmen. Sprachmodell (Duden): Computerprogramm, das natürliche Sprache versteht, verarbeitet und erzeugt.',
            'Ein großes Sprachmodell (LLM) ist ein mehrschichtiges Rechen-Netzwerk, das durch komplexe Berechnungen Sprachmuster erlernt und damit Texte versteht und beantwortet.',
            'Vergleich Claude Opus 5.5 (Cloud): beschränkter Zugriff per Abo, Kontext 1 Mio. Tokens, liest Bilder und Dateien, Reasoning – aber Ihre Eingaben liegen beim Anbieter. Qwen2.5 7B Instruct (lokal): frei zugänglich, Kontext 32k Tokens, nur Text, deutlich schwächer – dafür bleiben die Daten bei Ihnen.',
            'Selbst hosten = die Software läuft bei mir lokal.',
            'Warum lokal? Eingaben werden gespeichert, oft auch fürs Training (je nach Einstellung); Verknüpfung mit Konto, Werbe-ID, Zahlungsdaten und IP; Serverstandorte überwiegend in den USA.',
            'Was gehört nie in eine Cloud-KI? Gesundheitsdaten, Passwörter, Kundendaten, Ausweisdaten.',
            'Was brauche ich? Die Ollama-App für Windows und macOS; für 7B/8B-Modelle ca. 8 GB Grafikkartenspeicher (VRAM).',
          ],
          en: [
            'AI: the ability of certain computer programs to imitate human intelligence. Language model: a computer program that understands, processes and generates natural language.',
            'A large language model (LLM) is a multi-layered computing network that learns language patterns through complex calculations and uses them to understand and answer text.',
            'Comparison – Claude Opus 5.5 (cloud): limited access via subscription, 1M-token context, reads images and files, reasoning – but your inputs are held by the provider. Qwen2.5 7B Instruct (local): freely available, 32k-token context, text only, much weaker – but your data stays with you.',
            'Self-hosting = the software runs on my own machine.',
            'Why local? Inputs are stored, often used for training too (depending on settings); linked to your account, advertising ID, payment details and IP; servers mostly in the US.',
            'What never belongs in a cloud AI? Health data, passwords, customer data, ID documents.',
            'What do I need? The Ollama app for Windows and macOS; about 8 GB of graphics memory (VRAM) for 7B/8B models.',
          ],
        },
        links: [
          {
            title: 'Ollama',
            url: 'https://ollama.com',
            description: {
              de: 'Sprachmodelle lokal auf dem eigenen Rechner ausführen',
              en: 'Run language models locally on your own computer',
            },
          },
          {
            title: 'OpenRouter: Modellvergleich',
            url: 'https://openrouter.ai/compare/anthropic/claude-opus-5.5/qwen/qwen-2.5-7b-instruct',
            description: {
              de: 'Claude Opus 5.5 vs. Qwen2.5 7B Instruct im Vergleich',
              en: 'Claude Opus 5.5 vs Qwen2.5 7B Instruct compared',
            },
          },
        ],
      },
      {
        title: { de: '2. Cloud – nein danke', en: '2. Cloud – no thanks' },
        points: {
          de: [
            'Clouddienst (Duden): Internetdienst, der Rechen- oder Speicherkapazität anbietet, auf die über ein Netzwerk zugegriffen wird.',
            'Warum Google & Apple den Rücken kehren? Zwangsanbindung (Android drängt auf Google Drive, iOS auf iCloud) · Inhalte werden maschinell ausgewertet (z. B. Objekte, Orte, Gesichter in Google Fotos) · US-Behörden können über den CLOUD Act auf Daten von US-Firmen zugreifen, auch bei Servern in der EU · eine Kontosperrung bedeutet den Verlust von Mails, Fotos, Daten und Kontakten.',
            'Nextcloud Community Edition: kostenlos, Quellcode öffentlich einsehbar (AGPL) – einsehbar heißt nicht automatisch geprüft, aber jeder kann prüfen. Dateien, Fotos, Kontakte und Kalender an einem Ort, automatische Synchronisierung, Apps für Android und iOS.',
            'Nextcloud zu Hause (z. B. alter Laptop/PC): Niemand kann Ihre Daten auslesen, solange alles richtig abgesichert ist. Dafür sind Sie selbst verantwortlich für Zugriffsschutz (Passwörter, Updates), Backups (Festplatten gehen kaputt – 3-2-1-Regel), Zugriff von unterwegs (VPN statt offener Ports) und Updates ohne Funktionsverlust.',
            'Deutsche Online-Speicher (teils auf Nextcloud-Basis): weniger Eigenverantwortung je nach Anbieter und Produkt und von Anfang an überall erreichbar – aber fremde Hardware, dauerhaft aus dem Internet erreichbar und damit angreifbar, monatliche Kosten und Abhängigkeit vom Anbieter. Unterschiede je nach Produkt, z. B. Hetzner Storage Box vs. Hetzner Storage Share.',
          ],
          en: [
            'Cloud service: an internet service offering computing or storage capacity accessed over a network.',
            'Why turn your back on Google & Apple? Lock-in (Android pushes Google Drive, iOS pushes iCloud) · content is analysed automatically (e.g. objects, places, faces in Google Photos) · US authorities can access data of US companies via the CLOUD Act, even on servers in the EU · a locked account means losing mail, photos, data and contacts.',
            'Nextcloud Community Edition: free, source code publicly viewable (AGPL) – viewable does not automatically mean audited, but anyone can check. Files, photos, contacts and calendars in one place, automatic sync, apps for Android and iOS.',
            'Nextcloud at home (e.g. an old laptop/PC): nobody can read your data as long as it is properly secured. In return you are responsible for access protection (passwords, updates), backups (drives fail – 3-2-1 rule), remote access (VPN rather than open ports) and updates without breaking things.',
            'German online storage (partly based on Nextcloud): less responsibility depending on provider and product, and reachable everywhere from day one – but someone else’s hardware, permanently reachable from the internet and therefore attackable, monthly costs and dependence on the provider. Products differ, e.g. Hetzner Storage Box vs Hetzner Storage Share.',
          ],
        },
        links: [
          {
            title: 'Nextcloud',
            url: 'https://nextcloud.com/de/',
            description: {
              de: 'Quelloffene Cloud für Dateien, Fotos, Kontakte und Kalender',
              en: 'Open-source cloud for files, photos, contacts and calendars',
            },
          },
          {
            title: 'Hetzner Storage Share',
            url: 'https://www.hetzner.com/de/storage/storage-share',
            description: {
              de: 'Beispiel für gehostete Nextcloud bei einem deutschen Anbieter',
              en: 'Example of hosted Nextcloud at a German provider',
            },
          },
          {
            title: 'US DOJ: CLOUD Act',
            url: 'https://www.justice.gov/criminal-oia/cloud-act-resources',
            description: { de: 'Hintergrund zum US-Datenzugriff', en: 'Background on US data access' },
          },
        ],
      },
      {
        title: { de: '3. Private Kommunikation', en: '3. Private communication' },
        points: {
          de: [
            'Telegram: Normale Chats und Gruppen sind nur bis zum Server verschlüsselt – Telegram kann mitlesen. Ende-zu-Ende nur in „Geheimen Chats“, nur 1:1, nie in Gruppen.',
            'Signal: kostenlos, Open Source, speichert fast keine Metadaten; Registrierung nur mit Handynummer.',
            'Threema: Einmalkauf (ca. 6,49 € unter Android), keine Nummer nötig, zufällige Threema-ID; Kontaktlisten und Gruppen liegen nur auf den Geräten.',
            'Matrix (z. B. mit der App Element): dezentral, keine Telefonnummer, nur eine Matrix-ID (@name:server); Nachrichten in privaten Räumen Ende-zu-Ende-verschlüsselt; Metadaten liegen beim gewählten Server.',
            'Matrix selbst hosten (eigener Synapse-Server): Metadaten bleiben bei Ihnen, aber Sie sind Administrator; Zugriff von unterwegs ist das gleiche Problem wie bei Nextcloud; Handy-Benachrichtigungen laufen meist trotzdem über Google/Apple.',
            'WhatsApp und Gruppenzwang – Einstellungen › Datenschutz › Erweitert: „IP-Adresse in Anrufen schützen“ und „Linkvorschau deaktivieren“. Backup & Medien: Google-Drive-Backup aus oder verschlüsselt, automatischen Medien-Download blockieren. Berechtigungen einschränken – Meta sammelt aber weiterhin Metadaten.',
          ],
          en: [
            'Telegram: normal chats and groups are only encrypted up to the server – Telegram can read them. End-to-end only in “Secret Chats”, only 1:1, never in groups.',
            'Signal: free, open source, stores almost no metadata; registration requires a phone number.',
            'Threema: one-off purchase (approx. €6.49 on Android), no phone number needed, random Threema ID; contact lists and groups are stored only on the devices.',
            'Matrix (e.g. with the Element app): decentralised, no phone number, just a Matrix ID (@name:server); messages in private rooms are end-to-end encrypted; metadata is held by the chosen server.',
            'Self-hosting Matrix (your own Synapse server): metadata stays with you, but you are the administrator; remote access is the same problem as with Nextcloud; mobile notifications usually still go through Google/Apple.',
            'WhatsApp and peer pressure – Settings › Privacy › Advanced: “Protect IP address in calls” and “Disable link previews”. Backup & media: turn off the Google Drive backup or encrypt it, block automatic media downloads. Restrict permissions – but Meta keeps collecting metadata.',
          ],
        },
        links: [
          {
            title: 'Signal',
            url: 'https://signal.org/de/',
            description: { de: 'Kostenloser, quelloffener Messenger', en: 'Free, open-source messenger' },
          },
          {
            title: 'Threema',
            url: 'https://threema.ch/de',
            description: {
              de: 'Messenger ohne Telefonnummer (Schweiz)',
              en: 'Messenger without a phone number (Switzerland)',
            },
          },
          {
            title: 'Element (Matrix)',
            url: 'https://element.io',
            description: {
              de: 'App für das dezentrale Matrix-Netzwerk',
              en: 'App for the decentralised Matrix network',
            },
          },
        ],
      },
      {
        title: {
          de: '4. Exkurs Browser: Werbung & Tracking blocken',
          en: '4. Browser excursion: blocking ads & tracking',
        },
        points: {
          de: [
            'Zwei Wege: im Browser (gerätegebunden) oder per DNS (ganzes Netzwerk, nur Domains).',
            'Browser: Brave mit Werbe- und Tracker-Blocker und zufälligen Fingerabdrücken; Tor-Browser als stärkster Schutz, dafür langsamer.',
            'DNS = das Telefonbuch des Internets. Pi-hole oder AdGuard Home (z. B. auf einem Raspberry Pi) blocken Werbung für alle Geräte im Heimnetz.',
            'Grenze: DNS blockt Domains, aber kein Fingerprinting.',
          ],
          en: [
            'Two ways: in the browser (per device) or via DNS (whole network, domains only).',
            'Browser: Brave with ad and tracker blocking and randomised fingerprints; Tor Browser as the strongest protection, but slower.',
            'DNS = the phone book of the internet. Pi-hole or AdGuard Home (e.g. on a Raspberry Pi) block ads for every device on the home network.',
            'Limitation: DNS blocks domains, but not fingerprinting.',
          ],
        },
        links: [
          {
            title: 'Brave: Fingerprinting Protections',
            url: 'https://github.com/brave/brave-browser/wiki/Fingerprinting-Protections',
            description: { de: 'Wie Brave Fingerabdrücke zufällig macht', en: 'How Brave randomises fingerprints' },
          },
          {
            title: 'Pi-hole',
            url: 'https://pi-hole.net',
            description: { de: 'Netzwerkweiter Werbeblocker per DNS', en: 'Network-wide ad blocker via DNS' },
          },
          {
            title: 'AdGuard Home',
            url: 'https://adguard.com/de/adguard-home/overview.html',
            description: { de: 'Netzwerkweiter DNS-Filter', en: 'Network-wide DNS filter' },
          },
        ],
      },
    ],
    takeaways: {
      de: [
        '1. Wichtige Konten absichern: Passwortmanager nutzen; Passwörter aus Leaks zuerst ersetzen, dann die von E-Mail-Konto, Bank und Shops (mindestens jährlich); einen zweiten Faktor (App) mindestens für das E-Mail-Konto einrichten.',
        '2. Werbung und Tracking minimieren: Werbe-ID löschen bzw. App-Tracking ausschalten, App-Berechtigungen prüfen und Unnötiges entziehen, Brave als Browser nutzen oder den gewohnten Browser mit minimalen Einstellungen absichern.',
        '3. Auf dem Laufenden bleiben und abwägen: einmal im Monat 15 Minuten für Updates und Einstellungen, den BSI-Newsletter „Sicher informiert“ und den Verbraucherschutz zu digitaler Sicherheit; neue Dienste vergleichen und gezielt aussuchen – oder direkt selbst hosten.',
        'Merksatz: Mehr Kontrolle heißt mehr Eigenverantwortung.',
        'Sie werden zu 99 % nicht gehackt, sondern überredet.',
      ],
      en: [
        '1. Secure your important accounts: use a password manager; replace leaked passwords first, then those for your email account, bank and shops (at least yearly); set up a second factor (app) at least for your email account.',
        '2. Minimise ads and tracking: delete the advertising ID or turn off app tracking, review app permissions and revoke what isn’t needed, use Brave or harden your usual browser with a few settings.',
        '3. Stay informed and weigh things up: 15 minutes once a month for updates and settings, the BSI newsletter “Sicher informiert” and consumer-protection advice on digital security; compare new services and choose deliberately – or host them yourself.',
        'Rule of thumb: more control means more responsibility.',
        '99% of the time you don’t get hacked, you get talked into it.',
      ],
    },
    homework: {
      title: { de: 'Dranbleiben', en: 'Staying up to date' },
      links: [
        {
          title: 'BSI-Newsletter „Sicher informiert“',
          url: 'https://www.bsi.bund.de/DE/Service-Navi/Abonnements/Newsletter/Buerger-CERT-Abos/Buerger-CERT-Sicher-Informiert/buerger-cert-sicher-informiert_node.html',
          description: {
            de: 'Kostenloser Newsletter zu aktuellen Gefahren',
            en: 'Free newsletter on current threats (German)',
          },
        },
        {
          title: 'Verbraucherzentrale: Digitale Welt',
          url: 'https://www.verbraucherzentrale.de/wissen/digitale-welt',
          description: {
            de: 'Verbraucherschutz zu digitaler Sicherheit',
            en: 'Consumer protection advice on digital security (German)',
          },
        },
      ],
    },
    items: {
      'personal-computers': [
        'vhs-keep-sensitive-data-out-of-cloud-ai',
        'vhs-consider-running-ai-locally',
        'vhs-reduce-dependence-on-big-tech-clouds',
        'backup-important-data',
        'keep-your-system-up-to-date',
      ],
      messaging: [
        'only-use-fully-end-to-end-encrypted-messengers',
        'use-only-open-source-messaging-platforms',
        'check-security-settings',
        'disable-cloud-services',
        'use-an-anonymous-platform',
        'consider-a-decentralized-platform',
        'vhs-harden-whatsapp-settings',
      ],
      networks: ['vhs-block-ads-network-wide-with-dns', 'secure-dns', "don't-have-open-ports", 'use-a-vpn'],
      'web-browsing': ['use-a-privacy-respecting-browser', 'use-the-tor-browser', 'spoof-html5-canvas-sig'],
      authentication: [
        'use-a-secure-password-manager',
        'enable-2-factor-authentication',
        'update-critical-passwords-periodically',
      ],
      'mobile-devices': ['opt-out-of-personalized-ads', 'app-permissions'],
    },
  },
];

/** Map of checklist item ID -> modules that cover it */
export const vhsItemIndex: Partial<Record<string, VhsModule[]>> = vhsModules.reduce(
  (index, mod) => {
    Object.values(mod.items)
      .flat()
      .forEach((id) => {
        index[id] = [...(index[id] || []), mod];
      });
    return index;
  },
  {} as Partial<Record<string, VhsModule[]>>,
);

/** Modules that cover at least one item in a given section */
export const vhsModulesForSection = (slug: string): VhsModule[] =>
  vhsModules.filter((mod) => slug in mod.items && mod.items[slug].length > 0);
