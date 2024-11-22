import React from 'react';
import { Link } from 'react-router-dom';

const SaleProduct = ({ product }) => {
    const discountPercentage = product.pricebuy
        ? Math.round(((product.pricebuy - product.pricesale) / product.pricebuy) * 100)
        : 0;

    return (
        <Link to={`/product/${product.id}`} className="bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition-shadow duration-300 relative">
            {discountPercentage > 0 && (
                <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    -{discountPercentage}%
                </span>
            )}
            <img
                src={`http://localhost:8000/api/product/${product.id}/image`}
                alt={product.alt}
                className="w-full h-40 object-contain mb-4 rounded"
            />
            
            <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">{product.name}</span>
                <span className="text-lg text-red-500 font-semibold">${product.pricesale}</span>
            </div>

            {product.pricebuy && (
                <span className="text-sm text-gray-500 line-through">${product.pricebuy}</span>
            )}
        </Link>
    );
};

export default SaleProduct;
