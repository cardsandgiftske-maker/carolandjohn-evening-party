import React from 'react';
import {
  MapPin,
  Navigation,
  ExternalLink,
  Sparkles,
  Compass,
  ArrowUpRight,
  Heart
} from 'lucide-react';
import {
  VENUE_INFO,
  GOOGLE_MAPS_DIRECTIONS_URL,
  EMBEDDED_MAP_IFRAME_URL
} from '../data/weddingData';

export const VenueMapSection: React.FC = () => {
  return (
    <section id="venue" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-[#150308]">
      {/* Background ambient gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-950/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top Gold Filigree Divider */}
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-10" />

        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-[#2d0714] border border-amber-500/40 px-4 py-1.5 rounded-full mb-4 shadow-lg">
            <Compass className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
            <span className="text-xs font-serif uppercase tracking-widest text-amber-200">
              Location &amp; Directions
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-rose-50 font-normal mb-3">
            Venue &amp; Map Navigation
          </h2>
          <p className="text-rose-200/80 font-serif italic text-base max-w-xl mx-auto">
            Everything you need to navigate seamlessly to our evening reception in Brighton.
          </p>
        </div>

        {/* Main Grid: Map & Navigation Control Center */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (5 Cols): Venue Info & Directions Selector */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Venue Card */}
            <div className="relative bg-gradient-to-b from-[#2d0714] via-[#23050d] to-[#1c0309] border-2 border-rose-800/50 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-rose-950/80">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-400 p-0.5 shrink-0 shadow-lg">
                  <div className="w-full h-full bg-[#1a040a] rounded-[14px] flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-amber-300" />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-amber-300/90 uppercase tracking-widest block mb-1">
                    Event Venue
                  </span>
                  <h3 className="font-serif text-2xl text-rose-50 font-medium leading-snug">
                    {VENUE_INFO.name}
                  </h3>
                  <p className="text-sm text-rose-200/80 font-mono mt-1">
                    {VENUE_INFO.city}, {VENUE_INFO.postcode}
                  </p>
                </div>
              </div>

              {/* Navigation Button */}
              <div className="bg-[#180308]/90 border border-rose-900/40 rounded-2xl p-4">
                <a
                  href={GOOGLE_MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-rose-950 font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Navigation className="w-4 h-4 text-rose-950 fill-current" />
                  <span>Start Navigation</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column (7 Cols): Embedded Interactive Map Preview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative bg-[#23050d] border-2 border-rose-800/50 rounded-3xl p-3 shadow-2xl overflow-hidden group">
              
              {/* Top Map Header Badge */}
              <div className="absolute top-6 left-6 z-10 bg-[#180308]/90 border border-amber-500/40 px-4 py-2 rounded-2xl backdrop-blur-md flex items-center space-x-2 shadow-xl">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-xs font-mono text-amber-200 font-semibold">
                  Brighton International School Map
                </span>
              </div>

              {/* Map Iframe Container */}
              <div className="w-full h-[380px] sm:h-[460px] rounded-2xl overflow-hidden relative bg-[#120206]">
                <iframe
                  title="Brighton International School Map"
                  src={EMBEDDED_MAP_IFRAME_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* Bottom Quick Launch Link */}
              <div className="mt-3 flex items-center justify-between px-2 pt-1 text-xs text-rose-300/80">
                <span className="font-mono">Coordinates: 50.8225° N, 0.1372° W</span>
                <a
                  href={GOOGLE_MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-300 hover:text-amber-200 font-medium inline-flex items-center space-x-1 hover:underline"
                >
                  <span>Open Full Screen Map</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Adults-Only Celebration Note */}
          <div className="mt-12 text-center max-w-xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-[#21050e] border border-rose-800/50 px-5 py-3 rounded-2xl shadow-lg text-rose-200 text-xs sm:text-sm font-sans leading-relaxed">
              <Heart className="w-4 h-4 text-amber-300 shrink-0 fill-amber-300/20" />
              <span>We adore your little ones, but our evening reception will be an adults-only celebration.</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
