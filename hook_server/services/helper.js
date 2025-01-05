import generateUniqueId from 'generate-unique-id';

import manager from "./manager.js";

const gen_id=()=>{

    return generateUniqueId({
        excludeSymbols: ['0'],
        length:6
      });

};


const isCSH=(inputString)=>{

    if (typeof inputString !== 'string') {
        return false;
    }
    return inputString.includes("CSH");

};


const isCLT=(inputString)=>{

    if (typeof inputString !== 'string') {
        return false;
    }
    return inputString.includes("CLT");

};


const target_getter=(id)=>{

    if (id.length > 0) {
        return id[id.length - 1];
    };

};



const endpoint_id=(id)=>{

    const end=target_getter(id);

    return manager.get_endpoint_id(end);

};


export default {
    gen_id,
    isCSH,
    isCLT,
    endpoint_id
}