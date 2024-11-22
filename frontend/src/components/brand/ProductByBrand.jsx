import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BrandServeice from '../../service/BrandService';
import CategoryList from '../category/CategoryList';
import ProductCard from '../product/ProductCard';
import BrandList from './BrandList';
const ProductByBrand = () => {
    const { brandId} = useParams();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [brandName, setBrandName] = useState('')
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await BrandServeice.getProduct(brandId);
                setProducts(response.data);
                setBrandName(response.brand);
            } catch (error) {
                setError('Failed to load products');
            }
        };
        fetchProducts();
    }, [brandId]);

    return (
        <div>
            <CategoryList/>
            <BrandList/>
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">{brandName}</h1>
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

export default ProductByBrand;
