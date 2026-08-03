import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(process.cwd(), 'rsvps_store.json');

app.use(express.json());

// Initial default data if store file does not exist
const initialRsvps = [
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
        customDietaryNotes: 'Severe peanut allergy.',
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
    messageToCouple: 'So thrilled to celebrate with you both!',
    submittedAt: '2026-07-15T14:22:00Z',
  },
  {
    id: 'rsvp-102',
    primaryGuestName: 'Marcus Sterling',
    email: 'marcus.s@example.com',
    phone: '',
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
  }
];

function loadRsvps(): any[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading RSVPs file:', err);
  }
  saveRsvps(initialRsvps);
  return initialRsvps;
}

function saveRsvps(rsvps: any[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(rsvps, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving RSVPs file:', err);
  }
}

let rsvpsStore = loadRsvps();

// API Routes
app.get('/api/rsvps', (req, res) => {
  res.json({ success: true, rsvps: rsvpsStore });
});

app.post('/api/rsvps', (req, res) => {
  const newRsvp = req.body;
  if (!newRsvp || !newRsvp.primaryGuestName) {
    return res.status(400).json({ success: false, error: 'Name is required.' });
  }

  // Check if updating existing by id or matching guest name
  const existingIndex = rsvpsStore.findIndex(
    r => r.id === newRsvp.id || (newRsvp.email && r.email && r.email.toLowerCase() === newRsvp.email.toLowerCase())
  );

  const rsvpRecord = {
    ...newRsvp,
    id: newRsvp.id || `rsvp-${Date.now()}`,
    submittedAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    rsvpsStore[existingIndex] = rsvpRecord;
  } else {
    rsvpsStore.unshift(rsvpRecord);
  }

  saveRsvps(rsvpsStore);
  res.json({ success: true, rsvp: rsvpRecord });
});

app.delete('/api/rsvps/:id', (req, res) => {
  const { id } = req.params;
  rsvpsStore = rsvpsStore.filter(r => r.id !== id);
  saveRsvps(rsvpsStore);
  res.json({ success: true, message: 'RSVP removed' });
});

app.get('/api/rsvps/export/csv', (req, res) => {
  const headers = [
    'RSVP ID',
    'Primary Guest',
    'Email',
    'Phone',
    'Status',
    'Guest Count',
    'Individual Guest Name',
    'Starter ID',
    'Main ID',
    'Dessert ID',
    'Dietary Requirements',
    'Custom Dietary Notes',
    'Song Request',
    'Message to Couple',
    'Submitted At'
  ];

  const rows: string[] = [headers.join(',')];

  rsvpsStore.forEach(rsvp => {
    if (rsvp.guestSelections && rsvp.guestSelections.length > 0) {
      rsvp.guestSelections.forEach((g: any) => {
        const row = [
          `"${rsvp.id}"`,
          `"${(rsvp.primaryGuestName || '').replace(/"/g, '""')}"`,
          `"${(rsvp.email || '').replace(/"/g, '""')}"`,
          `"${(rsvp.phone || '').replace(/"/g, '""')}"`,
          `"${rsvp.status}"`,
          `"${rsvp.guestCount}"`,
          `"${(g.guestName || '').replace(/"/g, '""')}"`,
          `"${g.starterId || ''}"`,
          `"${g.mainId || ''}"`,
          `"${g.dessertId || ''}"`,
          `"${(g.dietaryRequirements || []).join('; ')}"`,
          `"${(g.customDietaryNotes || '').replace(/"/g, '""')}"`,
          `"${(rsvp.songRequest || '').replace(/"/g, '""')}"`,
          `"${(rsvp.messageToCouple || '').replace(/"/g, '""')}"`,
          `"${rsvp.submittedAt}"`
        ];
        rows.push(row.join(','));
      });
    } else {
      const row = [
        `"${rsvp.id}"`,
        `"${(rsvp.primaryGuestName || '').replace(/"/g, '""')}"`,
        `"${(rsvp.email || '').replace(/"/g, '""')}"`,
        `"${(rsvp.phone || '').replace(/"/g, '""')}"`,
        `"${rsvp.status}"`,
        `"${rsvp.guestCount}"`,
        `"N/A"`,
        `""`,
        `""`,
        `""`,
        `""`,
        `""`,
        `"${(rsvp.songRequest || '').replace(/"/g, '""')}"`,
        `"${(rsvp.messageToCouple || '').replace(/"/g, '""')}"`,
        `"${rsvp.submittedAt}"`
      ];
      rows.push(row.join(','));
    }
  });

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="Carol_and_John_Evening_Party_RSVPs.csv"');
  res.send(rows.join('\n'));
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
