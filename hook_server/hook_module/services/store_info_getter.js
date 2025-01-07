import net from "./../global_dcl/base.js";

const get=async()=>{

    try {

        const response = await net.get("/get_info");
        
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
    get
}