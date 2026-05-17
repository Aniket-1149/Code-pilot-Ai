const express = require('express');
const { requireAuth } = require('../middleware/auth');
const controller = require('../controllers/gitController');

const router = express.Router();

router.use(requireAuth);
router.post('/connect', controller.connect);

module.exports = router;
