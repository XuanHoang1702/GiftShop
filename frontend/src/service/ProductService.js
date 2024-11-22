import Api from "../service/Api";
const ProductService = {
    fetchProducts: async (page) => {
        const response = await Api.get(`product_all?page=${page}`);
        return response;
    },
    getList: async () => {
        try {
            const response = await Api.get('product');
            return response;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    getSale: async () =>{
        const response = await Api.get('product_sale');
        return response;
    },

    getId: async (id) => {
        return await Api.get(`product/${id}`);
    },


    deleteProduct: async (id) => {
        try {
            const response = await Api.delete(`product/delete/${id}`);
            return response;
        } catch (error) {
            console.error(`Error deleting product with ID ${id}:`, error);
            throw error;
        }
    },
    destroy: async (id) => {
        try {
            const response = await Api.delete(`product/destroy/${id}`);
            return response;
        } catch (error) {
            console.error(`Error deleting product with ID ${id}:`, error);
            throw error;
        }
    },
    update: async (id) => {
        try {
            const response = await Api.post(`product/update/${id}`);
            return response;
        } catch (error) {
            console.error(`Error deleting product with ID ${id}:`, error);
            throw error;
        }
    },
    add: async (product) => {
        return await Api.post('product/store', product);
    },
    restore: async (id) => {
        return await Api.get(`product/restore/${id}`);
    },
    getDeleted: async () => {
        return await Api.get('product/trash');
    },
    getRelatedProducts: async (categoryId, currentProductId) => {
        return await Api.get(`product/getRelated/${categoryId}/${currentProductId}`);
    },
    getLastest: async(page)=>{
        try{
            const response = await Api.get(`lastest?page=${page}`);
            return response;
        }catch(error){
            console.log("error: ", error);
        }
    },
    getBestSeler: async (page) =>{
        try{
            const response = await Api.get(`best_seller?page=${page}`);
            return response;
        }catch(error){
            console.log("error: ", error);
        }
    }
};

export default ProductService;