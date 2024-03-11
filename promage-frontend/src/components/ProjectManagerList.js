import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Menu from './Menu'; 
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

const ProjectManagerList = () => {
  const [projectManagers, setProjectManagers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/project-managers`);
        setProjectManagers(response.data);
      } catch (error) {
        console.error('Error fetching project managers:', error);
        setProjectManagers([]);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/project-managers/${id}`);
      setProjectManagers((prevManagers) => prevManagers.filter((manager) => manager._id !== id));
    } catch (error) {
      console.error('Error deleting project manager:', error);
    }
  };

  return (
    <div>
         <br></br>
      <Menu />
      <h2>Project Managers</h2>
      <Link to="/create-project-manager">
        <Button variant="primary">Create Project Manager</Button>
      </Link>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projectManagers.map((manager, index) => (
            <tr key={manager._id}>
              <td>{index + 1}</td>
              <td>{manager.name}</td>
              <td>{manager.email}</td>
              <td>
                <Link to={`/edit-project-manager/${manager._id}`}>
                  <Button variant="info" size="sm" className="mr-2">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(manager._id)}
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

export default ProjectManagerList;
