import Api from "../service/Api";

const BannerService = {
    getList: async () => {
        return await Api.get('banner');
    }
};

export default BannerService;
