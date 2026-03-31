import axios from "axios";
import {type contract} from "@/lib/interfaces/contract.interface";

export const contractHook = () => {
    const contractUrl = import.meta.env.VITE_N8N_URL + "/contract";
    const submitData = async (data: contract) => {
        try {
            const response = await axios.post(contractUrl, {...data});
            return response;
        } catch (error) {
            throw error;
        }
    };
    return { submitData };
};
