import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductStoreService from '../../Service/ProductStoreService';

const ProductStore = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newProduct, setNewProduct] = useState({
        product_id: '',
        priceroot: '',
        qty: '',
        dateimport: '',
        status:1
    });

    const fetchProducts = async () => {
        try {
            const response = await ProductStoreService.getList();
            setProducts(response || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to load product list.');
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ProductStoreService.addStoreProduct(newProduct);
            console.log(response)
            toast.success('Product store added successfully!') 
            fetchProducts();
            setNewProduct({
                product_id: '',
                priceroot: '',
                qty: '',
                dateimport: '',
                status: 1
            });
        } catch (error) {
            console.error('Error adding product:', error);
            setError('Unable to add product.');
        }
    };

    const handlePutTrash = async (id) => {
        try {
            const response = await ProductStoreService.putTrash(id);
            if (response) {
                toast.success('Product store put trash successfully');
                fetchProducts();
            }
        } catch (error) {
            console.error('Failed to put trash product store:', error);
            toast.error('Failed to put trash product store');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading data...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <ToastContainer/>
            <h1 className="text-2xl font-bold mb-4">Product Inventory Management</h1>
            <form className="border p-4 rounded bg-gray-100 mb-4" onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold mb-4">Add Product to Inventory</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2" htmlFor="product_id">Product ID</label>
                        <input
                            type="text"
                            id="product_id"
                            name="product_id"
                            value={newProduct.product_id}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2" htmlFor="priceroot">Base Price</label>
                        <input
                            type="number"
                            id="priceroot"
                            name="priceroot"
                            value={newProduct.priceroot}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2" htmlFor="qty">Quantity</label>
                        <input
                            type="number"
                            id="qty"
                            name="qty"
                            value={newProduct.qty}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2" htmlFor="dateimport">Import Date</label>
                        <input
                            type="date"
                            id="dateimport"
                            name="dateimport"
                            value={newProduct.dateimport}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                >
                    Add Product
                </button>
            </form>

            <div className="overflow-auto max-h-96 shadow-md rounded-lg">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-200">
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
                                <tr key={index} className="hover:bg-gray-100 transition duration-200">
                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                    <td className="py-2 px-4 border-b">{product.product_id}</td>
                                    <td className="py-2 px-4 border-b">{product.priceroot}</td>
                                    <td className="py-2 px-4 border-b">{product.qty}</td>
                                    <td className="py-2 px-4 border-b">{product.dateimport}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={()=> handlePutTrash(product.id)}>Put trash</button>
                                    </td>
                                    <td className="py-2 px-4 border-b">{product.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    No products available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductStore;
