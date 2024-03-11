const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Route to get all projects
router.get('/projects', projectController.getAllProjects);

// Route to get a specific project by ID
router.get('/projects/:id', projectController.getProjectById);

// Route to create a new project
router.post('/projects', projectController.createProject);

// Route to update a project by ID
router.put('/projects/:id', projectController.updateProject);

// Route to delete a project by ID
router.delete('/projects/:id', projectController.deleteProject);

module.exports = router;
