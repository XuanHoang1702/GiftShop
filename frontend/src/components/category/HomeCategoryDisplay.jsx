import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryService from '../../service/CategoryService';
import ProductCard from './ProductCard';

const HomeCategoryDisplay = () => {
    const [categories, setCategories] = useState([]);
    const [isCategoriesVisible, setIsCategoriesVisible] = useState(true);

    useEffect(() => {
        const fetchCategoriesWithProducts = async () => {
            try {
                const categoryList = await CategoryService.getList();
                const categoryData = await Promise.all(
                    categoryList.map(async (category) => {
                        const productsResponse = await CategoryService.getProductsByCategoryId(category.id);
                        const products = productsResponse.data;
                        return {
                            ...category,
                            products: products.slice(0, 2),
                        };
                    })
                );
                setCategories(categoryData);
            } catch (error) {
                console.error('Error fetching categories or products:', error);
            }
        };

        fetchCategoriesWithProducts();
    }, []);

    const toggleCategoriesVisibility = () => {
        setIsCategoriesVisible(!isCategoriesVisible);
    };

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-md mt-5">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
                <button
                    onClick={toggleCategoriesVisibility}
                    className={`py-2 px-4 rounded-lg transition duration-300 ${
                        isCategoriesVisible ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                >
                    {isCategoriesVisible ? 'Hide Categories' : 'Show Categories'}
                </button>
            </div>
            {isCategoriesVisible && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-50">
                            <div className="border-b-2 border-gray-300 p-4 text-center">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h2>
                            </div>
                            <div className="p-4 flex flex-wrap justify-start gap-4">
                                {category.products.map((product) => (
                                    <div key={product.id} className="w-full transform hover:scale-105 transition-transform duration-300">
                                        <ProductCard
                                            product={{
                                                id: product.id,
                                                name: product.name,
                                                pricebuy: product.pricebuy,
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 text-center">
                                <Link
                                    to={`/shop/category/${category.id}/product`}
                                    className="inline-block bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 px-4 rounded-lg hover:bg-gradient-to-l transition duration-300"
                                >
                                    View More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomeCategoryDisplay;
