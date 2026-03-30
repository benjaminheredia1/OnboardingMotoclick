import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import type { OnboardingFormValues } from "@/lib/schema"

export function SectionD() {
  const { control } = useFormContext<OnboardingFormValues>()

  return (
    <div className="space-y-6">
      <div className="bg-zinc-800 text-white px-4 py-2 uppercase font-semibold text-sm rounded-t-md">
        D. Motoclick Integration
      </div>
      
      <div className="p-4 bg-white border border-t-0 rounded-b-md shadow-sm space-y-4">
        
        <FormField control={control} name="service_type" render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Service Type <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col space-y-2">
                {["API", "Own Integration"].map((opt) => (
                  <FormItem key={opt} className="flex items-center space-x-2 space-y-0">
                    <FormControl><RadioGroupItem value={opt} /></FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      {opt === "API" ? "Last mile solution via API" : "Last mile solution via own integration"}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="main_problem" render={({ field }) => (
          <FormItem className="pt-4 border-t border-dashed">
            <FormLabel>Main Problem to Solve</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe what you need to improve with Motoclick..." 
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
