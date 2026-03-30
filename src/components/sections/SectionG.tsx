import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { OnboardingFormValues } from "@/lib/schema"

export function SectionG() {
  const { control } = useFormContext<OnboardingFormValues>()

  const platforms = [
    { label: "DoorDash", user: "cred_doordash_user", pass: "cred_doordash_pass", notes: "cred_doordash_notes" },
    { label: "Uber Eats", user: "cred_uber_user", pass: "cred_uber_pass", notes: "cred_uber_notes" },
    { label: "Delivery.com", user: "cred_delivery_user", pass: "cred_delivery_pass", notes: "cred_delivery_notes" },
    { label: "Own Website/App", user: "cred_own_user", pass: "cred_own_pass", notes: "cred_own_notes" },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 pb-2 border-b border-zinc-200">
        <span className="text-xl">■</span>
        <h2 className="text-lg font-bold">Access Credentials</h2>
      </div>
      
      <p className="text-sm text-gray-500 text-center mb-4">
        Username and password for each platform (DoorDash, Uber, etc.)
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="px-4 py-3 w-1/5">Platform</th>
              <th className="px-4 py-3 w-[30%]">User / Email</th>
              <th className="px-4 py-3 w-1/4">Password</th>
              <th className="px-4 py-3 w-1/4">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {platforms.map((platform) => (
              <tr key={platform.label} className="bg-white hover:bg-zinc-50">
                <td className="px-4 py-3 font-medium text-gray-900 border-x">
                  {platform.label}
                </td>
                <td className="px-2 py-2 border-r">
                  <FormField control={control} name={platform.user} render={({ field }) => (
                    <FormItem>
                      <FormControl><Input className="h-8 text-xs" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </td>
                <td className="px-2 py-2 border-r">
                  <FormField control={control} name={platform.pass} render={({ field }) => (
                    <FormItem>
                      <FormControl><Input className="h-8 text-xs" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </td>
                <td className="px-2 py-2 border-r">
                  <FormField control={control} name={platform.notes} render={({ field }) => (
                    <FormItem>
                      <FormControl><Input className="h-8 text-xs" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
