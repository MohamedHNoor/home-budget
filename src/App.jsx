import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BudgetPage, Dashboard, Error, ExpensesPage } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// layouts
import Main, { mainLoader } from './layouts/main';

// loaders and actions
import { dashboardAction, dashboardLoader } from './pages/Dashboard';
import { logoutAction } from './actions/logout';
import { expensesAction, expensesLoader } from './pages/ExpensesPage';
import { budgetLoader, BudgetPageAction } from './pages/BudgetPage';

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
        path: 'expenses',
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <Error />,
      },
      {
        path: 'budget/:id',
        element: <BudgetPage />,
        loader: budgetLoader,
        action: BudgetPageAction,
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
