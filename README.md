# Nodebase – n8n clone / Workflow Automation Tool

## Description
This project is a **replica of n8n**, created as a learning project to understand how workflow automation platforms work internally. It allows users to visually create, connect, and execute workflows with multiple nodes, inspired by n8n’s interface and functionality.

The project is **educational**, aiming to explore backend/frontend interaction, authentication, database management, and event-driven workflow execution.

---

## Tech Stack
- **Next.js & React** – Frontend framework for server-side rendering and React components
- **TypeScript** – Strongly typed JavaScript for frontend and backend
- **React Flow** – Drag-and-drop visual workflow editor
- **Inngest** – Event-driven architecture for workflow execution
- **Prisma** – ORM for database management
- **tRPC** – Type-safe API communication between frontend and backend
- **BetterAuth** – Authentication and session management

---

## Features
- Drag-and-drop workflow editor using React Flow
- Event-driven execution of workflow nodes (Inngest)
- User authentication and session management (BetterAuth)
- CRUD operations for workflows via Prisma + tRPC
- Type-safe frontend-backend communication
- Workflow execution logging and history tracking

---

## Getting Started

### Prerequisites
- Node.js >= 18
- npm or yarn
- PostgreSQL or compatible database

### Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/n8n-clone.git
cd n8n-clone
```
### Install Dependencies 
```bash
npm install
# or
yarn install
```
### Configure environment variables:
Create a .env file based on .env.example and set:
```bash
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_secret_key
INNGEST_KEY=your_key
```

### Run database migrations:
```bash
npx prisma migrate dev
```

### Start the development server:
```bash
npm run dev
# or
yarn dev
```
### Open http://localhost:3000 to view the app.

### Usage

- Create an account and log in
- Create a new workflow using the drag-and-drop interface
- Add and connect nodes
- Execute workflows and view results in real-time
- Edit or delete workflows as needed

### Architecture Overview

- Frontend: Next.js + React Flow for workflow visualization
- Backend: Next.js API routes + tRPC for type-safe communication
- Database: PostgreSQL managed with Prisma
- Workflow Execution: Inngest handles asynchronous node execution
- Authentication: BetterAuth manages user sessions and access
