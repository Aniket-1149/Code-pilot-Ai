const express = require('express');
const { requireAuth } = require('../middleware/auth');
const controller = require('../controllers/analyticsController');

const router = express.Router();

router.use(requireAuth);
router.post('/', controller.track);

module.exports = router;
