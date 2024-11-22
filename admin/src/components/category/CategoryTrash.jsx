import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CategoryService from '../../Service/CategoryService';

const CategoryTrash = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await CategoryService.getTrash();
            setCategories(response);
        } catch (error) {
            console.log("error");
        }
    };

    const handleDelete = async (id) => {
        try {
            await CategoryService.deleteCategory(id);
            toast.success('category deleted successfully');
            fetchCategories();
        } catch (error) {
            toast.error('Error deleting category');
        }
    };

    const handleRestore = async (id) => {
        try {
            await CategoryService.restore(id);
            toast.success('category restored successfully');
            fetchCategories();
        } catch (error) {
            toast.error('Error restoring category');
        }
    };

    return (
        <div className="container mx-auto py-4">
            <ToastContainer />
            <h2 className="text-2xl font-semibold mb-4">Category Trash</h2>
            <div className="overflow-y-auto max-h-80">
                <table className="min-w-full bg-white border-collapse">
                    <thead>
                        <tr>
                            {['ID', 'Name', 'Slug', 'Image', 'ParentID', 'Sort Order',  'Description', 'Created By', 'Updated By', 'Status', 'Actions'].map((header) => (
                                <th key={header} className="px-4 py-2 border-b text-left text-sm font-medium text-gray-900">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <tr key={category.id}>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{category.id}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{category.name}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{category.slug}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">
                                        <img src={`http://localhost:8000/api/category/${category.id}/image`} alt={category.name} className="w-50 h-20"/>
                                    </td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{category.parent_id}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{category.sort_order}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{category.description}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{category.created_by}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{category.updated_by}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{category.status ? 'Active' : 'Inactive'}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">
                                        <button onClick={() => handleRestore(category.id)} className="text-green-500 hover:underline">Restore</button>
                                        <button onClick={() => handleDelete(category.id)} className="text-red-500 hover:underline ml-2">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="px-4 py-2 border-b text-sm text-gray-900 text-center">No categories found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryTrash;
