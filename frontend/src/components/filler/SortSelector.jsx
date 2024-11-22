import React from 'react';

const SortSelector = ({ sortOption, setSortOption }) => {
    return (
        <select 
            value={sortOption} 
            onChange={(e) => setSortOption(e.target.value)} 
            className="border rounded ml-2 px-2 py-1 focus:outline-none"
        >
            <option value="latest">Latest</option>
            <option value="highToLow">Price high to low</option>
            <option value="lowToHigh">Price low to high</option>
            <option value="bestSelling">Best Seller</option>
        </select>
    );
};

export default SortSelector;
