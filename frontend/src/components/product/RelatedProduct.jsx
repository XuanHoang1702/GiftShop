import React, { useEffect, useState } from 'react';
import Related from '../../service/Realated';
import ProductCard from '../product/ProductCard';
const RelatedProduct = ({ productId }) => {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const response = await Related.getList(productId);
                setRelatedProducts(response);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching related products:', error);
                setLoading(false);
            }
        };
        fetchRelatedProducts();
    }, [productId]);

    if (loading) return <div>Loading related products...</div>;

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {relatedProducts.map((product, index) => (
                        <ProductCard
                            key={index}
                            product={{
                                id: product.id,
                                name: product.name,
                                alt: product.description,
                                pricebuy: product.pricebuy,
                            }}
                            viewMode='grid'
                        />
                    ))}
            </div>
        </div>
    );
};

export default RelatedProduct;
