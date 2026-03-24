const TOPICS = [
  { icon: '🏛️', title: 'Constitutional Rights', desc: 'Fundamental rights, PIL, writs' },
  { icon: '🏘️', title: 'Property & Land', desc: 'Registration, disputes, revenue laws' },
  { icon: '👨‍👩‍👧', title: 'Family Law', desc: 'Divorce, custody, succession' },
  { icon: '⚖️', title: 'Criminal Law', desc: 'FIR, bail, IPC/BNS sections' },
  { icon: '💼', title: 'Labour & Service', desc: 'Employment, termination, gratuity' },
  { icon: '🛒', title: 'Consumer Rights', desc: 'NCDRC, deficiency of service' },
  { icon: '📄', title: 'Contracts', desc: 'Agreements, breach, remedies' },
  { icon: '🏦', title: 'Banking & Finance', desc: 'Cheque bounce, loan disputes' },
];

export default function WelcomeScreen({ state, onTopicClick }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col items-center justify-center min-h-full">
      <div className="w-full max-w-2xl mx-auto text-center">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg" style={{ background: 'linear-gradient(135deg, #c8972a, #a67c1e)' }}>
          ⚖️
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#1a1208' }}>
          Adv. Ramesh Kumar Sharma
        </h2>
        <p className="text-sm mb-1" style={{ color: '#7a6a4a', fontFamily: 'JetBrains Mono, monospace' }}>
          Senior Advocate · Supreme Court of India
        </p>
        {state ? (
          <div className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full mt-1 mb-4" style={{ background: '#2d4a2d', color: '#6abf6a' }}>
            📍 Consulting for {state}
          </div>
        ) : (
          <p className="text-xs mt-1 mb-4" style={{ color: '#b8a87a' }}>Please start a consultation and mention your state</p>
        )}

        {/* Quote */}
        <blockquote className="text-sm italic mb-6 max-w-md mx-auto" style={{ color: '#7a6a4a', borderLeft: '3px solid #c8972a', paddingLeft: '1rem', textAlign: 'left' }}>
          "Dharmo rakshati rakshitah — Law protects those who protect it. Describe your legal issue in detail and I shall guide you."
        </blockquote>

        {/* Credentials */}
        <div className="grid grid-cols-3 gap-3 mb-6 max-w-xs mx-auto">
          {[
            { val: '35+', label: 'Years' },
            { val: '5000+', label: 'Cases' },
            { val: 'SC/HC', label: 'Courts' },
          ].map(({ val, label }) => (
            <div key={label} className="rounded-xl py-2.5 text-center" style={{ background: '#f5f0e8', border: '1px solid #d4c5a0' }}>
              <div className="text-lg font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#c8972a' }}>{val}</div>
              <div className="text-xs" style={{ color: '#7a6a4a' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Topic grid */}
        <div>
          <p className="text-xs mb-3 font-medium uppercase tracking-wider" style={{ color: '#7a6a4a', fontFamily: 'JetBrains Mono, monospace' }}>
            Areas of Practice
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {TOPICS.map(({ icon, title, desc }) => (
              <button
                key={title}
                onClick={() => onTopicClick(`I need legal advice about ${title.toLowerCase()}. Please explain my rights and options.`)}
                className="text-left p-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md"
                style={{
                  background: '#f5f0e8',
                  border: '1px solid #d4c5a0',
                  cursor: 'pointer'
                }}
              >
                <div className="text-xl mb-1">{icon}</div>
                <div className="text-xs font-semibold" style={{ color: '#1a1208' }}>{title}</div>
                <div className="text-xs mt-0.5" style={{ color: '#7a6a4a' }}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
