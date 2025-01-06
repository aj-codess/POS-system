import net from "./../global_dcl/base.js";

let auth_cookie_data;

net.interceptors.request.use((config)=>{

    config.headers["cookie"]=auth_cookie_data;

    return config;

},(error)=>{
    return Promise.reject(error);
});

const specify_auth=(auth)=>{
    if(auth.length > 0){
        auth_cookie_data=auth;
        return true;
    }

    return false;

};

export default {
    specify_auth
}