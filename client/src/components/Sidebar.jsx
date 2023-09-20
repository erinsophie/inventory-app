import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="flex flex-col gap-8 border-r border-yellow-300 flex flex-col min-h-screen p-8 pr-20 text-yellow-400 text-lg underline">
      <div className="flex flex-col">
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/categories">Categories</Link>
      </div>

      <div className="flex flex-col">
        <Link to="/add-movie">Add new movie</Link>
        <Link to="/add-category">Add new category</Link>
      </div>
    </div>
  );
}

export default Sidebar;
