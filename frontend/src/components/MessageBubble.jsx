import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const UserIcon = () => (
  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold" style={{ background: '#3d2e0f', color: '#e6b84a' }}>
    U
  </div>
);

const LawyerIcon = () => (
  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-base" style={{ background: 'linear-gradient(135deg, #c8972a, #a67c1e)' }}>
    ⚖️
  </div>
);

const TypingIndicator = () => (
  <div className="flex items-center gap-1 py-1">
    {[0, 1, 2].map(i => (
      <span
        key={i}
        className="w-2 h-2 rounded-full"
        style={{
          background: '#c8972a',
          animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          display: 'inline-block'
        }}
      />
    ))}
    <style>{`
      @keyframes bounce {
        0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
        40% { transform: translateY(-5px); opacity: 1; }
      }
    `}</style>
  </div>
);

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

export function MessageBubble({ message, isTyping = false }) {
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
  };

  return (
    <div className={`flex gap-3 animate-fade-in ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {isUser ? <UserIcon /> : <LawyerIcon />}

      <div className={`flex-1 ${isUser ? 'items-end' : 'items-start'} flex flex-col max-w-[85%] md:max-w-[80%]`}>
        {/* Name label */}
        <div className={`text-xs mb-1 font-medium ${isUser ? 'text-right' : 'text-left'}`} style={{ color: '#7a6a4a', fontFamily: 'JetBrains Mono, monospace' }}>
          {isUser ? 'You' : 'Adv. R.K. Sharma'}
        </div>

        {/* Bubble */}
        <div
          className="relative rounded-2xl px-4 py-3 text-sm group"
          style={isUser ? {
            background: '#2c1810',
            color: '#f5f0e8',
            borderBottomRightRadius: '4px',
            border: '1px solid #3d2e0f'
          } : {
            background: '#faf7f0',
            color: '#1a1208',
            borderBottomLeftRadius: '4px',
            border: '1px solid #d4c5a0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
          }}
        >
          {isTyping ? (
            <TypingIndicator />
          ) : isUser ? (
            <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose-legal">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          )}

          {/* Copy button for lawyer messages */}
          {!isUser && !isTyping && (
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:opacity-70"
              style={{ color: '#7a6a4a' }}
              title="Copy"
            >
              <CopyIcon />
            </button>
          )}
        </div>

        {/* Timestamp */}
        {message.timestamp && (
          <span className="text-xs mt-1" style={{ color: '#b8a87a', fontFamily: 'JetBrains Mono, monospace' }}>
            {new Date(message.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;
