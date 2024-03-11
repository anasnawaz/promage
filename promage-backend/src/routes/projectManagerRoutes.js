const express = require('express');
const router = express.Router();
const projectManagerController = require('../controllers/projectManagerController');

// Route to get all project managers
router.get('/project-managers', projectManagerController.getAllProjectManagers);

// Route to get a specific project manager by ID
router.get('/project-managers/:id', projectManagerController.getProjectManagerById);

// Route to create a new project manager
router.post('/project-managers', projectManagerController.createProjectManager);

// Route to update a project manager by ID
router.put('/project-managers/:id', projectManagerController.updateProjectManager);

// Route to delete a project manager by ID
router.delete('/project-managers/:id', projectManagerController.deleteProjectManager);

module.exports = router;
