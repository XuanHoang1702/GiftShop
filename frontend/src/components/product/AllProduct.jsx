import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartService from '../../service/CartService';
import PriceService from '../../service/PriceService';
import ProductService from '../../service/ProductService';
import PriceFilter from '../filler/PriceFilter';
import SortSelector from '../filler/SortSelector';
import ProductCard from './ProductCard';

const AllProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(0);
    const [viewMode, setViewMode] = useState('grid');
    const [sortOption, setSortOption] = useState('latest');

    useEffect(() => {
        fetchProducts(currentPage, sortOption);
    }, [currentPage, sortOption]);

    const fetchProducts = async (page, sort) => {
        setLoading(true);
        try {
            const response = await ProductService.fetchProducts(page, sort);
            setProducts(response.data.data);
            setTotalPages(response.data.last_page);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchSort = async (page) => {
            try {
                let response;
                switch (sortOption) {
                    case 'highToLow':
                        response = await PriceService.getSortByPrice('desc', page);
                        setProducts(response.data);
                        break;
                    case 'lowToHigh':
                        response = await PriceService.getSortByPrice('asc', page);
                        setProducts(response.data);
                        break;
                    case 'latest':
                        response = await ProductService.getLastest(page);
                        setProducts(response.data);
                        break;
                    case 'bestSelling' :
                        response = await ProductService.getBestSeler(page);
                        setProducts(response.data);
                        console.log("Data: ", response.data)
                    break;
                    default:
                        fetchProducts(currentPage, sortOption);
                        break;
                }
            } catch (error) {
                console.error("Error fetching sorted products:", error);
            }
        };
        fetchSort(currentPage);
    }, [sortOption, currentPage]);

    const addToCart = async (id) => {
        try {
            const response = await CartService.addToCart(id, 1);
            if (response.data) {
                toast.success('Product added to cart successfully!', { autoClose: 3000 });
            }
        } catch (error) {
            toast.error('Failed to add product to cart!', { autoClose: 3000 });
        }
    };

    const fillProductByPrice = async (pricemin, pricemax) => {
        setLoading(true);
        try {
            const response = await PriceService.getProduct(pricemin, pricemax);
            setProducts(response);
            setTotalPages(1);
        } catch (error) {
            console.error("Error fetching products by price:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fillProductByPrice(priceMin, priceMax);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const toggleViewMode = () => {
        setViewMode(viewMode === 'grid' ? 'list' : 'grid');
    };

    if (loading) {
        return <p className="text-center">Loading products...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <ToastContainer />
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">ALL PRODUCTS</h1>
                <div className="p-2 border rounded-lg shadow-md flex items-center">
                    <button 
                        onClick={toggleViewMode} 
                        className="bg-pink-500 text-white px-2 py-1 rounded ml-2 hover:bg-pink-600 transition-all duration-300"
                    >
                        {viewMode === 'grid' ? 'Switch to List View' : 'Switch to Grid View'}
                    </button>
                    <PriceFilter 
                        priceMin={priceMin}
                        priceMax={priceMax}
                        setPriceMin={setPriceMin}
                        setPriceMax={setPriceMax}
                        handleFilterSubmit={handleFilterSubmit}
                    />
                    <SortSelector 
                        sortOption={sortOption}
                        setSortOption={setSortOption}
                    />
                </div>
            </div>

            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'} gap-4`}>
                {viewMode === 'list' ? (
                    <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <div key={product.id} className="border p-4 rounded shadow-md flex justify-between items-center">
                                    <ProductCard
                                        product={{
                                            id: product.id,
                                            name: product.name,
                                            alt: product.description,
                                            pricebuy: product.pricebuy,
                                        }}
                                        viewMode={viewMode}
                                    />
                                    <button 
                                        onClick={() => addToCart(product.id)} 
                                        className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition-all duration-300 mt-2"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No products available.</p>
                        )}
                    </div>
                ) : (
                    products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={{
                                id: product.id,
                                name: product.name,
                                alt: product.description,
                                pricebuy: product.pricebuy,
                            }}
                            viewMode={viewMode}
                        />
                    ))
                )}
            </div>

            <div className="flex justify-center mt-8">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-pink-500 text-white px-4 py-2 rounded mr-2 disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-lg font-bold">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-pink-500 text-white px-4 py-2 rounded ml-2 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllProduct;
