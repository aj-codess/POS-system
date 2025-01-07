import ping from "./services/ping.js";
import auth_handler from "./interceptors/token_handler.js";
import card_sub from "./services/card_sub.js";
import reciept_sender from "./services/reciept_sender.js";
import inventory_getter from "./services/inventory_getter.js";
import review_trigger from "./services/review_trigger.js";
import store_info_getter from "./services/store_info_getter.js";

class main{

    constructor(){
        this.ping=new ping();
        this.auth_handler=new auth_handler();
        this.card=new card_sub();
        this.reciept=new reciept_sender();
        this.inventory=new inventory_getter();
        this.review=new review_trigger();
        this.store=new store_info_getter();
    }

    server_init(token){

        const cookie_data=this.ping.init(token);

        return this.auth_handler.specify_auth(cookie_data);

    };

    get_store_info(){

        return this.store.get();

    };

    send_review(payload){

        return this.review.trigger(payload);

    }

    send_receipt(reciept_payload){

        return this.reciept.getter(reciept_payload);

    }

    get_inventory(){

        return this.inventory.getter();

    }

    send_card(card_detail_paylaod){

        return this.card.send(card_detail_payload);
        
    };

};


//use async await accessing anything from the class