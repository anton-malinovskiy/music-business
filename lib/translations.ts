export const pl = {
  app: {
    name: 'MuzykaDlaBiznesu',
    tagline: 'Muzyka AI dla Twojego biznesu',
    description: 'Generuj muzykę bez opłat licencyjnych',
  },

  auth: {
    login: 'Zaloguj się',
    register: 'Zarejestruj się',
    email: 'Email',
    password: 'Hasło',
    forgotPassword: 'Zapomniałeś hasła?',
    noAccount: 'Nie masz konta?',
    hasAccount: 'Masz już konto?',
    logout: 'Wyloguj się',
  },

  steps: {
    businessType: 'Typ działalności',
    timeOfDay: 'Pora dnia',
    genre: 'Gatunek',
    generate: 'Generuj',
  },

  businessTypes: {
    restaurant: 'Restauracja',
    cafe: 'Kawiarnia',
    retail: 'Sklep',
    spa: 'Spa',
    gym: 'Siłownia',
    hotel: 'Hotel',
  },

  timeOfDay: {
    morning: 'Poranek',
    lunch: 'Lunch',
    dinner: 'Obiad/Kolacja',
    evening: 'Wieczór',
    late_night: 'Późna noc',
  },

  genres: {
    jazz: 'Jazz',
    classical: 'Klasyczna',
    acoustic: 'Akustyczna',
    bossa_nova: 'Bossa Nova',
    ambient: 'Ambient',
    electronic: 'Elektroniczna',
    pop: 'Pop',
  },

  energy: {
    label: 'Energia',
    calm: 'Spokojny',
    energetic: 'Energiczny',
  },

  actions: {
    next: 'Dalej',
    back: 'Wstecz',
    generate: 'Generuj playlistę',
    generating: 'Generowanie...',
    play: 'Odtwórz',
    pause: 'Pauza',
    save: 'Zapisz',
    rename: 'Zmień nazwę',
    delete: 'Usuń',
    download: 'Pobierz',
  },

  playlist: {
    title: 'Twoja playlista',
    empty: 'Brak utworów',
    duration: 'Czas trwania',
    tracks: 'utworów',
    savedPlaylists: 'Zapisane playlisty',
    newPlaylist: 'Nowa playlista',
  },

  pricing: {
    monthly: '/miesiąc',
    yearly: '/rok',
    currentPlan: 'Twój plan',
    upgrade: 'Ulepsz',
  },

  errors: {
    generic: 'Wystąpił błąd. Spróbuj ponownie.',
    network: 'Brak połączenia z internetem.',
    auth: 'Nieprawidłowy email lub hasło.',
  },
}

export type Translations = typeof pl
