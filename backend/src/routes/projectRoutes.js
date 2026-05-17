const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { requirePermission } = require('../middleware/rbac');
const controller = require('../controllers/projectController');

const router = express.Router();

router.use(requireAuth);
router.get('/', requirePermission('project:read'), controller.listProjects);
router.post('/', requirePermission('project:write'), controller.createProject);
router.get('/:id', requirePermission('project:read'), controller.getProject);
router.put('/:id', requirePermission('project:write'), controller.updateProject);
router.delete('/:id', requirePermission('project:write'), controller.deleteProject);

module.exports = router;
