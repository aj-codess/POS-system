import net from "./../global_dcl/base.js";

const getter=async()=>{

    try {

        const response = await net.get("/get_inventory");
        
        return response.data;

    } catch (error) {

        console.error({
            message: error.message,
            name: error.name,
            stack: error.stack,
          });
          return null;
    };

};

export default {
    getter
};