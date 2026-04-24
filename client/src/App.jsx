import Sidebar from './components/Sidebar';
import Chatbox from './components/Chatbox';
import Credits from './pages/Credits';
import Community from './pages/Community';
import Login from './pages/Login';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from 'react-router';
import { AppContextProvider, useAppContext } from './context/AppContext';
import { Toaster } from 'react-hot-toast';

import './assets/prism.css';
import Loading from './pages/Loading';

function Layout() {
  const { pathname } = useLocation();
  const { user, loadingUser, navigate } = useAppContext();
  if (pathname === '/loading' || loadingUser) {
    return <Loading />;
  }
  if (!user) {
    navigate('/login');
  }

  return (
    <>
      <div className="flex h-screen w-screen">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}

const router = createBrowserRouter([
  {
    element: (
      <AppContextProvider>
        <Layout />
      </AppContextProvider>
    ),
    children: [
      {
        path: '/',
        element: <Chatbox />,
      },
      {
        path: '/credits',
        element: <Credits />,
      },
      {
        path: '/community',
        element: <Community />,
      },
    ],
  },
  {
    path: '/login',
    element: (
      <AppContextProvider>
        <Login />
      </AppContextProvider>
    ),
  },
  {
    path: '/loading',
    element: (
      <AppContextProvider>
        <Loading />
      </AppContextProvider>
    ),
  },
]);

function App() {
  return (
    <div className="dark:bg-gradient-to-b from-[#242125] to-[#000000] dark:text-white">
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
