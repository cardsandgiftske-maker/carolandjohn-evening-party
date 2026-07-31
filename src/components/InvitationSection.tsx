import React from 'react';
import { EVENT_DETAILS } from '../data/weddingData';
import { Heart, Sparkles, AlertCircle, Shirt } from 'lucide-react';

interface InvitationSectionProps {
  onRsvpClick: () => void;
}

export const InvitationSection: React.FC<InvitationSectionProps> = ({ onRsvpClick }) => {
  return (
    <section id="invitation" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-[#1a040a]">
      {/* Decorative Gold/Rose Filigree Accent Top */}
      <div className="max-w-3xl mx-auto text-center relative">
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-10" />

        {/* Outer Frame with Burgundy & Gold Styling */}
        <div className="relative bg-gradient-to-b from-[#2d0714] via-[#24050e] to-[#1e040b] border-2 border-rose-800/50 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-rose-950/60">
          {/* Corner Flourish Accents */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-400/70 rounded-tl-lg" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-400/70 rounded-tr-lg" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-400/70 rounded-bl-lg" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-400/70 rounded-br-lg" />

          {/* Invitation Monogram Header */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 via-rose-400 to-amber-100 p-0.5 shadow-lg shadow-rose-950/40">
              <div className="w-full h-full bg-[#180308] rounded-full flex items-center justify-center">
                <Heart className="w-7 h-7 text-amber-300 fill-amber-300/20" />
              </div>
            </div>
          </div>

          <p className="font-serif uppercase tracking-widest text-amber-300 text-xs sm:text-sm font-semibold mb-4">
            Together With Their Families
          </p>

          <h2 className="font-serif text-3xl sm:text-5xl text-rose-50 font-normal mb-4">
            Carol &amp; John
          </h2>

          <p className="text-rose-100/90 font-serif italic text-lg sm:text-xl max-w-xl mx-auto leading-relaxed mb-8">
            Warmly invite you to celebrate their marriage at an Evening Party Reception following their daytime wedding ceremony.
          </p>

          {/* Key Invitation Details Card */}
          <div className="my-8 py-6 px-6 bg-[#180308]/90 border border-amber-500/20 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
            <div className="space-y-1">
              <span className="block text-xs uppercase tracking-widest text-amber-300 font-mono">Date</span>
              <span className="block text-lg font-serif text-rose-100 font-medium">{EVENT_DETAILS.formattedDate}</span>
            </div>
            <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-rose-900/40 pt-4 sm:pt-0 sm:pl-4">
              <span className="block text-xs uppercase tracking-widest text-amber-300 font-mono">Time</span>
              <span className="block text-lg font-serif text-rose-100 font-medium">{EVENT_DETAILS.formattedTime}</span>
            </div>
          </div>

          {/* Ceremony Transition Note */}
          <div className="bg-rose-950/40 border border-amber-500/30 rounded-2xl p-4 sm:p-5 mb-8 text-left flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
            <div className="text-sm text-rose-100/90 leading-relaxed">
              <strong className="text-amber-200 font-serif block mb-0.5">Evening Celebration Note</strong>
              Following our intimate daytime ceremony, we cannot wait to toast, celebrate, and hit the dance floor with all of our favorite people! Join us starting at 7:00 PM for welcome drinks, celebratory toasts, live music, and late-night party bites.
            </div>
          </div>

          {/* Dress Code & Deadline Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-rose-900/40 pt-6 text-xs sm:text-sm text-rose-200/90">
            <div className="flex items-center space-x-2">
              <Shirt className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Dress Code: <strong className="text-amber-200 font-medium">{EVENT_DETAILS.dressCode}</strong></span>
            </div>

            <div className="flex items-center space-x-2 bg-rose-900/30 border border-amber-500/30 px-3 py-1.5 rounded-full text-amber-200">
              <AlertCircle className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Please RSVP by <strong className="font-bold underline">{EVENT_DETAILS.rsvpDeadlineFormatted}</strong></span>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8">
            <button
              onClick={onRsvpClick}
              className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-rose-950 font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-widest shadow-lg shadow-amber-500/20 transition-all transform hover:scale-105"
            >
              Confirm Your Attendance
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
