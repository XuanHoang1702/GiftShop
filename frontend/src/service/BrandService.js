import Api from './Api';

const BrandServeice = {
    getList: async () => {
        return await Api.get('brand');
    },
    getProduct: async (brandId) => {
        return await Api.get(`brand/${brandId}/product`);
    }
}

export default BrandServeice;