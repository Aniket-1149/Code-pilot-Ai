const { asyncHandler } = require('../utils/asyncHandler');
const { ok } = require('../utils/response');
const fileService = require('../services/fileService');

const createFile = asyncHandler(async (req, res) => {
  const file = await fileService.createFile(req.body);
  return ok(res, file);
});

const listFiles = asyncHandler(async (req, res) => {
  const files = await fileService.listFiles(req.query.projectId);
  return ok(res, files);
});

const getFile = asyncHandler(async (req, res) => {
  const file = await fileService.getFile(req.params.id);
  return ok(res, file);
});

const updateFile = asyncHandler(async (req, res) => {
  const file = await fileService.updateFile(req.params.id, req.body);
  return ok(res, file);
});

const deleteFile = asyncHandler(async (req, res) => {
  const file = await fileService.deleteFile(req.params.id);
  return ok(res, file);
});

module.exports = { createFile, listFiles, getFile, updateFile, deleteFile };
