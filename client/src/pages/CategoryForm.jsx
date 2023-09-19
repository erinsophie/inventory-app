import { useState } from "react";

function CategoryForm() {
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(newCategory);

  // add new category
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      setNewCategory("");
      setError(null);
    } catch (error) {
      setError(error.message);
      setNewCategory("");
    } finally {
      setLoading(false);
    }
  }

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex-1 text-yellow-400 text-lg p-10 flex flex-col gap-3">
      <h1 className="text-2xl">Input details for new category</h1>

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
            onChange={(e) => {
              setNewCategory({ name: e.target.value });
            }}
            className="bg-transparent border border-yellow-400"
          />

          <button type="submit" className="p-2 bg-yellow-400 text-black w-32">
            Add category
          </button>
        </form>
      )}
    </div>
  );
}

export default CategoryForm;
