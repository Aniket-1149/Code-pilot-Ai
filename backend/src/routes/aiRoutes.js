const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { requirePermission } = require('../middleware/rbac');
const controller = require('../controllers/aiController');

const router = express.Router();

router.use(requireAuth);
router.post('/generate', requirePermission('ai:invoke'), controller.generate);
router.post('/analyze', requirePermission('ai:invoke'), controller.analyze);

module.exports = router;
