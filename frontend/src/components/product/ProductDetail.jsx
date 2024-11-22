import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartService from '../../service/CartService';
import ProductService from '../../service/ProductService';
import RelatedProduct from './RelatedProduct';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addingToCart, setAddingToCart] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await ProductService.getId(id);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                setError('Product not found');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const addToCart = async () => {
        setAddingToCart(true); // Disable button while adding to cart
        try {
            await CartService.addToCart(product.id, 1);
            toast.success('Product added to cart successfully!', { autoClose: 3000 });
        } catch (error) {
            toast.error('Failed to add product to cart!', { autoClose: 3000 });
        }
        setAddingToCart(false); // Re-enable button after the action
    };

    if (loading) return <div className="text-center text-lg">Loading...</div>;
    if (error) return <div className="text-center text-lg text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-6 bg-white mt-16 rounded-lg shadow-xl flex flex-col md:flex-row space-x-4">
            {/* Product Image and Info */}
            <div className="flex-1 flex justify-center items-center">
                <div className="w-full max-w-sm">
                    <img
                        src={`http://localhost:8000/api/product/${product.id}/image`}
                        alt={product.alt || product.name} // Improved alt text for accessibility
                        className="w-full h-64 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </div>

            {/* Product Details */}
            <div className="flex-1 mt-6 md:mt-0">
                <h1 className="text-4xl font-semibold text-gray-800 mb-4">{product.name}</h1>
                <div className="mb-6">
                    <p className="text-lg font-semibold text-pink-500 mb-2">Price: ${product.pricesale || product.pricebuy}</p>
                    <p className="text-gray-700 mb-4">{product.content || product.alt}</p>
                    <button
                        className="bg-pink-500 text-white font-bold py-2 px-6 rounded-full hover:bg-pink-600 transition-colors duration-200"
                        onClick={addToCart}
                        disabled={addingToCart}
                    >
                        {addingToCart ? 'Adding to Cart...' : 'Add to Cart'}
                    </button>
                </div>

                {/* Customer Reviews Section */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Customer Reviews</h2>
                    <div className="flex items-center mb-4">
                        <span className="text-yellow-500">★★★★★</span>
                        <span className="text-gray-600 ml-2">(20 reviews)</span>
                    </div>

                    {/* Review Submission */}
                    <div className="border-t pt-4">
                        <h3 className="font-semibold text-gray-800">Leave a Review:</h3>
                        <textarea
                            className="border border-gray-300 rounded-lg w-full p-3 mt-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            rows="4"
                            placeholder="Write your review here..."
                        />
                        <button className="bg-pink-500 text-white font-bold py-2 px-6 rounded-full hover:bg-pink-600 mt-2">
                            Submit Review
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            <div className="flex-1 mt-8 md:ml-8">
                <RelatedProduct productId={product.id} />
            </div>

            <ToastContainer />
        </div>
    );
};

export default ProductDetail;
