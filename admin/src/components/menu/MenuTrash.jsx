import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MenuService from '../../Service/MenuService';

const MenuTrash = () => {
    const [menus, setMenus] = useState([]);
    useEffect(() => {
        fetchMenus();
    }, []);

    const fetchMenus = async () => {
        try {
            const response = await MenuService.getTrash();
            setMenus(response);
        } catch (error) {
            console.log("error");
        }
    };

    const handleDelete = async (id) => {
        try {
            await MenuService.deleteMenu(id);
            toast.success('menu deleted successfully');
            fetchMenus();
        } catch (error) {
            toast.error('Error deleting menu');
        }
    };

    const handleRestore = async (id) => {
        try {
            await MenuService.restore(id);
            toast.success('menu restored successfully');
            fetchMenus();
        } catch (error) {
            toast.error('Error restoring menu');
        }
    };

    return (
        <div className="container mx-auto py-4">
            <ToastContainer />
            <h2 className="text-2xl font-semibold mb-4">Menu Trash</h2>
            <div className="overflow-y-auto max-h-80">
                <table className="min-w-full bg-white border-collapse">
                    <thead>
                        <tr>
                            {['ID', 'Name', 'Link', 'Table ID', 'Type', 'Position',  'ParentID', 'Sort Order',  'Description', 'Created By', 'Updated By', 'Created at', 'Updated at',  'Status', 'Actions'].map((header) => (
                                <th key={header} className="px-4 py-2 border-b text-left text-sm font-medium text-gray-900">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {menus.length > 0 ? (
                            menus.map((menu) => (
                                <tr key={menu.id}>
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
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">{menu.status ? 'Active' : 'Inactive'}</td>
                                    <td className="px-4 py-2 border-b text-sm text-gray-900">
                                        <button onClick={() => handleRestore(menu.id)} className="text-green-500 hover:underline">Restore</button>
                                        <button onClick={() => handleDelete(menu.id)} className="text-red-500 hover:underline ml-2">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="px-4 py-2 border-b text-sm text-gray-900 text-center">No menus found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MenuTrash;
