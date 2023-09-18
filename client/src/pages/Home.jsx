function Home() {
  return (
    <div className="text-yellow-400 text-lg flex-1 p-10 flex flex-col gap-3">
      <h1 className="text-3xl">Movie Inventory 🎬</h1>
      <p>
        This is an inventory app for checking the stock of movies and their data
      </p>

      <div className='mt-5'>
        <h2 className='text-xl font-bold'>Overview</h2>
        <ul className='mt-3'>
          <li>Total movies:</li>
          <li>Total categories:</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
