import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { OnboardingFormValues } from "@/lib/schema"

export function SectionH() {
  const { control } = useFormContext<OnboardingFormValues>()

  return (
    <div className="">
      <div className="bg-zinc-800 text-white px-4 py-2 uppercase font-semibold text-sm rounded-t-md">
        H. POS Access Information
      </div>
      
      <div className="p-4 bg-white border border-t-0 rounded-b-md shadow-sm space-y-4">
        
        <FormField control={control} name="pos_access_name" render={({ field }) => (
          <FormItem>
            <FormLabel>POS SYSTEM NAME (e.g., Toast, Square POS, Revel POS, Clover, Lightspeed)</FormLabel>
            <FormControl>
              <Input placeholder="System Name" maxLength={100} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <FormField control={control} name="pos_access_user" render={({ field }) => (
            <FormItem>
              <FormLabel>USERNAME / LOGIN EMAIL</FormLabel>
              <FormControl>
                <Input placeholder="Login identifier" maxLength={100} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={control} name="pos_access_pass" render={({ field }) => (
            <FormItem>
              <FormLabel>PASSWORD</FormLabel>
              <FormControl>
                <Input placeholder="Password" maxLength={100} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={control} name="pos_access_owner" render={({ field }) => (
          <FormItem className="pt-2">
            <FormLabel>ACCOUNT OWNER NAME</FormLabel>
            <FormControl>
              <Input placeholder="Owner name" maxLength={100} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <FormField control={control} name="pos_access_phone" render={({ field }) => (
            <FormItem>
              <FormLabel>PHONE NUMBER</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+1 (718) 555-0000" maxLength={100} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={control} name="pos_access_email" render={({ field }) => (
            <FormItem>
              <FormLabel>SUPPORT CONTACT EMAIL</FormLabel>
              <FormControl>
                <Input type="email" placeholder="support@pos.com" maxLength={100} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

      </div>
    </div>
  )
}
