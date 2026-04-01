import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormMessage, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { OnboardingFormValues } from "@/lib/schema"

export function SectionG() {
  const { control } = useFormContext<OnboardingFormValues>()

  const platforms = [
    { label: "UBER EATS", user: "uber_eats_user", pass: "uber_eats_pass" },
    { label: "DOORDASH", user: "doordash_user", pass: "doordash_pass" },
    { label: "GRUBHUB", user: "grubhub_user", pass: "grubhub_pass" },
    { label: "SLICE", user: "slice_user", pass: "slice_pass" },
    { label: "DELIVERY.COM", user: "delivery_com_user", pass: "delivery_com_pass" },
    { label: "SHAREBITES", user: "sharebites_user", pass: "sharebites_pass" },
  ] as const;

  return (
    <div className="">
      <div className="bg-orange-500 text-white px-4 py-2 uppercase font-semibold text-sm rounded-t-md">
        G. Platform Account Information
      </div>
      
      <div className="p-4 bg-white border border-t-0 rounded-b-md shadow-sm space-y-4">
        <p className="text-sm text-gray-500 mb-4">
          Provide Username and Password for each platform you are integrated with. Leave blank if not applicable.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-100 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-4 py-3 w-[35%]">Platform</th>
                <th className="px-4 py-3 w-[32.5%]">USERNAME</th>
                <th className="px-4 py-3 w-[32.5%]">PASSWORD</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {platforms.map((platform) => (
                <tr key={platform.label} className="bg-white hover:bg-zinc-50">
                  <td className="px-4 py-3 text-xs font-semibold text-gray-700 border-x">
                    {platform.label}
                  </td>
                  <td className="px-2 py-2 border-r">
                    <FormField control={control} name={platform.user} render={({ field }) => (
                      <FormItem>
                        <FormControl><Input className="h-9 text-xs" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </td>
                  <td className="px-2 py-2 border-r">
                    <FormField control={control} name={platform.pass} render={({ field }) => (
                      <FormItem>
                        <FormControl><Input className="h-9 text-xs" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 pt-4 border-t border-dashed space-y-4">
          <p className="font-semibold text-sm text-gray-700">OTHER PLATFORM</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField control={control} name="other_platform_name" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">NAME</FormLabel>
                <FormControl><Input className="h-9" placeholder="e.g. ChowNow" maxLength={100} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={control} name="other_platform_user" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">USERNAME</FormLabel>
                <FormControl><Input className="h-9" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={control} name="other_platform_pass" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">PASSWORD</FormLabel>
                <FormControl><Input className="h-9" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </div>

      </div>
    </div>
  )
}
