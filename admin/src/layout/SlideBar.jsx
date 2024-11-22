import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SlideBar = () => {
    const [openMenus, setOpenMenus] = useState({ Products: true });

    const toggleMenu = (menuName) => {
        setOpenMenus((prev) => ({
            ...prev,
            [menuName]: !prev[menuName]
        }));
    };

    return (
        <div className="bg-gray-800 text-white w-64 h-screen p-4 shadow-md">
            <div className="text-2xl font-bold mb-6 text-center">Admin Dashboard</div>

            <div className="mb-4">
                <div className="text-gray-400 mb-2">Navigation</div>
                <div className="flex flex-col">
                    <div>
                        <button
                            onClick={() => toggleMenu('Products')}
                            className="flex items-center mb-2 p-2 rounded hover:bg-gray-700 transition duration-200 w-full text-left"
                        >
                            <i className="fas fa-box mr-2"></i> Products
                            <i className={`fas fa-chevron-down ml-auto transition-transform duration-200 ${openMenus['Products'] ? 'transform rotate-180' : ''}`}></i>
                        </button>
                        {openMenus['Products'] && (
                            <ul className="pl-6">
                                <li>
                                    <Link to="/admin/productcard" className="flex items-center mb-2 p-2 rounded hover:bg-gray-700 transition duration-200">
                                        <i className="fas fa-box mr-2"></i> Product
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/productimage" className="flex items-center mb-2 p-2 rounded hover:bg-gray-700 transition duration-200">
                                        <i className="fas fa-images mr-2"></i> Product Images
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/product_sale" className="flex items-center mb-2 p-2 rounded hover:bg-gray-700 transition duration-200">
                                        <i className="fas fa-tags mr-2"></i> Product Sale
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/product_store" className="flex items-center mb-2 p-2 rounded hover:bg-gray-700 transition duration-200">
                                        <i className="fas fa-store mr-2"></i> Product Store
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/product_store/trash" className="flex items-center mb-2 p-2 rounded hover:bg-gray-700 transition duration-200">
                                        <i className="fas fa-box mr-2"></i> Product Store Trash
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/product/trash" className="flex items-center mb-2 p-2 rounded hover:bg-gray-700 transition duration-200">
                                        <i className="fas fa-box mr-2"></i> Product Trash
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/product_sale/trash" className="flex items-center mb-2 p-2 rounded hover:bg-gray-700 transition duration-200">
                                        <i className="fas fa-box mr-2"></i> Product Sale Trash
                                    </Link>
                                </li>

                            </ul>
                        )}
                    </div>

                    {[
                        { name: 'Dashboard', path: '/admin/dashboard', icon: 'fas fa-tachometer-alt' },
                        { name: 'Banner', path: '/admin/banner', icon: 'fas fa-image' },
                        { name: 'Brand', path: '/admin/brand', icon: 'fas fa-tag' },
                        { name: 'Categories', path: '/admin/category', icon: 'fas fa-th-list' },
                        { name: 'Configuration', path: '/admin/config', icon: 'fas fa-cog' },
                        { name: 'Contact', path: '/admin/contact', icon: 'fas fa-envelope' },
                        { name: 'Menu', path: '/admin/menu', icon: 'fas fa-bars' },
                        { name: 'Orders', path: '/admin/order', icon: 'fas fa-shopping-cart' },
                        { name: 'Order Details', path: '/admin/order_detail', icon: 'fas fa-file-alt' },
                        { name: 'Posts', path: '/admin/post', icon: 'fas fa-pencil-alt' },
                        { name: 'Topics', path: '/admin/topic', icon: 'fas fa-comment' },
                        { name: 'Users', path: '/admin/user', icon: 'fas fa-users' }
                    ].map((item) => (
                        <div key={item.name}>
                            <button
                                onClick={() => toggleMenu(item.name)}
                                className="flex items-center mb-2 p-2 rounded hover:bg-gray-700 transition duration-200 w-full text-left"
                            >
                                <i className={`${item.icon} mr-2`}></i> {item.name}
                                <i className={`fas fa-chevron-down ml-auto transition-transform duration-200 ${openMenus[item.name] ? 'transform rotate-180' : ''}`}></i>
                            </button>
                            {openMenus[item.name] && (
                                <ul className="pl-6">
                                    <li>
                                        <Link to={item.path} className="flex items-center mb-2 p-2 rounded hover:bg-gray-700 transition duration-200">
                                            <i className="fas fa-folder-open mr-2"></i> {item.name}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={`${item.path}/trash`} className="flex items-center mb-2 p-2 rounded hover:bg-gray-700 transition duration-200">
                                            <i className="fas fa-trash-alt mr-2"></i> Trash
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SlideBar;
