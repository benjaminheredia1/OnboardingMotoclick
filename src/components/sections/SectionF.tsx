import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { OnboardingFormValues } from "@/lib/schema"

export function SectionF() {
  const { control } = useFormContext<OnboardingFormValues>()

  return (
    <div className="space-y-6">
      <div className="bg-zinc-800 text-white px-4 py-2 uppercase font-semibold text-sm rounded-t-md">
        F. Communications
      </div>
      
      <div className="p-4 bg-white border border-t-0 rounded-b-md shadow-sm space-y-4">
        
        <FormField control={control} name="comm_channel" render={({ field }) => (
          <FormItem>
            <FormLabel>PREFERRED COMMUNICATION CHANNEL</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select channel" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="Phone">Phone</SelectItem>
                <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                <SelectItem value="SMS">SMS</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="notes" render={({ field }) => (
          <FormItem>
            <FormLabel>ADDITIONAL NOTES / SPECIFIC INSTRUCTIONS FOR ACCOUNT MANAGER</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Any specific requests or requirements..." 
                className="min-h-[100px]" 
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
