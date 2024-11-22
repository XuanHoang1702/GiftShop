import Api from "./Api";

const MenuService = {
    getHeader: async () => {
        return await Api.get('/menu');
    },
    getFooter: async () => {
        return await Api.get('config');
    }
};
export default MenuService;