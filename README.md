# Full-Stack To-Do List Application

This is a full-stack to-do list app built with React on the frontend and Express.js on the backend. It supports user authentication, to-do management, and secure JWT-based authentication with token revocation.

---

## Features

- Sign up and log in with email and password
- Secure access using JWT tokens
- Store and manage personal to-do items (create, update, delete)
- Logout with refresh token revocation
- Responsive UI with Tailwind CSS
- RESTful API with protected routes

---

## Tech Stack

Frontend:
- React
- TypeScript
- Tailwind CSS

Backend:
- Express.js
- MongoDB with Mongoose
- JWT (access and refresh tokens)

Deployment:
- Frontend: Vercel
- Backend: Railway
- Database: MongoDB Atlas

---

## How to Run the Project

1. Clone the repository:
   git clone https://your-repo-url](https://github.com/amanhurgat/todo.git

2. Set up the backend:
   - Go to the `server` folder
   - Run `npm install` to install dependencies
   - Create a `.env` file and add your environment variables (e.g. MongoDB URI, JWT secrets)
   - Run `npm start` to start the server

3. Set up the frontend:
   - Go to the `client` folder
   - Run `npm install` to install dependencies
   - Create a `.env` file for frontend settings (e.g. backend API URL)
   - Run `npm run dev` to start the frontend app

4. Access the app in your browser at:
   http://localhost:5173 (or the port used by your frontend)

---

## Environment Variables

Backend (`server/.env`):
- MONGO_URI
- JWT_ACCESS_SECRET
- JWT_REFRESH_SECRET

Frontend (`client/.env`):
- VITE_API_URL (URL of your backend server)

---

## Folder Structure

- `/client` - Frontend (React)
- `/server` - Backend (Express.js)

---

## Authentication Flow

- On login/signup, server returns:
  - Access token (short-lived, used in headers)
  - Refresh token (stored in HttpOnly cookie)

- On logout:
  - The refresh token is revoked (blacklisted)


---

## Optional Features (Bonus)

- Dark mode toggle


---

## Deployment

1. Deploy backend to Railway
2. Deploy frontend to Vercel
3. Use MongoDB Atlas for the database
4. Set all environment variables correctly in your deployed services

---

## Contact

If you have questions or need help setting it up, feel free to reach out on my email (amanhurgat@gmail.com).
