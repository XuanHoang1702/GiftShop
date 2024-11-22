import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CategoryService from '../../service/CategoryService';
import BrandList from '../brand/BrandList';
import ProductCard from '../product/ProductCard';
import CategoryList from './CategoryList';

const ProductByCategory = () => {
    const { categoryId} = useParams();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [categoryName, setCategoryName] = useState('')
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await CategoryService.getProductsByCategoryId(categoryId);
                setProducts(response.data);
                setCategoryName(response.category);
            } catch (error) {
                setError('Failed to load products');
            }
        };
        fetchProducts();
    }, [categoryId]);

    return (
        <div>
            <CategoryList/>
            <BrandList/>
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">{categoryName}</h1>
                {error && <div className="text-red-500">{error}</div>}
                <div className="grid grid-cols-4 gap-6">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard key={product.id} product={product} viewMode='grid'/>
                        ))
                    ) : (
                        <p>Loading products...</p>
                    )}
                </div>
            </div>
        </div>
        
    );
};

export default ProductByCategory;
