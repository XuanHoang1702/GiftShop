import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Login from './auth/Login';
import Register from './auth/Register';
import ProductByBrand from './components/brand/ProductByBrand';
import ProductByCategory from './components/category/ProductByCategory';
import ProductDetail from './components/product/ProductDetail';
import './index.css';
import ContactUs from './layout/ContactUs';
import Testimonial from './layout/Testimonial';
import WhyUs from './layout/WhyUs';
import Cart from './page/Cart';
import Checkout from './page/Checkout';
import Home from './page/Home';
import Profile from './page/Profile';
import Shop from './page/Shop';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'shop',
        element: <Shop />
      },
      {
        path: 'why_us',
        element: <WhyUs/>
      },
      {
        path: 'testimional',
        element: <Testimonial/>
      },
      {
        path: 'contact_us',
        element: <ContactUs/>
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'product/:id',
        element: <ProductDetail />
      },
      {
        path: 'shop/category/:categoryId/product',
        element: <ProductByCategory />
      },
      {
        path: 'shop/brand/:brandId/product',
        element: <ProductByBrand />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'checkout',
        element: <Checkout />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
