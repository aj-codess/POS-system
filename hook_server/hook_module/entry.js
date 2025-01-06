import ping from "./services/ping.js";
import auth_handler from "./interceptors/token_handler.js"

class main{

    constructor(){
        this.ping=new ping();
        this.tkn_handler=new token_handler();
    }

    server_init(token){

        const cookie_data=this.ping.init(token);

        return this.auth_handler.specify_auth(cookie_data);

    };

}