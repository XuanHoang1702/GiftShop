import React from 'react';
import { Link } from 'react-router-dom';

const BrandCard = ({ brand }) => {
    return (
        <Link
            to={`/shop/brand/${brand.id}/product`}
            className="flex-none w-48 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
            aria-label={`View products from ${brand.label}`}
            title={`Click to view products by ${brand.label}`}
        >
            <div className="relative">
                <img
                    src={brand.src}
                    alt={brand.alt || brand.label}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-2 text-center text-white font-bold">
                    {brand.label}
                </div>
            </div>
        </Link>
    );
};

export default BrandCard;
