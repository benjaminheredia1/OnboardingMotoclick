import { generatePdfBlob } from "./pdf-generator"
import type { OnboardingFormValues } from "./schema"

export async function submitRegistration(data: OnboardingFormValues) {
  try {
    // We must pass operating_hours directly for PDF to consume it correctly (as an array/object)
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

    // Now format data exactly how legacy n8n webhook expects it!
    const payload: any = {
      ...data,
      operating_hours: JSON.stringify(data.operating_hours) // N8N expects a JSON string for this field
    }

    const submitData = new FormData()

    for (const key in payload) {
      if (Array.isArray(payload[key])) {
        // Send arrays as multiple fields suffixing [], n8n webhook parses this into an array
        payload[key].forEach((val: any) => submitData.append(`${key}[]`, val))
      } else if (payload[key] !== null && payload[key] !== undefined) {
        submitData.append(key, payload[key])
      }
    }

    // Append the PDF as a binary file called "data"
    // By calling it "data", n8n places it in the "data" binary property!
    if (pdfBlob) {
      submitData.append('data', pdfBlob, 'onboarding.pdf')
    }

    const response = await fetch(import.meta.env.N8N_URL, {
      method: "POST",
      body: submitData,
    })

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`)
    }

    return await response.json().catch(() => ({}))
  } catch (error) {
    console.error("Submission error:", error)
    throw error
  }
}
