import React, { useEffect, useState } from 'react';
import ProductSaleService from '../../service/ProductSaleService';
import SaleProduct from './SaleProduct';

const Sale = () => {
    const [saleProducts, setSaleProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await ProductSaleService.getList();
                setSaleProducts(response);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">SALE PRODUCTS</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {saleProducts.length > 0 ? (
                    saleProducts.map((saleProduct) => (
                        <SaleProduct
                            key={saleProduct.product.id}
                            product={{
                                id: saleProduct.product.id,
                                name: saleProduct.product.name,
                                pricesale: saleProduct.pricesale,
                                alt: saleProduct.product.description,
                                pricebuy: saleProduct.product.pricebuy
                            }}
                        />
                    ))
                ) : (
                    <p className="text-center col-span-full">No sale products available.</p>
                )}
            </div>
            <div className="text-center mt-8">
                <button className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition duration-300 shadow-lg">
                    View All Gifts
                </button>
            </div>
        </div>
    );
};

export default Sale;
