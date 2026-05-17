const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { requirePermission } = require('../middleware/rbac');
const controller = require('../controllers/debugController');

const router = express.Router();

router.use(requireAuth);
router.post('/stack', requirePermission('debug:invoke'), controller.analyzeStack);
router.post('/logs', requirePermission('debug:invoke'), controller.analyzeRuntimeLogs);

module.exports = router;
