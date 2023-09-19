import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetch all categories
    async function getCategories() {
      try {
        let response = await fetch("http://localhost:8080/api/categories");

        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        let data = await response.json();
        setCategories(data);
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

  if (error) return <p className='text-xl text-yellow-400'>{`Error: ${error}`}</p>

  return (
    <div className="flex-1 text-yellow-400 text-lg p-10 flex flex-col gap-3">
      <h1 className="text-2xl">All categories</h1>
      <p>A-Z</p>

      <div className="flex flex-col gap-5">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="list-dist">
            {categories.map((category) => (
              <li key={category._id} className="underline">
                <Link to={`/categories/${category._id}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Categories;
