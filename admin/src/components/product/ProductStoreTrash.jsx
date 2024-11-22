import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductStoreService from '../../Service/ProductStoreService';

const ProductStoreTrash = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await ProductStoreService.getTrash();
            setProducts(response);
        } catch (error) {
            console.log("error");
        }
    };

    const handleDelete = async (id) => {
        try {
            await ProductStoreService.deleteProduct(id);
            toast.success('product deleted successfully');
            fetchProducts();
        } catch (error) {
            toast.error('Error deleting product');
        }
    };

    const handleRestore = async (id) => {
        try {
            await ProductStoreService.restore(id);
            fetchProducts();
            toast.success('product restored successfully');
        } catch (error) {
            toast.error('Error restoring product');
        }
    };

    return (
        <div className="container mx-auto py-4">
            <ToastContainer />
            <h2 className="text-2xl font-semibold mb-4">Product Store Trash</h2>
            <div className="overflow-y-auto max-h-80">
                <table className="min-w-full bg-white border-collapse">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-left">ID</th>
                                <th className="py-2 px-4 border-b text-left">Product ID</th>
                                <th className="py-2 px-4 border-b text-left">Base Price</th>
                                <th className="py-2 px-4 border-b text-left">Quantity</th>
                                <th className="py-2 px-4 border-b text-left">Import Date</th>
                                <th className="py-2 px-4 border-b text-left">Actions</th>
                                <th className="py-2 px-4 border-b text-left">Status</th>
                            </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <tr key={product.id}>
                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                    <td className="py-2 px-4 border-b">{product.product_id}</td>
                                    <td className="py-2 px-4 border-b">{product.priceroot}</td>
                                    <td className="py-2 px-4 border-b">{product.qty}</td>
                                    <td className="py-2 px-4 border-b">{product.dateimport}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={()=>handleRestore(product.id)}>Restore</button>
                                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={()=> handleDelete(product.id)}>Delete</button>
                                    </td>
                                    <td className="py-2 px-4 border-b">{product.status}</td>
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

export default ProductStoreTrash;
