
import Api from "../service/Api";

const UserService = {
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
    update: async (id,formData) =>{
        try {
            const response = await Api.put(`http://localhost:8000/api/user/${id}`, formData,{
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            return response;
        } catch (error) {
            console.log(error);
        }
                            
    }
};

export default UserService;