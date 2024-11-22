import Api from "../Service/Api";

const BannerService = {
    getList: async () => {
        return await Api.get('banner');
    },
    addBanner: async (formData) =>{
        try{
            const response = await Api.post('banner', formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return response;
        }catch(error){
            console.log(error);
        }
    },
    deleteBanner: async (id) =>{
        try{
            const response = await Api.delete(`banner/${id}`);
            return response;
        }catch(error){
            console.log(error);
        }
    },

    updateBanner: async (id, formData) =>{
        try{
            const response = await Api.post(`banner/${id}/update`, formData);
            return response;
        }catch(error)
        {
            console.log("Error update:", error);
        }
    },

    getTrash: async () => {
        try{
            const response = await Api.get('banner_trash');
            return response;
        }
        catch(error){
            console.log(error);
        }
    },

    putTrash: async (id) => {
        try{
            const response = await Api.put(`banner/${id}/put_trash`);
            return response;
        }
        catch(error){
            console.log(error);
        }
    },

    restore: async(id) =>{
        try{
            const response = await Api.put(`banner/${id}/restore`);
            return response;
        }catch(error){
            console.log(error);
        }
    }
    
};

export default BannerService;
