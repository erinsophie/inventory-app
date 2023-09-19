import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function CategoryDetails() {
  const { id } = useParams();
  const [moviesData, setMoviesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/categories/${id}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMoviesData(data);
        setError(null);
      } catch (error) {
        setError(error.message);
        setMoviesData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [id]);

  async function deleteCategory() {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/categories/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorMsg = await response.json();
        throw new Error(errorMsg.message);
      }

      navigate("/categories");
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (error) return <p className='text-xl text-yellow-400'>{`Error: ${error}`}</p>
  
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex-1 text-yellow-400 text-lg p-10 flex flex-col gap-3">
          <h1>All {moviesData.category} movies</h1>
          <p>A-Z</p>
          {moviesData.movies.length === 0 ? (
            <p>This category doesn&apos;t have any movies yet</p>
          ) : (
            <ul className="list-dist">
              {moviesData.movies.map((movie) => (
                <li key={movie._id} className="underline">
                  <Link to={`/movies/${movie._id}`}>{movie.name}</Link>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={() => deleteCategory()}
            className="bg-yellow-400 text-black w-32"
          >
            Delete category
          </button>
        </div>
      )}
    </div>
  );
}

export default CategoryDetails;
