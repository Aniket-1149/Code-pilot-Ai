const { asyncHandler } = require('../utils/asyncHandler');
const { ok } = require('../utils/response');
const projectService = require('../services/projectService');

const createProject = asyncHandler(async (req, res) => {
  const project = await projectService.createProject({ ...req.body, owner: req.user.id });
  return ok(res, project);
});

const listProjects = asyncHandler(async (req, res) => {
  const projects = await projectService.listProjects(req.user.id);
  return ok(res, projects);
});

const getProject = asyncHandler(async (req, res) => {
  const project = await projectService.getProject(req.params.id);
  return ok(res, project);
});

const updateProject = asyncHandler(async (req, res) => {
  const project = await projectService.updateProject(req.params.id, req.body);
  return ok(res, project);
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await projectService.deleteProject(req.params.id);
  return ok(res, project);
});

module.exports = { createProject, listProjects, getProject, updateProject, deleteProject };
