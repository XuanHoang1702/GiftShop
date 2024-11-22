import Api from "../Service/Api";

const TopicService = {
    getList: async () => {
        try {
            const response = await Api.get('topic'); 
            return response; 
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error; 
        }
    },
    addTopic: async (formData) => {
        try{
            const response = await Api.post('topic', formData);
            return response;
        }catch(error){
            console.log("Error: ", error);
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
            const response = await Api.get('topic_trash');
            return response;
        }
        catch(error){
            console.log(error);
        }
    },

    putTrash: async (id) => {
        try{
            const response = await Api.put(`topic/${id}/put_trash`);
            return response;
        }
        catch(error){
            console.log(error);
        }
    },

    restore: async(id) =>{
        try{
            const response = await Api.put(`topic/${id}/restore`);
            return response;
        }catch(error){
            console.log(error);
        }
    },

    deleteTopic: async (id) => {
        try{
            const response = Api.delete(`topic/${id}`);
            return response;
        }catch(error){
            console.log(error);
        }
    }
};

export default TopicService;
