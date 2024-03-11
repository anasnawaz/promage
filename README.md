# Backend Application (Nodejs)

## ProMage Backend

### Architecture
Node.js: The backend is built using Node.js, Express, and Mongoose for MongoDB integration.

Database: MongoDB is used to store project, project manager, and task data.

## Setup

1. Go to backend applicatioin:

   ```bash
   cd promage-backend

2. Install dependencies:

   ```bash
   npm install

3. Generate .env file:

   ```bash
   cp .env.example .env
4. After create a .env file in the root directory with the following content 

    `MONGODB_URL`

    `PORT`

5. Run the application:

   ```bash
   npm run dev
   
   The backend server will start at http://localhost:3001

# API Endpoints
/api/projects: CRUD operations for projects.

/api/project-managers: CRUD operations for project managers.

/api/tasks: CRUD operations for tasks.

# Frontend (React) Application

## ProMage Frontend
### Architecture
React: The frontend is built using React, and it communicates with the backend API.

Bootstrap: Styling is done using the Bootstrap framework for a responsive and clean design.

## Components
Project Manager List: Display and manage project managers.
Project List: Display and manage projects.
Task List: Display and manage tasks associated with projects.

## Setup

1. Go to frontend applicatioin:

   ```bash
   cd promage-frontend

2. Install dependencies:

   ```bash
   npm install

3. Generate .env file:

   ```bash
   cp .env.example .env

4. After create a .env file in the root directory with the following content 

    `REACT_APP_API_URL=http://localhost:3001/api` 

5. Run the application:

   ```bash
   npm start
   
   The frontend development server will start at http://localhost:3000.