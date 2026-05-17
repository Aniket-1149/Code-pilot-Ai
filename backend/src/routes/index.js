const express = require('express');
const { apiRateLimit } = require('../middleware/rateLimit');
const authRoutes = require('./authRoutes');
const projectRoutes = require('./projectRoutes');
const fileRoutes = require('./fileRoutes');
const aiRoutes = require('./aiRoutes');
const agentRoutes = require('./agentRoutes');
const debugRoutes = require('./debugRoutes');
const gitRoutes = require('./gitRoutes');
const executionRoutes = require('./executionRoutes');
const promptRoutes = require('./promptRoutes');
const sessionRoutes = require('./sessionRoutes');
const collaborationRoutes = require('./collaborationRoutes');
const analyticsRoutes = require('./analyticsRoutes');

const router = express.Router();

router.use(apiRateLimit);
router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/files', fileRoutes);
router.use('/ai', aiRoutes);
router.use('/agents', agentRoutes);
router.use('/debug', debugRoutes);
router.use('/git', gitRoutes);
router.use('/execute', executionRoutes);
router.use('/prompts', promptRoutes);
router.use('/sessions', sessionRoutes);
router.use('/collaboration', collaborationRoutes);
router.use('/analytics', analyticsRoutes);

module.exports = router;
