import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InvitationSection } from './components/InvitationSection';
import { RSVPForm } from './components/RSVPForm';
import { HostDashboard } from './components/HostDashboard';
import { Footer } from './components/Footer';
import { EnclosedEnvelope } from './components/EnclosedEnvelope';
import { INITIAL_DEMO_RSVPS } from './data/weddingData';
import { RSVPData } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [rsvps, setRsvps] = useState<RSVPData[]>(INITIAL_DEMO_RSVPS);
  const [hostDashboardOpen, setHostDashboardOpen] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(true);

  // Load RSVPs from backend API on mount
  useEffect(() => {
    fetchRsvps();
  }, []);

  const fetchRsvps = async () => {
    try {
      const res = await fetch('/api/rsvps');
      const data = await res.json();
      if (data.success && Array.isArray(data.rsvps)) {
        setRsvps(data.rsvps);
      }
    } catch (err) {
      console.warn('Backend API unavailable, using local state store:', err);
    }
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleRSVPSubmitted = (newRsvp: RSVPData) => {
    setRsvps((prev) => {
      const existingIdx = prev.findIndex(r => r.id === newRsvp.id || r.email.toLowerCase() === newRsvp.email.toLowerCase());
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = newRsvp;
        return copy;
      }
      return [newRsvp, ...prev];
    });
  };

  const handleDeleteRsvp = async (id: string) => {
    setRsvps(prev => prev.filter(r => r.id !== id));
    try {
      await fetch(`/api/rsvps/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('Error deleting RSVP from backend:', err);
    }
  };

  const handleAddManualRsvp = (rsvp: RSVPData) => {
    handleRSVPSubmitted(rsvp);
  };

  return (
    <div className="min-h-screen bg-[#1a040a] text-rose-50 selection:bg-rose-800 selection:text-amber-200 font-sans antialiased">
      {/* Interactive Enclosed Envelope Opening Experience */}
      {showEnvelope && (
        <EnclosedEnvelope
          onOpenComplete={() => {
            setShowEnvelope(false);
            setActiveSection('hero');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Sticky Header Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenHostDashboard={() => setHostDashboardOpen(true)}
        onReopenEnvelope={() => setShowEnvelope(true)}
        rsvpsCount={rsvps.length}
      />

      {/* Hero Section with Countdown */}
      <HeroSection
        onRsvpClick={() => handleNavigate('rsvp')}
        onInvitationClick={() => handleNavigate('invitation')}
      />

      {/* Invitation Formal Card Section */}
      <InvitationSection
        onRsvpClick={() => handleNavigate('rsvp')}
      />

      {/* Interactive RSVP Form & Confirmation Pass */}
      <RSVPForm
        onRSVPSubmitted={handleRSVPSubmitted}
      />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenHostDashboard={() => setHostDashboardOpen(true)}
        onReopenEnvelope={() => setShowEnvelope(true)}
      />

      {/* Host Dashboard Portal Modal */}
      {hostDashboardOpen && (
        <HostDashboard
          rsvps={rsvps}
          onClose={() => setHostDashboardOpen(false)}
          onDeleteRsvp={handleDeleteRsvp}
          onAddManualRsvp={handleAddManualRsvp}
        />
      )}
    </div>
  );
}
