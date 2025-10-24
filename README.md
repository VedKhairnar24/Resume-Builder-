# Resume Builder

A full-stack web application for creating and managing professional resumes. Built with React, Node.js, Express, and MongoDB.

## Features

- User authentication (register, login, logout)
- Create and customize resumes with sections for:
  - Personal information
  - Education history
  - Work experience
  - Skills
- Dashboard to view, edit, and delete saved resumes
- Responsive design with Tailwind CSS

## Tech Stack

### Frontend

- React
- React Router for navigation
- Tailwind CSS for styling
- Axios for API requests

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Project Structure

```
resume-builder/
├── client/                 # Frontend React application
│   ├── public/             # Static files
│   ├── src/                # Source files
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Entry point
│   ├── package.json        # Frontend dependencies
│   └── tailwind.config.js  # Tailwind CSS configuration
│
└── server/                 # Backend Node.js application
    ├── src/                # Source files
    │   ├── controllers/    # Request handlers
    │   ├── middleware/     # Custom middleware
    │   ├── models/         # Mongoose models
    │   ├── routes/         # API routes
    │   └── server.js       # Entry point
    ├── .env                # Environment variables
    └── package.json        # Backend dependencies
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation

### Installation

1. Clone the repository

   ```
   git clone <repository-url>
   cd resume-builder
   ```
2. Install backend dependencies

   ```
   cd server
   npm install
   ```
3. Set up environment variables
   Create a `.env` file in the server directory with the following variables:

   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   CLIENT_URL=http://localhost:3000
   ```
4. Install frontend dependencies

   ```
   cd ../client
   npm install
   ```

### Running the Application

1. Start the backend server

   ```
   cd server
   npm start
   ```
2. Start the frontend development server

   ```
   cd client
   npm start
   ```
3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user profile

### Resumes

- `GET /api/resumes` - Get all resumes for the logged-in user
- `GET /api/resumes/:id` - Get a specific resume
- `POST /api/resumes` - Create a new resume
- `PUT /api/resumes/:id` - Update a resume
- `DELETE /api/resumes/:id` - Delete a resume

## Future Enhancements

- Multiple resume templates
- PDF export functionality
- Drag and drop resume builder
- Social media sharing
- Resume analytics

## License

This project is licensed under the MIT License.
