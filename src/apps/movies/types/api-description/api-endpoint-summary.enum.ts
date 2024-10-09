export enum ApiEndpointDescription {
  create_movie = 'Add a new movie with details including genres, title, year, runtime, director, actors, plot, and posterUrl.',
  list_movies = `Returns an array of movies based on optional duration and genres parameters.

1. If no parameters are provided, returns a single random movie.
2. If only the duration parameter is provided:
    - Returns a single random movie that has a runtime between <duration - 10> and <duration + 10>.

3. If only the genres parameter is provided:
    - Returns all movies that contain at least one of the specified genres.
    - Movies are ordered by the number of genres that match.
      Example: If the request is sent with genres = [Comedy, Fantasy, Crime], then the top hits are movies that have all three genres.
      Next, returns movies that have any two of these genres (e.g., [Comedy, Fantasy], [Comedy, Crime], [Fantasy, Crime]).
      Finally, returns movies that match only one of the genres (e.g., [Comedy only], [Fantasy only], [Crime only]).

4. If both duration and genres parameters are provided:
    - Returns the same result as for the genres parameter only.
    - Returns movies that contain at least one of the specified genres and have a runtime between <duration - 10> and <duration + 10>.`
}
