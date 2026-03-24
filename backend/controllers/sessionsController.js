const ChatSession = require('../models/ChatSession');

const mongoose_connected = () => {
  try {
    const mongoose = require('mongoose');
    return mongoose.connection.readyState === 1;
  } catch { return false; }
};

const getSessions = async (req, res) => {
  if (!mongoose_connected()) {
    return res.json({ sessions: [] });
  }
  try {
    const sessions = await ChatSession.find({})
      .select('sessionId title state createdAt updatedAt messages')
      .sort({ updatedAt: -1 })
      .limit(50);

    res.json({
      sessions: sessions.map(s => ({
        sessionId: s.sessionId,
        title: s.title,
        state: s.state,
        messageCount: s.messages.length,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
        lastMessage: s.messages.length > 0 ? s.messages[s.messages.length - 1].content.substring(0, 100) : null
      }))
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
};

const getSession = async (req, res) => {
  if (!mongoose_connected()) {
    return res.json({ session: null });
  }
  try {
    const session = await ChatSession.findOne({ sessionId: req.params.sessionId });
    if (!session) return res.status(404).json({ error: 'Session not found' });
    res.json({ session });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch session' });
  }
};

const deleteSession = async (req, res) => {
  if (!mongoose_connected()) {
    return res.json({ success: true });
  }
  try {
    await ChatSession.deleteOne({ sessionId: req.params.sessionId });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete session' });
  }
};

const clearAllSessions = async (req, res) => {
  if (!mongoose_connected()) {
    return res.json({ success: true });
  }
  try {
    await ChatSession.deleteMany({});
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear sessions' });
  }
};

module.exports = { getSessions, getSession, deleteSession, clearAllSessions };
