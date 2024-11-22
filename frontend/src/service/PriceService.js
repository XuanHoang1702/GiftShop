import Api from './Api';

const PriceServece = {
    getProduct: async (pricemin, pricemax)=>{
        const response = await Api.post('product/price',
            {
                min_price: pricemin,
                max_price: pricemax,
            }
        );
        console.log(response)
        return response;
    },

    getSortByPrice: async (status, page) =>{
        try{
            if(status === 'desc')
            {
                const response = await Api.get(`pricebuy/desc?page=${page}`);
                return response;
            }
            if(status === 'asc'){
                const response = await Api.get(`price/asc?page=${page}`);
                return response;
            }
        }catch(error){
            console.log("error: ", error);
        }
    },
}

export default PriceServece;