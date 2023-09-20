import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // fetch movie upon component mount
  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/movies/${id}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMovie(data);
        setError(null);
      } catch (error) {
        setError(error.message);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  // delete movie
  async function handleDelete() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/movies/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      navigate("/movies");
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (error)
    return <p className="text-xl text-yellow-400">{`Error: ${error}`}</p>;

  return (
    <div className="flex-1 text-yellow-400 text-lg p-10 flex flex-col">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-2xl">{movie.name}</p>
          <p>Price: £{movie.price}</p>
          <p>Catgeory: {movie.category.name}</p>
          <p>Number in stock: {movie.numberInStock}</p>

          <div className="flex gap-5">
            <button
              onClick={() => handleDelete()}
              className="bg-yellow-400 text-black w-32"
            >
              Delete movie
            </button>
            <button
              onClick={() => navigate(`/edit-movie/${id}`)}
              className="bg-yellow-400 text-black w-32"
            >
              Update movie
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
