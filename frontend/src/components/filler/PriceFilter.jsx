import React from 'react';

const PriceFilter = ({ priceMin, priceMax, setPriceMin, setPriceMax, handleFilterSubmit }) => {
    return (
        <form onSubmit={handleFilterSubmit} className="flex items-center ml-2">
            <input
                type="number"
                placeholder="Min"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                className="border rounded-l px-2 py-1 focus:outline-none"
            />
            <span className="mx-2">-</span>
            <input
                type="number"
                placeholder="Max"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="border rounded-r px-2 py-1 focus:outline-none"
            />
            <button type="submit" className="bg-pink-500 text-white px-2 py-1 rounded ml-2 hover:bg-pink-600 transition-all duration-300">
                Apply
            </button>
        </form>
    );
};

export default PriceFilter;
