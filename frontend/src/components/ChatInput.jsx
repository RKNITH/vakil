import { useState, useRef, useEffect } from 'react';

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const QUICK_PROMPTS = [
  "I want to file an FIR but police is refusing",
  "My landlord is not returning my security deposit",
  "I want to know about my property rights",
  "How to fight wrongful termination from job",
  "My cheque has bounced, what are my rights?",
  "I want to file for divorce",
];

export default function ChatInput({ onSend, isLoading, disabled, showQuickPrompts }) {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + 'px';
    }
  }, [input]);

  const handleSend = () => {
    const msg = input.trim();
    if (!msg || isLoading || disabled) return;
    onSend(msg);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full">
      {/* Quick Prompts */}
      {showQuickPrompts && (
        <div className="mb-3 flex flex-wrap gap-2 justify-center">
          {QUICK_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => onSend(prompt)}
              disabled={isLoading}
              className="text-xs px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
              style={{
                background: '#f5f0e8',
                border: '1px solid #d4c5a0',
                color: '#3d2e0f',
                fontFamily: 'Source Serif 4, serif'
              }}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input Box */}
      <div
        className="flex items-end gap-2 rounded-2xl px-4 py-3"
        style={{
          background: '#faf7f0',
          border: '1.5px solid #d4c5a0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your legal issue... (Press Enter to send, Shift+Enter for new line)"
          disabled={isLoading || disabled}
          rows={1}
          className="flex-1 resize-none bg-transparent text-sm outline-none leading-relaxed disabled:opacity-60"
          style={{
            color: '#1a1208',
            fontFamily: 'Source Serif 4, serif',
            minHeight: '24px',
            maxHeight: '160px',
            caretColor: '#c8972a'
          }}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading || disabled}
          className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg, #c8972a, #a67c1e)', color: '#fff' }}
        >
          {isLoading ? (
            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : (
            <SendIcon />
          )}
        </button>
      </div>
      <p className="text-center text-xs mt-2" style={{ color: '#b8a87a', fontFamily: 'JetBrains Mono, monospace' }}>
        For informational purposes only · Not a substitute for professional legal advice
      </p>
    </div>
  );
}
