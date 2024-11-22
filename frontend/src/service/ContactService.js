import Api from "./Api";

const ContactService = {
    sendContact: async (newContact) =>{
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

    email: async (email) => {
        try {
            const response = await Api.post(
                'email', 
                { email: email },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    },

    replies : async (id) =>{
        try{
            const response = Api.get(`contact/replies/${id}`);
            return response;
        }catch(error){
            console.log("Error: ", error);
        }
    }
    
};

export default ContactService;
