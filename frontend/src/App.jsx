import { useState, useCallback } from 'react';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import ChatPage from './pages/ChatPage';
import { useChatHistory } from './hooks/useChatHistory';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    sessionList,
    activeSession,
    activeSessionId,
    createSession,
    updateSession,
    addMessage,
    deleteSession,
    clearAll,
    switchSession,
  } = useChatHistory();

  const handleNewChat = useCallback(() => {
    createSession(null);
    setSidebarOpen(false);
  }, [createSession]);

  const handleSelectSession = useCallback((sessionId) => {
    switchSession(sessionId);
    setSidebarOpen(false);
  }, [switchSession]);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#f5f0e8' }}>
      {/* Toaster */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontFamily: 'Source Serif 4, serif',
            fontSize: '14px',
            borderRadius: '10px'
          }
        }}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sessionList={sessionList}
        activeSessionId={activeSessionId}
        onNewChat={handleNewChat}
        onSelectSession={handleSelectSession}
        onDeleteSession={deleteSession}
        onClearAll={clearAll}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden" style={{ background: '#fefcf7' }}>
        <ChatPage
          sidebarOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(true)}
          activeSession={activeSession}
          activeSessionId={activeSessionId}
          addMessage={addMessage}
          updateSession={updateSession}
          createSession={createSession}
          onChangeState={() => {}}
        />
      </main>
    </div>
  );
}
