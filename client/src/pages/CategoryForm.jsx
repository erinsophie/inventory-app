import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function CategoryForm() {
  const { id } = useParams();
  const [newCategory, setNewCategory] = useState({ name: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // get category name if id is provided
  useEffect(() => {
    async function fetchCategory() {
      if (id) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/categories/${id}`);

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setNewCategory({ name: data.category });
          setError(null);
        } catch (error) {
          setError(error.message);
          setNewCategory({ name: '' });
        } finally {
          setLoading(false);
        }
      }
    }

    fetchCategory();
  }, [id]);

  // add new category or update existing one
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const url = id
        ? `${API_BASE_URL}/api/categories/${id}`
        : `${API_BASE_URL}/api/categories`;
      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      navigate('/categories');
      setNewCategory({ name: '' });
      setError(null);
    } catch (error) {
      setError(error.message);
      setNewCategory({ name: '' });
    } finally {
      setLoading(false);
    }
  }

  if (error)
    return <p className="text-xl text-yellow-400">{`Error: ${error}`}</p>;

  // update form
  function handleChange(event) {
    const { id, value } = event.target;
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      [id]: value,
    }));
  }

  

  return (
    <div className="flex-1 text-yellow-400 text-lg p-10 flex flex-col gap-3">
      <h1 className="text-2xl">Input details for category</h1>

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
            value={newCategory.name}
            onChange={handleChange}
            className="bg-transparent border border-yellow-400"
          />

          <button type="submit" className="p-2 bg-yellow-400 text-black w-40">
            {id ? 'Update category' : 'Add category'}
          </button>
        </form>
      )}
    </div>
  );
}

export default CategoryForm;
