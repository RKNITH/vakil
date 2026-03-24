import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const sendMessage = async (message, messages, state, sessionId) => {
  const response = await api.post('/chat', {
    message,
    messages,
    state,
    sessionId
  });
  return response.data;
};

export const getSessions = async () => {
  const response = await api.get('/sessions');
  return response.data;
};

export const getSession = async (sessionId) => {
  const response = await api.get(`/sessions/${sessionId}`);
  return response.data;
};

export const deleteSession = async (sessionId) => {
  const response = await api.delete(`/sessions/${sessionId}`);
  return response.data;
};

export const clearAllSessions = async () => {
  const response = await api.delete('/sessions/all');
  return response.data;
};

export const getStates = async () => {
  const response = await api.get('/chat/states');
  return response.data;
};

export default api;
