import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../RootLayout/RootLayout';
import Home from '../Pages/Home/Home';
import About from '../Pages/About/About';
import ForTrainees from '../Pages/ForTrainees/ForTrainees';
import ForOrganizations from '../Pages/ForOrganizations/ForOrganizations';
import LeadershipTraining from '../Pages/LeadershipTraining/LeadershipTraining';
import News from '../Pages/News/News';
import Contact from '../Pages/Contact/Contact';
import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Error404 from '../Pages/Error/Error404';
import PrivateRoute from '../Utils/PrivateRoute';
// import axios from 'axios';

const Router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/about',
        Component: About,
      },
      {
        path: '/for-trainees',
        Component: ForTrainees,
      },
      {
        path: '/for-organizations',
        Component: ForOrganizations,
      },
      {
        path: '/leadership-training',
        Component: LeadershipTraining,
      },
      {
        path: '/news',
        Component: News,
      },
      {
        path: '/contact',
        Component: Contact,
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/register',
        Component: Register,
      },
      {
        path: '/dashboard',
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default Router;