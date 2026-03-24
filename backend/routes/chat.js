const express = require('express');
const router = express.Router();
const { chat, INDIAN_STATES } = require('../controllers/chatController');

router.post('/', chat);

router.get('/states', (req, res) => {
  res.json({ states: INDIAN_STATES });
});

module.exports = router;
