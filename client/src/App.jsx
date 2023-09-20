import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="flex bg-black">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default App;
