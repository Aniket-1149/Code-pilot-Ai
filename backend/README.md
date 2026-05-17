# Backend Quickstart

## Overview
This backend is a modular Express service with clean separation of concerns:
- config: environment, database, redis, queue, oauth, logging
- middleware: auth, RBAC, rate limiting, errors
- services: core business logic (AI, agents, debug, execution, etc.)
- controllers + routes: REST API surface
- sockets: real-time collaboration + agent streaming
- queues: BullMQ background processing
- sandbox: code execution (disabled by default)
- models: Mongoose schemas

## Where to put .env
Create your env file here:
- backend/.env

Use backend/.env.example as the template:
- backend/.env.example

Required values for basic startup:
- MONGO_URI
- JWT_SECRET

Optional (based on features you use):
- GEMINI_API_KEY
- REDIS_URL
- GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET
- GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET
- SPEECH_PROJECT_ID

## Quickstart

### 1) Install dependencies
From the backend folder:

npm install

### 2) Create .env
Copy the example and fill values:

copy .env.example .env

### 3) Run the API

npm run dev

The API will be available at:
- http://localhost:4000
- health check: http://localhost:4000/health

## Key entrypoints
- src/app.js: Express app setup + server + sockets
- src/routes/index.js: API versioning + route registry
- src/services/agent/orchestrationService.js: agent orchestration
- src/services/ai/geminiService.js: Gemini API wrapper
-- src/services/executionService.js: code execution (disabled)

## API prefix
All REST endpoints are prefixed by:
- /api/v1

Examples:
- /api/v1/auth/register
- /api/v1/projects
- /api/v1/ai/generate

## Notes
- Socket.io namespace uses /socket.io at the same host.
- For production, set CORS_ORIGIN to your frontend origin.
