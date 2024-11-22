import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        category_id: 0,
        brand_id: 0,
        content: '',
        description: '',
        pricebuy: '',
        created_by: 1,
        updated_by: 1,
        status: 1,
        priceroot: 0.0,
        qty: 1,
        dateimport: '',
        thumbnail: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            thumbnail: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await axios.post('http://localhost:8000/api/product', formDataToSend, {
                headers: {
                    'Content-Type': 'form-data',
                },
            });
            toast.success('Product added successfully!', {
                autoClose: 3000,
            });
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axios.get('http://localhost:8000/api/category');
            setCategories(response.data);
        };

        const fetchBrands = async () => {
            const response = await axios.get('http://localhost:8000/api/brand');
            setBrands(response.data);
        };

        fetchCategories();
        fetchBrands();
    }, []);

    return (
        <div>
            <ToastContainer/>
            <div className="p-8 bg-gray-100">
                <div className="text-sm text-gray-500 mb-2">Products / Add product</div>
                <h1 className="text-2xl font-bold mb-4">Add product</h1>
                <div className="border-b mb-6"></div>
                <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
                    <div className="col-span-2 bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">Product information</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name <i className="fas fa-question-circle text-gray-400"></i></label>
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                placeholder="Shirt, t-shirts, etc." 
                                className="w-full border border-gray-300 rounded-lg p-2" 
                                required 
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                            <input 
                                type="text" 
                                name="slug" 
                                value={formData.slug} 
                                onChange={handleChange} 
                                placeholder="eg. shirt-new" 
                                className="w-full border border-gray-300 rounded-lg p-2" 
                                required 
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select 
                                value={formData.category_id} 
                                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })} 
                                className="w-full border border-gray-300 rounded-lg p-2"
                            >
                                <option value="">Select a category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                            <select 
                                value={formData.brand_id} 
                                onChange={(e) => setFormData({ ...formData, brand_id: e.target.value })} 
                                className="w-full border border-gray-300 rounded-lg p-2"
                            >
                                <option value="">Select a brand</option>
                                {brands.map(brand => (
                                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                            <textarea 
                                name="content"
value={formData.content} 
                                onChange={handleChange} 
                                placeholder="Content..." 
                                className="w-full border border-gray-300 rounded-lg p-2" 
                                required 
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                            <textarea 
                                name="description" 
                                value={formData.description} 
                                onChange={handleChange} 
                                placeholder="Description..." 
                                className="w-full border border-gray-300 rounded-lg p-2" 
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price Buy</label>
                            <input 
                                type="number" 
                                name="pricebuy" 
                                value={formData.pricebuy} 
                                onChange={handleChange} 
                                placeholder="Price Buy" 
                                className="w-full border border-gray-300 rounded-lg p-2" 
                                required 
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                            <input 
                                type="number" 
                                name="qty" 
                                value={formData.qty} 
                                onChange={handleChange} 
                                placeholder="Quantity" 
                                className="w-full border border-gray-300 rounded-lg p-2" 
                                required 
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date Import</label>
                            <input 
                                type="date" 
                                name="dateimport" 
                                value={formData.dateimport} 
                                onChange={handleChange} 
                                className="w-full border border-gray-300 rounded-lg p-2" 
                            />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">Pricing</h2>
<div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price Root</label>
                            <input 
                                type="number" 
                                name="priceroot" 
                                value={formData.priceroot} 
                                onChange={handleChange} 
                                placeholder="Price Root" 
                                className="w-full border border-gray-300 rounded-lg p-2" 
                                required 
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select 
                                name="status" 
                                value={formData.status} 
                                onChange={handleChange} 
                                className="w-full border border-gray-300 rounded-lg p-2" 
                            >
                                <option value={1}>Active</option>
                                <option value={0}>Inactive</option>
                            </select>

                            <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail</label>
                            <input 
                                type="file" 
                                name="thumbnail" 
                                onChange={handleFileChange} 
                                className="w-full border border-gray-300 rounded-lg p-2" 
                                required 
                            />
                        </div>
                        </div>
                        <div className="mb-4">
                            <button type="submit" className="bg-blue-600 text-white rounded-lg px-4 py-2">Add Product</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        
    );
};

export default AddProduct;    