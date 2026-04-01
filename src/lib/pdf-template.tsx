import logoHeader from "@/assets/header.png";
import { type MotoclickClientOnboardingForm } from "./interfaces/pdf.interface";

const formatValue = (val: any) => {
  if (val === undefined || val === null || val === "") return "N/A";
  if (typeof val === "boolean") return val ? "Sí" : "No";
  if (val instanceof Date) return val.toLocaleDateString();
  if (Array.isArray(val)) return val.length > 0 ? val.join(", ") : "N/A";
  return val;
};

const formatOperatingHours = (hours: any[]) => {
  if (!hours || hours.length === 0) return "<em>N/A</em>";
  return hours
    .map(
      (slot: any) =>
        `<tr>
          <td style="padding: 4px 8px; border: 1px solid #ddd;">${slot.days?.join(", ") || "N/A"}</td>
          <td style="padding: 4px 8px; border: 1px solid #ddd;">${slot.open || "N/A"}</td>
          <td style="padding: 4px 8px; border: 1px solid #ddd;">${slot.close || "N/A"}</td>
        </tr>`
    )
    .join("");
};

export const template = (data: MotoclickClientOnboardingForm) => {
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

  const credFieldStyle =
    "width: 47%; margin-bottom: 12px; display: flex; flex-direction: column;";
  const credLabelStyle =
    "font-weight: 600; font-size: 11px; color: #888; text-transform: uppercase;";
  const credValueStyle =
    "font-size: 14px; color: #333; margin-top: 2px;";

  const phoneDisplay = `${formatValue(data.phone_prefix)} ${formatValue(data.phone_number)}`;

  return `
    <div style="font-family: 'Helvetica', 'Arial', sans-serif; font-size: 15px; line-height: 1.6; color: #222; background: white; padding: 30px; box-sizing: border-box; width: 100%; font-weight: 500;">
        
        <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 25px; width: 100%;">
            <img src="${logoHeader}" alt="Header Logo" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">
        </div>

        <h1 style="text-align: center; color: ${mutedOrange}; margin-top: 0; font-size: 26px; font-weight: 800;">Motoclick Onboarding Form</h1>

        <!-- SECTION A -->
        <h2 style="${h2Style}">A. Business Information</h2>
        <div style="${containerStyle}">
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Legal Business Name</span><span style="${valueStyle}">${formatValue(data.legal_name)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">DBA / Trade Name</span><span style="${valueStyle}">${formatValue(data.dba_name)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Primary Contact Name</span><span style="${valueStyle}">${formatValue(data.primary_contact_name)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Title / Role</span><span style="${valueStyle}">${formatValue(data.title_role)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Email Address</span><span style="${valueStyle}">${formatValue(data.email_address)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Phone Number</span><span style="${valueStyle}">${phoneDisplay}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">City / Borough</span><span style="${valueStyle}">${formatValue(data.city_borough)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">ZIP Code</span><span style="${valueStyle}">${formatValue(data.zip_code)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Number of Locations</span><span style="${valueStyle}">${formatValue(data.number_of_locations)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Business Type</span><span style="${valueStyle}">${formatValue(data.business_type)}</span></div>
            <div style="${fieldFullStyle}"><span style="${labelStyle}">Main Address</span><span style="${valueStyle}">${formatValue(data.main_address)}</span></div>
        </div>

        <!-- Operating Hours Table -->
        <div style="margin-bottom: 20px;">
            <span style="${labelStyle}">Operating Hours</span>
            <table style="width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 13px;">
                <thead>
                    <tr style="background-color: #f5f5f5;">
                        <th style="padding: 6px 8px; border: 1px solid #ddd; text-align: left;">Days</th>
                        <th style="padding: 6px 8px; border: 1px solid #ddd; text-align: left;">Open</th>
                        <th style="padding: 6px 8px; border: 1px solid #ddd; text-align: left;">Close</th>
                    </tr>
                </thead>
                <tbody>
                    ${formatOperatingHours(data.operating_hours)}
                </tbody>
            </table>
        </div>

        <!-- SECTION B -->
        <h2 style="${h2Style}">B. Operational Profile</h2>
        <div style="${containerStyle}">
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Average Orders / Day</span><span style="${valueStyle}">${formatValue(data.avg_orders)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Average Ticket ($)</span><span style="${valueStyle}">${formatValue(data.avg_ticket)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Peak Hours</span><span style="${valueStyle}">${formatValue(data.peak_hours)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Own Delivery Drivers?</span><span style="${valueStyle}">${formatValue(data.own_drivers)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Currently Self-Delivering?</span><span style="${valueStyle}">${formatValue(data.self_delivering)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Using 3PL?</span><span style="${valueStyle}">${formatValue(data.using_3pl)}</span></div>
            <div style="${fieldFullStyle}"><span style="${labelStyle}">Current Pain Points</span><span style="${valueStyle}">${formatValue(data.pain_points)}</span></div>
        </div>

        <!-- SECTION C -->
        <h2 style="${h2Style}">C. Technology & Platforms</h2>
        <div style="${containerStyle}">
            <div style="${fieldFullStyle}"><span style="${labelStyle}">Delivery Platforms</span><span style="${valueStyle}">${formatValue(data.delivery_platforms)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">POS / Middleware System</span><span style="${valueStyle}">${formatValue(data.pos_system)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Own Website?</span><span style="${valueStyle}">${formatValue(data.own_website)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Own App?</span><span style="${valueStyle}">${formatValue(data.own_app)}</span></div>
        </div>

        <!-- SECTION D -->
        <h2 style="${h2Style}">D. Expectations & Timeline</h2>
        <div style="${containerStyle}">
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Target Start Date</span><span style="${valueStyle}">${formatValue(data.target_date)}</span></div>
            <div style="${fieldFullStyle}"><span style="${labelStyle}">Main Problem to Solve</span><span style="${valueStyle}">${formatValue(data.main_problem)}</span></div>
        </div>

        <!-- SECTION E -->
        <h2 style="${h2Style}">E. Contract Information</h2>
        <div style="${containerStyle}">
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Legal Name for Contract</span><span style="${valueStyle}">${formatValue(data.contract_name)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">EIN / Tax ID</span><span style="${valueStyle}">${formatValue(data.ein_tax_id)}</span></div>
            <div style="${fieldFullStyle}"><span style="${labelStyle}">Billing Address</span><span style="${valueStyle}">${formatValue(data.billing_address)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Authorized Signatory</span><span style="${valueStyle}">${formatValue(data.authorized_signatory)}</span></div>
        </div>

        <!-- SECTION F -->
        <h2 style="${h2Style}">F. Communication & Notes</h2>
        <div style="${containerStyle}">
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Preferred Communication Channel</span><span style="${valueStyle}">${formatValue(data.comm_channel)}</span></div>
            <div style="${fieldFullStyle}"><span style="${labelStyle}">Additional Notes</span><span style="${valueStyle}">${formatValue(data.notes)}</span></div>
        </div>

        <!-- SECTION G -->
        <h2 style="${h2Style}">G. Platform Credentials</h2>
        <div style="${containerStyle}">
            <div style="${credFieldStyle}"><span style="${credLabelStyle}">Uber Eats User</span><span style="${credValueStyle}">${formatValue(data.uber_eats_user)}</span></div>
            <div style="${credFieldStyle}"><span style="${credLabelStyle}">Uber Eats Pass</span><span style="${credValueStyle}">${formatValue(data.uber_eats_pass)}</span></div>
            <div style="${credFieldStyle}"><span style="${credLabelStyle}">DoorDash User</span><span style="${credValueStyle}">${formatValue(data.doordash_user)}</span></div>
            <div style="${credFieldStyle}"><span style="${credLabelStyle}">DoorDash Pass</span><span style="${credValueStyle}">${formatValue(data.doordash_pass)}</span></div>
            <div style="${credFieldStyle}"><span style="${credLabelStyle}">Grubhub User</span><span style="${credValueStyle}">${formatValue(data.grubhub_user)}</span></div>
            <div style="${credFieldStyle}"><span style="${credLabelStyle}">Grubhub Pass</span><span style="${credValueStyle}">${formatValue(data.grubhub_pass)}</span></div>
            <div style="${credFieldStyle}"><span style="${credLabelStyle}">Slice User</span><span style="${credValueStyle}">${formatValue(data.slice_user)}</span></div>
            <div style="${credFieldStyle}"><span style="${credLabelStyle}">Slice Pass</span><span style="${credValueStyle}">${formatValue(data.slice_pass)}</span></div>
            <div style="${credFieldStyle}"><span style="${credLabelStyle}">Delivery.com User</span><span style="${credValueStyle}">${formatValue(data.delivery_com_user)}</span></div>
            <div style="${credFieldStyle}"><span style="${credLabelStyle}">Delivery.com Pass</span><span style="${credValueStyle}">${formatValue(data.delivery_com_pass)}</span></div>
            <div style="${credFieldStyle}"><span style="${credLabelStyle}">ShareBites User</span><span style="${credValueStyle}">${formatValue(data.sharebites_user)}</span></div>
            <div style="${credFieldStyle}"><span style="${credLabelStyle}">ShareBites Pass</span><span style="${credValueStyle}">${formatValue(data.sharebites_pass)}</span></div>
            <div style="${credFieldStyle}"><span style="${credLabelStyle}">Other Platform</span><span style="${credValueStyle}">${formatValue(data.other_platform_name)}</span></div>
            <div style="${credFieldStyle}"><span style="${credLabelStyle}">Other User</span><span style="${credValueStyle}">${formatValue(data.other_platform_user)}</span></div>
            <div style="${credFieldStyle}"><span style="${credLabelStyle}">Other Pass</span><span style="${credValueStyle}">${formatValue(data.other_platform_pass)}</span></div>
        </div>

        <!-- SECTION H -->
        <h2 style="${h2Style}">H. POS Access Information</h2>
        <div style="${containerStyle}">
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">POS System Name</span><span style="${valueStyle}">${formatValue(data.pos_access_name)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">POS Username / Login</span><span style="${valueStyle}">${formatValue(data.pos_access_user)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">POS Password</span><span style="${valueStyle}">${formatValue(data.pos_access_pass)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Account Owner Name</span><span style="${valueStyle}">${formatValue(data.pos_access_owner)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Owner Phone</span><span style="${valueStyle}">${formatValue(data.pos_access_phone)}</span></div>
            <div style="${fieldHalfStyle}"><span style="${labelStyle}">Support Email</span><span style="${valueStyle}">${formatValue(data.pos_access_email)}</span></div>
        </div>

        <!-- SIGNATURE -->
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
            Motoclick Internal Document - Confidential &amp; Proprietary
        </div>
    </div>
  `;
};
