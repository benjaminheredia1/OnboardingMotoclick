import { contractHook } from "@/hooks/contract.hook";
import {type contract} from "@/lib/interfaces/contract.interface";


export const contractService = (data: contract) => {
    const { submitData } = contractHook();
    const submitContract = async () => {
        try {
            const response = await submitData(data);
            return response;
        } catch (error) {
            throw error;
        }
    };
    return { submitContract };
};