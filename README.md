# Movies API

The `movies-api` is a RESTful service that provides endpoints to manage a collection of movies. It supports basic CRUD (Create, Read, Update, Delete) operations. The API is containerized, and you can easily run it using Docker.

## Prerequisites

- Node.js version: `>=20.12.0` (in dev mode only).
- Docker or Docker Compose installed.

## Running the API

You have two options to start the API:

### Option 1: Using Docker Compose

1. Clone the repository.
2. Navigate to the project directory.
3. Run the following command:

   ```
   docker-compose up -d
   ```

### Option 2: Manually Build and Run Docker Image

1. Clone the repository.
2. Navigate to the project directory.
3. Build the Docker image:

   ```
   docker build -t movies-api .
   ```

4. Run the Docker container:

   ```
   docker run -d -p 3000:3000 -e PORT=3000 -e DATA_PATH=./db/db.json movies-api
   ```

The API will be accessible at http://localhost:3000.

## Running the API in development mode

To run the API in development mode, you can use the following command:

```
npm run start:dev
```

## Environment Variables

The application supports the following environment variables:

- PORT: The port on which the API will run (default: 3000).
- DATA_PATH: The path to the JSON file that stores the movie data (default: ./db/db.json).

You can create a .env file in the root of the project to override these default values.

Example .env file:

```
PORT=3000
DATA_PATH=./db/db.json
```

## API Documentation

The API comes with built-in Swagger documentation, available at:

```
http://localhost:<port>/api
```
