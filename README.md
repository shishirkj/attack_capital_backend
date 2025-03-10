# Attack Capital Backend

A Node.js backend application built with Express and TypeScript for handling posts and user authentication.

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB
- JWT Authentication
- Zod Validation
- ESLint
- Swagger Documentation

## Project Structure

```
src/
├── config/         # Configuration files and environment variables
├── controllers/    # Request handlers
├── middleware/     # Express middlewares
├── models/        # MongoDB models
├── routes/        # API routes
├── services/      # Business logic
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── app.ts         # Application entry point
```

## Features

- User Authentication (Login/Signup)
- JWT-based Authorization
- Post Creation and Management
- Input Validation using Zod
- Error Handling Middleware
- API Documentation with Swagger
- Pagination Support

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/shishirkj/attack_capital_backend.git
cd attack_capital_backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### Development

Run the development server:

```bash
npm run dev
```

### Production Build

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

## API Documentation

Access the Swagger documentation at:

```
http://localhost:4000/api-docs
```

### API Endpoints

#### Authentication

- POST `/api/auth/signup` - Register a new user
- POST `/api/auth/login` - Login user

#### Posts

- GET `/api/posts` - Get all posts (paginated)
- POST `/api/posts/create` - Create a new post
- GET `/api/posts/:id` - Get post by ID
- GET `/api/posts/author` - Get posts by author

## Error Handling

The application uses a centralized error handling middleware that returns errors in the following format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [] // Additional error details (optional)
}
```

## Security

- Password hashing using bcrypt
- JWT token-based authentication
- HTTP-only cookies for token storage
- Input validation and sanitization
- CORS configuration
- Rate limiting (TODO)

## Development Choices

1. **TypeScript**: For type safety and better development experience
2. **MongoDB**: For flexible schema and scalability
3. **Zod**: For runtime type validation
4. **JWT**: For stateless authentication
5. **Express**: For robust routing and middleware support

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.
