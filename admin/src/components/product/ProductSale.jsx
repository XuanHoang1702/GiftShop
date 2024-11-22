import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import ProductSaleService from '../../Service/ProductSaleService';

const ProductSale = () => {
    const [productSales, setProductSales] = useState([]);
    const [formData, setFormData] = useState({
        product_id: 0,
        pricesale: '',
        datebegin: '',
        dateend: '',
        created_by: 1,
        updated_by: 1,
        status: 1,
    });

    useEffect(() => {
        const fetchProductSales = async () => {
            try {
                const result = await ProductSaleService.getList();
                if (result && Array.isArray(result)) {
                    setProductSales(result); 
                } else {
                    console.error('Data is not an array or is empty:', result);
                }
            } catch (error) {
                console.error('Failed to fetch product sales:', error);
            }
        };
        fetchProductSales();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ProductSaleService.addProductSale(formData); 
            alert('Product sale added successfully');
            const result = await ProductSaleService.getList();
            if (result && Array.isArray(result)) {
                setProductSales(result);
            }
            setFormData({
                product_id: 0,
                pricesale: '',
                datebegin: '',
                dateend: '',
                created_by: 1,
                updated_by: 1,
                status: 1,
            }); 
        } catch (error) {
            console.error('Failed to add product sale:', error);
        }
    };

    const handlePutTrash = async (id) => {
        try {
            const response = await ProductSaleService.putTrash(id);
            if (response) {
                toast.success('Product sale put trash successfully');
                setProductSales(productSales.filter((sale) => sale.id !== id));
            }
        } catch (error) {
            console.error('Failed to put trash product sale:', error);
            toast.error('Failed to put trash product sale');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <ToastContainer/>
            <h1 className="text-2xl font-bold mb-4 text-center">Product Sales Management</h1>
            <form className="border p-4 rounded bg-gray-100 mb-4" onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold mb-4">Add Product Sale</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product_id">
                            Product ID
                        </label>
                        <input
                            id="product_id"
                            name="product_id" 
                            type="number"
                            value={formData.product_id} 
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pricesale">
                            Sale Price
                        </label>
                        <input
                            id="pricesale"
                            name="pricesale"
                            type="number"
                            step="0.01"
                            value={formData.pricesale}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="datebegin">
                            Start Date
                        </label>
                        <input
                            id="datebegin"
                            name="datebegin"
                            type="datetime-local" 
                            value={formData.datebegin}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateend">
                            End Date
                        </label>
                        <input
                            id="dateend"
                            name="dateend"
                            type="datetime-local" 
                            value={formData.dateend}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                </div>
                <button
                    type="submit" 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Add Product Sale
                </button>
            </form>
            <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
                <table className="min-w-full bg-white mb-8">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-center">ID</th>
                            <th className="py-2 px-4 border-b text-center">Product ID</th>
                            <th className="py-2 px-4 border-b text-center">Sale Price</th>
                            <th className="py-2 px-4 border-b text-center">Start Date</th>
                            <th className="py-2 px-4 border-b text-center">End Date</th>
                            <th className="py-2 px-4 border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(productSales) && productSales.length > 0 ? (
                            productSales.map((sale) => (
                                <tr key={sale.id}>
                                    <td className="py-2 px-4 border-b text-center">{sale.id}</td>
                                    <td className="py-2 px-4 border-b text-center">{sale.product_id}</td>
                                    <td className="py-2 px-4 border-b text-center">{sale.pricesale}</td>
                                    <td className="py-2 px-4 border-b text-center">{new Date(sale.datebegin).toLocaleString()}</td>
                                    <td className="py-2 px-4 border-b text-center">{new Date(sale.dateend).toLocaleString()}</td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                                        <button
                                            onClick={() => handlePutTrash(sale.id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                        >
                                            Put trash
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-2 px-4 border-b text-center">No products available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductSale;
