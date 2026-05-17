const express = require('express');
const { requireAuth } = require('../middleware/auth');
const controller = require('../controllers/collaborationController');

const router = express.Router();

router.use(requireAuth);
router.post('/rooms', controller.create);

module.exports = router;
