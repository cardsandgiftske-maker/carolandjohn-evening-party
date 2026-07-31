import React, { useState } from 'react';
import { RSVPData } from '../types';
import { X, Download, Search, UserCheck, AlertTriangle, Music, Trash2 } from 'lucide-react';

interface HostDashboardProps {
  rsvps: RSVPData[];
  onClose: () => void;
  onDeleteRsvp: (id: string) => void;
  onAddManualRsvp: (rsvp: RSVPData) => void;
}

export const HostDashboard: React.FC<HostDashboardProps> = ({
  rsvps,
  onClose,
  onDeleteRsvp,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'guests' | 'dietary'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'attending' | 'declining'>('all');

  // Stats
  const totalRsvps = rsvps.length;
  const attendingRsvps = rsvps.filter((r) => r.status === 'attending');
  const decliningRsvps = rsvps.filter((r) => r.status === 'declining');
  const totalAttendingGuests = attendingRsvps.reduce((acc, r) => acc + (r.guestCount || 1), 0);

  // Dietary Summary
  const dietarySummary: Array<{ guestName: string; primaryContact: string; tags: string[]; notes?: string }> = [];

  attendingRsvps.forEach((r) => {
    r.guestSelections.forEach((g) => {
      if (g.dietaryRequirements.length > 0 || g.customDietaryNotes) {
        dietarySummary.push({
          guestName: g.guestName || r.primaryGuestName,
          primaryContact: `${r.primaryGuestName} (${r.email})`,
          tags: g.dietaryRequirements,
          notes: g.customDietaryNotes,
        });
      }
    });
  });

  const filteredRsvps = rsvps.filter((r) => {
    const matchesSearch =
      r.primaryGuestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    window.open('/api/rsvps/export/csv', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#120206]/90 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#240610] border border-rose-800/50 rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-[#180308] border-b border-rose-900/40 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-rose-900/40 border border-amber-500/30 text-amber-300 rounded-xl">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl text-rose-50 font-medium">
                Carol &amp; John Host Portal
              </h2>
              <p className="text-xs text-amber-200/80 font-mono">
                Guest list management &amp; dietary summary
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleExportCSV}
              className="bg-amber-400 hover:bg-amber-300 text-rose-950 font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-rose-300/70 hover:text-rose-100 bg-[#180308] rounded-xl border border-rose-800/40"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#180308]/60 border-b border-rose-900/40 px-6 py-3 flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              activeTab === 'overview'
                ? 'bg-rose-900/50 text-amber-200 border border-amber-500/30 font-bold'
                : 'text-rose-200/70 hover:text-rose-100'
            }`}
          >
            Overview &amp; Stats
          </button>
          <button
            onClick={() => setActiveTab('guests')}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              activeTab === 'guests'
                ? 'bg-rose-900/50 text-amber-200 border border-amber-500/30 font-bold'
                : 'text-rose-200/70 hover:text-rose-100'
            }`}
          >
            Guest RSVPs ({totalRsvps})
          </button>
          <button
            onClick={() => setActiveTab('dietary')}
            className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center space-x-1.5 ${
              activeTab === 'dietary'
                ? 'bg-rose-900/50 text-amber-200 border border-amber-500/30 font-bold'
                : 'text-rose-200/70 hover:text-rose-100'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
            <span>Dietary &amp; Allergies ({dietarySummary.length})</span>
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-[#180308] p-5 rounded-2xl border border-rose-900/40">
                  <span className="text-xs uppercase font-mono text-rose-300/70 block mb-1">Total Attending Guests</span>
                  <span className="text-3xl font-serif text-amber-200 font-bold">{totalAttendingGuests}</span>
                  <span className="text-[10px] text-rose-400/60 block mt-1">Confirmed for party</span>
                </div>

                <div className="bg-[#180308] p-5 rounded-2xl border border-rose-900/40">
                  <span className="text-xs uppercase font-mono text-rose-300/70 block mb-1">Attending RSVPs</span>
                  <span className="text-3xl font-serif text-emerald-300 font-bold">{attendingRsvps.length}</span>
                  <span className="text-[10px] text-rose-400/60 block mt-1">Acceptances</span>
                </div>

                <div className="bg-[#180308] p-5 rounded-2xl border border-rose-900/40">
                  <span className="text-xs uppercase font-mono text-rose-300/70 block mb-1">Declining RSVPs</span>
                  <span className="text-3xl font-serif text-rose-300/70 font-bold">{decliningRsvps.length}</span>
                  <span className="text-[10px] text-rose-400/60 block mt-1">Regrets</span>
                </div>

                <div className="bg-[#180308] p-5 rounded-2xl border border-rose-900/40">
                  <span className="text-xs uppercase font-mono text-rose-300/70 block mb-1">Special Dietary Needs</span>
                  <span className="text-3xl font-serif text-amber-300 font-bold">{dietarySummary.length}</span>
                  <span className="text-[10px] text-rose-400/60 block mt-1">Guests with dietary notes</span>
                </div>
              </div>

              {/* DJ Song Requests */}
              <div className="bg-[#180308] p-6 rounded-2xl border border-rose-900/40">
                <h3 className="font-serif text-xl text-amber-200 font-medium mb-4 flex items-center space-x-2">
                  <Music className="w-5 h-5 text-amber-300" />
                  <span>Guest DJ Song Requests</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {rsvps
                    .filter(r => r.songRequest)
                    .map((r, idx) => (
                      <div key={idx} className="bg-[#240610] p-3 rounded-xl border border-rose-900/40">
                        <strong className="text-amber-200 block mb-0.5">{r.songRequest}</strong>
                        <span className="text-rose-300/70 text-[10px] font-mono">Requested by {r.primaryGuestName}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GUEST LIST */}
          {activeTab === 'guests' && (
            <div className="space-y-4">
              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-rose-300/60 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#180308] border border-rose-800/40 rounded-xl pl-9 pr-4 py-2 text-xs text-rose-100 placeholder-rose-300/40"
                  />
                </div>

                <div className="flex items-center space-x-2 text-xs">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-3 py-1.5 rounded-lg font-mono ${statusFilter === 'all' ? 'bg-amber-400 text-rose-950 font-bold' : 'bg-[#180308] text-rose-300/70'}`}
                  >
                    All ({rsvps.length})
                  </button>
                  <button
                    onClick={() => setStatusFilter('attending')}
                    className={`px-3 py-1.5 rounded-lg font-mono ${statusFilter === 'attending' ? 'bg-emerald-500 text-rose-950 font-bold' : 'bg-[#180308] text-rose-300/70'}`}
                  >
                    Attending ({attendingRsvps.length})
                  </button>
                  <button
                    onClick={() => setStatusFilter('declining')}
                    className={`px-3 py-1.5 rounded-lg font-mono ${statusFilter === 'declining' ? 'bg-rose-900 text-rose-100 font-bold' : 'bg-[#180308] text-rose-300/70'}`}
                  >
                    Declining ({decliningRsvps.length})
                  </button>
                </div>
              </div>

              {/* Guest RSVPs List */}
              <div className="space-y-3">
                {filteredRsvps.map((rsvp) => (
                  <div
                    key={rsvp.id}
                    className="bg-[#180308] border border-rose-800/40 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center space-x-3">
                        <h4 className="font-serif text-lg text-rose-50 font-medium">{rsvp.primaryGuestName}</h4>
                        <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full ${rsvp.status === 'attending' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'bg-rose-950 text-rose-300/70 border border-rose-900/40'}`}>
                          {rsvp.status} ({rsvp.guestCount} guests)
                        </span>
                      </div>
                      <p className="text-xs text-rose-300/70 font-mono mt-0.5">{rsvp.email} {rsvp.phone ? `• ${rsvp.phone}` : ''}</p>
                      {rsvp.messageToCouple && (
                        <p className="text-xs text-amber-200/90 italic mt-2 bg-[#280712] p-2 rounded-xl border border-rose-900/40">
                          "{rsvp.messageToCouple}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="text-right text-xs text-rose-300/70">
                        <span className="block text-[10px] font-mono text-rose-400/60">Submitted</span>
                        {new Date(rsvp.submittedAt).toLocaleDateString()}
                      </div>
                      <button
                        onClick={() => onDeleteRsvp(rsvp.id)}
                        className="p-2 text-rose-300/60 hover:text-rose-200 bg-[#280712] rounded-lg hover:bg-rose-900/40 transition-colors"
                        title="Delete RSVP"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DIETARY & ALLERGIES LIST */}
          {activeTab === 'dietary' && (
            <div className="space-y-4">
              <div className="bg-rose-950/40 border border-amber-500/30 rounded-2xl p-4 flex items-center space-x-3 text-xs text-rose-100">
                <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0" />
                <span>
                  Share this list with the catering team to ensure allergen safety and tailored preparations.
                </span>
              </div>

              <div className="space-y-3">
                {dietarySummary.length === 0 ? (
                  <p className="text-xs text-rose-300/60 italic text-center py-8">No specific dietary requirements reported yet.</p>
                ) : (
                  dietarySummary.map((item, idx) => (
                    <div key={idx} className="bg-[#180308] border border-rose-800/40 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <strong className="font-serif text-base text-rose-100">{item.guestName}</strong>
                        <span className="text-xs text-rose-300/70 font-mono">Contact: {item.primaryContact}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((t, i) => (
                          <span key={i} className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-mono px-2 py-0.5 rounded-full uppercase">
                            {t.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                      {item.notes && (
                        <p className="text-xs text-rose-100/90 bg-[#280712] p-2.5 rounded-xl border border-rose-900/40 italic">
                          "{item.notes}"
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
