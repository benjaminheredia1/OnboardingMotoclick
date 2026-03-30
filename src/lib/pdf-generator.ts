// @ts-ignore
import html2pdf from "html2pdf.js"

export function getPdfHtmlTemplate(data: any) {
    // We format arrays or empty data
    const formatValue = (val: any) => {
        if (Array.isArray(val)) return val.length > 0 ? val.join(', ') : 'None';
        return val ? val : 'N/A';
    };

    // Format operating hours from JSON string into a readable HTML table
    const formatOperatingHours = (jsonStr: any) => {
        try {
            const slots = typeof jsonStr === 'string' ? JSON.parse(jsonStr) : jsonStr;
            if (!Array.isArray(slots) || slots.length === 0) return 'N/A';
            let html = `<table class="hours-table">
                <thead><tr><th>Days</th><th>Open</th><th>Close</th><th>Valid Period</th></tr></thead>
                <tbody>`;
            slots.forEach((slot: any) => {
                const days = (slot.days && slot.days.length > 0) ? slot.days.join(', ') : 'No days selected';
                const open = slot.open || '—';
                const close = slot.close || '—';
                let period = '—';
                if (slot.valid_from || slot.valid_to) {
                    const from = slot.valid_from || '...';
                    const to = slot.valid_to || '...';
                    period = `${from} &rarr; ${to}`;
                }
                html += `<tr><td>${days}</td><td>${open}</td><td>${close}</td><td>${period}</td></tr>`;
            });
            html += '</tbody></table>';
            return html;
        } catch (e) {
            return formatValue(jsonStr);
        }
    };

    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>Onboarding Document - ${formatValue(data.trade_name)}</title>
    <style>
        @page { size: letter; margin: 1.5cm 1cm 1.5cm 2cm; }
        body { 
            font-family: 'Helvetica', 'Arial', sans-serif; 
            font-size: 13px; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            /* Padding as fallback for browsers that ignore @page margins in popups */
            padding: 1.5cm 1cm 1.5cm 2cm;
            background: white; 
        }
        .header {
            text-align: center;
            margin-bottom: 15px;
            /* To repeat on each page, we use a fixed element but need to wrap content with margin/padding */
        }
        .header img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 0 auto;
        }
        @media print {
            /* Keep header at top of each page if possible */
            .page-header {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                height: 80px;
                text-align: center;
                border-bottom: 2px solid #D5862F;
                background: white;
                z-index: 1000;
            }
            body {
                margin-top: 100px; /* Offset for repeating header */
            }
        }
        h2 { 
            font-size: 15px; 
            margin-top: 25px; 
            margin-bottom: 12px; 
            color: white; 
            background-color: #D5862F; 
            padding: 8px 12px;
            text-transform: uppercase;
        }
        .section {
            margin-bottom: 20px;
        }
        .grid-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px 30px;
        }
        .grid-full {
            grid-column: span 2;
        }
        .field {
            display: flex;
            flex-direction: column;
            border-bottom: 1px dotted #ccc;
            padding-bottom: 4px;
        }
        .label { 
            font-weight: bold; 
            font-size: 11px; 
            color: #555; 
            text-transform: uppercase;
        }
        .value { 
            font-size: 14px; 
            font-weight: 500;
            color: #000;
            margin-top: 4px;
            min-height: 18px;
        }
        .signature-block {
            margin-top: 50px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
        }
        .sig-line {
            border-top: 1px solid #000;
            padding-top: 5px;
            text-align: center;
            font-weight: bold;
            font-size: 12px;
        }
        .footer {
            margin-top: 40px;
            font-size: 10px;
            text-align: center;
            color: #999;
            border-top: 1px solid #eee;
            padding-top: 10px;
        }
        .hours-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 6px;
            font-size: 12px;
        }
        .hours-table th {
            background-color: #f5f5f5;
            text-align: left;
            padding: 6px 10px;
            border: 1px solid #ddd;
            font-size: 10px;
            text-transform: uppercase;
            color: #555;
            font-weight: bold;
        }
        .hours-table td {
            padding: 5px 10px;
            border: 1px solid #ddd;
            font-size: 13px;
        }
        .hours-table tr:nth-child(even) {
            background-color: #fafafa;
        }

        /* Print Specifics */
        @media print {
            body { padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .no-print { display: none; }
        }
    </style>
    </head>
    <body>
        <div class="no-print" style="background:#fff3cd; color:#856404; padding:15px; text-align:center; font-weight:bold; margin-bottom: 20px; border:1px solid #ffeeba;">
            Para guardar como PDF, selecciona "Guardar como PDF" en el menú "Destino" de la ventana de impresión (Ctrl+P / Cmd+P).
        </div>

        <div class="header">
            <img src="https://i.ibb.co/6P0D639/motoclick.png" alt="Motoclick Logo Banner">
        </div>
        <div class="footer">Document generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</div>
        
        <div class="section">
            <h2>A. Business Information</h2>
            <div class="grid-container">
                <div class="field"><span class="label">Legal Business Name</span><span class="value">${formatValue(data.legal_name)}</span></div>
                <div class="field"><span class="label">DBA / Trade Name</span><span class="value">${formatValue(data.trade_name)}</span></div>
                <div class="field"><span class="label">Primary Contact Name</span><span class="value">${formatValue(data.contact_name)}</span></div>
                <div class="field"><span class="label">Title / Role</span><span class="value">${formatValue(data.title_role)}</span></div>
                <div class="field"><span class="label">Email Address</span><span class="value">${formatValue(data.email)}</span></div>
                <div class="field"><span class="label">Phone Number</span><span class="value">${formatValue(data.phone)}</span></div>
                <div class="field"><span class="label">City / Borough</span><span class="value">${formatValue(data.city)}</span></div>
                <div class="field"><span class="label">ZIP Code</span><span class="value">${formatValue(data.zip_code)}</span></div>
                <div class="field"><span class="label">Number of Locations</span><span class="value">${formatValue(data.locations)}</span></div>
                <div class="field"><span class="label">Business Type</span><span class="value">${formatValue(data.business_type)}</span></div>
                <div class="field grid-full"><span class="label">Main Address</span><span class="value">${formatValue(data.address)}</span></div>
                <div class="field grid-full"><span class="label">Operating Hours</span><div class="value">${formatOperatingHours(data.operating_hours)}</div></div>
            </div>
        </div>

        <div class="section">
            <h2>B. Operational Profile</h2>
            <div class="grid-container">
                <div class="field"><span class="label">Average Orders / Day</span><span class="value">${formatValue(data.avg_orders)}</span></div>
                <div class="field"><span class="label">Average Ticket ($)</span><span class="value">${formatValue(data.avg_ticket)}</span></div>
                <div class="field"><span class="label">Peak Hours</span><span class="value">${formatValue(data.peak_hours)}</span></div>
                <div class="field"><span class="label">Own Delivery Drivers?</span><span class="value">${formatValue(data.own_drivers)}</span></div>
                <div class="field"><span class="label">Currently Self-Delivering?</span><span class="value">${formatValue(data.self_delivering)}</span></div>
                <div class="field"><span class="label">Currently Using 3PL?</span><span class="value">${formatValue(data.using_3pl)}</span></div>
                <div class="field grid-full"><span class="label">Current Pain Points</span><span class="value">${formatValue(data.pain_points)}</span></div>
            </div>
        </div>

        <div class="section">
            <h2>C. Current Channels & Tech</h2>
            <div class="grid-container">
                <div class="field"><span class="label">Active Delivery Platforms</span><span class="value">${formatValue(data.delivery_platforms)}</span></div>
                <div class="field"><span class="label">POS / Middleware System</span><span class="value">${formatValue(data.pos_system)}</span></div>
                <div class="field"><span class="label">Own Website with Orders?</span><span class="value">${formatValue(data.own_website)}</span></div>
                <div class="field"><span class="label">Own App?</span><span class="value">${formatValue(data.own_app)}</span></div>
            </div>
        </div>

        <div class="section">
            <h2>D. Motoclick Integration</h2>
            <div class="grid-container">
                <div class="field"><span class="label">Service Type</span><span class="value">${formatValue(data.service_type)}</span></div>
                <div class="field"><span class="label">Target Go Live Date</span><span class="value">${formatValue(data.go_live)}</span></div>
                <div class="field grid-full"><span class="label">Main Problem to Solve</span><span class="value">${formatValue(data.main_problem)}</span></div>
            </div>
        </div>

        <div class="section">
            <h2>E. Billing & Payment Information</h2>
            <div class="grid-container">
                <div class="field"><span class="label">Legal Name for Contract</span><span class="value">${formatValue(data.contract_name)}</span></div>
                <div class="field"><span class="label">EIN / Tax ID</span><span class="value">${formatValue(data.ein_tax_id)}</span></div>
                <div class="field grid-full"><span class="label">Billing Address</span><span class="value">${formatValue(data.billing_address)}</span></div>
                <div class="field grid-full"><span class="label">Authorized Signatory</span><span class="value">${formatValue(data.authorized_signatory)}</span></div>
            </div>
            <p style="font-size: 11px; color:#555; margin-top: 10px;"><i>Note: Card details are collected securely via DocuSign, not via this onboarding form. Weekly automatic debit is applied every Monday.</i></p>
        </div>

        <div class="section">
            <h2>F. Communication Preferences</h2>
            <div class="grid-container">
                <div class="field"><span class="label">Preferred Channel</span><span class="value">${formatValue(data.comm_channel)}</span></div>
                <div class="field grid-full"><span class="label">Additional Notes</span><span class="value">${formatValue(data.notes)}</span></div>
            </div>
        </div>

        <div class="signature-block">
            <div>
                <br><br><br>
                <div class="sig-line">Signature - ${formatValue(data.authorized_signatory)}</div>
                <div style="text-align: center; font-size: 10px; margin-top:3px;">Authorized Signatory</div>
            </div>
            <div>
                <br><br><br>
                <div class="sig-line">Date</div>
            </div>
        </div>

        <div class="footer">Motoclick Internal Document - Confidential & Proprietary</div>
    </body>
    </html>
    `;

    return htmlTemplate;
}

export function openPdfPreview(data: any) {
    const htmlTemplate = getPdfHtmlTemplate(data);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(htmlTemplate);
        printWindow.document.close();
    } else {
        alert("Please allow popups for this website to generate PDFs.");
    }
}

export async function generatePdfBlob(data: any): Promise<Blob | null> {
    const htmlTemplate = getPdfHtmlTemplate(data);
    const cleanHtml = htmlTemplate.replace(/<div class="no-print"[\\s\\S]*?<\/div>/, '');

    return new Promise((resolve) => {
        const iframe = document.createElement('iframe');
        iframe.style.position = 'fixed';
        iframe.style.width = '800px';
        iframe.style.height = '1120px';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.zIndex = '-9999';
        document.body.appendChild(iframe);

        iframe.contentWindow?.document.open();
        iframe.contentWindow?.document.write(cleanHtml);
        iframe.contentWindow?.document.close();

        setTimeout(async () => {
            const opt = {
                margin:       [0.5, 0, 0.5, 0] as [number, number, number, number],
                filename:     'onboarding.pdf',
                image:        { type: 'jpeg' as const, quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true, windowWidth: 800 },
                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' as const }
            };

            try {
                const element = iframe.contentWindow?.document.body;
                if (!element) throw new Error("Iframe body not found");
                const worker = html2pdf().set(opt).from(element);
                const pdfBlob = await worker.output('blob');
                
                document.body.removeChild(iframe);
                resolve(pdfBlob);
            } catch (err) {
                console.error('Error generating PDF blob:', err);
                if (document.body.contains(iframe)) {
                    document.body.removeChild(iframe);
                }
                resolve(null);
            }
        }, 1200); 
    });
}
