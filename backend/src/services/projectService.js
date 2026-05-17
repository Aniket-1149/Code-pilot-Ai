const Project = require('../models/Project');

async function createProject(data) {
  return Project.create(data);
}

async function listProjects(ownerId) {
  return Project.find({ owner: ownerId });
}

async function getProject(id) {
  return Project.findById(id);
}

async function updateProject(id, updates) {
  return Project.findByIdAndUpdate(id, updates, { new: true });
}

async function deleteProject(id) {
  return Project.findByIdAndDelete(id);
}

module.exports = { createProject, listProjects, getProject, updateProject, deleteProject };
