# HostelEase

A full-stack hostel management web application designed to simplify and digitize common hostel management activities such as room management, complaint tracking, notices, visitor records, and user authentication.

## Project Overview

HostelEase provides a centralized platform for hostel students and administrators.

The application follows a client-server architecture where the React frontend communicates with a Node.js and Express.js backend through REST APIs. MongoDB is used for persistent data storage.

## Features

### Authentication & Authorization

- Student registration and login
- JWT-based authentication
- Password hashing using bcryptjs
- Role-based access control
- Separate student and administrator permissions

### Room Management

- View hostel rooms
- View room capacity and occupancy
- Track room availability
- Track maintenance status
- Admin-only room creation, editing, and deletion

### Complaint Management

- View hostel complaints
- Search complaints by student, type, or room
- Filter complaints by status
- Admin can update complaint status

### Notice Management

- View hostel notices
- Filter notices by priority
- Admin can create notices
- Admin can edit notices

### Visitor Management

- Store visitor records
- View visitor information
- Admin-controlled visitor updates

### User Profile

- View authenticated user information
- Display room, course, contact, guardian, and other profile details

## Technology Stack

### Frontend

- React
- Vite
- JavaScript
- CSS
- Fetch API

### Backend

- Node.js
- Express.js
- REST APIs
- JWT
- bcryptjs
- CORS

### Database

- MongoDB
- Mongoose

## System Architecture

```text
┌─────────────────────┐
│   React Frontend    │
│      (Vite)         │
└──────────┬──────────┘
           │
           │ Fetch / REST API
           ▼
┌─────────────────────┐
│  Node.js + Express  │
│      Backend        │
└──────────┬──────────┘
           │
           │ Mongoose
           ▼
┌─────────────────────┐
│      MongoDB        │
└─────────────────────┘
