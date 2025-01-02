import log_service from "./../services/log_service.js";
import global_dcl from "./../services/global_dcl.js"

const cookie_validity=async(cookie)=>{

    const decode=await log_service.verify_token(cookie);

    if(global_dcl.check_activeToken(decode.token_id)==true){
        return {
            tokenIsValid:true,token_id:decode.token_id
        };
    };

    return {
        tokenIsValid:false
    };

};


const token_2_cookie=async(token)=>{

    if(global_dcl.check_activeToken(token) == true){

        const cookie=await log_service.sign_token(token_id);

        return {isValid:true,cookie:cookie};

    };

    return {isValid:false};

};




export default {
    cookie_validity,
    token_2_cookie
}