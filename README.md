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

Example requests:

- Create a new movie:

```
curl -X 'POST' \
  'http://localhost:3000/api/v1/movies' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "genres": [
    "Fantasy",
    "Adventure"
  ],
  "title": "Harry Potter and the Philosophers Stone",
  "year": 2001,
  "runtime": 152,
  "director": "Chris Columbus",
  "actors": "Daniel Radcliffe, Rupert Grint, Emma Watson",
  "plot": "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family, and the evil force that haunts the magical world.",
  "posterUrl": "https://example.com/harry_potter_poster.jpg"
}'

```

- List movies:

```
curl -X 'GET' \
  'http://localhost:3000/api/v1/movies?duration=100&genres=Fantasy&genres=Adventure' \
  -H 'accept: application/json'
```

Duplicate genres query param to get movies that contain at least one of the specified genres.

## Tests

Run unit tests using the following command:

```
npm run test
```

Run e2e test using the following command:

```
npm run test:e2e
```
