import net from "./../global_dcl/base.js";

const send=async(card_detail_payload)=>{

    try {

        const response = await net.post("/card_submission",JSON.stringify(card_detail_payload));
        
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
    send
};