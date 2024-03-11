const ProjectManager = require('../models/ProjectManager');
// Get all project managers
exports.getAllProjectManagers = async (req, res) => {
  try {
    const projectManagers = await ProjectManager.find();
    res.json(projectManagers);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a specific project manager by ID
exports.getProjectManagerById = async (req, res) => {
  const { id } = req.params;

  try {
    const projectManager = await ProjectManager.findById(id);
    if (!projectManager) {
      return res.status(404).json({ error: 'Project Manager not found' });
    }
    res.json(projectManager);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new project manager
exports.createProjectManager = async (req, res) => {
  const { name, email } = req.body;

  try {
    const newProjectManager = new ProjectManager({ name, email });
    const savedProjectManager = await newProjectManager.save();
    res.status(201).json(savedProjectManager);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a project manager by ID
exports.updateProjectManager = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const updatedProjectManager = await ProjectManager.findByIdAndUpdate(
      id,
      { name, email },
      { new: true, runValidators: true }
    );

    if (!updatedProjectManager) {
      return res.status(404).json({ error: 'Project Manager not found' });
    }

    res.json(updatedProjectManager);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a project manager by ID
exports.deleteProjectManager = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProjectManager = await ProjectManager.findByIdAndDelete(id);

    if (!deletedProjectManager) {
      return res.status(404).json({ error: 'Project Manager not found' });
    }

    res.json({ message: 'Project Manager deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
