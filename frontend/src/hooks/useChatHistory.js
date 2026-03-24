import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'vakil_ai_sessions';
const ACTIVE_KEY = 'vakil_ai_active_session';

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
};

const saveToStorage = (sessions) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (e) {
    console.error('Storage error:', e);
  }
};

export const useChatHistory = () => {
  const [sessions, setSessions] = useState({});
  const [activeSessionId, setActiveSessionId] = useState(null);

  useEffect(() => {
    const stored = loadFromStorage();
    setSessions(stored);
    const lastActive = localStorage.getItem(ACTIVE_KEY);
    if (lastActive && stored[lastActive]) {
      setActiveSessionId(lastActive);
    }
  }, []);

  const createSession = useCallback((state = null) => {
    const id = uuidv4();
    const newSession = {
      sessionId: id,
      title: 'New Consultation',
      state,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setSessions(prev => {
      const updated = { ...prev, [id]: newSession };
      saveToStorage(updated);
      return updated;
    });
    setActiveSessionId(id);
    localStorage.setItem(ACTIVE_KEY, id);
    return id;
  }, []);

  const updateSession = useCallback((sessionId, updates) => {
    setSessions(prev => {
      const session = prev[sessionId];
      if (!session) return prev;
      const updated = {
        ...prev,
        [sessionId]: {
          ...session,
          ...updates,
          updatedAt: new Date().toISOString()
        }
      };
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const addMessage = useCallback((sessionId, role, content) => {
    setSessions(prev => {
      const session = prev[sessionId];
      if (!session) return prev;
      const newMessage = { role, content, timestamp: new Date().toISOString() };
      const updated = {
        ...prev,
        [sessionId]: {
          ...session,
          messages: [...session.messages, newMessage],
          updatedAt: new Date().toISOString(),
          title: session.messages.length === 0 && role === 'user'
            ? (content.length > 55 ? content.substring(0, 52) + '...' : content)
            : session.title
        }
      };
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const deleteSession = useCallback((sessionId) => {
    setSessions(prev => {
      const updated = { ...prev };
      delete updated[sessionId];
      saveToStorage(updated);
      return updated;
    });
    if (activeSessionId === sessionId) {
      setActiveSessionId(null);
      localStorage.removeItem(ACTIVE_KEY);
    }
  }, [activeSessionId]);

  const clearAll = useCallback(() => {
    setSessions({});
    setActiveSessionId(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ACTIVE_KEY);
  }, []);

  const switchSession = useCallback((sessionId) => {
    setActiveSessionId(sessionId);
    localStorage.setItem(ACTIVE_KEY, sessionId);
  }, []);

  const activeSession = activeSessionId ? sessions[activeSessionId] : null;
  const sessionList = Object.values(sessions).sort((a, b) =>
    new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  return {
    sessions,
    sessionList,
    activeSession,
    activeSessionId,
    createSession,
    updateSession,
    addMessage,
    deleteSession,
    clearAll,
    switchSession,
    setActiveSessionId
  };
};
