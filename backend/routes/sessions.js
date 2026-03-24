const express = require('express');
const router = express.Router();
const { getSessions, getSession, deleteSession, clearAllSessions } = require('../controllers/sessionsController');

router.get('/', getSessions);
router.get('/:sessionId', getSession);
router.delete('/all', clearAllSessions);
router.delete('/:sessionId', deleteSession);

module.exports = router;
