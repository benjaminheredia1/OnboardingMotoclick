import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { OperatingHours } from "../OperatingHours"
import type { OnboardingFormValues } from "@/lib/schema"

export function SectionA() {
  const { control } = useFormContext<OnboardingFormValues>()

  return (
    <div className="space-y-6">
      <div className="bg-orange-600 text-white px-4 py-2 uppercase font-semibold text-sm rounded-t-md">
        A. Business Information
      </div>
      
      <div className="p-4 bg-white border border-t-0 rounded-b-md shadow-sm space-y-4">
        <FormField control={control} name="legal_name" render={({ field }) => (
          <FormItem>
            <FormLabel>LEGAL BUSINESS NAME <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input placeholder="e.g. La Esquina Crioia LLC" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="dba_name" render={({ field }) => (
          <FormItem>
            <FormLabel>DBA / TRADE NAME <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input placeholder="e.g. La Esquina" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="primary_contact_name" render={({ field }) => (
          <FormItem>
            <FormLabel>PRIMARY CONTACT NAME <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input placeholder="Full name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="title_role" render={({ field }) => (
          <FormItem>
            <FormLabel>TITLE / ROLE</FormLabel>
            <FormControl>
              <Input placeholder="Owner / Manager / CEO" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="email_address" render={({ field }) => (
          <FormItem>
            <FormLabel>EMAIL ADDRESS <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input placeholder="contact@restaurant.com" type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="phone_number" render={({ field }) => (
          <FormItem>
            <FormLabel>PHONE NUMBER <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input placeholder="+1 (718) 555-0000" type="tel" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="city_borough" render={({ field }) => (
          <FormItem>
            <FormLabel>CITY / BOROUGH <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input placeholder="Brooklyn / Manhattan..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="zip_code" render={({ field }) => (
          <FormItem>
            <FormLabel>ZIP CODE</FormLabel>
            <FormControl>
              <Input placeholder="11201" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="number_of_locations" render={({ field }) => (
          <FormItem>
            <FormLabel>NUMBER OF LOCATIONS <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input type="number" placeholder="e.g. 1" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="business_type" render={({ field }) => (
          <FormItem className="space-y-3 pt-4">
            <FormLabel>BUSINESS TYPE <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid grid-cols-2 gap-4"
              >
                {["Restaurant", "Bakery", "Grocery", "Dark Kitchen", "Chain", "Franchise"].map((type) => (
                  <FormItem key={type} className="flex items-center space-x-3 space-y-0 p-3 bg-zinc-50 border rounded-md cursor-pointer">
                    <FormControl>
                      <RadioGroupItem value={type} />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer flex-1">
                      {type}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="main_address" render={({ field }) => (
          <FormItem>
            <FormLabel>MAIN ADDRESS <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input placeholder="Street, City, State, ZIP" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="pt-6">
          <label className="text-sm font-medium leading-none mb-4 block">OPERATING HOURS</label>
          <OperatingHours />
        </div>
      </div>
    </div>
  )
}
