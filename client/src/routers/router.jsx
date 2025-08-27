import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from '../home/Home.jsx';
import Shop from '../shop/Shop.jsx';
import About from '../components/About.jsx';
import Blog from '../components/Blog.jsx';
import SingleBook from '../shop/SingleBook.jsx';
import Cart from "../pages/Cart.jsx";

import Checkout from "../pages/Checkout.jsx"; // ✅ New
import Payment from "../pages/Payment.jsx";   // ✅ New
import OrderConfirmation from "../pages/OrderConfirmation.jsx";
import MyOrders from '../pages/MyOrders.jsx';
 
// import MyOrders from '../pages/MyOrders';

import DashboardLayout from '../dashboard/DashboardLayout.jsx';
import Dashboard from '../dashboard/Dashboard.jsx';
import UploadBook from '../dashboard/UploadBook.jsx';
import ManageBooks from '../dashboard/ManageBooks.jsx';
import EditBooks from '../dashboard/EditBooks.jsx';
import Users from '../dashboard/Users.jsx';

import Signup from '../components/Signup.jsx';
import Login from '../components/Login.jsx';
import Logout from '../components/Logout.jsx';
import PrivateRoute from '../PrivateRoute/PrivateRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/shop', element: <Shop /> },
      { path: '/about', element: <About /> },
      { path: '/blog', element: <Blog /> },
      { path: '/cart', element: <Cart /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/payment', element: <Payment /> },
      { path: '/confirm-order', element: <OrderConfirmation /> },
      { path: '/my-orders', element: <PrivateRoute><MyOrders /></PrivateRoute> },

      // { path: '/my-orders', element: <PrivateRoute><MyOrders /></PrivateRoute> },
      {
        path: '/book/:id',
        element: <SingleBook />,
        loader: ({ params }) => fetch(`http://localhost:5000/book/${params.id}`)
      }
    ]
  },
  {
    path: '/admin/dashboard',
    element: <DashboardLayout />,
    children: [
      { path: '/admin/dashboard', element: <PrivateRoute><Dashboard /></PrivateRoute> },
      { path: '/admin/dashboard/upload', element: <PrivateRoute><UploadBook /></PrivateRoute> },
      { path: '/admin/dashboard/manage', element: <PrivateRoute><ManageBooks /></PrivateRoute> },
      {
        path: '/admin/dashboard/edit-books/:id',
        element: <PrivateRoute><EditBooks /></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/book/${params.id}`)
      },
      { path: '/admin/dashboard/users', element: <PrivateRoute><Users /></PrivateRoute> }
    ]
  },
  { path: '/sign-up', element: <Signup /> },
  { path: '/login', element: <Login /> },
  { path: '/logout', element: <Logout /> }
]);

export default router;
