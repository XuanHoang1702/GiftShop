import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductService from '../../Service/ProductService';

const ProductCart = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const fetchProducts = async (page) => {
        setLoading(true);
        try {
            const response = await ProductService.fetchProducts(page);
            setProducts(response.data.data);
            setTotalPages(response.data.last_page);
        } catch (error) {
            console.error("Error fetching products:", error);
            setError("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    const handlePutTrash = async (id) => {
        try {
            await ProductService.putTrash(id);
            toast.success('Product put trash successfully!');
            fetchProducts(currentPage);
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('An error occurred while deleting the product.');
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    if (loading) {
        return <div>Loading data...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-8">
            <ToastContainer/>
            <h1 className="text-3xl font-bold mb-6 text-center">Product List</h1>
            <Link to="/admin/addproduct" className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600 transition duration-200">
                <i className="fas fa-plus mr-2"></i> Add Product
            </Link>
            <div className="flex justify-end mb-4 mt-4">
                <input type="text" placeholder="Search products..." className="border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-r shadow-md hover:bg-blue-600 transition duration-200">
                    <i className="fas fa-search"></i>
                </button>
            </div>
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                    <th className="py-3 px-4 border-b text-left">Product ID</th>
                        <th className="py-3 px-4 border-b text-left">Product Name</th>
                        <th className="py-3 px-4 border-b text-left">Slug</th>
                        <th className="py-3 px-4 border-b text-left">Category ID</th>
                        <th className="py-3 px-4 border-b text-left">Brand ID</th>
                        <th className="py-3 px-4 border-b text-left">Content</th>
                        <th className="py-3 px-4 border-b text-left">Description</th>
                        <th className="py-3 px-4 border-b text-left"> Pricebuy</th>
                        <th className="py-3 px-4 border-b text-left">Status</th>
                        <th className="py-3 px-4 border-b text-left">Created at</th>
                        <th className="py-3 px-4 border-b text-left"> Updated at</th>
                        <th className="py-3 px-4 border-b text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id} className="hover:bg-gray-100 transition duration-200">
                            <td className="py-3 px-4 border-b text-center">{product.id}</td>
                            <td className="py-3 px-4 border-b">{product.name}</td>
                            <td className="py-3 px-4 border-b">{product.slug}</td>
                            <td className="py-3 px-4 border-b">{product.category_id}</td>
                            <td className="py-3 px-4 border-b">{product.brand_id}</td>
                            <td className="py-3 px-4 border-b">{product.content}</td>
                            <td className="py-3 px-4 border-b">{product.description}</td>
                            <td className="py-3 px-4 border-b">{product.pricebuy}</td>
                            <td className="py-3 px-4 border-b">{product.status}</td>
                            <td className="py-3 px-4 border-b">{product.created_at}</td>
                            <td className="py-3 px-4 border-b">{product.updated_at}</td>
                            <td className="py-3 px-4 border-b">
                                <Link to={`/admin/editproduct/${product.id}`} className="bg-blue-500 text-white px-2 py-1 rounded shadow-md hover:bg-blue-600 transition duration-200 mr-2">Edit</Link>
                                <button onClick={() => handlePutTrash(product.id)} 
                                    className="bg-red-500 text-white px-2 py-1 rounded shadow-md hover:bg-red-600 transition duration-200">
                                    Put trash
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-8">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-blue-500 text-white px-4 py-2 rounded shadow-md mr-2 disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-lg font-bold">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-blue-500 text-white px-4 py-2 rounded shadow-md ml-2 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductCart;
