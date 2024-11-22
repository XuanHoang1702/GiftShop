import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductSaleService from '../../Service/ProductSaleService';

const ProductSaleTrash = () => {
    const [saleproducts, setSaleProducts] = useState([]);
    useEffect(() => {
        fetchSaleProducts();
    }, []);

    const fetchSaleProducts = async () => {
        try {
            const response = await ProductSaleService.getTrash();
            setSaleProducts(response);
        } catch (error) {
            console.log("error");
        }
    };

    const handleDelete = async (id) => {
        try {
            await ProductSaleService.deleteProductSale(id);
            toast.success('product deleted successfully');
            fetchSaleProducts();
        } catch (error) {
            toast.error('Error deleting product');
        }
    };

    const handleRestore = async (id) => {
        try {
            await ProductSaleService.restore(id);
            fetchSaleProducts();
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
                            {['ID', 'Product ID', 'Price sale', 'Date Begin', 'Date End',  'Created at', 'Updated at', 'Status', 'Action'].map((header) => (
                                <th key={header} className="px-4 py-2 border-b text-left text-sm font-medium text-gray-900">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {saleproducts.length > 0 ? (
                            saleproducts.map((saleproduct) => (
                                <tr key={saleproduct.id}>
                                    <td className="py-2 px-4">{saleproduct.id}</td>
                                    <td className="py-2 px-4">{saleproduct.product_id}</td>
                                    <td className="py-2 px-4">{saleproduct.pricesale}</td>
                                    <td className="py-2 px-4">{saleproduct.datebegin}</td>
                                    <td className="py-2 px-4">{saleproduct.dateend}</td>
                                    <td className="py-2 px-4">$ {saleproduct.created_at}</td>
                                    <td className="py-2 px-4">{saleproduct.updated_at}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{saleproduct.status ? 'Active' : 'Inactive'}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">
                                        <button onClick={() => handleRestore(saleproduct.id)} className="text-green-500 hover:underline">Restore</button>
                                        <button onClick={() => handleDelete(saleproduct.id)} className="text-red-500 hover:underline ml-2">Delete</button>
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

export default ProductSaleTrash;
