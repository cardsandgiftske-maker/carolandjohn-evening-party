import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { EVENT_DETAILS } from '../data/weddingData';
import { Sparkles, Heart, ArrowRight, X, Mail } from 'lucide-react';

interface EnclosedEnvelopeProps {
  onOpenComplete: () => void;
}

export const EnclosedEnvelope: React.FC<EnclosedEnvelopeProps> = ({ onOpenComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpen || isOpening) return;

    setIsOpening(true);

    // Burst golden sparkles confetti
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#fbbf24', '#f59e0b', '#d97706', '#f43f5e', '#fff1f2'],
    });

    // Flap folds open and card slides out
    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);

      // Automatically transition to the hero page after showing opening animation
      setTimeout(() => {
        handleEnterSite();
      }, 1000);
    }, 600);
  };

  const handleEnterSite = () => {
    setIsDismissed(true);
    setTimeout(() => {
      onOpenComplete();
    }, 400);
  };

  if (isDismissed) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0e0205] transition-opacity duration-700 ${
        isDismissed ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient background particles & vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-950/40 via-[#140307] to-[#0a0103] pointer-events-none" />

      <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-amber-300 blur-sm animate-pulse" />
      <div className="absolute top-1/3 right-12 w-3 h-3 rounded-full bg-rose-400 blur-sm animate-pulse delay-500" />
      <div className="absolute bottom-1/4 left-1/4 w-2 h-2 rounded-full bg-amber-400 blur-sm animate-pulse delay-1000" />

      {/* Skip button for quick navigation */}
      <button
        onClick={handleEnterSite}
        className="absolute top-6 right-6 text-xs text-rose-300/70 hover:text-amber-200 font-mono flex items-center space-x-1.5 bg-[#25050f]/60 hover:bg-[#340715] px-4 py-2 rounded-full border border-rose-800/40 transition-all z-20"
      >
        <span>Skip to site</span>
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Main Envelope & Card Stage Container */}
      <div className="relative w-full max-w-lg mx-auto flex flex-col items-center justify-center min-h-[500px] z-10">
        
        {/* Helper Prompt Header */}
        <div className={`text-center mb-6 transition-all duration-500 ${isOpen ? 'opacity-0 translate-y-[-10px]' : 'opacity-100'}`}>
          <div className="inline-flex items-center space-x-2 bg-[#2d0714]/90 border border-amber-500/40 px-4 py-1.5 rounded-full mb-3 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
            <span className="text-xs font-serif tracking-widest uppercase text-amber-200">
              Personal Invitation
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-rose-50 font-light">
            Carol &amp; John
          </h2>
          <p className="text-xs text-amber-300/80 font-mono mt-1">
            Evening Party Reception • August 22, 2026
          </p>
        </div>

        {/* 3D Envelope Wrapper */}
        <div className="relative w-full max-w-md aspect-[4/3] perspective-1000">
          
          {/* Card Inside (Slides Up when open) */}
          <div
            className={`absolute left-4 right-4 bg-gradient-to-b from-[#2d0714] via-[#23050f] to-[#1a040a] border-2 border-amber-400/40 rounded-2xl p-6 sm:p-8 text-center shadow-2xl transition-all duration-1000 ease-out z-10 ${
              isOpen
                ? 'top-[-80px] sm:top-[-110px] scale-100 opacity-100 shadow-rose-950/80'
                : 'top-4 scale-95 opacity-80 pointer-events-none'
            }`}
          >
            {/* Corner Flourishes */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-400/60 rounded-tl-sm" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-400/60 rounded-tr-sm" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-400/60 rounded-bl-sm" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-400/60 rounded-br-sm" />

            {/* Invitation Card Content */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 via-rose-400 to-amber-100 p-0.5 mx-auto mb-3 shadow-md">
              <div className="w-full h-full bg-[#180308] rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-amber-300 fill-amber-300/20" />
              </div>
            </div>

            <span className="block text-[10px] font-serif uppercase tracking-widest text-amber-300 font-semibold mb-1">
              Evening Celebration
            </span>
            
            <h3 className="font-serif text-2xl sm:text-4xl text-rose-50 font-normal mb-2">
              Carol &amp; John
            </h3>

            <p className="text-rose-100/90 font-serif italic text-xs sm:text-sm max-w-xs mx-auto mb-4">
              Request the pleasure of your company for an evening of music, toasts &amp; dancing.
            </p>

            <div className="py-2 border-t border-b border-rose-900/40 my-3 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] uppercase font-mono text-amber-300 block">Date</span>
                <span className="font-serif text-rose-100 text-xs font-medium">{EVENT_DETAILS.formattedDate}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-amber-300 block">Time</span>
                <span className="font-serif text-rose-100 text-xs font-medium">{EVENT_DETAILS.formattedTime}</span>
              </div>
            </div>

            {/* Enter Site Button inside Card */}
            <button
              onClick={handleEnterSite}
              className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-rose-950 font-bold py-3 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center space-x-2 mt-4 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>View Full Website &amp; RSVP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Envelope Back & Pocket Body */}
          <div className="absolute inset-0 bg-[#1f040b] rounded-2xl border-2 border-rose-900/50 shadow-2xl overflow-hidden z-20 flex flex-col justify-end">
            
            {/* Decorative Inner Pocket Liner Pattern */}
            <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-[#3a081a]/40 to-transparent pointer-events-none" />

            {/* Front Envelope Pocket Triangular Flaps */}
            <div className="relative w-full h-full">
              {/* Left Pocket Side Flap */}
              <div
                className="absolute top-0 left-0 w-0 h-0 border-t-[120px] sm:border-t-[150px] border-t-transparent border-l-[180px] sm:border-l-[220px] border-l-[#27050f] border-b-[120px] sm:border-b-[150px] border-b-transparent pointer-events-none"
              />
              
              {/* Right Pocket Side Flap */}
              <div
                className="absolute top-0 right-0 w-0 h-0 border-t-[120px] sm:border-t-[150px] border-t-transparent border-r-[180px] sm:border-r-[220px] border-r-[#27050f] border-b-[120px] sm:border-b-[150px] border-b-transparent pointer-events-none"
              />

              {/* Bottom Pocket Triangular Flap */}
              <div
                className="absolute bottom-0 inset-x-0 h-0 border-b-[140px] sm:border-b-[170px] border-b-[#2c0612] border-l-[200px] sm:border-l-[250px] border-l-transparent border-r-[200px] sm:border-r-[250px] border-r-transparent pointer-events-none shadow-lg"
              />

              {/* Recipient Label Front Tag (Visible before open) */}
              {!isOpen && (
                <div className="absolute bottom-6 inset-x-6 bg-[#180308]/90 border border-amber-500/30 rounded-xl p-3 text-center shadow-xl z-30 backdrop-blur-sm animate-fadeIn">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-amber-300 block mb-0.5">
                    Exclusive Evening Invitation
                  </span>
                  <span className="font-serif text-sm text-rose-100 block">
                    To Our Most Cherished Guests
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Envelope Top Folding Triangular Flap */}
          <div
            onClick={handleOpenEnvelope}
            className={`absolute top-0 inset-x-0 h-[140px] sm:h-[170px] z-40 transition-transform duration-1000 transform-gpu cursor-pointer ${
              isOpen ? '-rotate-x-180 origin-top pointer-events-none opacity-20' : 'rotate-x-0 origin-top'
            }`}
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px',
            }}
          >
            {/* Top Flap SVG Shape */}
            <svg
              className="w-full h-full drop-shadow-xl overflow-visible"
              viewBox="0 0 400 170"
              preserveAspectRatio="none"
            >
              <polygon
                points="0,0 400,0 200,165"
                fill="#340716"
                stroke="#9f1239"
                strokeWidth="1.5"
              />
            </svg>

            {/* Central Gold Wax Seal Button */}
            {!isOpen && (
              <div
                onClick={handleOpenEnvelope}
                className={`absolute top-[90px] sm:top-[110px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center group cursor-pointer transition-transform duration-300 ${
                  isOpening ? 'scale-125 rotate-12' : 'hover:scale-110'
                }`}
              >
                {/* Glow Ring */}
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-amber-200 rounded-full blur-md opacity-60 group-hover:opacity-100 animate-pulse" />

                {/* Wax Seal Coin */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 p-1 shadow-2xl border-2 border-amber-200 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-b from-amber-700 via-amber-800 to-amber-950 rounded-full border border-amber-300/60 flex flex-col items-center justify-center text-center p-1 shadow-inner">
                    <span className="font-serif text-amber-200 font-bold text-base sm:text-lg tracking-wider leading-none">
                      C&amp;J
                    </span>
                    <Heart className="w-3 h-3 text-amber-300 fill-amber-300/40 mt-0.5" />
                  </div>
                </div>

                {/* Wax Seal Click Label Prompt */}
                <span className="mt-2 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-amber-300 bg-[#180308]/90 border border-amber-500/40 px-3 py-1 rounded-full shadow-lg whitespace-nowrap animate-bounce">
                  {isOpening ? 'Opening Invitation...' : 'Tap Wax Seal to Open'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer text prompt */}
        {isOpen && (
          <div className="mt-6 text-center z-30 animate-fadeIn">
            <button
              onClick={handleEnterSite}
              className="text-xs text-amber-200 hover:text-amber-100 font-serif underline underline-offset-4 flex items-center space-x-1 mx-auto"
            >
              <span>Click anywhere or tap here to enter site</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
