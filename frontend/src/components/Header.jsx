const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

export default function Header({ onMenuClick, activeSession, onChangeState }) {
  return (
    <header
      className="flex items-center gap-3 px-4 py-3 border-b flex-shrink-0"
      style={{ background: '#faf7f0', borderColor: '#d4c5a0' }}
    >
      {/* Hamburger */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 rounded-lg transition-colors hover:opacity-70"
        style={{ color: '#7a6a4a' }}
      >
        <MenuIcon />
      </button>

      {/* Logo (visible only on md+) */}
      <div className="hidden md:flex items-center gap-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-base" style={{ background: 'linear-gradient(135deg, #c8972a, #a67c1e)' }}>
          ⚖️
        </div>
      </div>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-base truncate" style={{ fontFamily: 'Playfair Display, serif', color: '#1a1208' }}>
            {activeSession?.title && activeSession.title !== 'New Consultation'
              ? activeSession.title
              : 'Adv. Ramesh Kumar Sharma'}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: '#7a6a4a' }}>Senior Advocate · 35 yrs exp</span>
          {activeSession?.state && (
            <button
              onClick={onChangeState}
              className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full transition-colors hover:opacity-70"
              style={{ background: '#2d4a2d', color: '#6abf6a' }}
            >
              <MapPinIcon />
              {activeSession.state}
              <EditIcon />
            </button>
          )}
        </div>
      </div>

      {/* Status indicator */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <div className="w-2 h-2 rounded-full" style={{ background: '#4caf50', boxShadow: '0 0 0 2px rgba(76,175,80,0.2)' }} />
        <span className="text-xs hidden sm:block" style={{ color: '#7a6a4a', fontFamily: 'JetBrains Mono, monospace' }}>Online</span>
      </div>
    </header>
  );
}
