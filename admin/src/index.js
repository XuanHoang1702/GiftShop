import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ForgotPassword from './auth/FogotPassword';
import Login from './auth/Login';
import Banner from './components/banner/Banner';
import BannerTrash from './components/banner/BannerTrash';
import Brand from './components/brand/Brand';
import BrandTrash from './components/brand/BrandTrash';
import Card from './components/cart/Card';
import AddCategory from './components/category/AddCategory';
import CategoryTrash from './components/category/CategoryTrash';
import Config from './components/Config';
import ContactAdmin from './components/contact/ContactAdmin';
import ContactTrash from './components/contact/ContactTrash';
import Menu from './components/menu/Menu';
import MenuTrash from './components/menu/MenuTrash';
import Order from './components/order/Order';
import OrderDetail from './components/order/OrderDetail';
import Post from './components/post/Post';
import PostTrash from './components/post/PostTrash';
import AddProduct from './components/product/AddProduct';
import ProductCard from './components/product/ProductCard';
import ProductImage from './components/product/ProductImage';
import ProductSale from './components/product/ProductSale';
import ProductSaleTrash from './components/product/ProductSaleTrash';
import ProductStore from './components/product/ProductStore';
import ProductStoreTrash from './components/product/ProductStoreTrash';
import ProductTrash from './components/product/ProductTrash';
import Topic from './components/topic/Topic';
import TopicTrash from './components/topic/TopicTrash';
import UserAdmin from './components/user/UserAdmin';
import UserTrash from './components/user/UserTrash';
import './index.css';
import Dashboard from './layout/DashBoard';
import Admin from './scenes/Admin';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: 'forgot_password',
    element: <ForgotPassword/>
  },
  {
    path: '/admin',
    element: <Admin />,
    children: [
      {
        path: '',
        element: '',
        children: [
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'cart', element: <Card /> },
          { path: 'productcard', element: <ProductCard /> },
          { path: 'Addproduct', element: <AddProduct /> },
          { path: 'category', element: <AddCategory /> },
          { path: 'category/trash', element: <CategoryTrash/>},
          { path: 'contact', element: <ContactAdmin /> },
          { path: 'contact/trash', element: <ContactTrash /> },
          { path: 'config', element: <Config /> },
          { path: 'user', element: <UserAdmin /> },
          { path: 'user/trash', element: <UserTrash /> },
          { path: 'banner', element: <Banner /> },
          { path: 'banner/trash', element: <BannerTrash /> },
          { path: 'brand', element: <Brand /> },
          { path: 'brand/trash', element: <BrandTrash /> },
          { path: 'menu', element: <Menu /> },
          { path: 'menu/trash', element: <MenuTrash /> },
          { path: 'post', element: <Post /> },
          { path : 'post/trash', element : <PostTrash/> },
          { path: 'topic', element: <Topic /> },
          { path: 'topic/trash', element: <TopicTrash /> },
          { path: 'order', element: <Order /> },
          { path: 'order_detail', element: <OrderDetail /> },
          { path: 'productimage', element: <ProductImage /> },
          { path: 'product_sale', element: <ProductSale /> },
          { path: 'product_sale/trash', element: <ProductSaleTrash /> },
          { path: 'product_store', element: <ProductStore /> },
          { path: 'product_store/trash', element: <ProductStoreTrash /> },
          { path: 'product/trash', element: <ProductTrash /> },
        ]
      }
    ]
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
