# TaskSync - Task Management Web Application

TaskSync is a full-stack web application designed to streamline project and task management with real-time collaboration features. Built with **React** on the frontend and **Laravel** on the backend, this project demonstrates proficiency in modern web development, including RESTful APIs, real-time communication, and role-based access control. It was created to enhance my portfolio by showcasing practical, user-focused solutions.

## Features
- **User Authentication**: Secure signup and login using Laravel Sanctum.
- **Dashboard**: Role-based views for project creators (full project overview) and employees (assigned tasks only).
- **Project Management**: Create, edit, and delete projects; assign tasks and subtasks with supervisors and employees.
- **Connection System**: LinkedIn-like connections required before assigning roles (e.g., task supervisors, employees).
- **Task Hierarchy**: Projects contain tasks, and tasks contain subtasks, assignable to connected team members.
- **Real-Time Chat**: Automatic main chat channel per project and subchannels per task, powered by Pusher and Laravel Echo.
- **Privacy**: Employees only see projects and channels they’re part of; strict role-based permissions.

## Tech Stack
### Frontend
- **React**: Dynamic, component-based UI.
- **React Router**: Page navigation.
- **Redux/Context API**: State management.
- **Material-UI/Tailwind CSS**: Responsive design.
- **Laravel Echo**: Real-time event listening.
- **Axios**: API requests.

### Backend
- **Laravel**: RESTful API and business logic.
- **Laravel Sanctum**: Token-based authentication.
- **MySQL**: Relational database.
- **Pusher**: Real-time chat broadcasting.

### Tools
- **Git/GitHub**: Version control.
- **Docker**: Local development (optional).
- **Vercel/Heroku**: Deployment.

## Prerequisites
Before setting up the project, ensure you have:
- **PHP** (>= 8.1)
- **Composer** (for Laravel dependencies)
- **Node.js** (>= 16.x) and **npm** (for React)
- **MySQL** (or another supported database)
- **Pusher Account**: Sign up at [Pusher](https://pusher.com/) for real-time chat.

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/tasksync.git
cd tasksync
