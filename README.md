# AI Chatbot Application

This is a customized AI Chatbot application built using the MERN stack (MongoDB, Express, React, Node.js, TypeScript) and OpenAI's Gemini model. The chatbot stores, retrieves, and deletes user messages, offering secure interaction through advanced security features.

## Features

- **Customized Chatbot**: Leverages OpenAI's Gemini model for generating responses to user inputs.
- **Message Storage**: Each message is securely stored in a MongoDB database.
- **Message Retrieval & Deletion**: Users can retrieve and delete their chat history.
- **Security Features**:
  - **JWT Tokens**: Provides secure user authentication and session management.
  - **HTTP-Only Cookies**: Prevents client-side access to session cookies.
  - **Signed Cookies**: Adds an extra layer of security by signing cookies.
  - **Password Encryption**: Ensures passwords are encrypted using strong hashing algorithms.
  - **Middleware Chains**: Validates requests and handles them through multiple layers of middleware.

## Tech Stack

- **Frontend**: React
  - User-friendly interface for chatting with the AI bot.
  - Axios is used for making API requests.
- **Backend**: Node.js, Express
  - RESTful API for handling user interactions and communicating with the Gemini model.
  - JWT-based authentication and authorization.
- **Database**: MongoDB
  - Stores user messages and related data.
- **Authentication**: JSON Web Tokens (JWT), HTTP-Only Cookies
- **AI Model**: OpenAI Gemini model for chatbot responses.
- **Security**:
  - Passwords hashed and salted before storage.
  - Cookies are signed and HTTP-only to safeguard user data.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ai-chatbot.git
   cd ai-chatbot

2. Install backend dependencies:
    ```bash
    cd backend
    npm install
    
3. Install frontend dependencies:
    ```bash
    cd ../frontend
    npm install

4. Create an .env file in the server directory and add the following variables:
    ```bash
    MONGO_URI=<Your MongoDB connection string>
    JWT_SECRET=<Your JWT secret key>
    OPENAI_API_KEY=<Your OpenAI API key>

5. Start the development servers:
    - Backend server:
        ```bash
        cd backend
        npm run dev
    - Frontend server:
        ```bash
        cd ../frontend
        npm start
## Usage
- Sign up or log in to the application.
- Start chatting with the AI bot powered by the Gemini model.
- Your messages will be securely stored in the database.
- Retrieve or delete your chat history as needed.

## Security
- **JWT Authentication**: Users are issued JWT tokens upon login, stored in HTTP-only cookies to prevent XSS attacks.
- **Signed Cookies**: Protects the integrity of session cookies.
- **Password Encryption**: User passwords are securely hashed with bcrypt before storage.
