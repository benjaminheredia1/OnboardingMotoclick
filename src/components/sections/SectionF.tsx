import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import type { OnboardingFormValues } from "@/lib/schema"

export function SectionF() {
  const { control } = useFormContext<OnboardingFormValues>()

  return (
    <div className="space-y-6">
      <div className="bg-zinc-800 text-white px-4 py-2 uppercase font-semibold text-sm rounded-t-md">
        F. Communication Preferences
      </div>
      
      <div className="p-4 bg-white border border-t-0 rounded-b-md shadow-sm space-y-4">
        
        <FormField control={control} name="comm_channel" render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Preferred Communication Channel <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} value={field.value} className="grid grid-cols-3 gap-4">
                {["Slack", "WhatsApp", "Email"].map((opt) => (
                  <FormItem key={opt} className="flex items-center space-x-2 space-y-0 bg-zinc-50 border p-2 rounded-md">
                    <FormControl><RadioGroupItem value={opt} /></FormControl>
                    <FormLabel className="font-normal cursor-pointer flex-1">
                      {opt}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="notes" render={({ field }) => (
          <FormItem className="pt-4 border-t border-dashed">
            <FormLabel>Additional Notes</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Anything else we should know before onboarding?" 
                className="resize-none h-24" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

      </div>
    </div>
  )
}
