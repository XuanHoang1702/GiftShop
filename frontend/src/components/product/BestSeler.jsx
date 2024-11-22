import React, { useEffect, useState } from 'react';
import BestSellerService from '../../service/BestSalerService';
import BestSellerProduct from './BestSelerProduct';

const BestSeller = () => {
    const [bestSellerProducts, setBestSellerProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await BestSellerService.getList();
                setBestSellerProducts(response);
            } catch (error) {
                console.error("Error fetching best seller products:", error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    if (loading) {
        return <p className="text-center">Loading best seller products...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8">BEST SELLERS</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {bestSellerProducts.length > 0 ? (
                    bestSellerProducts.map((product) => (
                        <BestSellerProduct
                            key={product.id}
                            product={{
                                id: product.id,
                                name: product.name,
                                alt: product.description,
                                pricebuy: product.pricebuy
                            }}
                        />
                    ))
                ) : (
                    <p className="text-center">No best seller products available.</p>
                )}
            </div>
            <div className="text-center mt-8">
                <button 
                    className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition-all duration-300"
                >
                    View All Gifts
                </button>
            </div>
        </div>
    );
};

export default BestSeller;
