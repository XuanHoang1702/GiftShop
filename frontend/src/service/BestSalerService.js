import Api from './Api';

const BestSalerService = {
    getList: async () =>{
        try{
            const response = await Api.get('best_seller?page=1');
            return response.data;
        }catch(error){
            console.error(error);
        }
    }
};
export default BestSalerService;