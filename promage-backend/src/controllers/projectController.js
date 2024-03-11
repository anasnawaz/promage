const Project = require('../models/Project');
// Get all projects
exports.getAllProjects = async (req, res) => {
    try {
      const projects = await Project.find().populate('manager', 'name');
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Get a specific project by ID
  exports.getProjectById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Create a new project
  exports.createProject = async (req, res) => {
    const { name, startDate, endDate, description, manager } = req.body;
  
    try {
      const newProject = new Project({
        name,
        startDate,
        endDate,
        description,
        manager,
      });
      const savedProject = await newProject.save();
      res.status(201).json(savedProject);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Update a project by ID
  exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const { name, startDate, endDate, description, manager } = req.body;
  
    try {
      const updatedProject = await Project.findByIdAndUpdate(
        id,
        { name, startDate, endDate, description, manager },
        { new: true, runValidators: true }
      );
  
      if (!updatedProject) {
        return res.status(404).json({ error: 'Project not found' });
      }
  
      res.json(updatedProject);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Delete a project by ID
  exports.deleteProject = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedProject = await Project.findByIdAndDelete(id);
  
      if (!deletedProject) {
        return res.status(404).json({ error: 'Project not found' });
      }
  
      res.json({ message: 'Project deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };