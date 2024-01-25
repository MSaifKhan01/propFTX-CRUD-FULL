

# propFTX-CRUD-FULL

## Overview
This project is a full-stack CRUD (Create, Read, Update, Delete) application for managing movies. It includes both frontend and backend components, allowing users to register, log in, add movies, view movie details, update movies, and delete movies.

### Frontend
- **Live Demo:** [propFTX Frontend](https://prop02-ftx.netlify.app/)

- **Technologies Used:** React.js, React Router,  SweetAlert2
- **Features:**
  - User registration and login
  - Movie management (Add, View, Update, Delete)
  - Responsive design for various screen sizes

### Backend
- **Live Endpoint:** [propFTX Backend](https://propftxbackend.onrender.com)
- **Technologies Used:** Node.js, Express.js, MongoDB, JWT Authentication, AWS S3 (for storing movie images)
- **Features:**
  - User authentication with JWT tokens
  - CRUD operations for movies
  - Image upload for movie posters using AWS S3

## Setup Instructions
To run this project locally, follow these steps:

1. **Clone the Repository:**
   ```
   git clone <repository-url>
   cd propFTX-CRUD-FULL
   ```

2. **Install Dependencies:**
   ```
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the `backend` directory with the following variables:
   ```
   PORT=5030
   JWT_Secret=<your-jwt-secret>
   S3bucketName=<your-s3-bucket-name>
   S3AccessKeyId=<your-key id>
   S3SecretAccesKey=<your-access key>
   ```

4. **Start the Backend Server:**
   ```
   cd backend
   npm run server
   ```

5. **Start the Frontend Development Server:**
   ```
   cd frontend
   npm start
   ```

6. **Access the Application:**
   Open your web browser and go to `http://localhost:3000` to access the frontend.

### Environment Variables

- **PORT:** The port on which the backend server will run. Set this to `5030`.
- **JWT_Secret:** Secret key used for JWT token generation and verification. Please replace `<your-jwt-secret>` with your actual JWT secret.
- **S3bucketName:** Name of the AWS S3 bucket used for storing movie images. Please replace `<your-s3-bucket-name>` with your actual S3 bucket name.
- **S3AccessKeyId:** AWS Access Key ID for accessing the S3 bucket. Please replace `<your-key-id>` with your actual Access Key ID.
- **S3SecretAccesKey:** AWS Secret Access Key for accessing the S3 bucket. Please replace `<your-access-key>` with your actual Secret Access Key.

## Routes
- **User Routes:**
  - `POST /user/register`: Register a new user.
  - `POST /user/login`: Log in an existing user.
- **Movie Routes:**
  - `GET /movie`: Get all movies.
  - `GET /movie/:id`: Get details of a specific movie.
  - `POST /movie/add-movie`: Add a new movie.
  - `PUT /movie/update-movie/:id`: Update details of a movie.
  - `DELETE /movie/delete-movie/:id`: Delete a movie.

## Acknowledgments
- Frontend hosted on [Netlify](https://www.netlify.com/)
- Backend hosted on [Render](https://render.com/)
- Built with love by [Your Name or Team Name]
