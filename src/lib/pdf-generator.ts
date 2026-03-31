import html2pdf from 'html2pdf.js';
import { template } from "./pdf-template";
import { type MotoclickClientOnboardingForm } from './interfaces/pdf.interface';

export const generatePdfBlob = async (data: MotoclickClientOnboardingForm) => {
    const template_generated = template(data);
    
    const options = { 
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: 'archivo.pdf',
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
    }
    
    const pdfBlob = await html2pdf().set(options).from(template_generated).output('blob');
    return pdfBlob;
}