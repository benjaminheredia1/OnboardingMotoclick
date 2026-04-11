import { useParams } from "react-router-dom";
import {
  contractService,
  contractUploadService,
} from "@/services/contract.service";
import { useEffect, useState, useRef } from "react";
import { Spinner } from "@/components/ui/spinner";
import { ContractPDF } from "@/lib/contract-pdf";
import { pdf } from "@react-pdf/renderer";
import SignatureCanvas from "react-signature-canvas";

export default function ContractPage() {
  const { id } = useParams();
  const [dataState, useDataState] = useState<any>(null);
  const [cardInfo, setCardInfo] = useState({
    card_holder_name: "",
    card_number: "",
    card_expiry: "",
    card_cvv: "",
    card_zip: "",
    card_contact_email: "",
  });
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [cardError, setCardError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const sigCanvas = useRef<any>(null);

  const { submitContract } = contractService({ id: Number(id) });
  const { sendContract } = contractUploadService();

  const handleDownloadPDF = async () => {
    if (!dataState) return;

    const {
      card_holder_name,
      card_number,
      card_expiry,
      card_cvv,
      card_zip,
      card_contact_email,
    } = cardInfo;
    if (
      !card_holder_name ||
      !card_number ||
      !card_expiry ||
      !card_cvv ||
      !card_zip ||
      !card_contact_email
    ) {
      setCardError("All credit card fields are required before downloading.");
      return;
    }
    setCardError(null);

    let currentSignature = signatureData;
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      currentSignature = sigCanvas.current.getCanvas().toDataURL("image/png");
    }

    const blob = await pdf(
      <ContractPDF
        data={{ ...dataState, ...cardInfo, signature_data: currentSignature }}
      />,
    ).toBlob();

    try {
      setIsSending(true);
      await sendContract(Number(id), blob);
      localStorage.setItem(`contract_sent_${id}`, "true");
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error sending contract to webhook:", err);
    } finally {
      setIsSending(false);
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "contract.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleContract = async () => {
    try {
      const response = await submitContract();
      useDataState(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const saveSignature = () => {
    if (sigCanvas.current) {
      setSignatureData(sigCanvas.current.getCanvas().toDataURL("image/png"));
    }
  };

  const clearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      setSignatureData(null);
    }
  };

  useEffect(() => {
    if (localStorage.getItem(`contract_sent_${id}`)) {
      setIsSubmitted(true);
      return;
    }
    handleContract();
  }, []);

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-gray-50">
        <div className="bg-white p-10 rounded-2xl shadow-xl border text-center max-w-md mx-4">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
            ✓
          </div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900">
            ¡Muchas Gracias!
          </h2>
          <p className="text-gray-600 mb-2">
            Tu contrato ha sido enviado exitosamente.
          </p>
          <p className="text-gray-400 text-sm">
            Un representante de Motoclick se pondrá en contacto contigo pronto.
          </p>
        </div>
      </div>
    );
  }

  if (!dataState) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-gray-50">
        <Spinner className="size-16 text-[#93683D]" />
      </div>
    );
  }

  const merchantName = dataState.merchant_name || "___________________________";
  const merchantAddress = dataState.main_address || "___________________________";

  return (
    <div className="relative flex justify-center w-full min-h-screen p-4 overflow-y-auto bg-gray-100/30 md:p-8">
      {/* Paper Document Container */}
      <div className="relative z-10 w-full max-w-4xl bg-white shadow-2xl rounded-sm p-8 md:p-16 text-gray-800 font-serif leading-relaxed text-sm md:text-base border-t-8 border-[#93683D]">

        {/* ── CONTRACT BODY: custom HTML if saved, otherwise default ── */}
        {dataState.html ? (
          /* Custom HTML saved from the editor */
          <div
            className="mb-12"
            dangerouslySetInnerHTML={{ __html: dataState.html }}
            style={{
              fontFamily: "'Helvetica', 'Arial', sans-serif",
              fontSize: "13px",
              lineHeight: "1.65",
              color: "#222",
            }}
          />
        ) : (
          /* Default hardcoded contract layout */
          <>
            <header className="pb-8 mb-12 border-b">
              <h1 className="mb-2 text-2xl font-bold tracking-tight text-center text-gray-900 uppercase md:text-3xl">
                COMMERCIAL LOGISTICS &amp; DELIVERY SERVICES AGREEMENT
              </h1>
              <p className="text-sm italic text-center text-gray-400">
                This Commercial Logistics &amp; Delivery Services Agreement
                ("Agreement") is entered into as of the Effective Date executed via
                DocuSign...
              </p>
            </header>

            <section className="mb-10 space-y-4">
              <p>This Agreement is by and between:</p>
              <div className="py-2 pl-4 space-y-4 border-l-4 border-gray-100">
                <p>
                  <strong>Patio Delivery Inc.</strong>, a Delaware corporation,
                  doing business as <strong>Motoclick</strong> ("Company"), with its
                  principal place of business at 309 Baldwin Avenue, Jersey City, NJ
                  07306.
                </p>
                <p className="flex flex-col gap-2 sm:flex-row sm:items-baseline">
                  <strong>And:</strong>
                  <span className="border-b border-gray-400 px-2 min-w-[200px] font-bold text-[#93683D]">
                    {merchantName}
                  </span>
                </p>
                <p className="flex flex-col gap-2 sm:flex-row sm:items-baseline">
                  <strong>With principal place of business at:</strong>
                  <span className="border-b border-gray-400 px-2 min-w-[200px] font-bold text-[#93683D]">
                    {merchantAddress}
                  </span>
                </p>
              </div>
              <p className="mt-4 text-sm italic text-gray-500">
                Company and Merchant may be referred to individually as a "Party"
                and collectively as the "Parties."
              </p>
            </section>

            <div className="space-y-8">
              {/* Section 1 */}
              <div>
                <h2 className="text-lg font-bold uppercase border-b mb-4 text-[#93683D]">
                  1. RELATIONSHIP OF THE PARTIES
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-1 font-bold underline">
                      1.1 Independent Contractors
                    </h3>
                    <p>
                      The Parties are independent contractors. Nothing in this
                      Agreement creates employment, partnership, joint venture,
                      franchise, agency, or fiduciary relationship.
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold underline">
                      1.2 Operational Control
                    </h3>
                    <p>
                      Company retains exclusive control over dispatch systems,
                      routing methodology, driver engagement structure, technology
                      platform, service coverage areas, and operational policies.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <h2 className="text-lg font-bold uppercase border-b mb-4 text-[#93683D]">
                  2. SERVICES
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-1 font-bold underline">2.1 Scope</h3>
                    <p>
                      Company provides technology-enabled logistics coordination and
                      courier facilitation services for delivery of Merchant's
                      prepared products to end customers. Company does not prepare
                      food or control food safety.
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold underline">2.2 Service Area</h3>
                    <p>
                      Standard delivery radius is up to three (3) miles unless
                      otherwise agreed in writing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <h2 className="text-lg font-bold uppercase border-b mb-4 text-[#93683D]">
                  3. ECONOMIC TERMS
                </h2>
                <div className="space-y-2">
                  <p>
                    <strong>3.1 Delivery Fees:</strong> $6.10 flat rate per delivery
                    (up to 2 miles) + tip; $8.55 flat rate (between 2 and 3 miles) +
                    tip.
                  </p>
                  <p>
                    <strong>3.2 Late Night Surcharge:</strong> Orders after 12:00 AM
                    incur a $1.50 surcharge.
                  </p>
                  <p>
                    <strong>3.3 Weekly Invoicing &amp; Automatic Debit:</strong> Company
                    shall issue weekly electronic invoices. Automatic debit will be
                    made from the authorized credit card or bank account.
                  </p>
                </div>
              </div>

              {/* Section 4 & 5 */}
              <div className="p-6 text-sm rounded-md bg-gray-50">
                <h2 className="mb-2 font-bold uppercase text-md">
                  Operational Targets &amp; Termination
                </h2>
                <p>
                  <strong>Targets:</strong> Under 2 miles: 30-min; 2–3 miles: 40-min
                  (Operational targets only, non-guaranteed).
                </p>
                <p className="mt-2 text-xs italic">
                  Either Party may terminate this Agreement without cause upon
                  fourteen (14) days' written notice.
                </p>
              </div>

              {/* Section 7 */}
              <div>
                <h2 className="text-lg font-bold uppercase border-b mb-4 text-[#93683D]">
                  7. LIABILITY &amp; DRIVER ERROR
                </h2>
                <p className="mb-4">
                  Company shall provide a credit (up to $75 per incident) if an
                  order is physically damaged or not completed due solely to
                  verified driver error.
                </p>
                <p className="font-sans text-xs italic text-gray-500 uppercase">
                  **Merchant must submit written notice of any claim within
                  forty-eight (48) hours of the delivery event.**
                </p>
              </div>
            </div>
          </>
        )}

        {/* ── CREDIT CARD AUTHORIZATION (always shown) ── */}
        <div className="p-6 mt-12 border-2 border-gray-200 border-dashed rounded-lg bg-zinc-50/50">
          <h3 className="mb-6 font-bold tracking-widest text-center text-gray-800 uppercase border-b pb-2">
            CREDIT CARD AUTHORIZATION
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-sm">
            <div className="flex flex-col gap-1">
              <label className="font-bold text-xs text-gray-500 uppercase">
                Nombre del titular de la tarjeta
              </label>
              <input
                type="text"
                className="border-b border-gray-300 focus:border-[#93683D] outline-none bg-transparent py-1 transition-colors"
                value={cardInfo.card_holder_name}
                onChange={(e) =>
                  setCardInfo({
                    ...cardInfo,
                    card_holder_name: e.target.value,
                  })
                }
                placeholder="Full Name"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-xs text-gray-500 uppercase">
                Número de tarjeta
              </label>
              <input
                type="text"
                className="border-b border-gray-300 focus:border-[#93683D] outline-none bg-transparent py-1 transition-colors"
                value={cardInfo.card_number}
                onChange={(e) =>
                  setCardInfo({ ...cardInfo, card_number: e.target.value })
                }
                placeholder="0000 0000 0000 0000"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-xs text-gray-500 uppercase">
                Fecha de vencimiento (MM/AA)
              </label>
              <input
                type="text"
                className="border-b border-gray-300 focus:border-[#93683D] outline-none bg-transparent py-1 transition-colors"
                value={cardInfo.card_expiry}
                onChange={(e) =>
                  setCardInfo({ ...cardInfo, card_expiry: e.target.value })
                }
                placeholder="MM/YY"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-xs text-gray-500 uppercase">
                CVV
              </label>
              <input
                type="text"
                className="border-b border-gray-300 focus:border-[#93683D] outline-none bg-transparent py-1 transition-colors"
                value={cardInfo.card_cvv}
                onChange={(e) =>
                  setCardInfo({ ...cardInfo, card_cvv: e.target.value })
                }
                placeholder="123"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-xs text-gray-500 uppercase">
                ZIP Code
              </label>
              <input
                type="text"
                className="border-b border-gray-300 focus:border-[#93683D] outline-none bg-transparent py-1 transition-colors"
                value={cardInfo.card_zip}
                onChange={(e) =>
                  setCardInfo({ ...cardInfo, card_zip: e.target.value })
                }
                placeholder="00000"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-xs text-gray-500 uppercase">
                Email de contacto (Notificaciones)
              </label>
              <input
                type="email"
                className="border-b border-gray-300 focus:border-[#93683D] outline-none bg-transparent py-1 transition-colors"
                value={cardInfo.card_contact_email}
                onChange={(e) =>
                  setCardInfo({
                    ...cardInfo,
                    card_contact_email: e.target.value,
                  })
                }
                placeholder="email@example.com"
              />
            </div>
          </div>
        </div>

        {/* ── SIGNATURE BLOCK (always shown) ── */}
        <section className="pt-10 mt-16 border-t-2 border-gray-200 border-double">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="space-y-8">
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                Company Signature
              </p>
              <div className="flex items-end h-16">
                <span className="font-serif text-2xl italic text-gray-400 select-none">
                  /s/ Patio Delivery Inc.
                </span>
              </div>
              <div className="pt-2 text-xs border-t border-gray-300">
                <p>Motoclick Authorized Representative</p>
                <p>{new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="font-bold text-[#93683D] uppercase text-xs tracking-widest">
                Firma del titular
              </p>
              <div className="border border-dashed border-gray-400 rounded bg-gray-50/50 overflow-hidden">
                <SignatureCanvas
                  ref={sigCanvas}
                  penColor="black"
                  canvasProps={{
                    className: "sigCanvas w-full h-32 cursor-crosshair",
                    width: 400,
                    height: 128,
                  }}
                  onEnd={saveSignature}
                />
              </div>
              <div className="flex justify-between items-start px-1 pt-2 border-t border-gray-900">
                <div>
                  <button
                    onClick={clearSignature}
                    className="text-[10px] text-gray-400 uppercase hover:text-red-500 transition-colors font-sans"
                  >
                    Clear Signature
                  </button>
                </div>
                <div className="text-right text-xs">
                  <p className="font-bold uppercase">{merchantName}</p>
                  <p className="text-gray-500">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {cardError && (
          <div className="mt-8 mx-auto max-w-md text-center bg-red-50 text-red-600 p-3 rounded-lg border border-red-200 text-sm font-sans">
            {cardError}
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDownloadPDF}
            disabled={isSending}
            className="bg-[#93683D] hover:bg-[#7a5633] disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all flex items-center gap-2"
          >
            <span>
              {isSending ? "Enviando..." : "Enviar y Descargar Contrato"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
          </button>
        </div>
        <footer className="mt-16 text-center text-xs text-gray-400 font-sans uppercase tracking-[0.2em] pt-8 border-t">
          Motoclick Confidential &amp; Proprietary - 2026
        </footer>
      </div>
    </div>
  );
}
