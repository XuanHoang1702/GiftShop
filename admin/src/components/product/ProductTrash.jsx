import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductService from '../../Service/ProductService';

const ProductTrash = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await ProductService.getTrash();
            setProducts(response);
        } catch (error) {
            console.log("error");
        }
    };

    const handleDelete = async (id) => {
        try {
            await ProductService.deleteProduct(id);
            toast.success('product deleted successfully');
            fetchProducts();
        } catch (error) {
            toast.error('Error deleting product');
        }
    };

    const handleRestore = async (id) => {
        try {
            await ProductService.restore(id);
            fetchProducts();
            toast.success('product restored successfully');
        } catch (error) {
            toast.error('Error restoring product');
        }
    };

    return (
        <div className="container mx-auto py-4">
            <ToastContainer />
            <h2 className="text-2xl font-semibold mb-4">Product Trash</h2>
            <div className="overflow-y-auto max-h-80">
                <table className="min-w-full bg-white border-collapse">
                    <thead>
                        <tr>
                            {['ID', 'Name', 'Slug', 'Category Id', 'Brand Id',  'Content','Description', 'Pricebuy',  'Created at', 'Updated at', 'Status', 'Action'].map((header) => (
                                <th key={header} className="px-4 py-2 border-b text-left text-sm font-medium text-gray-900">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product.id}>
                                    <td className="py-2 px-4">{product.id}</td>
                                    <td className="py-2 px-4">{product.name}</td>
                                    <td className="py-2 px-4">{product.slug}</td>
                                    <td className="py-2 px-4">{product.category_id}</td>
                                    <td className="py-2 px-4">{product.brand_id}</td>
                                    <td className="py-2 px-4">{product.content}</td>
                                    <td className="py-2 px-4">{product.description}</td>
                                    <td className="py-2 px-4">{product.pricebuy}</td>
                                    <td className="py-2 px-4">$ {product.created_at}</td>
                                    <td className="py-2 px-4">{product.updated_at}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{product.status ? 'Active' : 'Inactive'}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">
                                        <button onClick={() => handleRestore(product.id)} className="text-green-500 hover:underline">Restore</button>
                                        <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:underline ml-2">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="px-4 py-2 border-b text-sm text-gray-900 text-center">No products found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductTrash;
