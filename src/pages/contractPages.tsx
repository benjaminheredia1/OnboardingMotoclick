import { useParams } from "react-router-dom";
import { contractService } from "@/services/contract.service";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { ParticlesBackground } from "@/components/ParticlesBackground";

export default function ContractPage() {
  const { id } = useParams();
  const [dataState, useDataState] = useState<any>(null);
  const { submitContract } = contractService({ id: Number(id) });

  const handleContract = async () => {
    try {
      const response = await submitContract();
      useDataState(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleContract();
  }, []);

  if (!dataState) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-50">
        <ParticlesBackground />
        <Spinner className="size-16 text-[#93683D]" />
      </div>
    );
  }

  const merchantName = dataState.merchant_name || "___________________________";
  const merchantAddress = dataState.main_address || "___________________________";

  return (
    <div className="relative min-h-screen w-full overflow-y-auto bg-gray-100/30 p-4 md:p-8 flex justify-center">
      <ParticlesBackground />
      
      {/* Paper Document Container */}
      <div className="relative z-10 w-full max-w-4xl bg-white shadow-2xl rounded-sm p-8 md:p-16 text-gray-800 font-serif leading-relaxed text-sm md:text-base border-t-8 border-[#93683D]">
        
        <header className="mb-12 border-b pb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center uppercase tracking-tight text-gray-900 mb-2">
            COMMERCIAL LOGISTICS & DELIVERY SERVICES AGREEMENT
          </h1>
          <p className="text-center text-sm text-gray-400 italic">
            This Commercial Logistics & Delivery Services Agreement (“Agreement”) is entered into as of the Effective Date executed via DocuSign...
          </p>
        </header>

        <section className="mb-10 space-y-4">
          <p>
            This Agreement is by and between:
          </p>
          <div className="pl-4 border-l-4 border-gray-100 py-2 space-y-4">
            <p>
              <strong>Patio Delivery Inc.</strong>, a Delaware corporation, doing business as <strong>Motoclick</strong> (“Company”), with its principal place of business at 309 Baldwin Avenue, Jersey City, NJ 07306.
            </p>
            <p className="flex flex-col sm:flex-row sm:items-baseline gap-2">
              <strong>And:</strong> 
              <span className="border-b border-gray-400 px-2 min-w-[200px] font-bold text-[#93683D]">
                {merchantName}
              </span>
            </p>
            <p className="flex flex-col sm:flex-row sm:items-baseline gap-2">
              <strong>With principal place of business at:</strong>
              <span className="border-b border-gray-400 px-2 min-w-[200px] font-bold text-[#93683D]">
                {merchantAddress}
              </span>
            </p>
          </div>
          <p className="text-sm italic text-gray-500 mt-4">
            Company and Merchant may be referred to individually as a “Party” and collectively as the “Parties.”
          </p>
        </section>

        <div className="space-y-8">
          {/* Section 1 */}
          <div>
            <h2 className="text-lg font-bold uppercase border-b mb-4 text-[#93683D]">1. RELATIONSHIP OF THE PARTIES</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold underline mb-1">1.1 Independent Contractors</h3>
                <p>The Parties are independent contractors. Nothing in this Agreement creates employment, partnership, joint venture, franchise, agency, or fiduciary relationship.</p>
              </div>
              <div>
                <h3 className="font-bold underline mb-1">1.2 Operational Control</h3>
                <p>Company retains exclusive control over dispatch systems, routing methodology, driver engagement structure, technology platform, service coverage areas, and operational policies.</p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-lg font-bold uppercase border-b mb-4 text-[#93683D]">2. SERVICES</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold underline mb-1">2.1 Scope</h3>
                <p>Company provides technology-enabled logistics coordination and courier facilitation services for delivery of Merchant’s prepared products to end customers. Company does not prepare food or control food safety.</p>
              </div>
              <div>
                <h3 className="font-bold underline mb-1">2.2 Service Area</h3>
                <p>Standard delivery radius is up to three (3) miles unless otherwise agreed in writing.</p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-lg font-bold uppercase border-b mb-4 text-[#93683D]">3. ECONOMIC TERMS</h2>
            <div className="space-y-2">
              <p><strong>3.1 Delivery Fees:</strong> $6.10 flat rate per delivery (up to 2 miles) + tip; $8.55 flat rate (between 2 and 3 miles) + tip.</p>
              <p><strong>3.2 Late Night Surcharge:</strong> Orders after 12:00 AM incur a $1.50 surcharge.</p>
              <p><strong>3.3 Weekly Invoicing & Automatic Debit:</strong> Company shall issue weekly electronic invoices. Automatic debit will be made from the authorized credit card or bank account.</p>
            </div>
          </div>

          {/* Section 4 & 5 simplified for brevity in UI but showing key terms */}
          <div className="bg-gray-50 p-6 rounded-md text-sm">
            <h2 className="text-md font-bold uppercase mb-2">Operational Targets & Termination</h2>
            <p><strong>Targets:</strong> Under 2 miles: 30-min; 2–3 miles: 40-min (Operational targets only, non-guaranteed).</p>
            <p className="mt-2 text-xs italic">Either Party may terminate this Agreement without cause upon fourteen (14) days’ written notice.</p>
          </div>

          {/* Section 7 - Liability (The important part for merchants) */}
          <div>
            <h2 className="text-lg font-bold uppercase border-b mb-4 text-[#93683D]">7. LIABILITY & DRIVER ERROR</h2>
            <p className="mb-4">Company shall provide a credit (up to $75 per incident) if an order is physically damaged or not completed due solely to verified driver error.</p>
            <p className="text-xs text-gray-500 italic font-sans uppercase">**Merchant must submit written notice of any claim within forty-eight (48) hours of the delivery event.**</p>
          </div>

          {/* Exhibit A Highlight */}
          <div className="border-2 border-dashed border-gray-200 p-6 rounded-lg mt-12 bg-zinc-50/50">
            <h3 className="text-center font-bold uppercase mb-4 tracking-widest text-gray-400">EXHIBIT A - BANKING INFO</h3>
            <div className="grid grid-cols-2 gap-y-2 text-sm italic">
              <span className="font-bold">Bank:</span> <span>Citibank</span>
              <span className="font-bold">Account Name:</span> <span>Patio Delivery Inc.</span>
              <span className="font-bold">Account Number:</span> <span>6873788682</span>
              <span className="font-bold">Routing Number:</span> <span>021-000-089</span>
            </div>
          </div>
        </div>

        {/* Dynamic Signature Block */}
        <section className="mt-20 pt-10 border-t-2 border-double border-gray-200">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                 <p className="font-bold text-gray-400 uppercase text-xs tracking-widest">Company Signature</p>
                 <div className="h-16 flex items-end">
                    <span className="font-serif italic text-2xl text-gray-400 selection:bg-none select-none">
                       /s/ Patio Delivery Inc.
                    </span>
                 </div>
                 <div className="border-t border-gray-300 pt-2 text-xs">
                    <p>Motoclick Authorized Representative</p>
                    <p>{new Date().toLocaleDateString()}</p>
                 </div>
              </div>

              <div className="space-y-8">
                 <p className="font-bold text-[#93683D] uppercase text-xs tracking-widest">Merchant Signature</p>
                 <div className="h-16 flex flex-col justify-end bg-gray-50/50 rounded p-2 italic text-gray-400 border border-dashed text-sm">
                    {merchantName} <br />
                    (Digitally Authorized via Log)
                 </div>
                 <div className="border-t border-gray-900 pt-2 text-xs">
                    <p className="font-bold uppercase">{merchantName}</p>
                    <p>{new Date().toLocaleDateString()}</p>
                 </div>
              </div>
           </div>
        </section>

        <footer className="mt-16 text-center text-xs text-gray-400 font-sans uppercase tracking-[0.2em] pt-8 border-t">
           Motoclick Confidential & Proprietary - 2026
        </footer>
      </div>
    </div>
  );
}
