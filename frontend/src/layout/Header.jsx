import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaSearch, FaShoppingBag, FaUser } from 'react-icons/fa';
import MenuService from '../service/MenuService';

const Header = () => {
    const [userData, setUserData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [menus, setMenu] = useState([]);
    const [cartItemCount, setCartItemCount] = useState(0);
    const loggedInUser = JSON.parse(localStorage.getItem('userData'));

    useEffect(() => {
        if (loggedInUser) {
            setUserData(loggedInUser);
        }
        const fecthMenu = async () =>{
            const response = await MenuService.getHeader();
            setMenu(response);
        }
        fecthMenu();
    }, []);


    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = async (event) => {
        if (event.key === 'Enter' || event.type === 'click') {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8000/api/search_product`, {
                    params: { query: searchQuery }
                });
                setSearchResults(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <nav className="bg-white p-4 shadow-md flex justify-between items-center relative">
            <div className="flex items-center">
                <a href="/" className="text-2xl font-bold text-pink-500">GiftShop</a>
            </div>

            <div className="hidden md:flex space-x-6">
            {
                menus.map(menu => (
                    <a key={menu.id} href={menu.link} className="text-gray-700 hover:text-pink-500">
                        {menu.name.toUpperCase()}
                    </a>
                ))
            }
            </div>

            <div className="flex items-center relative w-full max-w-md">
                <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="px-4 py-2 border rounded-l-md w-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearch}
                />
                <button 
                    className="bg-pink-500 px-4 py-3 text-white rounded-r-md"
                    onClick={handleSearch}
                >
                    <FaSearch />
                </button>
            </div>
            {searchResults.length > 0 && (
                <div className="absolute top-full mt-2 right-96 w-1000 max-70 bg-white border border-pink-200 shadow-lg z-20 text-center">
                    {searchResults.slice(0, 5).map(product => (
                        <a 
                            key={product.id} 
                            href={`/product/${product.id}`} 
                            className="block p-2 text-gray-800 hover:bg-pink-100"
                        >
                            {product.name}
                        </a>
                    ))}
                    {searchResults.length > 5 && (
                        <div className="px-4 py-2 text-gray-600">More results available...</div>
                    )}
                </div>
            )}
            <div className="flex space-x-6 items-center">
                {userData ? (
                    <a href="/profile" className="text-gray-700 hover:text-pink-500 flex items-center">
                        <FaUser className="mr-2" /> {userData.user.name}
                    </a>
                ) : (
                    <a href="/login" className="text-gray-700 hover:text-pink-500 flex items-center">
                        <FaUser className="mr-2" /> Login
                    </a>
                )}
                <a href="/cart" className="text-gray-700 hover:text-pink-500 flex items-center relative">
                    <FaShoppingBag className="text-2xl" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">{cartItemCount}</span>
                </a>
            </div>
        </nav>
    );
};

export default Header;
