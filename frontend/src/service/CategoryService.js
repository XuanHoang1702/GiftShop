import Api from "../service/Api";

const CategoryService = {

    getProductsByCategoryId: async (categoryId) => {
        return await Api.get(`category/${categoryId}/product`);
    },
    getList: async () => {
        return await Api.get('category');
    },
};

export default CategoryService;
