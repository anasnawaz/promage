import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import ProjectManagerList from './components/ProjectManagerList';
import ProjectManagerForm from './components/ProjectManagerForm';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Home from './components/Home';
const App = () => {
  return (
    <Router>
      <Container>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/create-project" element={<ProjectForm />} />
          <Route path="/edit-project/:id" element={<ProjectForm />} />
          <Route path="/project-managers" element={<ProjectManagerList />} />
          <Route path="/create-project-manager" element={<ProjectManagerForm />} />
          <Route path="/edit-project-manager/:id" element={<ProjectManagerForm />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/create-task" element={<TaskForm />} />
          <Route path="/edit-task/:id" element={<TaskForm />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
