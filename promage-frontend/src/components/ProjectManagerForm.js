import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

const ProjectManagerForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  const [existingData, setExistingData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isEditMode) {
          const response = await axios.get(`${apiUrl}/project-managers/${id}`);
          const data = response.data;
          setExistingData(data);
          // Set form values using setValue
          Object.keys(data).forEach(key => {
            setValue(key, data[key]);
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, isEditMode, setValue]);

  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await axios.put(`${apiUrl}/project-managers/${id}`, data);
      } else {
        await axios.post(`${apiUrl}/project-managers`, data);
      }
      navigate('/project-managers');
    } catch (error) {
      console.error(`Error ${isEditMode ? 'editing' : 'creating'} project manager:`, error);
    }
  };

  return (
    <div>
      <br></br>
      <Link to="/project-managers"><Button variant="primary">Back to Project Manager</Button> </Link>
      <h2>{isEditMode ? 'Edit' : 'Create'} Project Manager</h2>
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

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.email && errors.email.message}
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          {isEditMode ? 'Update Project Manager' : 'Create Project Manager'}
        </Button>
      </Form>
    </div>
  );
};

export default ProjectManagerForm;
