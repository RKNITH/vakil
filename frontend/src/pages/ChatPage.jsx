import { useState, useEffect, useRef, useCallback } from 'react';
import toast from 'react-hot-toast';
import { sendMessage } from '../utils/api';
import MessageBubble from '../components/MessageBubble';
import ChatInput from '../components/ChatInput';
import WelcomeScreen from '../components/WelcomeScreen';
import Header from '../components/Header';
import StateSelector from '../components/StateSelector';

export default function ChatPage({
  sidebarOpen,
  onMenuClick,
  activeSession,
  activeSessionId,
  addMessage,
  updateSession,
  createSession,
  onChangeState
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [showStateSelector, setShowStateSelector] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const messages = activeSession?.messages || [];
  const showQuickPrompts = messages.length === 0;

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSend = useCallback(async (text) => {
    if (isLoading) return;

    let sessionId = activeSessionId;

    // Create session if none exists
    if (!sessionId) {
      setShowStateSelector(true);
      return;
    }

    // Check if state is set, if it's the first message
    if (!activeSession?.state && messages.length === 0) {
      setShowStateSelector(true);
      // After state selection, trigger send with pending message
      // Store pending message in session
      updateSession(sessionId, { pendingMessage: text });
      return;
    }

    await doSend(sessionId, text);
  }, [isLoading, activeSessionId, activeSession, messages.length]);

  const doSend = async (sessionId, text) => {
    addMessage(sessionId, 'user', text);
    setIsLoading(true);

    try {
      const currentMessages = activeSession?.messages || [];
      const history = currentMessages.map(m => ({ role: m.role, content: m.content }));

      const data = await sendMessage(
        text,
        [...history, { role: 'user', content: text }],
        activeSession?.state || null,
        sessionId
      );

      addMessage(sessionId, 'assistant', data.response);
    } catch (err) {
      console.error('Send error:', err);
      const errMsg = err.response?.data?.error || 'Failed to get response. Please try again.';
      toast.error(errMsg, {
        style: { background: '#2c1810', color: '#f5f0e8', border: '1px solid #8b1a1a' },
        duration: 4000
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStateSelect = (state) => {
    setShowStateSelector(false);
    if (!activeSessionId) {
      const id = createSession(state);
      // Check if pending message
      const pending = activeSession?.pendingMessage;
      if (pending) {
        setTimeout(() => doSend(id, pending), 100);
      }
    } else {
      updateSession(activeSessionId, { state });
      const pending = activeSession?.pendingMessage;
      if (pending) {
        updateSession(activeSessionId, { pendingMessage: null });
        setTimeout(() => doSend(activeSessionId, pending), 100);
      }
    }
    toast.success(`Jurisdiction set to ${state}`, {
      style: { background: '#2d4a2d', color: '#f5f0e8' },
      icon: '📍'
    });
  };

  const handleStateSkip = () => {
    setShowStateSelector(false);
    if (!activeSessionId) {
      createSession(null);
    }
  };

  const handleQuickPrompt = (text) => {
    if (!activeSessionId) {
      setShowStateSelector(true);
      if (activeSession) {
        updateSession(activeSessionId, { pendingMessage: text });
      }
      return;
    }
    handleSend(text);
  };

  return (
    <div className="flex flex-col h-full">
      {/* State Selector Modal */}
      {showStateSelector && (
        <StateSelector
          onSelect={handleStateSelect}
          onSkip={handleStateSkip}
        />
      )}

      {/* Header */}
      <Header
        onMenuClick={onMenuClick}
        activeSession={activeSession}
        onChangeState={() => setShowStateSelector(true)}
      />

      {/* Messages Area */}
      {messages.length === 0 && !isLoading ? (
        <WelcomeScreen
          state={activeSession?.state}
          onTopicClick={handleQuickPrompt}
        />
      ) : (
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto px-4 py-6 space-y-5"
          style={{ background: '#fefcf7' }}
        >
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} message={msg} />
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <MessageBubble
              message={{ role: 'assistant', content: '' }}
              isTyping={true}
            />
          )}

          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input Area */}
      <div className="px-4 py-3 border-t flex-shrink-0" style={{ borderColor: '#d4c5a0', background: '#faf7f0' }}>
        <div className="max-w-3xl mx-auto">
          <ChatInput
            onSend={handleSend}
            isLoading={isLoading}
            disabled={false}
            showQuickPrompts={showQuickPrompts && messages.length === 0}
          />
        </div>
      </div>
    </div>
  );
}
