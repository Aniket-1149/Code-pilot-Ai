const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { requirePermission } = require('../middleware/rbac');
const controller = require('../controllers/agentController');

const router = express.Router();

router.use(requireAuth);
router.post('/run', requirePermission('agent:invoke'), controller.runAgent);

module.exports = router;
