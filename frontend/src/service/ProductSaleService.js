import Api from "../service/Api";

const ProductSaleService = {
    getList: async () =>{
        const response = await Api.get('product_sale');
        return response;
    },
    getId: async (id) => {
        return await Api.get(`productsale/show/${id}`);
    },
    update: async (id, productsale) => {
        return await Api.post(`productsale/update/${id}`, productsale);
    },
    

}
export default ProductSaleService