import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductImgService from '../../Service/ProductImgService';

const ProductImage = () => {
  const [productImages, setProductImages] = useState([]);
  const [productId, setProductId] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    const fetchProductImages = async () => {
      const response = await ProductImgService.getImageList();
      setProductImages(response);
    };
    fetchProductImages();
  }, []);

  const handleFileChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('product_id', productId);
    formData.append('thumbnail', thumbnail);
    try {
      const response = await ProductImgService.addProductImg(formData);
      setProductImages([...productImages, response.data]);
      setProductId(0);
      setThumbnail(null);
      toast.success('Product image added successfully!');
    } catch (error) {
      console.error('Error adding product image:', error);
      toast.error('Failed to add product image');
    }
  };

  const deleteProductImage = async (id) => {
    try {
      await ProductImgService.deleteProductImage(id);
      setProductImages(productImages.filter((image) => image.id !== id));
      toast.success('Product image deleted successfully!');
    } catch (error) {
      console.error('Error deleting product image:', error);
      toast.error('Failed to delete product image');
    }
  };


  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Manage Product Images</h1>
      <form className="border p-4 rounded bg-gray-100 mb-4" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Add Product Image</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productId">
              Product ID
            </label>
            <input
              id="productId"
              type="number"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Product Image
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Image
        </button>
      </form>
      <div className="overflow-auto max-h-80">
        <table className="min-w-full bg-white mb-8">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">ID</th>
              <th className="py-2 px-4 border-b text-center">Product ID</th>
              <th className="py-2 px-4 border-b text-center">Image</th>
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productImages.map((image) => (
              <tr key={image.id} className="text-center">
                <td className="py-2 px-4 border-b">{image.id}</td>
                <td className="py-2 px-4 border-b">{image.product_id}</td>
                <td className="py-2 px-4 border-b">
                  <img
                    src={`http://localhost:8000/storage/images/${image.thumbnail}`}
                    alt={`Product ${image.product_id}`}
                    className="w-20 h-20 object-cover mx-auto"
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => deleteProductImage(image.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => {/* Update logic here */}}
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductImage;
