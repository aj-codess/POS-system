import net from "./../global_dcl/base.js";

const trigger=async(payload)=>{

    try {

        const response = await net.post("/send_review",JSON.stringify(payload));
        
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
    trigger
};