import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    // fetch all movies
    async function getMovies() {
      try {
        let response = await fetch(`${API_BASE_URL}/api/movies`);

        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        let data = await response.json();
        setMovies(data);
        setError(null);
      } catch (error) {
        setError(error.message);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }

    getMovies();
  }, []);

  if (error)
    return <p className="text-xl text-yellow-400">{`Error: ${error}`}</p>;

  return (
    <div className="flex-1 text-yellow-400 text-lg p-10 flex flex-col gap-3">
      <h1 className="text-2xl">All movies</h1>
      <p>A-Z</p>

      <div className="flex flex-col gap-5">
        {loading ? (
          <p>Loading...</p>
        ) : movies.length === 0 ? (
          <p>No movies</p>
        ) : (
          <ul className="list-dist">
            {movies.map((movie) => (
              <li key={movie._id} className="underline">
                <Link to={`/movies/${movie._id}`}>{movie.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Movies;
