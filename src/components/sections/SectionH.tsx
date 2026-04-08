import { useFormContext, useFieldArray } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import type { OnboardingFormValues } from "@/lib/schema"

export function SectionH() {
  const { control } = useFormContext<OnboardingFormValues>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "pos_access",
  })

  return (
    <div className="">
      <div className="bg-zinc-800 text-white px-4 py-2 uppercase font-semibold text-sm rounded-t-md flex justify-between items-center">
        <span>H. POS Access Information</span>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => append({ name: "", user: "", pass: "", owner: "", phone: "", email: "" })}
          className="h-7 bg-white/20 hover:bg-white/30 text-white border-0"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Another POS
        </Button>
      </div>
      
      <div className="p-4 bg-white border border-t-0 rounded-b-md shadow-sm space-y-6">
        {fields.map((fieldArray, index) => (
          <div key={fieldArray.id} className={index > 0 ? "pt-6 border-t border-dashed" : ""}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-zinc-500 uppercase">POS System #{index + 1}</h3>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <FormField
                control={control}
                name={`pos_access.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>POS SYSTEM NAME (e.g., Toast, Square POS, Revel POS, Clover, Lightspeed)</FormLabel>
                    <FormControl>
                      <Input placeholder="System Name" maxLength={100} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <FormField
                  control={control}
                  name={`pos_access.${index}.user`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>USERNAME / LOGIN EMAIL</FormLabel>
                      <FormControl>
                        <Input placeholder="Login identifier" maxLength={100} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`pos_access.${index}.pass`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PASSWORD</FormLabel>
                      <FormControl>
                        <Input placeholder="Password" maxLength={100} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name={`pos_access.${index}.owner`}
                render={({ field }) => (
                  <FormItem className="pt-2">
                    <FormLabel>ACCOUNT OWNER NAME</FormLabel>
                    <FormControl>
                      <Input placeholder="Owner name" maxLength={100} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <FormField
                  control={control}
                  name={`pos_access.${index}.phone`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PHONE NUMBER</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+1 (718) 555-0000" maxLength={50} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`pos_access.${index}.email`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SUPPORT CONTACT EMAIL</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="support@pos.com" maxLength={100} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
