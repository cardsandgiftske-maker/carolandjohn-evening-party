import { EventDetails, MenuItem, VenueLocation, RSVPData } from '../types';

export const EVENT_DETAILS: EventDetails = {
  coupleNames: 'Carol & John',
  brideName: 'Carol',
  groomName: 'John',
  title: 'Wedding Evening Party',
  dateISO: '2026-08-22T19:00:00',
  formattedDate: 'Saturday, August 22, 2026',
  formattedTime: '7:00 PM – Till Late',
  venueName: 'Evening Reception Venue',
  rsvpDeadlineFormatted: 'August 16, 2026',
  rsvpDeadlineISO: '2026-08-16',
  dressCode: 'Elegant evening attire',
};

export const VENUE_INFO: VenueLocation = {
  name: 'The Grand Ballroom',
  address: '450 Kensington Regency Way',
  city: 'London / Central City',
  postcode: 'SW1A 1AA',
  coordinates: {
    lat: 51.5074,
    lng: -0.1278,
  },
  parkingInfo: 'Complimentary secure valet parking is available at the main venue entrance on Regency Way. Overnight parking is available for hotel guests.',
  transitInfo: 'Located 5 minutes walk from Central Station. Underground lines: District, Circle, and Jubilee. Taxis and ride-shares have a dedicated drop-off zone.',
  nearbyHotels: [
    {
      name: 'The Grand Regency Hotel & Suites',
      distance: 'Adjacent to venue (0.1 miles)',
      discountCode: 'CAROLJOHN2026',
      website: 'https://example.com/grand-regency'
    },
    {
      name: 'Kensington Palace Boutique Hotel',
      distance: '0.4 miles away (8 min walk)',
      discountCode: 'WEDDINGGUEST15',
      website: 'https://example.com/kensington-boutique'
    },
    {
      name: 'The Rosewood Park Hotel',
      distance: '1.2 miles away (5 min taxi)',
      discountCode: 'CAROLJOHN2026',
      website: 'https://example.com/rosewood-park'
    }
  ]
};

export const DINNER_MENU: MenuItem[] = [
  // STARTERS
  {
    id: 'starter-1',
    course: 'starter',
    name: 'Truffled Wild Mushroom Crostini',
    description: 'Sautéed forest mushrooms, shaved black truffle, fresh thyme, and creamy mascarpone on artisanal grilled sourdough.',
    dietaryTags: ['vegetarian'],
    winePairing: '2022 Russian River Valley Chardonnay',
    popular: true,
  },
  {
    id: 'starter-2',
    course: 'starter',
    name: 'Pan-Seared Sea Scallops',
    description: 'Jumbo Atlantic scallops served with a silky cauliflower velvet puree, crispy pancetta lardons, and micro arugula.',
    dietaryTags: ['gluten_free'],
    winePairing: '2023 Marlborough Sauvignon Blanc',
  },
  {
    id: 'starter-3',
    course: 'starter',
    name: 'Heritage Beetroot & Heirloom Salad',
    description: 'Roasted golden and candy beets, whipped cashew ricotta, candied walnuts, baby gem lettuce, and pomegranate reduction.',
    dietaryTags: ['vegetarian', 'vegan', 'gluten_free', 'dairy_free', 'halal'],
    winePairing: '2021 Provençal Rosé',
  },

  // MAINS
  {
    id: 'main-1',
    course: 'main',
    name: 'Rosemary & Garlic Herb-Crusted Prime Rib',
    description: 'Slow-roasted prime beef tenderloin, roasted garlic pommes purée, charred baby carrots, and rich red wine jus reduction.',
    dietaryTags: ['gluten_free', 'halal'],
    winePairing: '2019 Napa Valley Cabernet Sauvignon',
    popular: true,
  },
  {
    id: 'main-2',
    course: 'main',
    name: 'Pan-Seared Wild Atlantic Salmon',
    description: 'Crispy skin salmon filet over saffron risotto, braised baby fennel, and citrus lemon-dill beurre blanc.',
    dietaryTags: ['gluten_free'],
    winePairing: '2021 Sonoma Coast Pinot Noir',
  },
  {
    id: 'main-3',
    course: 'main',
    name: 'Truffled Morel & Porcini Risotto',
    description: 'Creamy Arborio rice with wild porcini mushrooms, crispy sage leaves, shaved vegan parmesan, and white truffle drizzles.',
    dietaryTags: ['vegetarian', 'vegan', 'gluten_free', 'dairy_free', 'nut_allergy', 'halal', 'kosher'],
    winePairing: '2020 Barolo, Piedmont',
    popular: true,
  },

  // DESSERTS
  {
    id: 'main-4',
    course: 'dessert',
    name: 'Valrhona Salted Caramel Chocolate Torte',
    description: 'Decadent dark chocolate torte with smoked sea salt caramel layer, gold leaf garnish, and vanilla bean gelato.',
    dietaryTags: ['vegetarian'],
    winePairing: '10-Year Tawny Port',
    popular: true,
  },
  {
    id: 'main-5',
    course: 'dessert',
    name: 'Passion Fruit & Mango Panna Cotta',
    description: 'Silky coconut cream panna cotta topped with fresh mango passion fruit coulis and macadamia nut crumble.',
    dietaryTags: ['vegetarian', 'vegan', 'gluten_free', 'dairy_free', 'halal'],
    winePairing: 'Moscato d’Asti',
  },
  {
    id: 'main-6',
    course: 'dessert',
    name: 'Artisanal Berry Pavlova',
    description: 'Crisp light meringue shell filled with chantilly cream, fresh raspberries, blackberries, and mint infused syrup.',
    dietaryTags: ['vegetarian', 'gluten_free', 'nut_allergy'],
    winePairing: 'Late Harvest Riesling',
  },

  // LATE NIGHT SNACKS
  {
    id: 'snack-1',
    course: 'midnight_snack',
    name: 'Gourmet Slider Trio',
    description: 'Angus beef & truffle mayo, Crispy buttermilk chicken, and Plant-based Beyond slider bites served with seasoned truffle fries at 10:30 PM.',
    dietaryTags: ['vegetarian', 'vegan', 'halal'],
  },
  {
    id: 'snack-2',
    course: 'midnight_snack',
    name: 'Artisan Wood-Fired Mini Pizzas',
    description: 'Fresh Margherita, Truffled Mushroom, and Spicy Pepperoni wood-fired pizza slices passed around the dance floor.',
    dietaryTags: ['vegetarian', 'gluten_free'],
  },

  // DRINKS & BAR
  {
    id: 'drink-1',
    course: 'drinks',
    name: 'Carol & John’s Signature Cocktails',
    description: '“The Carol Bliss” (Elderflower Gin Fizz with prosecco & fresh mint) & “The John Old Fashioned” (Bourbon, orange bitters, smoked rosemary).',
    dietaryTags: ['vegan', 'gluten_free'],
  }
];

