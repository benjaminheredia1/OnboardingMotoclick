import { contractHook, contractUploadHook } from "@/hooks/contract.hook";
import { type contract } from "@/lib/interfaces/contract.interface";

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

export const contractUploadService = () => {
  const { uploadContract } = contractUploadHook();

  const sendContract = async (id: number, pdfBlob: Blob) => {
    try {
      const response = await uploadContract(id, pdfBlob);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return { sendContract };
};