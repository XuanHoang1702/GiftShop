import Api from "../Service/Api";

const ProductService = {
    fetchProducts: async (page) => {
        const response = await Api.get(`product_all?page=${page}`);
        return response;
    },
    addProduct: async (productData) => {
        try {
            const response = await Api.post('product', productData);
            return response; 
        } catch (error) {
            console.error('Error adding product:', error);
            throw error; 
        }
    },
    getTrash: async () => {
        try{
            const response = await Api.get('product_trash');
            return response;
        }
        catch(error){
            console.log(error);
        }
    },

    putTrash: async (id) => {
        try{
            const response = await Api.put(`product/${id}/put_trash`);
            return response;
        }
        catch(error){
            console.log(error);
        }
    },
  
    restore: async(id) =>{
        try{
            const response = await Api.put(`product/${id}/restore`);
            return response;
        }catch(error){
            console.log(error);
        }
    },

    deleteProduct: async (id) => {
        try{
            const response = Api.delete(`product/${id}`);
            return response;
        }catch(error){
            console.log(error);
        }
    }
};

export default ProductService;
