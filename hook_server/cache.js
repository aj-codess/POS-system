import schedule from 'node-schedule';
import entry from "./hook_module/entry.js";

let inventory;

async function trigger_get_inventory() {

    try {

        console.log("Inventory Caching started at:", new Date());

        inventory=await entry.get_inventory();

        console.log("Inventory Caching completed at:", new Date());

    } catch (error) {

        console.error("Error caching", error);

    }

};

const job = schedule.scheduleJob('0 0 * * *', trigger_get_inventory);

export default {
    trigger_get_inventory
};