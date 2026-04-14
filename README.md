# MERN To-Do Application

Full stack to-do application with:

- React frontend for registration, login, dashboard, editing, and filtering tasks
- Node.js + Express backend using MVC + services
- MongoDB for persistence
- JWT authentication stored in HTTP-only cookies

## Project Structure

- `client`: React + Vite frontend
- `server`: Express API with controllers, models, routes, middlewares, and services

## Run Locally

1. Copy `server/.env.example` to `server/.env`
2. Copy `client/.env.example` to `client/.env`
3. Set `MONGODB_URI`, `JWT_SECRET`, and URLs as needed
4. Install dependencies:
   `npm run install:all`
5. Start both apps:
   `npm run dev`

## API Summary

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `POST /api/tasks`
- `GET /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
# todo_app
