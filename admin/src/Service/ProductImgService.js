import Api from "../Service/Api";

const ProductImgService = {
    getImageList: async () => {
        try {
            const response = await Api.get('productImage'); 
            return response;
        } catch (error) {
            console.error('Error fetching image list:', error);
            throw error;
        }
    },

    addProductImg: async (productData) => {
        try {
            const response = await Api.post('productImage', productData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return response;
        } catch (error) {
            console.error('Error adding product:', error);
            throw error;
        }
    },

    deleteProductImage: async (id) =>{
        try {
            const response = await Api.delete(`productImage/${id}`);
            return response;
        }catch(error){
            console.log(error);
        }
    }
};

export default ProductImgService;
