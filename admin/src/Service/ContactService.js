import Api from "../Service/Api";

const ContactService = {
    getAllContacts: async () => {  
        try {
            const response = await Api.get('contact');
            return response;
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    },

    addContact: async (newContact) =>{
        console.log("Data:",newContact)
        try{
            const response = await Api.post('contact', newContact,{
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response;
        }catch(error){
            console.log(error);
        }
    },

    deleteContact: async (id) =>{
        try{
            const response = await Api.delete(`contact/${id}`);
            return response;
        }catch(error){
            console.log(error);
        }
    },

    updateContact: async (id,updatedContact) =>{
        try{
            const response = await Api.post(`contact/${id}/update`,updatedContact);
            return response;
        }
        catch(error){
            console.log("Error:", error);
        }
    },

    getTrash: async () => {
        try{
            const response = await Api.get('contact_trash');
            return response;
        }
        catch(error){
            console.log(error);
        }
    },

    putTrash: async (id) => {
        try{
            const response = await Api.put(`contact/${id}/put_trash`);
            return response;
        }
        catch(error){
            console.log(error);
        }
    },

    restore: async(id) =>{
        try{
            const response = await Api.put(`contact/${id}/restore`);
            return response;
        }catch(error){
            console.log(error);
        }
    },

    reply :async(id, formData) =>{
        try{
            const response = Api.post(`contact/${id}/reply`,formData);
            return response;
        }catch(error){
            console.log("Error: ", error);
        }
    }
};

export default ContactService;
