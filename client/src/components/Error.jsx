import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="h-screen bg-black text-yellow-400 text-lg p-10">
      <p>Error: Page cannot be found</p>
      <Link to="/" className="underline">
        Back to home page
      </Link>
    </div>
  );
}

export default Error;
