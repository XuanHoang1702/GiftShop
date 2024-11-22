import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product.id}`}>
            <div className="border border-gray-300 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    {product.pricebuy && (
                        <p className="text-gray-700 font-medium">{`$ ${product.pricebuy}`}</p>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
