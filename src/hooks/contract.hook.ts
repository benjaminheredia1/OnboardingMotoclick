import axios from "axios";
import { type contract } from "@/lib/interfaces/contract.interface";

export const contractHook = () => {
  const contractUrl = import.meta.env.VITE_N8N_URL + "/contract";
  const submitData = async (data: contract) => {
    try {
      const response = await axios.post(contractUrl, { ...data });
      return response;
    } catch (error) {
      throw error;
    }
  };
  return { submitData };
};

export const contractUploadHook = () => {
  const uploadUrl = import.meta.env.VITE_N8N_URL + "/contract/upload";

  const uploadContract = async (id: number, pdfBlob: Blob) => {
    try {
      const formData = new FormData();
      formData.append("id", String(id));
      formData.append("file", pdfBlob, "contract.pdf");

      const response = await axios.post(uploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  return { uploadContract };
};
