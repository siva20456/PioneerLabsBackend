### PioneerLabsBackEnd

This Node.js backend project provides user registration, login functionality, data fetching with filtering options, and authentication using JWT. It also includes Swagger documentation for better understanding and usability.

#### Prerequisites

- Node.js installed on your machine
- MongoDB Atlas account or a local MongoDB instance
- Access to Infura for Ethereum account balance retrieval (optional)

#### Installation

1. Clone the repository:
   git clone https://github.com/siva20456/PioneerLabsBackend

2. Install dependencies:
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the project root directory.
   - Define the following environment variables:
     - `MONGODB_URI`: Connection URI for MongoDB database. = "mongodb+srv://siva2002ismart2002:1gcor0WfxhJjryWA@cluster0.jqbkgks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
     - `PORT`: PORT default 3005

#### Usage

1. Start the server:
   npm start
   ```

2. The server will start running on port 3005 by default.

#### Endpoints

- **POST /Register**: Register a new user with username, email, and password.
- **POST /login**: Authenticate user login with username and password.
- **GET /data**: Fetch data from a public API with filtering options for category and limit.
- **GET /restricted**: Restricted endpoint accessible only to authenticated users.

#### Swagger Documentation

- Access Swagger UI at `/docs` endpoint for interactive API documentation.

#### Note

- Make sure to set up proper environment variables before starting the server. LIKE THE PORT = 3005 AND MONGO_URL = "mongodb+srv://siva2002ismart2002:1gcor0WfxhJjryWA@cluster0.jqbkgks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
- Replace placeholders like (https://github.com/siva20456/PioneerLabsBackend) with actual values.

#### Author

- Marella Siva Shankar
