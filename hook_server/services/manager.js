class socket_info {
    constructor(){
        this.status="active";
        this.message_queue=new Array();
    }
};


const target_getter=(id)=>{

    if (id.length > 0) {
        return id[id.length - 1];
    };

};


class KeyValueStore {
    constructor() {
        this.store = new Map();
    }

    create(key){
        this.store.set(key,new socket_info());
    }

    set(domain,key,value) {
        this.store[domain].set(key, value);
    }

    get_endpoint_id(end){
        for(let key in this.store){
            if(end==target_getter(id)){
                return key;
            };
        }

        const active=this.getActive();

        return active;
    }

    getActive(){
        for(let key in this.store){
            if(this.store[key].status=="active"){
                return key;
            }
        };
    }


    push_message(domain,msg){

        this.store[domain].message_queue.push(msg);

    };

    get(key) {
        return this.store.get(key);
    }

    has(key) {
        return this.store.has(key);
    }

    delete(key) {
        return this.store.delete(key);
    }

    delete_clt(domain){
        return this.store[domain].delete(CLT_socket_addr);
    }

    clear() {
        this.store.clear();
    }
};


const cashier = new KeyValueStore();

export default cashier;