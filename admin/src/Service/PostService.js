import Api from "../Service/Api";
const PostService = {
    getList: async () => {
        try {
            const response = await Api.get('post'); 
            return response; 
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error; 
        }
    },
    createPost: async (PostData) => {
        try {
            const response = await Api.post('post', PostData);
            return response; 
        } catch (error) {
            console.error('Error creating brand:', error);
            throw error;
        }
    },

    updatePost: async (id, formData) => {
        try{
            const response = await Api.post(`post/${id}/update`, formData);
            return response;
        }catch(error){
            console.log("Error: ", error);
        }
    },

    getTrash: async () => {
        try{
            const response = await Api.get('post_trash');
            return response;
        }
        catch(error){
            console.log(error);
        }
    },

    putTrash: async (id) => {
        try{
            const response = await Api.put(`post/${id}/put_trash`);
            return response;
        }
        catch(error){
            console.log(error);
        }
    },

    restore: async(id) =>{
        try{
            const response = await Api.put(`post/${id}/restore`);
            return response;
        }catch(error){
            console.log(error);
        }
    },

    deletePost: async (id) => {
        try{
            const response = Api.delete(`post/${id}`);
            return response;
        }catch(error){
            console.log(error);
        }
    }
};

export default PostService;
