import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { RSVPData } from '../types';
import firebaseConfig from '../../firebase-applet-config.json';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const databaseId = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? firebaseConfig.firestoreDatabaseId
  : undefined;

export const db = databaseId ? getFirestore(app, databaseId) : getFirestore(app);

const RSVPS_COLLECTION = 'rsvps';

export async function fetchRsvpsFromFirebase(): Promise<RSVPData[]> {
  try {
    const q = query(collection(db, RSVPS_COLLECTION), orderBy('submittedAt', 'desc'));
    const snapshot = await getDocs(q);
    const rsvps: RSVPData[] = [];
    snapshot.forEach((docSnap) => {
      rsvps.push({ id: docSnap.id, ...docSnap.data() } as RSVPData);
    });
    return rsvps;
  } catch (error) {
    console.error('Error fetching RSVPs from Firebase Firestore:', error);
    // Fallback: try fetching without ordering if index is building
    try {
      const snapshot = await getDocs(collection(db, RSVPS_COLLECTION));
      const rsvps: RSVPData[] = [];
      snapshot.forEach((docSnap) => {
        rsvps.push({ id: docSnap.id, ...docSnap.data() } as RSVPData);
      });
      return rsvps;
    } catch (fallbackError) {
      console.error('Fallback fetch error:', fallbackError);
      return [];
    }
  }
}

export async function saveRsvpToFirebase(rsvp: RSVPData): Promise<RSVPData> {
  const rsvpId = rsvp.id || `rsvp-${Date.now()}`;
  const rsvpDoc: RSVPData = {
    ...rsvp,
    id: rsvpId,
    submittedAt: rsvp.submittedAt || new Date().toISOString(),
  };

  const docRef = doc(db, RSVPS_COLLECTION, rsvpId);
  await setDoc(docRef, rsvpDoc, { merge: true });
  return rsvpDoc;
}

export async function deleteRsvpFromFirebase(id: string): Promise<void> {
  const docRef = doc(db, RSVPS_COLLECTION, id);
  await deleteDoc(docRef);
}
