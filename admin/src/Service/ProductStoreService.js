import Api from "./Api";

const ProductStoreService = {
    getList: async () => {
        try {
            const response = await Api.get('store_product'); 
            return response; 
        } catch (error) {
            console.error('Error fetching productstore:', error);
            throw error; 
        }
    },

    addStoreProduct: async(formData) => {
        try{
            const response = Api.post('store_product', formData);
            return response;
        }catch(error){
            console.log("Error: ", error);
        }
    },

    getTrash: async () => {
        try{
            const response = await Api.get('store_product_trash');
            return response;
        }
        catch(error){
            console.log(error);
        }
    },

    putTrash: async (id) => {
        try{
            const response = await Api.put(`store_product/${id}/put_trash`);
            return response;
        }
        catch(error){
            console.log(error);
        }
    },
  
    restore: async(id) =>{
        try{
            const response = await Api.put(`store_product/${id}/restore`);
            return response;
        }catch(error){
            console.log(error);
        }
    },

    deleteProduct: async (id) => {
        try{
            const response = Api.delete(`store_product/${id}`);
            return response;
        }catch(error){
            console.log(error);
        }
    }
};

export default ProductStoreService;
