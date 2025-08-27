// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { RouterProvider } from 'react-router-dom'
// import router from './routers/router.jsx'
// import 'flowbite';
// import AuthProvider from './contects/AuthProvider';


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <AuthProvider>
//     <RouterProvider router={router} />
//     </AuthProvider>
//   </StrictMode>
// )
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RouterProvider } from 'react-router-dom';
import router from './routers/router.jsx';
import 'flowbite';
import AuthProvider from './contects/AuthProvider';
import { CartProvider } from './pages/CartContext.jsx'; // ✅ Import CartProvider

// ✅ Import ToastContainer from react-toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-right" autoClose={2000} theme="colored" />
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
