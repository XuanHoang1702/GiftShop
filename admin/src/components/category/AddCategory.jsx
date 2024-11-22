import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CategoryService from "../../Service/CategoryService";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    slug: '',
    thumbnail: null,
    thumbnailName: '',
    sort_order: 0,
    description: '',
    created_by: 1,
    updated_by: 1,
    status: 1,
    parent_id: 0
  });

  const fetchCategories = async () => {
    try {
      const data = await CategoryService.getList();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    try {
      if (formData.id) {
        await CategoryService.updateCategory(formData.id, formDataToSend);
        toast.success("Category updated successfully!");
      } else {
        await CategoryService.createCategory(formDataToSend);
        toast.success("Category created successfully!");
      }
      setFormData({
        id: null,
        name: '',
        slug: '',
        thumbnail: null,
        thumbnailName: '',
        sort_order: 0,
        description: '',
        created_by: 1,
        updated_by: 1,
        status: 1,
        parent_id: 0,
      });
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error?.response?.data || error.message || error);
      toast.error("Error saving category.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
      thumbnailName: type === 'file' ? files[0]?.name : prevData.thumbnailName,
    }));
  };

  const handlePutTrash = async (id) => {
      try {
        await CategoryService.putTrash(id);
        toast.success("Category put trash successfully!");
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error?.response?.data || error.message || error);
        toast.error("Error deleting category.");
      }
  };

  const handleEdit = (category) => {
    setFormData({
      id: category.id,
      name: category.name,
      slug: category.slug,
      thumbnail: null,
      thumbnailName: '',
      sort_order: category.sort_order,
      description: category.description,
      created_by: category.created_by,
      updated_by: category.updated_by,
      status: category.status,
      parent_id: category.parent_id,
    });
  };

  return (
    <div className="container mx-auto my-12">
      <ToastContainer />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-6 text-gray-700">
            {formData.id ? 'Edit Category' : 'Create New Category'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">Category Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-100"
                placeholder="Enter category name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">Category Slug</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-100"
                placeholder="Enter category slug"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">Parent Category</label>
              <select
                name="parent_id"
                value={formData.parent_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-100"
              >
                <option value="">Select category</option>
                <option value="1">Category 01</option>
                <option value="2">Category 02</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-100"
                placeholder="Type category description"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">Category Image</label>
              <input
                type="file"
                name="thumbnail"
                onChange={handleChange}
                className="w-full cursor-pointer px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-100"
                accept="image/*"
              />
              {formData.thumbnailName && (
                <span className="mt-2 text-sm text-gray-500">Selected File: {formData.thumbnailName}</span>
              )}
            </div>
            <button className="w-full py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700">
              {formData.id ? 'Update Category' : 'Create Category'}
            </button>
          </form>
        </div>

        {/* Categories List Container */}
        <div className="lg:col-span-2 p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-6 text-gray-700">Category List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 bg-white">
              <thead>
                <tr className="bg-gray-100">
                  {['Id', 'Name', 'Slug', 'Image', 'Parent ID', 'Sort Order', 'Description', 'Updated By', 'Created By', 'Updated At', 'Created At', 'Status', 'Action'].map((heading, index) => (
                    <th key={index} className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b text-sm text-gray-700">{category.id}</td>
                    <td className="py-2 px-4 border-b text-sm text-gray-700">{category.name}</td>
                    <td className="py-2 px-4 border-b text-sm text-gray-700">{category.slug}</td>
                    <td className="py-2 px-4 border-b">
                      <img src={`http://localhost:8000/api/category/${category.id}/image`} alt="" className="h-10 w-10 object-cover rounded-md"/>
                    </td>
                    <td className="py-2 px-4 border-b text-sm text-gray-700">{category.parent_id}</td>
                    <td className="py-2 px-4 border-b text-sm text-gray-700">{category.sort_order}</td>
                    <td className="py-2 px-4 border-b text-sm text-gray-700">{category.description}</td>
                    <td className="py-2 px-4 border-b text-sm text-gray-700">{category.updated_by}</td>
                    <td className="py-2 px-4 border-b text-sm text-gray-700">{category.created_by}</td>
                    <td className="py-2 px-4 border-b text-sm text-gray-700">{category.updated_at}</td>
                    <td className="py-2 px-4 border-b text-sm text-gray-700">{category.created_at}</td>
                    <td className="py-2 px-4 border-b text-sm text-gray-700">{category.status}</td>
                    <td className="py-2 px-4 border-b text-sm text-gray-700 flex space-x-2">
                      <button onClick={() => handleEdit(category)} className="px-4 py-3 text-blue-600 hover:underline">Edit</button>
                      <button onClick={() => handlePutTrash(category.id)} className="px-4 py-3 text-red-600 hover:underline">Put trash</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
