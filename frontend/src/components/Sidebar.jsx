import { useState } from 'react';
import { formatDate } from '../utils/constants';

const ScalesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1M3 12h1m16 0h1M5.636 5.636l.707.707m11.314 11.314.707.707M5.636 18.364l.707-.707m11.314-11.314.707-.707" />
    <circle cx="12" cy="12" r="3" />
    <path strokeLinecap="round" d="M8 12H4l2-5M16 12h4l-2-5M6 17l6 2 6-2" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

export default function Sidebar({
  isOpen,
  onClose,
  sessionList,
  activeSessionId,
  onNewChat,
  onSelectSession,
  onDeleteSession,
  onClearAll
}) {
  const [confirmClear, setConfirmClear] = useState(false);
  const [hoveredSession, setHoveredSession] = useState(null);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-40 w-72 
          flex flex-col
          transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ background: '#1a1208', borderRight: '1px solid #3d2e0f' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: '#3d2e0f' }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #c8972a, #e6b84a)' }}>
              <span className="text-sm font-bold text-black">⚖</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-sm leading-tight" style={{ color: '#e6b84a', fontFamily: 'Playfair Display, serif' }}>
                Vakil AI
              </h1>
              <p className="text-xs" style={{ color: '#7a6a4a' }}>Legal Counsel</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-1 rounded hover:opacity-70 transition-opacity"
            style={{ color: '#7a6a4a' }}
          >
            <XIcon />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <button
            onClick={onNewChat}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #c8972a, #a67c1e)', color: '#1a1208' }}
          >
            <PlusIcon />
            New Consultation
          </button>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto px-2 py-1">
          {sessionList.length === 0 ? (
            <div className="text-center py-10 px-4">
              <ChatIcon />
              <p className="text-xs mt-3" style={{ color: '#7a6a4a' }}>
                No consultations yet.<br />Start a new one above.
              </p>
            </div>
          ) : (
            <div className="space-y-0.5">
              <p className="text-xs px-2 py-1 font-medium uppercase tracking-wider" style={{ color: '#7a6a4a', fontFamily: 'JetBrains Mono, monospace' }}>
                Recent
              </p>
              {sessionList.map((session) => (
                <div
                  key={session.sessionId}
                  className="relative group"
                  onMouseEnter={() => setHoveredSession(session.sessionId)}
                  onMouseLeave={() => setHoveredSession(null)}
                >
                  <button
                    onClick={() => { onSelectSession(session.sessionId); onClose(); }}
                    className="w-full text-left px-3 py-2.5 rounded-lg transition-all duration-150"
                    style={{
                      background: activeSessionId === session.sessionId
                        ? 'rgba(200, 151, 42, 0.15)'
                        : hoveredSession === session.sessionId ? 'rgba(255,255,255,0.05)' : 'transparent',
                      borderLeft: activeSessionId === session.sessionId ? '2px solid #c8972a' : '2px solid transparent'
                    }}
                  >
                    <p
                      className="text-sm truncate leading-snug"
                      style={{ color: activeSessionId === session.sessionId ? '#e6b84a' : '#c9b99a' }}
                    >
                      {session.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {session.state && (
                        <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: '#2d4a2d', color: '#6abf6a', fontSize: '10px' }}>
                          {session.state}
                        </span>
                      )}
                      <span className="text-xs" style={{ color: '#7a6a4a' }}>
                        {formatDate(session.updatedAt)}
                      </span>
                    </div>
                  </button>
                  {/* Delete button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); onDeleteSession(session.sessionId); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-400"
                    style={{ color: '#7a6a4a' }}
                  >
                    <TrashIcon />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t" style={{ borderColor: '#3d2e0f' }}>
          {sessionList.length > 0 && (
            confirmClear ? (
              <div className="text-xs text-center" style={{ color: '#7a6a4a' }}>
                <p className="mb-2">Clear all history?</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => { onClearAll(); setConfirmClear(false); }}
                    className="flex-1 py-1.5 rounded text-xs font-medium"
                    style={{ background: '#8b1a1a', color: '#faf7f0' }}
                  >
                    Yes, Clear
                  </button>
                  <button
                    onClick={() => setConfirmClear(false)}
                    className="flex-1 py-1.5 rounded text-xs font-medium"
                    style={{ background: '#3d2e0f', color: '#c9b99a' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setConfirmClear(true)}
                className="w-full text-xs py-1.5 rounded flex items-center justify-center gap-1.5 transition-opacity hover:opacity-70"
                style={{ color: '#7a6a4a' }}
              >
                <TrashIcon />
                Clear All History
              </button>
            )
          )}
          <p className="text-center mt-2 text-xs" style={{ color: '#5a4a2a', fontFamily: 'JetBrains Mono, monospace' }}>
            v1.0 · Vakil AI
          </p>
        </div>
      </aside>
    </>
  );
}
