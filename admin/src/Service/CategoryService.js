import Api from "../Service/Api";

const CategoryService = {
    getList: async () => {
        try {
            const response = await Api.get('category');
            return response;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error; 
        }
    },
    createCategory: async (categoryData) => {
        try {
            const response = await Api.post('category', categoryData);
            return response; 
        } catch (error) {
            console.error('Error creating brand:', error);
            throw error;
        }
    },
    deleteCategory: async (id) =>{
        try{
            const response = await Api.delete(`category/${id}`);
            return response;
        } catch(error){
            console.log(error);
        }
    },
    updateCategory: async (id, categoryData) => {
        try {
            const response = await Api.post(`category/${id}/update`, categoryData);
            return response;
        }catch(error){
            console.log(error);
        }
    },
    getTrash: async () => {
        try{
            const response = await Api.get('category_trash');
            return response;
        }
        catch(error){
            console.log(error);
        }
    },

    putTrash: async (id) => {
        try{
            const response = await Api.put(`category/${id}/put_trash`);
            return response;
        }
        catch(error){
            console.log(error);
        }
    },

    restore: async(id) =>{
        try{
            const response = await Api.put(`category/${id}/restore`);
            return response;
        }catch(error){
            console.log(error);
        }
    }
    
};

export default CategoryService;
