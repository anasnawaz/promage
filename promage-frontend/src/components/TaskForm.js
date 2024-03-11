import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

const TaskForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${apiUrl}/projects`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      }
    };

    fetchProjects();
  }, []);

  const isEditMode = !!id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isEditMode) {
          const response = await axios.get(`${apiUrl}/tasks/${id}`);
          const { description, project } = response.data;
          setValue('description', description);
          setValue('project', project);
        }
      } catch (error) {
        console.error('Error fetching task details:', error);
      }
    };

    fetchData();
  }, [id, isEditMode, setValue]);

  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await axios.put(`${apiUrl}/tasks/${id}`, data);
      } else {
        await axios.post(`${apiUrl}/tasks`, data);
      }
      navigate('/tasks');
    } catch (error) {
      console.error(`Error ${isEditMode ? 'editing' : 'creating'} task:`, error);
    }
  };

  return (
    <div>
      <br></br>
      <Link to="/tasks"><Button variant="primary">Back to Tasks</Button> </Link>
      <h2>{isEditMode ? 'Edit' : 'Create'} Task</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            {...register('description', { required: 'Description is required' })}
          />
          <Form.Text className="text-danger">
            {errors.description && errors.description.message}
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formProject">
          <Form.Label>Project</Form.Label>
          <Form.Control
            as="select"
            {...register('project', { required: 'Project is required' })}
          >
            <option value="">Select a project</option>
            {projects.map((project_) => (
              <option key={project_._id} value={project_._id}>
                {project_.name}
              </option>
            ))}
          </Form.Control>
          <Form.Text className="text-danger">
            {errors.project && errors.project.message}
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          {isEditMode ? 'Update Task' : 'Create Task'}
        </Button>
      </Form>
    </div>
  );
};

export default TaskForm;
