import { useFormContext, useFieldArray } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import type { OnboardingFormValues } from "@/lib/schema";

export function SectionG() {
  const { control } = useFormContext<OnboardingFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "other_accounts",
  });

  const platforms = [
    { label: "UBER EATS", user: "uber_eats_user", pass: "uber_eats_pass" },
    { label: "DOORDASH", user: "doordash_user", pass: "doordash_pass" },
    { label: "GRUBHUB", user: "grubhub_user", pass: "grubhub_pass" },
    { label: "SLICE", user: "slice_user", pass: "slice_pass" },
    {
      label: "DELIVERY.COM",
      user: "delivery_com_user",
      pass: "delivery_com_pass",
    },
    { label: "SHAREBITES", user: "sharebites_user", pass: "sharebites_pass" },
  ] as const;

  return (
    <div className="">
      <div className="bg-orange-500 text-white px-4 py-2 uppercase font-semibold text-sm rounded-t-md">
        G. Platform Account Information
      </div>

      <div className="p-4 bg-white border border-t-0 rounded-b-md shadow-sm space-y-4">
        <p className="text-sm text-gray-500 mb-4">
          Provide Username and Password for each platform you are integrated
          with. Leave blank if not applicable.
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
                    <FormField
                      control={control}
                      name={platform.user}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="h-9 text-xs"
                              maxLength={100}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                  <td className="px-2 py-2 border-r">
                    <FormField
                      control={control}
                      name={platform.pass}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="h-9 text-xs"
                              maxLength={100}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 pt-6 border-t border-dashed space-y-6">
          <div className="flex items-center justify-between">
            <p className="font-bold text-sm text-gray-800 uppercase tracking-wider">
              Other Platforms / Multiple Accounts
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ name: "", user: "", pass: "" })}
              className="text-white bg-orange-500 hover:bg-orange-600 border-none h-8 px-3"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Account
            </Button>
          </div>

          <div className="space-y-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_40px] gap-4 p-4 bg-zinc-50 rounded-lg border border-zinc-200 relative animate-in fade-in slide-in-from-top-2 duration-300"
              >
                <FormField
                  control={control}
                  name={`other_accounts.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold text-gray-500 uppercase">
                        Platform Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-9 bg-white"
                          placeholder="e.g. ChowNow"
                          maxLength={100}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`other_accounts.${index}.user`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold text-gray-500 uppercase">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-9 bg-white"
                          maxLength={100}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`other_accounts.${index}.pass`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold text-gray-500 uppercase">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-9 bg-white"
                          maxLength={100}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-end pb-1 justify-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 h-9 w-9"
                    disabled={fields.length === 1 && !field.name && !field.user}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}

            {fields.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed rounded-xl border-zinc-200 bg-zinc-50/50">
                <p className="text-sm text-gray-500">No other platforms added yet.</p>
                <Button
                  type="button"
                  variant="link"
                  onClick={() => append({ name: "", user: "", pass: "" })}
                  className="text-orange-500 font-semibold"
                >
                  Add your first one
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
