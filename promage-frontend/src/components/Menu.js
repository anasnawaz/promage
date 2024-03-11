import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Menu = () => {
  return (
    <nav>
      <ul className="nav navnavbar-nav">
        <li  className="nav-item"><Link to="/"> <Button variant="primary">Home</Button> </Link></li>
        <li className="nav-item"><Link to="/project-managers"><Button variant="primary">Project Managers</Button> </Link></li>
        <li className="nav-item"><Link to="/projects"><Button variant="primary">Projects</Button> </Link></li>
        <li className="nav-item"> <Link to="/tasks"><Button variant="primary">Tasks</Button> </Link></li>
      </ul>
    </nav>
  );
};

export default Menu;