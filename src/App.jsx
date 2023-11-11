import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Dashboard, Error } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// layouts
import Main, { mainLoader } from './layouts/main';

// loaders and actions
import { dashboardAction, dashboardLoader } from './pages/Dashboard';
import { logoutAction } from './actions/logout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: 'logout',
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
