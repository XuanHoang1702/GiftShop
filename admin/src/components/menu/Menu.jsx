import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MenuService from '../../Service/MenuService';

const Menu = () => {
    const [menuList, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        link: '',
        table_id: 1,
        type: '',
        position: '',
        parent_id: 0,
        sort_order: 0,
        description: '',
        status: 1,
    });

    const fetchMenus = async () => {
        try {
            const menus = await MenuService.getMenus();
            setMenus(menus);
            setLoading(false);
        } catch (error) {
            setError('Unable to load menu data');
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchMenus();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if(editingId){
                await MenuService.updateMenu(editingId, formData);
                setEditingId(null);
                toast.success('Menu had update');
            }
            else{
                await MenuService.postMenu(formData);
                toast.success('Menu added successfully!');
            }
            fetchMenus();
            resetForm();
        } catch (error) {
            console.error('Error adding menu:', error);
            toast.error('An error occurred while adding the menu.');
        }
    };

    const handleUpdate = (menu) => {
        setFormData(menu);
        setEditingId(menu.id);
    };

    const handlePutTrash = async (id) => {
        try {
            await MenuService.putTrash(id);
            setMenus((prevMenus) => prevMenus.filter((menu) => menu.id !== id));
            toast.success('Menu put trash successfully!');
        } catch (error) {
            console.error('Error deleting menu:', error);
            toast.error('An error occurred while deleting the menu.');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            link: '',
            table_id: 1,
            type: '',
            position: '',
            parent_id: 0,
            sort_order: 0,
            description: '',
            status: 1,
        });
        setEditingId(null);
    };

    if (loading) {
        return <p>Loading data...</p>;
    }

    return (
        <div className="container mx-auto p-4 flex gap-4">
            <ToastContainer /> 
            <div className="w-1/3 bg-gray-50 p-4 shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-4">Manage Menu</h1>
                {error && <p className="text-red-500">{error}</p>}
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                    <input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Menu Name"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none"
                        required
                    />
                    <input
                        name="link"
                        type="text"
                        value={formData.link}
                        onChange={handleInputChange}
                        placeholder="Link"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none"
                        required
                    />
                    <input
                        name="type"
                        type="text"
                        value={formData.type}
                        onChange={handleInputChange}
                        placeholder="Type"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none"
                        required
                    />
                    <select
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none"
                        required
                    >
                        <option value="">Select Position</option>
                        <option value="1">Header Menu</option>
                        <option value="2">Footer Menu</option>
                    </select>
                    <input
                        name="parent_id"
                        type="number"
                        value={formData.parent_id}
                        onChange={handleInputChange}
                        placeholder="Parent ID"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none"
                    />
                    <input
                        name="sort_order"
                        type="number"
                        value={formData.sort_order}
                        onChange={handleInputChange}
                        placeholder="Sort Order"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none"
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                        rows="3"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none"
                    />
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none"
                    >
                        <option value={0}>Inactive</option>
                        <option value={1}>Active</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-md"
                    >
                        {editingId ? 'Update Menu' : 'Add Menu'}
                    </button>
                </form>
            </div>
            <div className="w-2/3 bg-gray-50 p-4 shadow-md rounded-md">
                <h2 className="text-xl font-bold mb-4">Menu List</h2>
                <div className="overflow-y-auto h-80">
                    <table className="min-w-full text-left">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4">ID</th>
                                <th className="py-2 px-4">Name</th>
                                <th className="py-2 px-4">Link</th>
                                <th className="py-2 px-4">Table ID</th>
                                <th className="py-2 px-4">Type</th>
                                <th className="py-2 px-4">Position</th>
                                <th className="py-2 px-4">Parent ID</th>
                                <th className="py-2 px-4">Sort Order</th>
                                <th className="py-2 px-4">Description</th>
                                <th className="py-2 px-4">Created_by</th>
                                <th className="py-2 px-4">Updated_by</th>
                                <th className="py-2 px-4">Created_at</th>
                                <th className="py-2 px-4">Updated_at</th>
                                <th className="py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menuList.map((menu) => (
                                <tr key={menu.id} className="hover:bg-gray-100">
                                    <td className="py-2 px-4">{menu.id}</td>
                                    <td className="py-2 px-4">{menu.name}</td>
                                    <td className="py-2 px-4">{menu.link}</td>
                                    <td className="py-2 px-4">{menu.table_id}</td>
                                    <td className="py-2 px-4">{menu.type}</td>
                                    <td className="py-2 px-4">{menu.position}</td>
                                    <td className="py-2 px-4">{menu.parent_id}</td>
                                    <td className="py-2 px-4">{menu.sort_order}</td>
                                    <td className="py-2 px-4">{menu.description}</td>
                                    <td className="py-2 px-4">{menu.created_by}</td>
                                    <td className="py-2 px-4">{menu.updated_by}</td>
                                    <td className="py-2 px-4">{menu.created_at}</td>
                                    <td className="py-2 px-4">{menu.updated_at}</td>
                                    <td className="py-2 px-4 flex space-x-2">
                                        <button
                                            onClick={() => handleUpdate(menu)}
                                            className="bg-blue-600 text-white px-2 py-1 rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handlePutTrash(menu.id)}
                                            className="bg-red-600 text-white px-2 py-1 rounded"
                                        >
                                            Put trash
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Menu;
