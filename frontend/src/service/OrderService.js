import Api from './Api';

const OrderService = {
    placeOrder: async (orderData) => {
        const loggedInUser = JSON.parse(localStorage.getItem('userData'));
        const token = loggedInUser.token;
        try{
            const response = await Api.post('order', orderData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response
        }
        catch(error){
            console.log(error);
        }
        
    },
    placeOrderDetails: async (payload) => {
        return await Api.post('order_detail', payload);
    },
};

export default OrderService;
