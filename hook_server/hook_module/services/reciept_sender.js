import net from "./../global_dcl/base.js";

const getter=async(reciept_payload)=>{

    try {

        const response = await net.get("/get_reciept",JSON.stringify(reciept_payload));
        
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