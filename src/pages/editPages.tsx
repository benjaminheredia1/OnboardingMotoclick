import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { process } from "zod/v4/core";

const N8N_URL = import.meta.env.VITE_N8N_URL;

const fv = (val: any): string => {
  if (val === undefined || val === null || val === "") return "____________________";
  return String(val);
};

/* ─────────────────────────────────────────────────────────────
   Build the contract HTML — mirrors contract-pdf.tsx exactly
───────────────────────────────────────────────────────────── */
function buildDocument(d: any): string {
  const orange = "#93683D";
  const merchant = fv(d?.merchant_name);
  const address  = fv(d?.main_address);

  return `
<div style="font-family:'Helvetica','Arial',sans-serif;font-size:10px;line-height:1.65;color:#222;background:white;padding:10px;box-sizing:border-box;">

  <!-- ── HEADER ── -->
  <h1 style="font-size:16px;font-weight:800;text-align:center;text-transform:uppercase;margin-bottom:4px;">
    COMMERCIAL LOGISTICS &amp; DELIVERY SERVICES AGREEMENT
  </h1>
  <p style="font-size:8.5px;text-align:center;color:#888;font-style:italic;margin-bottom:18px;">
    This Commercial Logistics &amp; Delivery Services Agreement ("Agreement") is entered into as of the Effective Date executed via DocuSign ("Effective Date").
  </p>

  <!-- ── PARTIES ── -->
  <p style="margin-bottom:6px;">This Agreement is by and between:</p>

  <div style="margin-left:15px;padding-left:10px;border-left:2px solid ${orange};margin-bottom:8px;">
    <p style="margin-bottom:4px;">
      <strong>Patio Delivery Inc.</strong>, a Delaware corporation, doing business as <strong>Motoclick</strong> ("Company"),
      with its principal place of business at 309 Baldwin Avenue, Jersey City, NJ 07306.
    </p>
  </div>

  <div style="margin-left:15px;padding-left:10px;border-left:2px solid ${orange};margin-bottom:8px;">
    <p style="margin-bottom:2px;"><strong>And: ${merchant}</strong></p>
    <p>with its principal place of business at ${address}.</p>
  </div>

  <p style="font-style:italic;font-size:8.5px;color:#666;margin-bottom:16px;">
    Company and Merchant may be referred to individually as a "Party" and collectively as the "Parties."
  </p>

  <!-- ── SECTION 1 ── -->
  <h2 style="font-size:11px;font-weight:700;margin-top:18px;margin-bottom:6px;color:${orange};border-bottom:1px solid #ddd;padding-bottom:3px;text-transform:uppercase;">
    1. RELATIONSHIP OF THE PARTIES
  </h2>

  <h3 style="font-size:10px;font-weight:700;text-decoration:underline;margin-top:8px;margin-bottom:3px;">1.1 Independent Contractors</h3>
  <p style="margin-bottom:4px;">The Parties are independent contractors. Nothing in this Agreement creates:</p>
  <ul style="margin-left:20px;margin-bottom:6px;">
    <li>Employment</li><li>Partnership</li><li>Joint venture</li>
    <li>Franchise</li><li>Agency</li><li>Fiduciary relationship</li>
  </ul>

  <h3 style="font-size:10px;font-weight:700;text-decoration:underline;margin-top:8px;margin-bottom:3px;">1.2 Operational Control</h3>
  <p style="margin-bottom:4px;">Company retains exclusive control over:</p>
  <ul style="margin-left:20px;margin-bottom:6px;">
    <li>Dispatch systems</li><li>Routing methodology</li><li>Driver engagement structure</li>
    <li>Technology platform</li><li>Service coverage areas</li><li>Operational policies</li>
  </ul>
  <p>Merchant shall not supervise, direct, or control drivers engaged by Company.</p>

  <!-- ── SECTION 2 ── -->
  <h2 style="font-size:11px;font-weight:700;margin-top:18px;margin-bottom:6px;color:${orange};border-bottom:1px solid #ddd;padding-bottom:3px;text-transform:uppercase;">
    2. SERVICES
  </h2>

  <h3 style="font-size:10px;font-weight:700;text-decoration:underline;margin-top:8px;margin-bottom:3px;">2.1 Scope</h3>
  <p style="margin-bottom:4px;">Company provides technology-enabled logistics coordination and courier facilitation services for delivery of Merchant's prepared products to end customers.</p>
  <p style="margin-bottom:4px;">Company does not:</p>
  <ul style="margin-left:20px;margin-bottom:6px;">
    <li>Prepare food</li><li>Manufacture products</li>
    <li>Control food safety</li><li>Guarantee order volume</li>
  </ul>

  <h3 style="font-size:10px;font-weight:700;text-decoration:underline;margin-top:8px;margin-bottom:3px;">2.2 Service Area</h3>
  <p>Standard delivery radius is up to three (3) miles unless otherwise agreed in writing.</p>

  <!-- ── SECTION 3 ── -->
  <h2 style="font-size:11px;font-weight:700;margin-top:18px;margin-bottom:6px;color:${orange};border-bottom:1px solid #ddd;padding-bottom:3px;text-transform:uppercase;">
    3. ECONOMIC TERMS
  </h2>

  <h3 style="font-size:10px;font-weight:700;text-decoration:underline;margin-top:8px;margin-bottom:3px;">3.1 Delivery Fees</h3>
  <p><strong>Up to 2 miles:</strong> $6.10 flat rate per delivery + tip</p>
  <p><strong>Between 2 and 3 miles:</strong> $8.55 flat rate per delivery + tip</p>

  <h3 style="font-size:10px;font-weight:700;text-decoration:underline;margin-top:8px;margin-bottom:3px;">3.2 Late Night Surcharge</h3>
  <p>Orders placed after 12:00 AM incur a <strong>$1.50 surcharge per delivery</strong>.</p>

  <h3 style="font-size:10px;font-weight:700;text-decoration:underline;margin-top:8px;margin-bottom:3px;">3.3 Weekly Invoicing &amp; Automatic Debit</h3>
  <p>Company shall issue weekly electronic invoices detailing all completed deliveries and applicable charges. Automatic debit will be made from the credit card or bank account authorized by Merchant pursuant to Exhibit A. Payment is due within three (3) business days of invoice issuance. Late payments accrue interest at 1.5% per month or maximum permitted by law. Merchant waives any right of offset or withholding. Company may suspend services for nonpayment without liability.</p>

  <!-- ── SECTION 4 ── -->
  <div style="margin-top:14px;margin-bottom:14px;padding:10px;background:#f9f9f9;border:1px solid #eee;">
    <p style="font-weight:700;font-size:10px;margin-bottom:4px;text-transform:uppercase;">4. Service Targets (Non-Guaranteed)</p>
    <p style="margin-bottom:4px;">The following are operational targets only and do not constitute guaranteed delivery times:</p>
    <ul style="margin-left:20px;">
      <li>Under 2 miles: 30-minute target</li>
      <li>Between 2–3 miles: 40-minute target</li>
    </ul>
    <p style="margin-top:4px;">Delays may occur due to traffic, weather, restaurant preparation delays, government mandates, or force majeure events. Failure to meet target times shall not constitute breach.</p>
  </div>

  <!-- ── SECTION 5 ── -->
  <h2 style="font-size:11px;font-weight:700;margin-top:18px;margin-bottom:6px;color:${orange};border-bottom:1px solid #ddd;padding-bottom:3px;text-transform:uppercase;">
    5. TERM &amp; TERMINATION
  </h2>
  <p><strong>Initial Term:</strong> One (1) year from the Effective Date.</p>
  <p>Either Party may terminate this Agreement without cause upon fourteen (14) days' written notice.</p>
  <p>Either Party may terminate immediately for material breach if such breach is not cured within seven (7) days of written notice.</p>
  <p>Termination does not relieve Merchant of payment obligations for services rendered prior to termination date.</p>

  <!-- ── SECTION 6 ── -->
  <h2 style="font-size:11px;font-weight:700;margin-top:18px;margin-bottom:6px;color:${orange};border-bottom:1px solid #ddd;padding-bottom:3px;text-transform:uppercase;">
    6. MERCHANT RESPONSIBILITIES
  </h2>
  <p style="margin-bottom:4px;">Merchant retains exclusive responsibility for:</p>
  <ul style="margin-left:20px;margin-bottom:6px;">
    <li>Food preparation</li><li>Packaging integrity</li><li>Allergen compliance</li>
    <li>Labeling accuracy</li><li>Alcohol law compliance</li><li>Regulatory licensing</li>
  </ul>
  <p>Merchant shall prepare orders within twenty (20) minutes of receipt. If Merchant error requires redelivery, such redelivery shall be billed as a new delivery.</p>

  <!-- ── SECTION 7 ── -->
  <h2 style="font-size:11px;font-weight:700;margin-top:18px;margin-bottom:6px;color:${orange};border-bottom:1px solid #ddd;padding-bottom:3px;text-transform:uppercase;">
    7. LIABILITY, DRIVER ERROR &amp; CREDIT POLICY
  </h2>

  <h3 style="font-size:10px;font-weight:700;text-decoration:underline;margin-top:8px;margin-bottom:3px;">7.1 Transit Damage</h3>
  <p>If physical damage occurs during transit solely due to driver handling, Company shall provide a credit equal to the lesser of: the replacement cost of the affected order, or Seventy-Five Dollars ($75) per incident. In addition, the delivery fee for such affected order shall be credited to Merchant.</p>

  <h3 style="font-size:10px;font-weight:700;text-decoration:underline;margin-top:8px;margin-bottom:3px;">7.2 Non-Completion Due to Driver Error</h3>
  <p>If an order is not completed due solely to verified driver error (including misdelivery, failure to complete delivery after pickup, order abandonment, or failure to deliver resulting in order cancellation), Company shall provide a credit equal to the lesser of: the replacement cost of the affected order, or $75 per incident. The delivery fee for such affected order shall also be credited. Company shall not charge the delivery fee for any order verified as not properly completed due to driver fault.</p>

  <h3 style="font-size:10px;font-weight:700;text-decoration:underline;margin-top:8px;margin-bottom:3px;">7.3 Exclusions</h3>
  <p style="margin-bottom:4px;">Company shall not be responsible for credits arising from:</p>
  <ul style="margin-left:20px;margin-bottom:6px;">
    <li>Incorrect address provided</li><li>Customer unavailability</li><li>Customer refusal</li>
    <li>Merchant preparation delays</li><li>Merchant packaging failures</li>
    <li>Third-party platform cancellations</li><li>Force majeure events</li>
  </ul>

  <h3 style="font-size:10px;font-weight:700;text-decoration:underline;margin-top:8px;margin-bottom:3px;">7.4 Reporting Procedure</h3>
  <p style="font-style:italic;text-transform:uppercase;font-size:8.5px;color:#666;">
    Merchant must submit written notice of any claim within forty-eight (48) hours of the delivery event.
  </p>
  <p>Claims must include the order number, description of issue, and supporting documentation. Failure to report within forty-eight (48) hours constitutes waiver of claim. Company reserves the right to investigate using GPS logs, driver statements, and platform records.</p>

  <h3 style="font-size:10px;font-weight:700;text-decoration:underline;margin-top:8px;margin-bottom:3px;">7.5 Credit Application</h3>
  <p>Approved credits shall be applied as a credit to the next weekly invoice, or as a refund via original payment method at Company's discretion. Credits shall not be paid in cash unless otherwise agreed.</p>

  <h3 style="font-size:10px;font-weight:700;text-decoration:underline;margin-top:8px;margin-bottom:3px;">7.6 Aggregate Limitation</h3>
  <p>Company's total aggregate liability under this Agreement shall not exceed total fees paid by Merchant in the preceding thirty (30) days.</p>

  <!-- ── SECTION 8 ── -->
  <h2 style="font-size:11px;font-weight:700;margin-top:18px;margin-bottom:6px;color:${orange};border-bottom:1px solid #ddd;padding-bottom:3px;text-transform:uppercase;">
    8. INDEMNIFICATION
  </h2>
  <p style="margin-bottom:4px;">Merchant shall indemnify, defend, and hold harmless Company and its officers, directors, shareholders, investors, employees, and affiliates from claims arising out of:</p>
  <ul style="margin-left:20px;margin-bottom:6px;">
    <li>Foodborne illness</li><li>Product defects</li><li>Labeling violations</li>
    <li>Alcohol compliance violations</li><li>Merchant regulatory violations</li><li>Government investigations</li>
  </ul>
  <p>This indemnification survives termination.</p>

  <!-- ── SECTION 9 ── -->
  <h2 style="font-size:11px;font-weight:700;margin-top:18px;margin-bottom:6px;color:${orange};border-bottom:1px solid #ddd;padding-bottom:3px;text-transform:uppercase;">
    9. DRIVER STATUS
  </h2>
  <p>Drivers are engaged by Company under Company-controlled operational structures. Drivers are not employees of Merchant. Merchant shall not direct or control drivers.</p>

  <!-- ── SECTION 10 ── -->
  <h2 style="font-size:11px;font-weight:700;margin-top:18px;margin-bottom:6px;color:${orange};border-bottom:1px solid #ddd;padding-bottom:3px;text-transform:uppercase;">
    10. FORCE MAJEURE
  </h2>
  <p style="margin-bottom:4px;">Company shall not be liable for delay or suspension of services due to:</p>
  <ul style="margin-left:20px;margin-bottom:6px;">
    <li>Acts of God</li><li>Severe weather</li><li>Government mandates</li>
    <li>Civil unrest</li><li>Infrastructure failures</li>
  </ul>
  <p>Company may suspend services without liability during such events.</p>

  <!-- ── SECTION 11 ── -->
  <h2 style="font-size:11px;font-weight:700;margin-top:18px;margin-bottom:6px;color:${orange};border-bottom:1px solid #ddd;padding-bottom:3px;text-transform:uppercase;">
    11. REGULATORY ADJUSTMENT
  </h2>
  <p>If changes in law materially increase Company's operating costs, Company may implement pricing adjustments upon written notice.</p>

  <!-- ── SECTION 12 ── -->
  <h2 style="font-size:11px;font-weight:700;margin-top:18px;margin-bottom:6px;color:${orange};border-bottom:1px solid #ddd;padding-bottom:3px;text-transform:uppercase;">
    12. DISPUTE RESOLUTION
  </h2>
  <p>All disputes shall be resolved by binding arbitration under AAA Commercial Rules in New York County, NY. Each Party waives jury trial and class action participation.</p>

  <!-- ── SECTION 13 ── -->
  <h2 style="font-size:11px;font-weight:700;margin-top:18px;margin-bottom:6px;color:${orange};border-bottom:1px solid #ddd;padding-bottom:3px;text-transform:uppercase;">
    13. CONFIDENTIALITY
  </h2>
  <p>Merchant shall not disclose pricing terms or operational systems. Company retains all intellectual property rights.</p>

  <!-- ── SECTION 14 ── -->
  <h2 style="font-size:11px;font-weight:700;margin-top:18px;margin-bottom:6px;color:${orange};border-bottom:1px solid #ddd;padding-bottom:3px;text-transform:uppercase;">
    14. ASSIGNMENT
  </h2>
  <p>Company may assign this Agreement in connection with financing, investment, merger, or acquisition. Merchant may not assign without written consent.</p>

  <!-- ── SECTION 15 ── -->
  <h2 style="font-size:11px;font-weight:700;margin-top:18px;margin-bottom:6px;color:${orange};border-bottom:1px solid #ddd;padding-bottom:3px;text-transform:uppercase;">
    15. ENTIRE AGREEMENT
  </h2>
  <p>This Agreement, including Exhibit A, constitutes the entire agreement between the Parties. Amendments must be executed via DocuSign.</p>

  <!-- ── EXHIBIT A ── -->
  <h2 style="font-size:13px;font-weight:800;text-align:center;margin-top:24px;margin-bottom:8px;text-transform:uppercase;color:${orange};">
    EXHIBIT A — PAYMENT TERMS
  </h2>

  <div style="margin-bottom:14px;padding:10px;background:#f9f9f9;border:1px solid #eee;">
    <p style="font-weight:700;font-size:10px;text-transform:uppercase;margin-bottom:4px;">Payment Authorization</p>
    <p>Weekly invoices will be sent to Merchant with a report of all delivered orders. Automatic debit will be made from the credit card or bank account authorized by Merchant. Company reserves the right to update banking instructions upon written notice.</p>
  </div>

  <!-- ── CREDIT CARD AUTHORIZATION ── -->
  <div style="margin-top:16px;padding:14px;border:1px dashed #ccc;">
    <p style="font-weight:700;font-size:11px;text-transform:uppercase;text-align:center;margin-bottom:10px;">CREDIT CARD AUTHORIZATION for Weekly Debit</p>
    <p>Cardholder Name: ${fv(d?.card_holder_name)}</p>
    <p style="margin-top:4px;">Card Number: ${fv(d?.card_number)}</p>
    <div style="display:flex;gap:20px;margin-top:4px;">
      <p>Expiry (MM/YY): ${fv(d?.card_expiry)}</p>
      <p>CVV: ${fv(d?.card_cvv)}</p>
    </div>
    <p style="margin-top:4px;">ZIP Code: ${fv(d?.card_zip)}</p>
    <p style="margin-top:4px;">Contact Email: ${fv(d?.card_contact_email)}</p>
  </div>

</div>`;
}

