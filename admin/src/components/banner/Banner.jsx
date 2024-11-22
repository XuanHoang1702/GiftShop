import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BannerService from '../../Service/BannerService';

const BannerManager = () => {
    const [banners, setBanners] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        link: '',
        image: null,
        sort_order: 0,
        position: 1,
        description: '',
        created_by: 1,
        updated_by: 1,
        status: 1
    });

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const response = await BannerService.getList();
            setBanners(response);
        } catch (error) {
            console.log("error");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bannerData = new FormData();
        bannerData.append('name', formData.name);
        bannerData.append('link', formData.link);
        bannerData.append('image', formData.image);
        bannerData.append('sort_order', formData.sort_order);
        bannerData.append('position', formData.position);
        bannerData.append('description', formData.description);
        bannerData.append('created_by', formData.created_by);
        bannerData.append('updated_by', formData.updated_by);
        bannerData.append('status', formData.status);

        try {
            if (formData.id) {
                await BannerService.updateBanner(formData.id, bannerData);
                toast.success('Banner updated successfully');
                fetchBanners();
            } else {
                await BannerService.addBanner(bannerData);
                toast.success('Banner added successfully');
                fetchBanners();
            }
            fetchBanners();
            setFormData({ id: '', name: '', link: '', image: null, sort_order: 0, position: 1 , description: '', created_by: 1, updated_by: 1, status: 0 });
        } catch (error) {
            console.error("Error during banner submission:", error);
            toast.error('Error adding/updating banner: ' + (error.response?.data?.message || 'Unknown error'));
        }
    };

    const handleChange = (e) => {
        const { name, files, value } = e.target;
        if (name === 'image') {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handlePutTrash = async (id) => {
        try {
            await BannerService.putTrash(id);
            toast.success('Banner put trash successfully');
            fetchBanners();
        } catch (error) {
            toast.error('Error deleting banner');
        }
    };

    const handleEdit = (banner) => {
        setFormData({
            id: banner.id,
            name: banner.name,
            link: banner.link,
            image: null,
            sort_order: banner.sort_order,
            position: banner.position === 'sildeshow' ? 1 : 2,
            description: banner.description,
            created_by: banner.created_by,
            updated_by: banner.updated_by,
            status: banner.status,
        });
    }

    return (
        <div className="container mx-auto py-4">
            <ToastContainer />
            <h2 className="text-2xl font-semibold mb-4">Banner Management</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md bg-white mb-4 w-full max-w-3xl">
                <h3 className="text-lg font-semibold mb-2">Add New Banner</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        {['name', 'link', 'sort_order'].map((field) => (
                            <div key={field} className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    {field.replace('_', ' ').replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())}
                                </label>
                                <input
                                    type="text"
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                                />
                            </div>
                        ))}
                        <div className="mb-2">
                            <label className="block text-sm font-medium text-gray-700">Image</label>
                            <input
                                type="file"
                                name="image"
                                onChange={handleChange}
                                accept=".jpeg,.jpg,.png,.gif"
                                required
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium text-gray-700">Position</label>
                            <select
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                            >
                                <option value="1">Sideshow</option>
                                <option value="2">Ads</option>
                            </select>
                        </div>
                        {['description', 'status'].map((field) => (
                            <div key={field} className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    {field.replace('_', ' ').replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())}
                                </label>
                                <input
                                    type="text"
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    {formData.id ? 'Edit Banner' : 'Create New Banner'}
                </button>
            </form>

            <div className="overflow-y-auto max-h-80">
                <table className="min-w-full bg-white border-collapse">
                    <thead>
                        <tr>
                            {['ID', 'Name', 'Link', 'Image', 'Sort Order', 'Position', 'Description', 'Created By', 'Updated By', 'Status', 'Actions'].map((header) => (
                                <th key={header} className="px-4 py-2 border-b text-left text-sm font-medium text-gray-900">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {banners.length > 0 ? (
                            banners.map((banner) => (
                                <tr key={banner.id}>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{banner.id}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{banner.name}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{banner.link}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">
                                        <img src={`http://localhost:8000/api/banner/${banner.id}/image`} alt={banner.name} className="w-50 h-20"/>
                                    </td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{banner.sort_order}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{banner.position === 1 ? 'Sideshow' : 'Ads'}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{banner.description}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{banner.created_by}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{banner.updated_by}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{banner.status ? 'Active' : 'Inactive'}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">
                                        <button onClick={() => handleEdit(banner)} className="text-blue-500 hover:underline">Edit</button>
                                        <button onClick={() => handlePutTrash(banner.id)} className="text-red-500 hover:underline ml-2">Put trash</button>
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

export default BannerManager;
