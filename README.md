# User Login System

A secure and feature-rich user authentication system built with React (Frontend) and Spring boot (Backend). This system provides user authentication, role-based access control, and admin management capabilities.

## Features

- 🔐 Secure user authentication with JWT
- 👥 User registration and login
- 👮‍♂️ Admin dashboard with user management
- 🔑 Role-based access control (Admin/User)
- 🛡️ Protected routes
- 📱 Responsive design with Tailwind CSS
- 🔄 Session management
- 🚪 Secure logout functionality

## Tech Stack

### Frontend

- React.js
- React Router for navigation
- Tailwind CSS for styling
- Axios for API requests
- JWT for client-side token management

### Backend

- Spring boot
- MySQL for database
- JWT for authentication

## Prerequisites

Before you begin, ensure you have the following installed:

- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Tharindu-Theekshana/User-Login-System.git
cd User-Login-System
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

5. Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

## Running the Application

1. Start the backend server:

```bash
cd backend
npm start
```

2. Start the frontend development server:

```bash
cd frontend
npm start
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Project Structure

```
User-Login-System/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── UserDashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.jsx
│   └── package.json


## Features in Detail

### User Authentication

- Secure login with email and password
- JWT-based authentication
- Protected routes for authenticated users
- Automatic token refresh
- Secure password hashing

### Admin Features

- Admin dashboard with user management
- Create new admin users
- View and manage user accounts
- Role-based access control

### Security Features

- Password hashing using bcrypt
- JWT token-based authentication
- Protected API endpoints
- Secure session management
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email your-email@example.com or open an issue in the repository.
```
