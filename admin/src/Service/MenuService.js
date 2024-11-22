import Api from "../Service/Api";

const MenuService = {
    getMenus: async () => {
      try {
        const response = await Api.get('menu'); 
        return response; 
      } catch (error) {
        console.error(error.message); 
      }
    },

    postMenu: async (formData) =>{
        const response = await Api.post('menu', formData);
        return response;
    },

    deleteMenu: async (id) =>{
      try {
        const response = await Api.delete(`menu/${id}`);
        return response;
      } catch (error) {
        console.error(error.message);
      }
    }, 

    updateMenu: async (id, formData) => {
      try {
        const response = await Api.put(`menu/${id}`, formData, {
          headers: {
            'Content-Type': 'application/json',
            },
        });
        return response;
      } catch (error) {
        console.error(error.message);
      }
    },

    getTrash: async () => {
      try{
          const response = await Api.get('menu_trash');
          return response;
      }
      catch(error){
          console.log(error);
      }
    },

  putTrash: async (id) => {
      try{
          const response = await Api.put(`menu/${id}/put_trash`);
          return response;
      }
      catch(error){
          console.log(error);
      }
  },

  restore: async(id) =>{
      try{
          const response = await Api.put(`menu/${id}/restore`);
          return response;
      }catch(error){
          console.log(error);
      }
  }
};


export default MenuService;
