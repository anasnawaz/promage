import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

const ProjectForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const [projectManagers, setProjectManagers] = useState([]);

  useEffect(() => {
    const fetchProjectManagers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/project-managers`);
        setProjectManagers(response.data);
      } catch (error) {
        console.error('Error fetching project managers:', error);
        setProjectManagers([]);
      }
    };

    fetchProjectManagers();
  }, []);

  const isEditMode = !!id;

  useEffect(() => {
    // Fetch project details for editing in case of edit mode
    const fetchData = async () => {
      try {
        if (isEditMode) {
          const response = await axios.get(`${apiUrl}/projects/${id}`);
          const { name, startDate, endDate, description, manager } = response.data;
          setValue('name', name); 
          setValue('startDate',  new Date(startDate).toISOString().substr(0, 10));
          setValue('endDate',  new Date(endDate).toISOString().substr(0, 10));
          setValue('description', description);
          setValue('manager', manager);
        }
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchData();
  }, [id, isEditMode, setValue]);

  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await axios.put(`${apiUrl}/projects/${id}`, data);
      } else {
        await axios.post(`${apiUrl}/projects`, data);
      }
      navigate('/projects');
    } catch (error) {
      console.error(`Error ${isEditMode ? 'editing' : 'creating'} project:`, error);
    }
  };

  return (
    <div>
      <br></br>
      <Link to="/projects"><Button variant="primary">Back to Projects</Button> </Link>

      <h2>{isEditMode ? 'Edit' : 'Create'} Project</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            {...register('name', { required: 'Name is required' })}
          />
          <Form.Text className="text-danger">
            {errors.name && errors.name.message}
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formStartDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            {...register('startDate', { required: 'Start Date is required' })}
          />
          <Form.Text className="text-danger">
            {errors.startDate && errors.startDate.message}
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formEndDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            {...register('endDate', { required: 'End Date is required' })}
          />
          <Form.Text className="text-danger">
            {errors.endDate && errors.endDate.message}
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter description"
            {...register('description', { required: 'Description is required' })}
          />
          <Form.Text className="text-danger">
            {errors.description && errors.description.message}
          </Form.Text>
        </Form.Group>        
        <Form.Group controlId="formManager">
          <Form.Label>Manager</Form.Label>
          <Form.Control
            as="select"
            {...register('manager', { required: 'Manager is required' })}
          >
            <option value="">Select a manager</option>
            {projectManagers.map((manager) => (
              <option key={manager._id} value={manager._id}>
                {manager.name}
              </option>
            ))}
          </Form.Control>
          <Form.Text className="text-danger">
            {errors.manager && errors.manager.message}
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          {isEditMode ? 'Update Project' : 'Create Project'}
        </Button>
      </Form>
    </div>
  );
};

export default ProjectForm;
