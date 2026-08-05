import React from 'react';
import { Shirt, Mic, Disc, Music, Sparkles, Radio, Send } from 'lucide-react';

interface EntertainmentSectionProps {
  onRsvpClick: () => void;
}

export const EntertainmentSection: React.FC<EntertainmentSectionProps> = ({ onRsvpClick }) => {
  return (
    <section id="entertainment" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-[#1a040a]">
      <div className="max-w-5xl mx-auto text-center relative">
        {/* Decorative Gold Filigree Top Accent */}
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-10" />

        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center space-x-2 bg-[#2d0714] border border-amber-500/40 px-4 py-1.5 rounded-full mb-4 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-xs font-serif uppercase tracking-widest text-amber-200">
              Evening Party Hosts &amp; Music
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-rose-50 font-normal mb-3">
            Entertainment By <br className="hidden sm:inline" />
            <span className="text-amber-200 font-medium">MC Mathege</span> &amp; <span className="text-amber-200 font-medium">DJ Kelv</span>
          </h2>
        </div>

        {/* Headliners Minimal Clean Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* MC Mathege Card */}
          <div className="relative bg-gradient-to-b from-[#2d0714] via-[#24050e] to-[#1e040b] border-2 border-rose-800/50 hover:border-amber-400/60 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-rose-950/60 transition-all text-center flex flex-col items-center justify-center group">
            {/* Corner Flourish Accents */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-400/60 rounded-tl-lg" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-400/60 rounded-tr-lg" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-400/60 rounded-bl-lg" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-400/60 rounded-br-lg" />

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-400 to-amber-100 p-0.5 shadow-lg mb-4">
              <div className="w-full h-full bg-[#180308] rounded-[14px] flex items-center justify-center group-hover:bg-rose-900/40 transition-colors">
                <Mic className="w-8 h-8 text-amber-300" />
              </div>
            </div>

            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-mono px-3 py-1 rounded-full uppercase tracking-wider font-semibold mb-2">
              Live Emcee
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl text-rose-50 font-normal mb-1">
              MC Mathege
            </h3>
            <p className="text-xs uppercase tracking-widest text-amber-300/90 font-mono">
              Master of Ceremonies &amp; Host
            </p>
          </div>

          {/* DJ Kelv Card */}
          <div className="relative bg-gradient-to-b from-[#2d0714] via-[#24050e] to-[#1e040b] border-2 border-rose-800/50 hover:border-amber-400/60 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-rose-950/60 transition-all text-center flex flex-col items-center justify-center group">
            {/* Corner Flourish Accents */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-400/60 rounded-tl-lg" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-400/60 rounded-tr-lg" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-400/60 rounded-bl-lg" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-400/60 rounded-br-lg" />

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-400 to-amber-100 p-0.5 shadow-lg mb-4">
              <div className="w-full h-full bg-[#180308] rounded-[14px] flex items-center justify-center group-hover:bg-rose-900/40 transition-colors">
                <Disc className="w-8 h-8 text-amber-300 animate-spin-slow" />
              </div>
            </div>

            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-mono px-3 py-1 rounded-full uppercase tracking-wider font-semibold mb-2">
              On The Decks
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl text-rose-50 font-normal mb-1">
              DJ Kelv
            </h3>
            <p className="text-xs uppercase tracking-widest text-amber-300/90 font-mono">
              Headliner DJ &amp; Sound Virtuoso
            </p>
          </div>
        </div>

        {/* Dress Code Highlight Banner */}
        <div className="bg-gradient-to-r from-[#24050e] via-[#320817] to-[#24050e] border-2 border-amber-400/50 rounded-2xl p-6 sm:p-8 mb-10 shadow-xl max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="p-3 bg-amber-400/10 border border-amber-400/30 rounded-full text-amber-300 shrink-0">
            <Shirt className="w-6 h-6 text-amber-300" />
          </div>
          <div className="text-center sm:text-left">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-300 block mb-0.5">
              Guest Dress Code
            </span>
            <p className="font-serif text-xl sm:text-2xl text-rose-50 font-normal">
              Dress code: <span className="text-amber-200 font-medium italic">Elegant evening attire</span>
            </p>
          </div>
        </div>

        {/* Interactive Song Request Callout Banner */}
        <div className="bg-gradient-to-r from-[#24050e] via-[#2d0714] to-[#24050e] border border-amber-500/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-left">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-amber-400/10 border border-amber-400/30 rounded-2xl text-amber-300 shrink-0">
              <Radio className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h4 className="font-serif text-xl text-rose-50 font-medium mb-1">
                Have a favorite track for DJ Kelv?
              </h4>
              <p className="text-xs sm:text-sm text-rose-200/80 leading-relaxed">
                Submit your favorite song request when confirming your RSVP so MC Mathege &amp; DJ Kelv can play it on the dancefloor!
              </p>
            </div>
          </div>

          <button
            onClick={onRsvpClick}
            className="w-full md:w-auto bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-rose-950 font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-amber-500/20 transition-all shrink-0 flex items-center justify-center space-x-2 transform hover:scale-105 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>RSVP &amp; Request Song</span>
          </button>
        </div>
      </div>
    </section>
  );
};
