import Api from "../Service/Api";


const OrderService = {
    getOrders: async () => {
        const response = await Api.get('order_all'); 
        return response;
    },
    createOrder: async (orderData) => {
        const response = await Api.post('order', orderData); 
        return response.data;
    },
};


export default OrderService;
