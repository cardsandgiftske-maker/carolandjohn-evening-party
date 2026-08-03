import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { EVENT_DETAILS } from '../data/weddingData';
import { RSVPData, GuestMealSelection, AttendanceStatus } from '../types';
import { Send, CheckCircle2, Download, RefreshCw, Music, Check } from 'lucide-react';

interface RSVPFormProps {
  onRSVPSubmitted: (rsvp: RSVPData) => void;
}

export const RSVPForm: React.FC<RSVPFormProps> = ({ onRSVPSubmitted }) => {
  const [status, setStatus] = useState<AttendanceStatus>('attending');
  const [primaryGuestName, setPrimaryGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [songRequest, setSongRequest] = useState('');
  const [messageToCouple, setMessageToCouple] = useState('');
  
  const [guestSelections, setGuestSelections] = useState<GuestMealSelection[]>([
    {
      guestName: '',
      starterId: '',
      mainId: '',
      dessertId: '',
      dietaryRequirements: [],
    }
  ]);

  const [submitting, setSubmitting] = useState(false);
  const [submittedRSVP, setSubmittedRSVP] = useState<RSVPData | null>(null);

  // Sync guestSelections array length with guestCount selector
  useEffect(() => {
    setGuestSelections(prev => {
      const updated = [...prev];
      if (guestCount > updated.length) {
        for (let i = updated.length; i < guestCount; i++) {
          updated.push({
            guestName: i === 0 ? primaryGuestName : `Guest ${i + 1}`,
            starterId: '',
            mainId: '',
            dessertId: '',
            dietaryRequirements: [],
          });
        }
      } else if (guestCount < updated.length) {
        return updated.slice(0, guestCount);
      }
      return updated;
    });
  }, [guestCount]);

  // Update primary guest name in guest 0
  useEffect(() => {
    if (primaryGuestName) {
      setGuestSelections(prev => {
        const copy = [...prev];
        if (copy[0]) {
          copy[0].guestName = primaryGuestName;
        }
        return copy;
      });
    }
  }, [primaryGuestName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!primaryGuestName.trim()) {
      alert('Please enter your full name.');
      return;
    }

    setSubmitting(true);

    const rsvpPayload: RSVPData = {
      id: `rsvp-${Date.now()}`,
      primaryGuestName: primaryGuestName.trim(),
      phone: phone.trim(),
      status,
      guestCount: status === 'attending' ? guestCount : 0,
      guestSelections: status === 'attending' ? guestSelections : [],
      songRequest: songRequest.trim(),
      messageToCouple: messageToCouple.trim(),
      submittedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/rsvps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rsvpPayload),
      });

      const data = await res.json();
      if (data.success && data.rsvp) {
        setSubmittedRSVP(data.rsvp);
        onRSVPSubmitted(data.rsvp);
      } else {
        setSubmittedRSVP(rsvpPayload);
        onRSVPSubmitted(rsvpPayload);
      }

      if (status === 'attending') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#fbbf24', '#f43f5e', '#ffe4e6'],
        });
      }
    } catch (err) {
      console.warn('Network error, saving locally:', err);
      setSubmittedRSVP(rsvpPayload);
      onRSVPSubmitted(rsvpPayload);
    } finally {
      setSubmitting(false);
    }
  };

  const generateICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Carol & John Wedding Evening Party//EN',
      'BEGIN:VEVENT',
      'SUMMARY:Carol & John Wedding Evening Party',
      'DESCRIPTION:Evening reception party with drinks, music, and dancing. Dress code: Black Tie / Evening Elegance.',
      'LOCATION:Carol & John Wedding Evening Reception Venue',
      'DTSTART:20260822T190000Z',
      'DTEND:20260823T000000Z',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Carol_and_John_Evening_Party.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="rsvp" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#180308] relative border-t border-rose-900/30">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-300 font-mono block mb-2">
            Confirm Your Attendance
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-rose-50 font-normal">
            RSVP &amp; Party Confirmation
          </h2>
          <p className="text-rose-200/90 font-serif italic text-base sm:text-lg mt-3 max-w-lg mx-auto">
            Please respond by <strong className="text-amber-200">{EVENT_DETAILS.rsvpDeadlineFormatted}</strong> to help us finalize evening celebrations.
          </p>
        </div>

        {/* Submitted RSVP Pass Display */}
        {submittedRSVP ? (
          <div className="bg-[#260610] border-2 border-rose-800/60 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden animate-fadeIn">
            <div className="absolute top-0 right-0 bg-amber-400 text-rose-950 font-bold px-6 py-2 rounded-bl-2xl text-xs uppercase tracking-widest shadow-lg">
              RSVP Confirmed
            </div>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-300 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-3xl text-rose-50 font-medium">
                {submittedRSVP.status === 'attending' ? 'We Can’t Wait to See You!' : 'Thank You for Letting Us Know'}
              </h3>
              <p className="text-rose-200/80 text-sm mt-2">
                RSVP successfully recorded for <strong className="text-amber-200 font-mono">{submittedRSVP.primaryGuestName}</strong>
              </p>
            </div>

            {submittedRSVP.status === 'attending' && (
              <div className="space-y-6 border-t border-b border-rose-900/40 py-6 my-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#180308] p-4 rounded-xl border border-rose-800/40">
                    <span className="text-xs uppercase tracking-widest text-amber-300 font-mono">Primary Guest</span>
                    <p className="text-lg font-serif text-rose-100 font-medium">{submittedRSVP.primaryGuestName}</p>
                    {submittedRSVP.phone && <p className="text-xs text-rose-300/70 font-mono mt-1">{submittedRSVP.phone}</p>}
                  </div>
                  <div className="bg-[#180308] p-4 rounded-xl border border-rose-800/40">
                    <span className="text-xs uppercase tracking-widest text-amber-300 font-mono">Party Size</span>
                    <p className="text-lg font-serif text-rose-100 font-medium">{submittedRSVP.guestCount} Guest(s)</p>
                  </div>
                </div>

                {submittedRSVP.songRequest && (
                  <div className="bg-[#180308]/60 p-3 rounded-xl border border-rose-900/40 flex items-center space-x-3 text-xs">
                    <Music className="w-4 h-4 text-amber-300 shrink-0" />
                    <div>
                      <span className="text-rose-300/70 block font-mono text-[10px]">Song Request:</span>
                      <span className="text-amber-200 font-medium">{submittedRSVP.songRequest}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Actions for Calendar & Edit */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={generateICS}
                className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-rose-950 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20"
              >
                <Download className="w-4 h-4" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <button
                onClick={() => setSubmittedRSVP(null)}
                className="w-full sm:w-auto bg-[#180308] border border-rose-800/40 text-rose-200 hover:text-amber-200 px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Update / Edit RSVP</span>
              </button>
            </div>
          </div>
        ) : (
          /* RSVP Form */
          <form
            onSubmit={handleSubmit}
            className="bg-[#260610] border border-rose-800/50 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 backdrop-blur-md"
          >
            {/* Step 1: Attendance Status */}
            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-widest text-amber-300 font-mono">
                Will You Be Attending? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setStatus('attending')}
                  className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    status === 'attending'
                      ? 'bg-rose-900/50 border-amber-400 text-amber-100 shadow-md shadow-rose-950/40'
                      : 'bg-[#180308] border-rose-900/40 text-rose-300/70 hover:border-rose-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${status === 'attending' ? 'border-amber-400 bg-amber-400' : 'border-rose-800'}`}>
                      {status === 'attending' && <Check className="w-3.5 h-3.5 text-rose-950 stroke-[3]" />}
                    </div>
                    <div>
                      <strong className="block text-sm font-serif text-rose-100">Joyfully Accepts</strong>
                      <span className="text-xs text-rose-300/70">Ready to celebrate &amp; dance!</span>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setStatus('declining')}
                  className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    status === 'declining'
                      ? 'bg-rose-950 border-rose-700 text-rose-200'
                      : 'bg-[#180308] border-rose-900/40 text-rose-300/70 hover:border-rose-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${status === 'declining' ? 'border-rose-400 bg-rose-400' : 'border-rose-800'}`}>
                      {status === 'declining' && <Check className="w-3.5 h-3.5 text-rose-950 stroke-[3]" />}
                    </div>
                    <div>
                      <strong className="block text-sm font-serif text-rose-100">Regretfully Declines</strong>
                      <span className="text-xs text-rose-300/70">Will be with you in spirit</span>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 2: Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-amber-300 font-mono mb-2">
                  Primary Guest Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={primaryGuestName}
                  onChange={(e) => setPrimaryGuestName(e.target.value)}
                  className="w-full bg-[#180308] border border-rose-800/40 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-rose-100 placeholder-rose-300/40 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-amber-300 font-mono mb-2">
                  Mobile / Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +44 7700 900123"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#180308] border border-rose-800/40 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-rose-100 placeholder-rose-300/40 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              {status === 'attending' && (
                <div>
                  <label className="block text-xs uppercase tracking-widest text-amber-300 font-mono mb-2">
                    Number of Attending Guests
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full bg-[#180308] border border-rose-800/40 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-rose-100 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  >
                    <option value={1}>1 Guest (Just Myself)</option>
                    <option value={2}>2 Guests (Myself + 1)</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                  </select>
                </div>
              )}
            </div>

            {/* Step 3: Song Request & Message */}
            <div className="border-t border-rose-900/40 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-amber-300 font-mono mb-2">
                  Song Request for the DJ 🎵
                </label>
                <input
                  type="text"
                  placeholder="e.g. September - Earth, Wind & Fire"
                  value={songRequest}
                  onChange={(e) => setSongRequest(e.target.value)}
                  className="w-full bg-[#180308] border border-rose-800/40 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-rose-100 placeholder-rose-300/40"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-amber-300 font-mono mb-2">
                  Warm Wishes / Note for Carol &amp; John
                </label>
                <textarea
                  rows={2}
                  placeholder="Leave a message for the happy couple..."
                  value={messageToCouple}
                  onChange={(e) => setMessageToCouple(e.target.value)}
                  className="w-full bg-[#180308] border border-rose-800/40 focus:border-amber-400 rounded-xl px-4 py-2.5 text-sm text-rose-100 placeholder-rose-300/40"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-rose-950 font-bold py-4 rounded-2xl text-xs sm:text-sm uppercase tracking-widest shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center space-x-2"
              >
                {submitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Submitting RSVP...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Confirm Attendance &amp; RSVP</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
