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

    const payload: any = {
      ...data,
      target_date: data.target_date ? new Date(data.target_date).toISOString().split('T')[0] : null,
      operating_hours: JSON.stringify(data.operating_hours) 
    }

    const submitData = new FormData()

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
