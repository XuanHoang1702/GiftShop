import Api from "../service/Api";

const PostService = {
    getList: async () => {
        return await Api.get('post');
    }
};

export default PostService;