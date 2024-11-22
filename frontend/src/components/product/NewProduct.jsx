import React, { useEffect, useState } from 'react';
import ProductService from '../../service/ProductService';
import ProductCard from './ProductCard';

const NewProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadProducts = async () => {
        try {
            const response = await ProductService.getList();
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">NEW PRODUCTS</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <ProductCard
                            key={index}
                            product={{
                                id: product.id,
                                name: product.name,
                                alt: product.description,
                                pricebuy: product.pricebuy
                            }}
                            viewMode='grid'
                        />
                    ))
                ) : (
                    <p className="text-center">No products available.</p>
                )}
            </div>
            
            <div className="text-center mt-8">
                <button 
                    onClick={() => loadProducts()} 
                    className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-2 rounded-full hover:bg-gradient-to-l transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                    View All Gifts
                </button>
            </div>
        </div>
    );
};

export default NewProduct;
