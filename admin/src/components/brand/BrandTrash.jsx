import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BrandService from '../../Service/BrandService';

const BrandTrash = () => {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const response = await BrandService.getTrash();
            setBrands(response);
        } catch (error) {
            console.log("error");
        }
    };

    const handleDelete = async (id) => {
        try {
            await BrandService.deleteBanner(id);
            toast.success('Brand deleted successfully');
            fetchBrands();
        } catch (error) {
            toast.error('Error deleting brand');
        }
    };

    const handleRestore = async (id) => {
        try {
            await BrandService.restore(id);
            toast.success('Brand restored successfully');
            fetchBrands();
        } catch (error) {
            toast.error('Error restoring brand');
        }
    };

    return (
        <div className="container mx-auto py-4">
            <ToastContainer />
            <h2 className="text-2xl font-semibold mb-4">Brand Trash</h2>
            <div className="overflow-y-auto max-h-80">
                <table className="min-w-full bg-white border-collapse">
                    <thead>
                        <tr>
                            {['ID', 'Name', 'Slug', 'Image', 'Position', 'Description', 'Created By', 'Updated By', 'Status', 'Actions'].map((header) => (
                                <th key={header} className="px-4 py-2 border-b text-left text-sm font-medium text-gray-900">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {brands.length > 0 ? (
                            brands.map((brand) => (
                                <tr key={brand.id}>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{brand.id}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{brand.name}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{brand.slug}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">
                                        <img src={`http://localhost:8000/api/brand/${brand.id}/image`} alt={brand.name} className="w-50 h-20"/>
                                    </td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{brand.sort_order}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{brand.description}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{brand.created_by}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{brand.updated_by}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{brand.status ? 'Active' : 'Inactive'}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">
                                        <button onClick={() => handleRestore(brand.id)} className="text-green-500 hover:underline">Restore</button>
                                        <button onClick={() => handleDelete(brand.id)} className="text-red-500 hover:underline ml-2">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="px-4 py-2 border-b text-sm text-gray-900 text-center">No banners found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BrandTrash;
