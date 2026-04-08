import { generatePdfBlob } from "./pdf-generator"
import type { OnboardingFormValues } from "./schema"

export async function submitRegistration(data: OnboardingFormValues) {
  try {
    const pdfBlob = await generatePdfBlob(data)
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob)
      const a = document.createElement("a")
      a.href = url
      a.download = `Onboarding_${data.legal_name.replace(/\\s+/g, "_")}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }

    const otherAccounts = data.other_accounts || [];
    const otherNamesStr = otherAccounts.map(a => a.name).filter(Boolean).join(", ");
    const otherUsersStr = otherAccounts.map(a => a.user).filter(Boolean).join(", ");
    const otherPassesStr = otherAccounts.map(a => a.pass).filter(Boolean).join(", ");

    const finalPlatforms = [...(data.delivery_platforms || [])].filter(p => p !== "Other" && p !== "None");
    
    // Add names from other_accounts to finalPlatforms
    otherAccounts.forEach(acc => {
      if (acc.name && acc.name.trim()) {
        finalPlatforms.push(acc.name.trim());
      }
    });
    const formatHoursStr = (hours: any[]) => {
      if (!hours || hours.length === 0) return "N/A";
      return hours.map(h => `${h.days?.join("/") || "N/A"} ${h.open}-${h.close}`).join(" | ");
    }

    const firstPos = data.pos_access?.[0] || {};
    const businessLogo = data.business_logo;
    const payload: any = {
      ...data,
      business_logo: businessLogo?.preview || "",
      other_platform_name: otherNamesStr,
      other_platform_user: otherUsersStr,
      other_platform_pass: otherPassesStr,
      delivery_platforms: finalPlatforms,
      location_addresses: data.location_addresses?.map((la: any) => 
        `${la.address} [Hours: ${formatHoursStr(la.hours)}]`
      ).join(", "),
      target_date: data.target_date ? new Date(data.target_date).toISOString().split('T')[0] : null,
      operating_hours: JSON.stringify(data.operating_hours),
      pos_access: JSON.stringify(data.pos_access),
      // Backward compatibility for the first POS
      pos_access_name: firstPos.name || "",
      pos_access_user: firstPos.user || "",
      pos_access_pass: firstPos.pass || "",
      pos_access_owner: firstPos.owner || "",
      pos_access_phone: firstPos.phone || "",
      pos_access_email: firstPos.email || "",
    }

    const submitData = new FormData()

    if (businessLogo?.file) {
      submitData.append('business_logo_file', businessLogo.file, businessLogo.file.name);
    }

    for (const key in payload) {
      if (Array.isArray(payload[key])) {
        payload[key].forEach((val: any) => submitData.append(`${key}[]`, val))
      } else if (payload[key] !== null && payload[key] !== undefined) {
        submitData.append(key, payload[key])
      }
    }
    if (pdfBlob) {
      submitData.append('data', pdfBlob, 'onboarding.pdf')
    }

    const response = await fetch(import.meta.env.VITE_N8N_URL + "/register-client", {
      method: "POST",
      body: submitData,
    })

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`)
    }

    return await response.json().catch(() => ({}))
  } catch (error) {
    throw error
  }
}
