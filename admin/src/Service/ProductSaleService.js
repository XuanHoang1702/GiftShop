import Api from "../Service/Api";

const ProductSaleService = {
    getList: async () => {
        try {
            const response = await Api.get('product_sale');
            return response;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
    addProductSale: async (productData) => {
        try {
            const response = await Api.post('product_sale', productData);
            return response;
        } catch (error) {
            console.error('Error adding product:', error);
            throw error;
        }
    },
    deleteProductSale: async (id) =>{
        try {
            const response = await Api.delete(`product_sale/${id}`);
            return response;
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }, 
    getTrash: async () => {
        try{
            const response = await Api.get('product_sale_trash');
            return response;
        }
        catch(error){
            console.log(error);
        }
    },

    putTrash: async (id) => {
        try{
            const response = await Api.put(`product_sale/${id}/put_trash`);
            return response;
        }
        catch(error){
            console.log(error);
        }
    },

    restore: async(id) =>{
        try{
            const response = await Api.put(`product_sale/${id}/restore`);
            return response;
        }catch(error){
            console.log(error);
        }
    },

    deleteProduct: async (id) => {
        try{
            const response = Api.delete(`product_sale/${id}`);
            return response;
        }catch(error){
            console.log(error);
        }
    }
};

export default ProductSaleService;
