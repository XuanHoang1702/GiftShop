import React from 'react';
import BrandList from '../components/brand/BrandList';
import CategoryList from '../components/category/CategoryList';
import AllProduct from '../components/product/AllProduct';

function Shop() {
    return (
        <div className="container mx-auto p-8">
            <div className="mb-8">
                <CategoryList />
            </div>
            <div className="mb-8">
                <BrandList />
            </div>
            <div>
                <AllProduct />
            </div>
        </div>
    );
}

export default Shop;
