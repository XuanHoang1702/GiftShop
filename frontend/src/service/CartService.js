import axios from 'axios';

const CartService = {
    addToCart: async (productId, quantity = 1) => {
        const loggedInUser = JSON.parse(localStorage.getItem('userData'));
        const token = loggedInUser?.token;
        if (!token) {
            throw new Error('User is not authenticated');
        }
        return await axios.post(
            'http://localhost:8000/api/cart',
            { product_id: productId, quantity },
            { headers: { Authorization: `Bearer ${token}` } }
        );
    },
    fetchCartItems: async () => {
        const loggedInUser = JSON.parse(localStorage.getItem('userData'));
        const token = loggedInUser.token;
        try{
            const response =  await axios.get('http://localhost:8000/api/cart', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        }catch(error)
        {
            console.log(error);
        }
    },
    removeCart: async (cartId) =>{
        const loggedInUser = JSON.parse(localStorage.getItem('userData'));
        const token = loggedInUser.token;
        await axios.delete(`http://localhost:8000/api/cart/${cartId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
};

export default CartService;
