import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartService from '../service/CartService';

const Cart = ({setCartItemCount}) => {
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchCartItems = async () => {
        try {
            const response = await CartService.fetchCartItems();
            setCartItems(response.data.data);
            console.log("lengh")
        } catch (error) {
            setError('Failed to fetch cart items. Please try again later.');
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const handleCheckboxChange = (id) => {
        setSelectedItems((prevSelectedItems) => ({
            ...prevSelectedItems,
            [id]: !prevSelectedItems[id]
        }));
    };

    useEffect(() => {
        const price = cartItems.reduce((acc, item) => {
            if (selectedItems[item.id]) {
                return acc + item.price * item.quantity;
            }
            return acc;
        }, 0);
        setTotalPrice(price);
    }, [cartItems, selectedItems]);

    const handleProceedToCheckout = () => {
        const itemsToCheckout = cartItems.filter(item => selectedItems[item.id]);
        if (itemsToCheckout.length > 0) {
            navigate('/checkout', { state: { selectedItems: itemsToCheckout } });
        } else {
            alert('Please select at least one item to proceed.');
        }
    };

    const handleRemoveItem = async (id) => {
        try {
            await CartService.removeCart(id);
            setCartItems(cartItems.filter(item => item.id !== id));
            toast.success('Item removed from cart successfully!');
            fetchCartItems();
        } catch (error) {
            toast.error('Failed to remove item from cart. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-6 bg-white mt-20 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-pink-500 mb-6">Shopping Cart</h1>
            <ToastContainer />
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {cartItems.length === 0 ? (
                <div className="text-center text-gray-600">Your cart is empty.</div>
            ) : (
                <div>
                    <div className="bg-gray-100 rounded-lg p-4 mb-4 overflow-y-auto max-h-[500px]">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center mb-6 border-b pb-4">
                                <input
                                    type="checkbox"
                                    checked={!!selectedItems[item.id]}
                                    onChange={() => handleCheckboxChange(item.id)}
                                    className="mr-6"
                                />
                                <img
                                    src={`http://localhost:8000/api/product/${item.product_id}/image`}
                                    alt={item.product_name}
                                    className="w-32 h-32 object-cover rounded-md shadow-md mr-6"
                                />
                                <div className="flex-grow">
                                    <h2 className="text-xl font-semibold text-gray-800">{item.product_name}</h2>
                                    <p className="text-gray-600">Price: ${item.price}</p>
                                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                                </div>
                                <button
                                    onClick={() => handleRemoveItem(item.cart_id)}
                                    className="text-red-500 hover:text-red-700 font-semibold"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center border-t pt-6">
                        <h2 className="text-xl font-semibold text-pink-500">Total Price: ${totalPrice}</h2>
                        <div>
                            <button
                                onClick={handleProceedToCheckout}
                                className="bg-red-500 text-white font-bold py-3 px-6 rounded hover:bg-red-600"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
