import React, { useEffect, useState } from 'react';
import BrandService from '../../service/BrandService';
import BrandCard from './BrandCard';

const BrandList = () => {
    const [brands, setBrands] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await BrandService.getList();
                if (response) {
                    setBrands(response);
                } else {
                    setError('No brands available');
                }
            } catch (error) {
                setError('Failed to load brands. Please try again.');
            }
        };
        fetchBrands();
    }, []);

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Brands</h1>
            <style>
                {`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                `}
            </style>
            <div className="flex justify-center flex-wrap gap-6 p-4 bg-white scrollbar-hide">
                {error && <div className="text-red-500">{error}</div>}
                {brands.length > 0 ? (
                    brands.map((brand, index) => (
                        <BrandCard
                            key={index}
                            brand={{
                                src: `http://localhost:8000/api/brand/${brand.id}/image`,
                                alt: brand.name,
                                label: brand.name,
                                id: brand.id,
                            }}
                        />
                    ))
                ) : (
                    <p>Loading brands...</p>
                )}
            </div>
        </div>
    );
};

export default BrandList;
