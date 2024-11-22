import React, { useEffect, useState } from 'react';
import CategoryService from '../../service/CategoryService';
import CategoryCard from './CategoryCard';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await CategoryService.getList();
                setCategories(response);
            } catch (error) {
                setError('Failed to load categories');
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="p-6 bg-gray-50">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
                Categories
            </h1>
            <div className="flex overflow-x-auto space-x-6 p-4 bg-white scrollbar-hide">
                {error && <div className="text-red-500 text-center w-full">{error}</div>}
                {categories.length > 0 ? (
                    categories.map((category, index) => (
                        <CategoryCard
                            key={index}
                            category={{
                                src: `http://localhost:8000/api/category/${category.id}/image`,
                                alt: category.name,
                                label: category.name,
                                id: category.id,
                            }}
                        />
                    ))
                ) : (
                    <div className="text-center w-full">Loading categories...</div>
                )}
            </div>
        </div>
    );
};

export default CategoryList;
