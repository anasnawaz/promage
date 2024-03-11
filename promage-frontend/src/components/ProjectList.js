import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Menu from './Menu'; 
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001/api";
const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/projects`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/projects/${id}`);
      setProjects((prevProjects) => prevProjects.filter((project) => project._id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div>
      <br></br>
      <Menu /> 
      <h2>Projects</h2>
      

      <Link to="/create-project">
        <Button variant="primary">Create Project</Button>
      </Link>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Description</th>
            <th>Manager</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={project._id}>
              <td>{index + 1}</td>
              <td>{project.name}</td>
              <td>{new Date(project.startDate).toLocaleDateString()}</td>
              <td>{new Date(project.endDate).toLocaleDateString()}</td>
              <td>{project.description}</td>
              <td>{project.manager.name}</td>
              <td>
                <Link to={`/edit-project/${project._id}`}>
                  <Button variant="info" size="sm" className="mr-2">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(project._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProjectList;
