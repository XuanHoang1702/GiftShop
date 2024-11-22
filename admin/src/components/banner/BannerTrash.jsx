import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BannerService from '../../Service/BannerService';

const BannerTrash = () => {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const response = await BannerService.getTrash();
            setBanners(response);
        } catch (error) {
            console.log("error");
        }
    };

    const handleDelete = async (id) => {
        try {
            await BannerService.deleteBanner(id);
            toast.success('Banner deleted successfully');
            fetchBanners();
        } catch (error) {
            toast.error('Error deleting banner');
        }
    };

    const handleRestore = async (id) => {
        try {
            await BannerService.restore(id);
            toast.success('Banner restored successfully');
            fetchBanners();
        } catch (error) {
            toast.error('Error restoring banner');
        }
    };

    return (
        <div className="container mx-auto py-4">
            <ToastContainer />
            <h2 className="text-2xl font-semibold mb-4">Banner Management</h2>
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
                                        <button onClick={() => handleRestore(banner.id)} className="text-green-500 hover:underline">Restore</button>
                                        <button onClick={() => handleDelete(banner.id)} className="text-red-500 hover:underline ml-2">Delete</button>
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

export default BannerTrash;
