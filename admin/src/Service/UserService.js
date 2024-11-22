import Api from "../Service/Api";

const UserService = {
    getList: async () => {
        return await Api.get('user');
    },
    login: async (email, password) => {
        try {
            const response = await Api.post('http://localhost:8000/api/login', {
                email,
                password,
            });
            const userData = {
                token: response.token,
                user: response.user
            };
            localStorage.setItem('userData',JSON.stringify(response));
            console.log(userData)
        } catch (error) {
            console.log(error);
        }
    },
    createUser: async (formData) =>{
        try{
            const response = Api.post('user_create',formData);
            return response;
        }catch(error){
            console.log(error);
        }
    }, 
    
    getTrash: async () => {
        try{
            const response = await Api.get('user_trash');
            return response;
        }
        catch(error){
            console.log(error);
        }
    },
  
    putTrash: async (id) => {
        try{
            const response = await Api.put(`user/${id}/put_trash`);
            return response;
        }
        catch(error){
            console.log(error);
        }
    },
  
    restore: async(id) =>{
        try{
            const response = await Api.put(`user/${id}/restore`);
            return response;
        }catch(error){
            console.log(error);
        }
    },

    deleteUser: async (id) => {
        try{
            const response = Api.delete(`user/${id}/delete`);
            return response;
        }catch(error){
            console.log(error);
        }
    },

    emailPhone: async (formData) => {
        try {
            const response = await Api.post(
                'user/forgot_password',
                {
                    email: formData.email,
                    phone: formData.phone
                }
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    }, 
    changePass: async (id, password, password_confrimation) =>{
        try{
            const response = await Api.post('user/change_password', {
                user_id: id,
                new_password: password,
                new_password_confirmation: password_confrimation,
            });
            return response;
        }catch(error){
            console.log(error);
        }
    }
};

export default UserService;
