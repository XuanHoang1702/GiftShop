import Api from "../Service/Api";

const BrandService = {
    getList: async () => {
        try {
            const data = await Api.get('brand');
            return data;
        } catch (error) {
            console.error('Error fetching brands:', error);
            throw error;
        }
    },

    createBrand: async (brandData) => {
        try {
            const response = await Api.post('brand', brandData);
            return response; 
        } catch (error) {
            console.error('Error creating brand:', error);
            throw error;
        }
    },

    deleteBrand: async (id) => {
        try{
            const response = Api.delete(`brand/${id}`);
            return response;
        }catch(error){
            console.log(error);
        }
    },

    updateBrand: async (id,formData) =>{
        try{
            const response = Api.post(`brand/${id}/update`,formData,{
                headers:{
                    'Content-Type':'form-data'
                }
            });
            return response;
        }catch(error){
            console.log(error);
        }
    },

    getTrash: async () => {
        try{
            const response = await Api.get('brand_trash');
            return response;
        }
        catch(error){
            console.log(error);
        }
    },

    putTrash: async (id) => {
        try{
            const response = await Api.put(`brand/${id}/put_trash`);
            return response;
        }
        catch(error){
            console.log(error);
        }
    },

    restore: async(id) =>{
        try{
            const response = await Api.put(`brand/${id}/restore`);
            return response;
        }catch(error){
            console.log(error);
        }
    }
};

export default BrandService;
