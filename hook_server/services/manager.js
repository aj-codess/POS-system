class socket_info {
    constructor(){
        this.status="open";
        this.message_queue=new Array();
        this.CSH_socket_addr=null;
        this.CLT_socket_addr=null;
    }
};


class KeyValueStore {
    constructor() {
        this.store = new Map();
    }

    create(key){
        this.store.set(key,new socket_info());
    }

    setCSH_addr(domain,value) {

        this.store.get(domain).CSH_socket_addr=value;

    }


    setCLT_addr(domain,value){

        this.store.get(domain).CLT_socket_addr=value;

    }


    get_endpoint_id(end){
        for(const key of this.store.keys()){
            if(key.includes(end) && this.store.get(key).status=="open"){
                return key;
            };
        }

        const active=this.getActive();

        return active;
    }

    getActive(){
        for(const key of this.store.keys()){
            if(this.store.get(key).status=="open"){
                return key;
            }
        };
    }


    push_message(domain,msg){

        this.store.get(domain).message_queue.push(msg);

    };

    clear_message_queue(domain){
        this.store.get(domain).message_queue=[];
    }

    mark_open(domain){
        this.store.get(domain).status="open";
    }

    get(key) {
        return this.store.get(key);
    }

    has(key) {
        return this.store.has(key);
    }

    delete(key) {
        return this.store.delete(key);
    }

    clear() {
        this.store.clear();
    }
};


const cashier = new KeyValueStore();

export default cashier;