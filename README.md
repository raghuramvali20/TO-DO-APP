# Todo App

Full stack todo application with React frontend and Express backend.

## Features
- Task Management
- Category Organization
- User Authentication
- Responsive Design

## Tech Stack
- Frontend: React + Vite
- Backend: Express.js
- Database: File-based JSON storage

## Setup
1. Clone repository:
```bash
git clone <your-repo-url>
cd todo-app
```

2. Install all dependencies:
```bash
npm run install:all
```

3. Start development servers:
```bash
npm run dev
```
This will start:
- Frontend at http://localhost:5173
- Backend at http://localhost:5000

## Production Build
```bash
npm run build
npm start
```

## Project Structure
```
todo-app/
├── todo-frontend/     # React frontend
├── todo-backend/      # Express backend
├── package.json       # Root configuration
└── README.md         # Documentation
```