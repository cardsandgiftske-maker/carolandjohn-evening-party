import React, { useState, useEffect } from 'react';
import { EVENT_DETAILS } from '../data/weddingData';
import { Calendar, Clock, Sparkles, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onRsvpClick: () => void;
  onInvitationClick: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onRsvpClick, onInvitationClick }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(EVENT_DETAILS.dateISO).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#1a040a]">
      {/* Background Image with Deep Burgundy Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_evening_reception_1785480727710.jpg"
          alt="Carol and John Evening Reception"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transform filter brightness-60 contrast-125 transition-transform duration-1000 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a040a] via-[#1a040a]/80 to-[#1a040a]/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-900/30 via-[#1a040a]/60 to-[#1a040a]" />
      </div>

      {/* Floating Ambient Rose-Gold Sparks */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-amber-300 blur-sm animate-pulse" />
        <div className="absolute top-1/3 right-12 w-3 h-3 rounded-full bg-rose-300 blur-sm animate-pulse delay-500" />
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 rounded-full bg-amber-400 blur-sm animate-pulse delay-1000" />
      </div>

      {/* Hero Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-rose-50">
        {/* Top Eyebrow */}
        <div className="inline-flex items-center space-x-2 bg-[#2d0714]/80 border border-amber-500/30 px-4 py-1.5 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-rose-950/40 animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
          <span className="text-xs font-serif tracking-widest uppercase text-amber-200">
            Evening Party Reception
          </span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
        </div>

        {/* Main Names Title */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-rose-200 to-amber-300 font-light tracking-tight mb-4 drop-shadow-2xl">
          Carol <span className="text-amber-300/90 font-serif italic font-normal">&amp;</span> John
        </h1>

        <p className="text-lg sm:text-2xl text-rose-100/90 font-serif italic max-w-2xl mx-auto mb-8 font-light tracking-wide">
          Request the pleasure of your company to celebrate their wedding at an evening celebration of music, toasts &amp; dancing
        </p>

        {/* Date & Location Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-10 text-sm sm:text-base">
          <div className="flex items-center space-x-2 bg-[#25050f]/80 border border-rose-800/40 px-4 py-2 rounded-2xl backdrop-blur-md">
            <Calendar className="w-4 h-4 text-amber-300" />
            <span className="font-medium text-rose-100">{EVENT_DETAILS.formattedDate}</span>
          </div>
          <div className="flex items-center space-x-2 bg-[#25050f]/80 border border-rose-800/40 px-4 py-2 rounded-2xl backdrop-blur-md">
            <Clock className="w-4 h-4 text-amber-300" />
            <span className="font-medium text-rose-100">{EVENT_DETAILS.formattedTime}</span>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="mb-10 bg-[#25050f]/90 border border-rose-800/40 rounded-3xl p-6 max-w-xl mx-auto backdrop-blur-md shadow-2xl">
          <span className="block text-xs uppercase tracking-widest text-amber-300 font-mono mb-4">
            Countdown to the Evening Celebration
          </span>
          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-[#180308]/90 border border-amber-500/20 rounded-2xl p-3 text-center">
              <span className="block text-2xl sm:text-4xl font-mono font-bold text-amber-200">
                {timeLeft.days}
              </span>
              <span className="block text-[10px] sm:text-xs text-rose-300/70 uppercase tracking-wider mt-1">
                Days
              </span>
            </div>
            <div className="bg-[#180308]/90 border border-amber-500/20 rounded-2xl p-3 text-center">
              <span className="block text-2xl sm:text-4xl font-mono font-bold text-amber-200">
                {timeLeft.hours}
              </span>
              <span className="block text-[10px] sm:text-xs text-rose-300/70 uppercase tracking-wider mt-1">
                Hours
              </span>
            </div>
            <div className="bg-[#180308]/90 border border-amber-500/20 rounded-2xl p-3 text-center">
              <span className="block text-2xl sm:text-4xl font-mono font-bold text-amber-200">
                {timeLeft.minutes}
              </span>
              <span className="block text-[10px] sm:text-xs text-rose-300/70 uppercase tracking-wider mt-1">
                Mins
              </span>
            </div>
            <div className="bg-[#180308]/90 border border-amber-500/20 rounded-2xl p-3 text-center">
              <span className="block text-2xl sm:text-4xl font-mono font-bold text-amber-200">
                {timeLeft.seconds}
              </span>
              <span className="block text-[10px] sm:text-xs text-rose-300/70 uppercase tracking-wider mt-1">
                Secs
              </span>
            </div>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onRsvpClick}
            className="w-full sm:w-auto bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-rose-950 font-semibold px-8 py-4 rounded-full text-sm uppercase tracking-widest shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Confirm Attendance / RSVP
          </button>

          <button
            onClick={onInvitationClick}
            className="w-full sm:w-auto bg-[#2d0714]/80 hover:bg-[#3a091a] text-amber-200 border border-amber-500/40 px-8 py-4 rounded-full text-sm uppercase tracking-widest backdrop-blur-md transition-all hover:border-amber-300"
          >
            View Formal Invitation
          </button>
        </div>

        {/* Deadline Notice */}
        <p className="mt-6 text-xs text-amber-300/80 tracking-wide font-serif">
          * Please confirm attendance by{' '}
          <strong className="text-amber-200 underline underline-offset-4 decoration-amber-500/50">
            {EVENT_DETAILS.rsvpDeadlineFormatted}
          </strong>
        </p>

        {/* Scroll Indicator */}
        <div className="mt-12 flex justify-center">
          <a
            href="#invitation"
            className="p-2 rounded-full bg-[#2a0712]/60 border border-rose-800/40 text-rose-300 hover:text-amber-200 transition-colors animate-bounce"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};
