import net from "./../global_dcl/base.js";

const init=async (token)=>{
    try {

        const payload_in=await net.get("/ping");

        const cookie=payload_in.cookie;

        const auth_token=cookie["auth_token"];

        return auth_token;
        
    } catch (error) {

        console.error({
            message:error.message,
            name:error.name,
            stack:error.stack
        });

        throw error;
        
    }
};

export default {
    init
}