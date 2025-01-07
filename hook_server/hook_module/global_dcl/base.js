import axios from "axios";

const net=axios.create({
    baseURL:"http://localhost:3000/hook_module/action",
    timeout:5000,
    headers:{
        "Content-Type":"application/json"
    }
});

export default net;