export const ENTERTAINMENT_INFO = {
  title: 'Evening Entertainment',
  subtitle: 'An Unforgettable Night of Celebration',
  hosts: [
    {
      name: 'MC Mathege',
      role: 'Master of Ceremonies & Host',
      tagline: 'Keeping the Energy High & Speeches Unforgettable',
      description: 'With natural charisma, wit, and stage presence, MC Mathege will host our evening reception—guiding grand entrances, toasts, cake cutting, and keeping the crowd smiling.',
      badge: 'Live Emcee',
    },
    {
      name: 'DJ Kelv',
      role: 'Headliner DJ & Music Virtuoso',
      tagline: 'Curating Non-Stop Dancefloor Vibes',
      description: 'Bringing high-energy sets across Afrobeats, Pop classics, RnB anthems, and guest song requests to keep the dancefloor buzzing until midnight!',
      badge: 'Live DJ Set',
    }
  ]
};

export const EVENING_TIMELINE = [
  { time: '7:00 PM', title: 'Arrival & Welcome Drinks', description: 'Red carpet welcome with Champagne, signature cocktails, and live acoustic music.' },
  { time: '7:45 PM', title: 'Grand Entrance & Welcome Speeches', description: 'Carol & John make their evening entrance followed by celebratory toasts.' },
  { time: '8:15 PM', title: 'Evening Reception Feast & Toast', description: 'Celebratory food station platters, fine wines, and couple toasts.' },
  { time: '9:30 PM', title: 'Wedding Cake Cutting & First Dance', description: 'Cutting of the 4-tier wedding cake followed by Carol & John’s romantic first dance.' },
  { time: '9:45 PM', title: 'Live Band & DJ Party', description: 'The dance floor opens with live band entertainment followed by guest DJ sets until late!' },
  { time: '10:45 PM', title: 'Late Night Gourmet Bites & Midnight Toast', description: 'Wood-fired mini pizzas, sliders, and midnight champagne toasts to keep the party going.' },
  { time: '12:00 AM', title: 'Carriages & Farewell', description: 'Sparkler send-off outside the entrance.' },
];

export const INITIAL_DEMO_RSVPS: RSVPData[] = [
  {
    id: 'rsvp-101',
    primaryGuestName: 'Eleanor Vance',
    email: 'eleanor.vance@example.com',
    phone: '+44 7700 900077',
    status: 'attending',
    guestCount: 2,
    guestSelections: [
      {
        guestName: 'Eleanor Vance',
        starterId: 'starter-1',
        mainId: 'main-1',
        dessertId: 'main-4',
        dietaryRequirements: ['nut_allergy'],
        customDietaryNotes: 'Severe peanut allergy, tree nuts okay in small doses but prefer none.',
      },
      {
        guestName: 'David Crain',
        starterId: 'starter-2',
        mainId: 'main-2',
        dessertId: 'main-5',
        dietaryRequirements: ['gluten_free'],
        customDietaryNotes: 'Strict Celiac disease.',
      }
    ],
    songRequest: 'Dancing in the Moonlight - Toploader',
    messageToCouple: 'So thrilled to celebrate with you both! Can’t wait to dance the night away!',
    submittedAt: '2026-07-15T14:22:00Z',
  },
  {
    id: 'rsvp-102',
    primaryGuestName: 'Marcus Sterling',
    email: 'marcus.s@example.com',
    status: 'attending',
    guestCount: 1,
    guestSelections: [
      {
        guestName: 'Marcus Sterling',
        starterId: 'starter-3',
        mainId: 'main-3',
        dessertId: 'main-5',
        dietaryRequirements: ['vegan', 'dairy_free'],
        customDietaryNotes: 'Strict vegan menu please.',
      }
    ],
    songRequest: 'September - Earth, Wind & Fire',
    messageToCouple: 'Wishing Carol & John a lifetime of love and joy!',
    submittedAt: '2026-07-20T09:15:00Z',
  },
];
