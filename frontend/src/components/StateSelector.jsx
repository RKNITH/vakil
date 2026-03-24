import { useState, useMemo } from 'react';
import { INDIAN_STATES } from '../utils/constants';

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default function StateSelector({ onSelect, onSkip }) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() =>
    INDIAN_STATES.filter(s => s.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  // Group states and UTs
  const STATES = INDIAN_STATES.slice(0, 28);
  const UTS = INDIAN_STATES.slice(28);

  const filteredStates = filtered.filter(s => STATES.includes(s));
  const filteredUTs = filtered.filter(s => UTS.includes(s));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(26,18,8,0.85)', backdropFilter: 'blur(8px)' }}>
      <div
        className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-fade-in"
        style={{ background: '#faf7f0', border: '1px solid #d4c5a0' }}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4" style={{ borderBottom: '1px solid #d4c5a0' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: 'linear-gradient(135deg, #c8972a, #e6b84a)' }}>
              ⚖️
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight" style={{ fontFamily: 'Playfair Display, serif', color: '#1a1208' }}>
                Vakil AI
              </h2>
              <p className="text-xs" style={{ color: '#7a6a4a' }}>Senior Legal Counsel</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: '#3d2e0f' }}>
            <strong>Namaskar!</strong> To provide accurate legal advice under the correct jurisdiction, please select your state or Union Territory.
          </p>
        </div>

        {/* Search */}
        <div className="px-4 py-3" style={{ borderBottom: '1px solid #ede7d3' }}>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#7a6a4a' }}>
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search state or UT..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none"
              style={{
                background: '#f5f0e8',
                border: '1px solid #d4c5a0',
                color: '#1a1208',
                fontFamily: 'Source Serif 4, serif'
              }}
            />
          </div>
        </div>

        {/* State List */}
        <div className="overflow-y-auto" style={{ maxHeight: '320px' }}>
          {filteredStates.length > 0 && (
            <div>
              <p className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider sticky top-0" style={{ color: '#7a6a4a', background: '#faf7f0', fontFamily: 'JetBrains Mono, monospace' }}>
                States
              </p>
              {filteredStates.map(state => (
                <button
                  key={state}
                  onClick={() => onSelect(state)}
                  className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors hover:bg-amber-50 active:bg-amber-100"
                  style={{ color: '#1a1208' }}
                >
                  <span style={{ color: '#c8972a' }}><MapPinIcon /></span>
                  {state}
                </button>
              ))}
            </div>
          )}
          {filteredUTs.length > 0 && (
            <div>
              <p className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider sticky top-0" style={{ color: '#7a6a4a', background: '#faf7f0', fontFamily: 'JetBrains Mono, monospace' }}>
                Union Territories
              </p>
              {filteredUTs.map(ut => (
                <button
                  key={ut}
                  onClick={() => onSelect(ut)}
                  className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors hover:bg-amber-50 active:bg-amber-100"
                  style={{ color: '#1a1208' }}
                >
                  <span style={{ color: '#c8972a' }}><MapPinIcon /></span>
                  {ut}
                </button>
              ))}
            </div>
          )}
          {filtered.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm" style={{ color: '#7a6a4a' }}>No results for "{search}"</p>
            </div>
          )}
        </div>

        {/* Skip */}
        <div className="px-4 py-3" style={{ borderTop: '1px solid #ede7d3' }}>
          <button
            onClick={onSkip}
            className="w-full text-xs py-2 rounded-lg transition-colors hover:opacity-70"
            style={{ color: '#7a6a4a' }}
          >
            Skip — I'll mention my state in the conversation
          </button>
        </div>
      </div>
    </div>
  );
}
