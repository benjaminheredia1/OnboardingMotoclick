import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { OnboardingFormValues } from "@/lib/schema"

export function SectionE() {
  const { control } = useFormContext<OnboardingFormValues>()

  return (
    <div className="space-y-6">
      <div className="bg-orange-500 text-white px-4 py-2 uppercase font-semibold text-sm rounded-t-md">
        E. Billing & Payment Information
      </div>
      
      <div className="p-4 bg-white border border-t-0 rounded-b-md shadow-sm space-y-4">
        
        <div className="bg-green-50 text-green-800 text-xs p-3 rounded border border-green-200 mb-6 font-medium">
          Payment method: Weekly automatic debit (card) — Motoclick charges every Monday automatically. 
          Card details are collected securely when signing the DocuSign contract.
        </div>

        <FormField control={control} name="contract_name" render={({ field }) => (
          <FormItem>
            <FormLabel>LEGAL NAME FOR CONTRACT <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input placeholder="e.g. La Esquina LLC" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="ein_tax_id" render={({ field }) => (
          <FormItem>
            <FormLabel>EIN / TAX ID</FormLabel>
            <FormControl>
              <Input placeholder="e.g. 12-3456789" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="billing_address" render={({ field }) => (
          <FormItem>
            <FormLabel>BILLING ADDRESS <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input placeholder="Street, City, State, ZIP" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="authorized_signatory" render={({ field }) => (
          <FormItem>
            <FormLabel>AUTHORIZED SIGNATORY <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input placeholder="Full name of person signing" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="bg-orange-50 text-orange-800 text-xs p-3 rounded border border-orange-200 mt-6 font-medium">
          Card details are NOT collected in this form. They are captured securely at DocuSign contract signing.
        </div>

      </div>
    </div>
  )
}
