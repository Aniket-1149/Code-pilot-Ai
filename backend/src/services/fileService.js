const File = require('../models/File');

async function createFile(data) {
  return File.create(data);
}

async function listFiles(projectId) {
  return File.find({ project: projectId });
}

async function getFile(id) {
  return File.findById(id);
}

async function updateFile(id, updates) {
  return File.findByIdAndUpdate(id, updates, { new: true });
}

async function deleteFile(id) {
  return File.findByIdAndDelete(id);
}

module.exports = { createFile, listFiles, getFile, updateFile, deleteFile };
