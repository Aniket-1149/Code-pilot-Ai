const express = require('express');
const { requireAuth } = require('../middleware/auth');
const controller = require('../controllers/executionController');

const router = express.Router();

router.use(requireAuth);
router.post('/', controller.run);

module.exports = router;
