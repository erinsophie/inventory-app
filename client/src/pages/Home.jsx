import { useState, useEffect } from "react";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetch all movies
    async function getMovies() {
      try {
        let response = await fetch("http://localhost:8080/api/movies");

        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
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

  return (
    <div className="text-yellow-400 text-lg flex-1 p-10 flex flex-col gap-3">
      <h1 className="text-3xl">Movie Inventory 🎬</h1>
      <p>
        This is an inventory app for checking the stock of movies and their data
      </p>

      <div className="mt-5">
        <h2 className="text-xl font-bold">Overview</h2>
        <ul className="mt-3">
          <li>Total movies: {movies.length}</li>
          <li>Total categories:</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
