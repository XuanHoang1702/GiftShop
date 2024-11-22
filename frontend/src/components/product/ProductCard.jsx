import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, viewMode }) => {
    return (
        <Link
            to={`/product/${product.id}`}
            className={`bg-white p-4 rounded-lg relative transition-shadow duration-300 hover:shadow-xl ${
                viewMode === 'list' ? 'flex items-center space-x-4' : 'text-center'
            }`}
        >
            {viewMode === 'grid' && (
                <>
                    <div className="relative mb-4">
                        <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md z-10">
                            New
                        </span>
                        <img
                            src={`http://localhost:8000/api/product/${product.id}/image`}
                            alt={product.alt}
                            className="w-full h-40 object-contain transition-transform duration-300 transform hover:scale-105"
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-lg font-semibold mb-1">{product.name}</span>
                        <span className="text-lg text-red-500 font-bold">Price ${product.pricebuy}</span>
                    </div>
                </>
            )}
            {viewMode === 'list' && (
                <>
                    <div className="flex-shrink-0 overflow-hidden rounded-lg">
                        <img
                            src={`http://localhost:8000/api/product/${product.id}/image`}
                            alt={product.alt}
                            className="w-20 h-20 object-contain transition-transform duration-300 transform hover:scale-105"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-semibold">{product.name}</span>
                        <span className="text-lg text-red-500 font-bold">Price ${product.pricebuy}</span>
                    </div>
                </>
            )}
        </Link>
    );
};

export default ProductCard;
