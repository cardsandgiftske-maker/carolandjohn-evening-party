import React from 'react';
import { EVENT_DETAILS, GOOGLE_MAPS_URL } from '../data/weddingData';
import { Calendar, Lock, Mail, MapPin, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenHostDashboard: () => void;
  onReopenEnvelope: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenHostDashboard, onReopenEnvelope }) => {
  return (
    <footer className="bg-[#120206] border-t border-rose-900/40 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-rose-300/70 text-xs relative">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-8">
        {/* Monogram Badge */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 via-rose-400 to-amber-100 p-0.5 shadow-xl shadow-rose-950/50">
          <div className="w-full h-full bg-[#180308] rounded-full flex items-center justify-center">
            <span className="font-serif text-amber-200 font-bold text-lg tracking-widest">C&amp;J</span>
          </div>
        </div>

        <div>
          <h3 className="font-serif text-3xl text-rose-50 font-normal mb-2">
            Carole &amp; John
          </h3>
          <p className="text-rose-200/80 font-serif italic text-base max-w-md mx-auto">
            "Thank you for being a part of our love story and our unforgettable evening celebration!"
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-rose-200/80">
          <button onClick={onReopenEnvelope} className="hover:text-amber-200 text-amber-300 transition-colors flex items-center space-x-1 font-mono">
            <Mail className="w-3.5 h-3.5" />
            <span>Open Envelope ✉️</span>
          </button>
          <button onClick={() => onNavigate('hero')} className="hover:text-amber-200 transition-colors">Home</button>
          <button onClick={() => onNavigate('venue')} className="hover:text-amber-200 transition-colors">Venue &amp; Map</button>
          <button onClick={() => onNavigate('entertainment')} className="hover:text-amber-200 transition-colors">Entertainment</button>
          <button onClick={() => onNavigate('rsvp')} className="hover:text-amber-200 transition-colors">RSVP</button>
        </div>

        {/* Date & Location summary */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-amber-300 font-mono">
          <div className="flex items-center space-x-1.5 bg-[#180308] border border-rose-900/40 px-4 py-1.5 rounded-full">
            <Calendar className="w-3.5 h-3.5 text-amber-300" />
            <span>August 22, 2026</span>
          </div>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 bg-[#180308] hover:bg-[#28050f] border border-rose-900/40 hover:border-amber-400/50 px-4 py-1.5 rounded-full text-amber-200 hover:text-amber-300 transition-all group"
            title="Open location in Google Maps"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition-transform" />
            <span className="underline decoration-amber-400/40 underline-offset-2">Brighton International School</span>
            <ExternalLink className="w-3 h-3 text-amber-300/80" />
          </a>
        </div>

        <div className="border-t border-rose-900/40 w-full pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-rose-300/60 gap-4">
          <p>© 2026 Carol &amp; John Wedding Evening Party. All rights reserved.</p>
          <button
            onClick={onOpenHostDashboard}
            className="flex items-center space-x-1.5 text-rose-300/80 hover:text-amber-200 font-mono text-[11px] bg-[#1d040c] border border-rose-800/40 px-3 py-1 rounded-lg"
          >
            <Lock className="w-3 h-3 text-amber-300" />
            <span>Carol &amp; John Host Portal</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
