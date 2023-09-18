import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="border-r border-yellow-300 flex flex-col min-h-screen p-8 pr-20 text-yellow-400 text-lg underline">
      <Link to="/">Home</Link>
      <Link to="/movies">Movies</Link>
      <Link to="/categories">Categories</Link>
    </div>
  );
}

export default Sidebar;
