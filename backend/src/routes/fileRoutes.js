const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { requirePermission } = require('../middleware/rbac');
const controller = require('../controllers/fileController');

const router = express.Router();

router.use(requireAuth);
router.get('/', requirePermission('file:read'), controller.listFiles);
router.post('/', requirePermission('file:write'), controller.createFile);
router.get('/:id', requirePermission('file:read'), controller.getFile);
router.put('/:id', requirePermission('file:write'), controller.updateFile);
router.delete('/:id', requirePermission('file:write'), controller.deleteFile);

module.exports = router;
