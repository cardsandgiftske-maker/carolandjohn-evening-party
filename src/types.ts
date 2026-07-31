export type AttendanceStatus = 'attending' | 'declining';

export type DietaryRequirement = 
  | 'vegetarian'
  | 'vegan'
  | 'gluten_free'
  | 'nut_allergy'
  | 'dairy_free'
  | 'halal'
  | 'kosher'
  | 'other';

export interface MenuItem {
  id: string;
  course: 'starter' | 'main' | 'dessert' | 'midnight_snack' | 'drinks';
  name: string;
  description: string;
  dietaryTags: DietaryRequirement[];
  winePairing?: string;
  popular?: boolean;
}

export interface GuestMealSelection {
  guestName: string;
  starterId: string;
  mainId: string;
  dessertId: string;
  dietaryRequirements: DietaryRequirement[];
  customDietaryNotes?: string;
}

export interface RSVPData {
  id: string;
  primaryGuestName: string;
  email: string;
  phone?: string;
  status: AttendanceStatus;
  guestCount: number;
  guestSelections: GuestMealSelection[];
  songRequest?: string;
  messageToCouple?: string;
  submittedAt: string;
}

export interface VenueLocation {
  name: string;
  address: string;
  city: string;
  postcode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  parkingInfo: string;
  transitInfo: string;
  nearbyHotels: Array<{
    name: string;
    distance: string;
    discountCode?: string;
    website?: string;
  }>;
}

export interface EventDetails {
  coupleNames: string;
  brideName: string;
  groomName: string;
  title: string;
  dateISO: string; // e.g. "2026-08-22T19:00:00"
  formattedDate: string;
  formattedTime: string;
  venueName: string;
  rsvpDeadlineFormatted: string;
  rsvpDeadlineISO: string;
  dressCode: string;
}