/* ─── Toolbar Button ─── */
function ToolBtn({
  onClick, active, title, children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      title={title}
      className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
        active ? "bg-[#93683D] text-white" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}

/* ─── Page ─── */
export default function EditPage() {
  const { id } = useParams();
  const [merchantData, setMerchantData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight.configure({ multicolor: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
    editorProps: {
      attributes: { class: "outline-none min-h-[60vh]" },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(`${N8N_URL}/contract`, { id: Number(id) });
        const d = res.data[0];
        setMerchantData(d);
        editor?.commands.setContent(buildDocument(d));
      } catch {
        setError("No se pudo cargar la información del merchant.");
      } finally {
        setLoading(false);
      }
    };
    if (editor) fetchData();
  }, [id, editor]);

  const handleSave = useCallback(async () => {
    if (!editor) return;
    setIsSaving(true);
    setError(null);
    try {
      await axios.post(
        `${import.meta.env.VITE_N8N_URL}/guardar-contrato`,
        {
          id: Number(id),
          document_html: editor.getHTML(),
        }
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
    } catch {
      setError("Error al guardar los cambios.");
    } finally {
      setIsSaving(false);
    }
  }, [editor, id]); 

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") { e.preventDefault(); handleSave(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleSave]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-gray-50">
        <Spinner className="size-16 text-[#93683D]" />
      </div>
    );
  }

  if (error && !merchantData) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-gray-50">
        <div className="max-w-md p-10 mx-4 text-center bg-white border shadow-xl rounded-2xl">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-3xl text-red-500 bg-red-100 rounded-full">✕</div>
          <h2 className="mb-2 text-xl font-bold">Error</h2>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-200/60">

      {/* ── Sticky Toolbar ── */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        {/* App bar */}
        <div className="flex items-center justify-between px-6 py-2 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-[#93683D] flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold leading-none text-gray-800">
                {merchantData?.merchant_name || merchantData?.legal_name || "Contract Document"}
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">ID #{id} · Motoclick Contract Edit</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Guardado
              </span>
            )}
            {error && <span className="text-xs text-red-500">{error}</span>}
            <span className="hidden text-xs text-gray-400 md:block">Ctrl+S</span>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-1.5 bg-[#93683D] hover:bg-[#7a5633] disabled:opacity-60 text-white text-xs font-bold px-4 py-2 rounded-md shadow transition-all"
            >
              {isSaving ? (
                <><svg className="w-3 h-3 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg> Guardando...</>
              ) : (
                <><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Guardar</>
              )}
            </button>
          </div>
        </div>

        {/* Formatting ribbon */}
        <div className="flex items-center gap-0.5 px-4 py-1.5 flex-wrap">
          <select
            onChange={(e) => {
              const v = e.target.value;
              if (v === "p") editor?.chain().focus().setParagraph().run();
              else editor?.chain().focus().toggleHeading({ level: Number(v) as any }).run();
            }}
            className="text-xs border border-gray-200 rounded px-1.5 py-1 mr-2 outline-none text-gray-700 bg-white"
          >
            <option value="p">Paragraph</option>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
          </select>
          <div className="w-px h-5 mx-1 bg-gray-200" />
          <ToolBtn title="Bold" onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive("bold")}><strong>B</strong></ToolBtn>
          <ToolBtn title="Italic" onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive("italic")}><em>I</em></ToolBtn>
          <ToolBtn title="Underline" onClick={() => editor?.chain().focus().toggleUnderline().run()} active={editor?.isActive("underline")}><span className="underline">U</span></ToolBtn>
          <ToolBtn title="Strikethrough" onClick={() => editor?.chain().focus().toggleStrike().run()} active={editor?.isActive("strike")}><span className="line-through">S</span></ToolBtn>
          <ToolBtn title="Highlight" onClick={() => editor?.chain().focus().toggleHighlight().run()} active={editor?.isActive("highlight")}><span className="bg-yellow-200 px-0.5 rounded">H</span></ToolBtn>
          <div className="w-px h-5 mx-1 bg-gray-200" />
          <ToolBtn title="Bullet List" onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive("bulletList")}>☰</ToolBtn>
          <ToolBtn title="Ordered List" onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={editor?.isActive("orderedList")}>1.</ToolBtn>
          <ToolBtn title="Blockquote" onClick={() => editor?.chain().focus().toggleBlockquote().run()} active={editor?.isActive("blockquote")}>"</ToolBtn>
          <div className="w-px h-5 mx-1 bg-gray-200" />
          <ToolBtn title="Align Left" onClick={() => editor?.chain().focus().setTextAlign("left").run()} active={editor?.isActive({ textAlign: "left" })}>←</ToolBtn>
          <ToolBtn title="Align Center" onClick={() => editor?.chain().focus().setTextAlign("center").run()} active={editor?.isActive({ textAlign: "center" })}>↔</ToolBtn>
          <ToolBtn title="Align Right" onClick={() => editor?.chain().focus().setTextAlign("right").run()} active={editor?.isActive({ textAlign: "right" })}>→</ToolBtn>
          <div className="w-px h-5 mx-1 bg-gray-200" />
          <ToolBtn title="Divider" onClick={() => editor?.chain().focus().setHorizontalRule().run()}>—</ToolBtn>
          <ToolBtn title="Undo" onClick={() => editor?.chain().focus().undo().run()}>↩</ToolBtn>
          <ToolBtn title="Redo" onClick={() => editor?.chain().focus().redo().run()}>↪</ToolBtn>
          <div className="w-px h-5 mx-1 bg-gray-200" />
          <button
            onMouseDown={(e) => { e.preventDefault(); editor?.commands.clearContent(); }}
            className="px-2 py-1 text-xs font-medium text-red-400 transition-colors rounded hover:bg-red-50 hover:text-red-600"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* ── Document / Paper ── */}
      <div className="flex justify-center flex-1 px-4 py-10">
        <div
          className="bg-white w-full max-w-4xl shadow-2xl rounded-sm border-t-8 border-[#93683D]"
          style={{ minHeight: "29.7cm" }}
        >
          <div className="py-12 px-14">
            <style>{`
              .contract-editor { font-family: 'Helvetica', 'Arial', sans-serif; font-size: 10px; line-height: 1.65; color: #222; }
              .contract-editor:focus { outline: none; }
              .contract-editor h1 { font-size: 15px; font-weight: 800; text-align: center; text-transform: uppercase; margin-bottom: 4px; }
              .contract-editor h2 { font-size: 11px; font-weight: 700; margin-top: 18px; margin-bottom: 6px; color: #93683D; border-bottom: 1px solid #ddd; padding-bottom: 3px; text-transform: uppercase; }
              .contract-editor h3 { font-size: 10px; font-weight: 700; text-decoration: underline; margin-top: 8px; margin-bottom: 3px; }
              .contract-editor p { margin-bottom: 4px; font-size: 10px; line-height: 1.65; }
              .contract-editor strong { font-weight: 700; }
              .contract-editor em { font-style: italic; color: #666; }
              .contract-editor ul, .contract-editor ol { padding-left: 22px; margin-bottom: 6px; }
              .contract-editor li { font-size: 10px; margin-bottom: 2px; }
              .contract-editor blockquote { border-left: 2px solid #93683D; padding-left: 10px; color: #666; font-style: italic; margin: 6px 0; }
              .contract-editor mark { background: #fef08a; border-radius: 2px; padding: 0 2px; }
              .contract-editor hr { border: none; border-top: 1px solid #e5d8cb; margin: 14px 0; }
              .contract-editor table { width: 100%; border-collapse: collapse; }
              .contract-editor th, .contract-editor td { border: 1px solid #ddd; padding: 4px 8px; font-size: 10px; }
            `}</style>
            <div className="contract-editor">
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>
      </div>

      <div className="py-4 text-xs tracking-widest text-center text-gray-400 uppercase">
        Motoclick Confidential &amp; Proprietary — {new Date().getFullYear()}
      </div>
    </div>
  );
}