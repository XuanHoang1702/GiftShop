import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ConfigService from "../Service/ConfigService";

function Config() {
  const [configs, setConfigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [newConfig, setNewConfig] = useState({
    site_name: '',
    email: '',
    address: '',
    hotline: '',
    phone: '',
    author: '',
    status: '',
  });

  const fetchConfigs = async () => {
    try {
      const response = await ConfigService.getList();
      setConfigs(response);
    } catch (error) {
      console.error("Error fetching configurations:", error);
      setError("Could not retrieve configuration list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewConfig({ ...newConfig, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await ConfigService.updateConfig(editingId, newConfig);
        toast.success("Configuration updated successfully!");
        setEditingId(null);
      } else {
        await ConfigService.addConfig(newConfig);
        toast.success("Configuration added successfully!");
      }
      fetchConfigs();
      setNewConfig({
        site_name: '',
        email: '',
        address: '',
        hotline: '',
        phone: '',
        author: '',
        status: '',
      });
    } catch (error) {
      console.error("Error saving configuration:", error);
      setError("Unable to save configuration.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await ConfigService.deleteConfig(id);
      toast.success('Config deleted');
      fetchConfigs();
    } catch (error) {
      console.log(error);
      toast.error('Cannot delete config!');
    }
  };

  const handleEdit = (config) => {
    setNewConfig({
      site_name: config.site_name,
      email: config.email,
      address: config.address,
      hotline: config.hotline,
      phone: config.phone,
      author: config.author,
      status: config.status
    });
    setEditingId(config.id);
  };

  if (loading) return <div>Loading data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Configuration Page</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Configuration</h2>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          {["site_name", "email", "address", "hotline", "phone", "author", "status"].map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              name={field}
              placeholder={field.replace("_", " ").toUpperCase()}
              value={newConfig[field]}
              onChange={handleInputChange}
              className="border p-2 rounded"
              required
            />
          ))}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded col-span-2">
            {editingId ? 'Update Config' : 'Add Config'}
          </button>
        </form>
      </div>

      <div className="overflow-y-auto max-h-80">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              {["ID", "Site Name", "Email", "Address", "Hotline", "Phone", "Author", "Status", "Actions"].map((header) => (
                <th key={header} className="py-2 px-4 border-b">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {configs.length > 0 ? (
              configs.map((config, index) => (
                <tr key={config.id}>
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{config.site_name}</td>
                  <td className="py-2 px-4 border-b">{config.email}</td>
                  <td className="py-2 px-4 border-b">{config.address}</td>
                  <td className="py-2 px-4 border-b">{config.hotline}</td>
                  <td className="py-2 px-4 border-b">{config.phone}</td>
                  <td className="py-2 px-4 border-b">{config.author}</td>
                  <td className="py-2 px-4 border-b">{config.status}</td>
                  <td className="py-2 px-4 border-b">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleEdit(config)}>Edit</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(config.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4">No configuration data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Config;
