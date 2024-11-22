import Api from "../Service/Api";


const OrderDetailService = {
    getOrders: async () => {
        const response = await Api.get('order_detail'); 
        return response;
    },
    createOrder: async (orderData) => {
        const response = await Api.post('order_detail', orderData); 
        return response.data;
    },
};


export default OrderDetailService;
