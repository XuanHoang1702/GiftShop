import Api from './Api';

const Related = {
    getList: async (id) =>{
        try{
            const response = await Api.get(`relatedProduct/${id}`);
            return response;
        }catch(error){
            console.log(error);
        }
    }
}

export default Related;