import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BrandService from '../../Service/BrandService';

const Brand = () => {
  const [brands, setBrands] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    slug: '',
    thumbnail: null,
    sort_order: 0,
    description: '',
    created_by: 1,
    updated_by: 1,
    status: 1,
  });

  const fetchBrands = async () => {
    try {
      const data = await BrandService.getList();
      setBrands(data);
    } catch (error) {
      toast.error('Error fetching brands');
      console.error('Error fetching brands:', error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const brandData = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== '') {
        brandData.append(key, formData[key]);
      }
    }
    try {
      if (formData.id) {
        await BrandService.updateBrand(formData.id, brandData);
        toast.success('Brand updated successfully!');
        fetchBrands();
      } else {
        await BrandService.createBrand(brandData);
        toast.success('Brand created successfully!');
        fetchBrands();
      }
      setFormData({
        id: null,
        name: '',
        slug: '',
        thumbnail: null,
        sort_order: 0,
        description: '',
        created_by: 1,
        updated_by: 1,
        status: 1,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(`Error: ${error?.response?.data?.message || error.message || 'Something went wrong'}`);
    }
  };
  

  const handlePutTrash = async (id) => {
    try {
        await BrandService.putTrash(id);
        toast.success('Banner put trash successfully');
        fetchBrands();
    } catch (error) {
        toast.error('Error deleting banner');
    }
  };

  const handleEdit = (brand) => {
    setFormData({
      id: brand.id,
      name: brand.name,
      slug: brand.slug,
      thumbnail: null,
      thumbnailName: '',
      sort_order: brand.sort_order,
      description: brand.description,
      created_by: brand.created_by,
      updated_by: brand.updated_by,
      status: brand.status,
      parent_id: brand.parent_id,
    });
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Add New Brand</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-600 font-semibold">Brand Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter brand name"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-600 font-semibold">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="Enter slug"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-600 font-semibold">Thumbnail</label>
          <input
            type="file"
            name="thumbnail"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-600 font-semibold">Sort Order</label>
          <input
            type="number"
            name="sort_order"
            value={formData.sort_order}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-600 font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter brand description"
            className="border border-gray-300 rounded-lg p-3 h-24"
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-600 font-semibold">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3"
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-600">
          {formData.id ? 'Edit Brand' : 'Create New Brand'}
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">Brand List</h2>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Slug</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Thumbnail</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Sort Order</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr key={brand.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{brand.id}</td>
              <td className="border border-gray-300 px-4 py-2">{brand.name}</td>
              <td className="border border-gray-300 px-4 py-2">{brand.slug}</td>
              <td className="border border-gray-300 px-4 py-2">
                <img src={`http://localhost:8000/api/brand/${brand.id}/image`} alt="Thumbnail" className="h-16 w-16 object-cover rounded-lg" />
              </td>
              <td className="border border-gray-300 px-4 py-2">{brand.sort_order}</td>
              <td className="border border-gray-300 px-4 py-2">{brand.status === 1 ? 'Active' : 'Inactive'}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button onClick={() => handleEdit(brand)}className="bg-green-600 text-white font-semibold px-3 py-1 rounded-md hover:bg-green-700 mr-2">
                  Edit
                </button>
                <button onClick={()=>handlePutTrash(brand.id)}className="bg-red-600 text-white font-semibold px-3 py-1 rounded-md hover:bg-red-700">
                  Put trash
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Brand;
