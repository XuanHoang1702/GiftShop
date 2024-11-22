import Api from "../Service/Api";

const ConfigService = {
    getList: async () => {
        try {
            const response = await Api.get('config');
            return response;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    addConfig: async (formData) => {
        try{
            const response = await Api.post('config', formData,{
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response;
        }catch(error){
            console.log(error);
        }
    },

    deleteConfig: async (id) => {
        try{
            const response = await Api.delete(`config/${id}`);
            return response;
        }catch(error){
            console.log(error);
        }
    },

    updateConfig: async (id, formData) => {
        try{
            const response = await Api.put(`config/${id}`, formData,{
                headers: {
                    'Content-Type': 'application/json',
                    }
                });
            return response;
        }catch(error){
            console.log(error);
        }
    }
};

export default ConfigService;
