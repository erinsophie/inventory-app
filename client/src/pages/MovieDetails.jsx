import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await fetch(`http://localhost:8080/api/movies/${id}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMovie(data);
        setError(null);
      } catch (error) {
        setError(error.message);
        setMovie([]);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex-1 text-yellow-400 text-lg p-10 flex flex-col gap-3">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p className="text-2xl">{movie.name}</p>
          <p>Price: £{movie.price}</p>
          <p>Catgeory: {movie.category}</p>
          <p>Number in stock: {movie.numberInStock}</p>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
