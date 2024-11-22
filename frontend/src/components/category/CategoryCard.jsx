import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
    return (
        <Link
            to={`/shop/category/${category.id}/product`}
            className="flex-none w-48 sm:w-60 md:w-72 lg:w-80 bg-pink-400 p-4 rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"
        >
            <img
                src={category.src}
                alt={category.alt}
                className="w-full h-48 object-cover rounded-lg transition-transform duration-300 ease-in-out"
                loading="lazy"
            />
            <div className="text-center mt-2 text-black font-bold">{category.label}</div>
        </Link>
    );
};

export default CategoryCard;
