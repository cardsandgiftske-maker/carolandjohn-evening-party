import React, { useState, useEffect } from 'react';
import { Heart, Menu, X, Send, Lock, UserCheck, Mail, Music, MapPin } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenHostDashboard: () => void;
  onReopenEnvelope: () => void;
  rsvpsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenHostDashboard,
  onReopenEnvelope,
  rsvpsCount,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'venue', label: 'Venue & Map', icon: MapPin },
    { id: 'entertainment', label: 'Entertainment', icon: Music },
    { id: 'rsvp', label: 'RSVP', icon: Send },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#180308]/90 backdrop-blur-md border-b border-rose-900/30 shadow-2xl py-3'
          : 'bg-gradient-to-b from-[#180308]/90 via-[#180308]/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Monogram / Title */}
        <button
          onClick={() => handleNavClick('hero')}
          className="group flex items-center space-x-3 text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 via-rose-400 to-amber-200 p-[1px] shadow-lg shadow-rose-950/30">
            <div className="w-full h-full bg-[#1e040b] rounded-full flex items-center justify-center group-hover:bg-rose-950/60 transition-colors">
              <span className="font-serif text-amber-200 font-bold text-sm tracking-wider">C&amp;J</span>
            </div>
          </div>
          <div>
            <span className="block font-serif text-lg text-rose-50 font-medium tracking-wide group-hover:text-amber-200 transition-colors">
              Carole &amp; John
            </span>
            <span className="block text-[10px] text-amber-300/80 uppercase tracking-widest font-mono">
              Aug 22, 2026
            </span>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <button
            onClick={onReopenEnvelope}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-amber-300 hover:text-amber-200 bg-rose-950/60 border border-amber-500/30 hover:border-amber-400/60 transition-all shadow-sm"
            title="Re-open formal envelope invitation"
          >
            <Mail className="w-3.5 h-3.5 text-amber-300" />
            <span>Envelope</span>
          </button>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-rose-900/40 text-amber-200 border border-amber-500/40 shadow-inner'
                    : 'text-rose-200/80 hover:text-amber-200 hover:bg-rose-900/20'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-rose-300/70'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={() => handleNavClick('rsvp')}
            className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-rose-950 px-5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Confirm Attendance
          </button>

          {/* Host Portal Toggle */}
          <button
            onClick={onOpenHostDashboard}
            title="Carol & John Host Portal"
            className="flex items-center space-x-1.5 bg-[#2a0712] border border-rose-800/40 hover:border-amber-400/50 px-3 py-1.5 rounded-full text-xs text-rose-200 hover:text-amber-200 transition-all"
          >
            <Lock className="w-3 h-3 text-amber-300" />
            <span className="hidden lg:inline text-[11px] font-mono">Host Area</span>
            {rsvpsCount > 0 && (
              <span className="bg-amber-400 text-rose-950 font-bold px-1.5 py-0.2 rounded-full text-[10px]">
                {rsvpsCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={onOpenHostDashboard}
            className="p-2 text-amber-300 hover:text-amber-200 bg-[#2b0813] rounded-full border border-rose-800/40"
            title="Host Portal"
          >
            <Lock className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-rose-100 hover:text-amber-200 bg-[#2b0813] rounded-lg border border-rose-800/40"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#180308]/95 border-b border-rose-900/40 px-4 pt-3 pb-6 mt-2 space-y-2 backdrop-blur-xl animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-left text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-rose-900/40 text-amber-200 border border-amber-500/30'
                    : 'text-rose-200/80 hover:bg-rose-900/20'
                }`}
              >
                <Icon className="w-4 h-4 text-amber-300" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 flex flex-col space-y-2">
            <button
              onClick={() => handleNavClick('rsvp')}
              className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-rose-950 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold text-center shadow-lg shadow-amber-500/20"
            >
              RSVP Now (By Aug 1)
            </button>
            <button
              onClick={() => {
                onOpenHostDashboard();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#2b0813] text-rose-200 border border-rose-800/40 py-2.5 rounded-xl text-xs font-mono text-center flex items-center justify-center space-x-2"
            >
              <UserCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>Carol &amp; John Host Portal ({rsvpsCount} RSVPs)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
