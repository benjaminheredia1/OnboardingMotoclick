import logoHeader from "@/assets/header.png";

const formatValue = (val: any) => {
  if (val === undefined || val === null || val === "") return "N/A";
  if (typeof val === "boolean") return val ? "Sí" : "No";
  // Pequeña mejora para que los arreglos vacíos (como delivery_platforms) se vean bien
  if (Array.isArray(val)) return val.length > 0 ? val.join(", ") : "N/A";
  return val;
};

// Le ponemos 'any' por ahora para que no pelee con tu antigua interfaz
export const template = (data: any) => {
  // Variables de estilo (Colores más apagados y fuentes más grandes/gruesas)
  const mutedOrange = "#93683D";
  const h2Style = `font-size: 17px; font-weight: 700; margin-top: 25px; margin-bottom: 12px; color: white; background-color: ${mutedOrange}; padding: 10px 15px; text-transform: uppercase;`;
  const containerStyle =
    "display: flex; flex-wrap: wrap; justify-content: space-between;";
  const fieldHalfStyle =
    "width: 47%; margin-bottom: 20px; display: flex; flex-direction: column; border-bottom: 1px solid #eee; padding-bottom: 6px;";
  const fieldFullStyle =
    "width: 100%; margin-bottom: 20px; display: flex; flex-direction: column; border-bottom: 1px solid #eee; padding-bottom: 6px;";
  const labelStyle =
    "font-weight: 700; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;";
  const valueStyle =
    "font-size: 16px; font-weight: 600; color: #1a1a1a; margin-top: 6px; min-height: 22px;";

  const signatureBlockStyle =
    "margin-top: 60px; display: flex; justify-content: space-between; width: 100%;";
  const sigColumnStyle =
    "width: 45%; display: flex; flex-direction: column; align-items: center;";
  const sigLineStyle =
    "border-top: 2px solid #333; padding-top: 8px; text-align: center; font-weight: 700; font-size: 14px; width: 100%;";
  const sigSubTextStyle =
    "text-align: center; font-size: 11px; margin-top: 5px; color: #666; font-weight: 500;";

  return `
    <div style="font-family: 'Helvetica', 'Arial', sans-serif; font-size: 15px; line-height: 1.6; color: #222; background: white; padding: 30px; box-sizing: border-box; width: 100%; font-weight: 500;">
        
        <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 25px; width: 100%;">
            <img src="${logoHeader}" alt="Header Logo" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">
        </div>

        <h1 style="text-align: center; color: ${mutedOrange}; margin-top: 0; font-size: 26px; font-weight: 800;">Motoclick Onboarding Form</h1>

        <h2 style="${h2Style}">A. Business Information</h2>
        <div style="${containerStyle}">
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Legal Business Name</span><span style="${valueStyle}">${formatValue(data.legal_name)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">DBA / Trade Name</span><span style="${valueStyle}">${formatValue(data.dba_name)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Primary Contact Name</span><span style="${valueStyle}">${formatValue(data.primary_contact_name)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Title / Role</span><span style="${valueStyle}">${formatValue(data.title_role)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Email Address</span><span style="${valueStyle}">${formatValue(data.email_address)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Phone Number</span><span style="${valueStyle}">${formatValue(data.phone_number)}</span></div>
            <div style="${fieldFullStyle}"><span style="${labelStyle}">Main Address</span><span style="${valueStyle}">${formatValue(data.main_address)}</span></div>
        </div>

        <h2 style="${h2Style}">B. Operational Profile</h2>
        <div style="${containerStyle}">
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Average Orders / Day</span><span style="${valueStyle}">${formatValue(data.avg_orders)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Average Ticket ($)</span><span style="${valueStyle}">${formatValue(data.avg_ticket)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Own Delivery Drivers?</span><span style="${valueStyle}">${formatValue(data.own_drivers)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Currently Self-Delivering?</span><span style="${valueStyle}">${formatValue(data.self_delivering)}</span></div>
            <div style="${fieldFullStyle}"><span style="${labelStyle}">Current Pain Points</span><span style="${valueStyle}">${formatValue(data.pain_points)}</span></div>
        </div>

        <div style="${signatureBlockStyle}">
            <div style="${sigColumnStyle}">
                <br><br><br>
                <div style="${sigLineStyle}">Signature - ${formatValue(data.authorized_signatory)}</div>
                <div style="${sigSubTextStyle}">Authorized Signatory</div>
            </div>
            
            <div style="${sigColumnStyle}">
                <br><br><br>
                <div style="${sigLineStyle}">Date</div>
            </div>
        </div>

        <div style="margin-top: 50px; font-size: 11px; text-align: center; color: #888; border-top: 1px solid #eee; padding-top: 15px; width: 100%; font-weight: 500;">
            Document generated on ${new Date().toLocaleDateString()}
            <br>
            Motoclick Internal Document - Confidential & Proprietary
        </div>
    </div>
  `;
};
