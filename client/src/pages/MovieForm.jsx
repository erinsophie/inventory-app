import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MovieForm() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [newMovie, setNewMovie] = useState({
    name: "",
    price: "",
    category: "",
    numberInStock: "",
  });

  function resetForm() {
    setNewMovie({
      name: "",
      price: "",
      category: "",
      numberInStock: "",
    });
  }

  // fetch all categories
  useEffect(() => {
    async function getCategories() {
      try {
        let response = await fetch("http://localhost:8080/api/categories");

        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        let data = await response.json();
        setCategories(data);
        // populate category with default category to avoid errors
        setNewMovie((prevMovie) => ({
          ...prevMovie,
          category: data[0]._id,
        }));

        setError(null);
      } catch (error) {
        setError(error.message);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }

    getCategories();
  }, []);

  // load movie details if id is provided
  useEffect(() => {
    async function fetchMovie() {
      if (id) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/movies/${id}`
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setNewMovie(data);
          setError(null);
        } catch (error) {
          setError(error.message);
          setNewMovie(null);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchMovie();
  }, [id]);

  // add new movie
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const url = id
        ? `http://localhost:8080/api/movies/${id}`
        : "http://localhost:8080/api/movies";
      const method = id ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      navigate("/movies");
      resetForm();
      setError(null);
    } catch (error) {
      setError(error.message);
      resetForm();
    } finally {
      setLoading(false);
    }
  }

  if (error)
    return <p className="text-xl text-yellow-400">{`Error: ${error}`}</p>;

  return (
    <div className="flex-1 text-yellow-400 text-lg p-10 flex flex-col gap-3">
      <h1 className="text-2xl">Input details for new movie</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form
          className="border border-yellow-400 p-5 gap-3 flex flex-col"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name" className="pr-3">
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={newMovie.name}
            onChange={(e) => {
              setNewMovie({ ...newMovie, name: e.target.value });
            }}
            className="bg-transparent border border-yellow-400"
          />

          <label htmlFor="price" className="pr-3">
            Price:
          </label>
          <input
            id="price"
            type="number"
            value={newMovie.price}
            onChange={(e) => {
              setNewMovie({ ...newMovie, price: e.target.value });
            }}
            className="bg-transparent border border-yellow-400"
          />

          <label htmlFor="category" className="pr-3">
            Category:
          </label>
          <select
            id="category"
            value={newMovie.category}
            onChange={(e) => {
              setNewMovie({ ...newMovie, category: e.target.value });
            }}
            className="bg-transparent border border-yellow-400 p-1"
          >
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <label htmlFor="stock" className="pr-3">
            Number in stock:
          </label>
          <input
            id="stock"
            type="number"
            value={newMovie.numberInStock}
            onChange={(e) => {
              setNewMovie({ ...newMovie, numberInStock: e.target.value });
            }}
            className="bg-transparent border border-yellow-400"
          />

          <button type="submit" className="p-2 bg-yellow-400 text-black w-32">
            {id ? "Update movie" : "Add movie"}
          </button>
        </form>
      )}
    </div>
  );
}

export default MovieForm;
