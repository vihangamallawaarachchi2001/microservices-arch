# review-service

[![Node.js Version](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

## Description
review-service is a modern backend API built with:
- **Express.js** 
- **MongoDB** database integration
- No authentication
- Winston/Morgan logging

## Features
- RESTful API endpoints
- Database integration
- Structured logging
- Environment variables
- Security headers (Helmet)
- CORS handling
- Cookie parsing
- Error handling middleware

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB server
- pnpm package manager

### Installation
```bash
# Navigate to project directory
cd review-service

# Install dependencies
pnpm install
```

### Configuration
Create a `.env` file with:
```env
PORT=3000
NODE_ENV=development
DB_URL=mongodb://localhost:27017/mydb

```

## Usage
```bash
# Start development server
pnpm start

# Production build 
pnpm build
```



## API Documentation
```
GET /health - Health check
GET /api/users - Get all users (protected)
GET /api/users/:id - Get user by ID
PUT /api/users/:id - Update user
DELETE /api/users/:id - Delete user
```

## Project Structure
```
src/
├── config/        # Database configuration
├── controllers/   # Request handlers
├── middleware/    # Authentication middleware
├── models/        # Database models
├── routes/        # API routes
├── services/      # Business logic
├── utils/         # Logger utilities
└── server.js  # Entry point
```

## Technologies
- Express.js

- Mongoose

- Winston/Morgan logging
- Helmet security
- CORS
- Cookie-parser
- Dotenv

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details