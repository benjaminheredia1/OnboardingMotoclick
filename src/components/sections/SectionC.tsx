import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import type { OnboardingFormValues } from "@/lib/schema"

export function SectionC() {
  const { control, watch } = useFormContext<OnboardingFormValues>()

  const posSystemValues = watch("pos_system") || [];
  const hasOtherPos = posSystemValues.includes("Other");
  
  const ownWebsite = watch("own_website");
  const ownApp = watch("own_app");

  const platforms = ["Uber Eats", "DoorDash", "Grubhub", "None"];
  const posSystems = ["Toast", "Deliverect", "Square/Clover", "ChowNow/Olo", "Other", "None"];

  return (
    <div className="space-y-6">
      <div className="bg-zinc-800 text-white px-4 py-2 uppercase font-semibold text-sm rounded-t-md">
        C. Current Channels & Tech
      </div>
      
      <div className="p-4 bg-white border border-t-0 rounded-b-md shadow-sm space-y-6">
        
        <FormField control={control} name="delivery_platforms" render={() => (
          <FormItem className="space-y-3">
            <FormLabel>Active Delivery Platforms</FormLabel>
            <div className="grid grid-cols-2 gap-3">
              {platforms.map((item) => (
                <FormField
                  key={item}
                  control={control}
                  name="delivery_platforms"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...(field.value || []), item])
                                : field.onChange(field.value?.filter((val) => val !== item))
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer flex-1 bg-zinc-50 border p-2 rounded-md hover:bg-zinc-100">
                          {item}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="pos_system" render={() => (
          <FormItem className="space-y-3 pt-4 border-t border-dashed">
            <FormLabel>POS / Middleware System</FormLabel>
            <div className="grid grid-cols-2 gap-3">
              {posSystems.map((item) => (
                <FormField
                  key={item}
                  control={control}
                  name="pos_system"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...(field.value || []), item])
                                : field.onChange(field.value?.filter((val) => val !== item))
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer flex-1 bg-zinc-50 border p-2 rounded-md hover:bg-zinc-100">
                          {item}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )} />

        {hasOtherPos && (
          <FormField control={control} name="pos_system_other" render={({ field }) => (
            <FormItem className="pl-8 -mt-2">
              <FormControl>
                <Input placeholder="Specify your POS / system name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        )}

        <FormField control={control} name="own_website" render={({ field }) => (
          <FormItem className="space-y-3 pt-4 border-t border-dashed">
            <FormLabel>Own Website with Orders?</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} value={field.value} className="flex space-x-4">
                {["Yes", "No"].map((opt) => (
                  <FormItem key={opt} className="flex items-center space-x-2 space-y-0">
                    <FormControl><RadioGroupItem value={opt} /></FormControl>
                    <FormLabel className="font-normal cursor-pointer">{opt}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {ownWebsite === "Yes" && (
          <FormField control={control} name="website_url" render={({ field }) => (
            <FormItem className="pl-8 -mt-2">
              <FormControl>
                <Input type="url" placeholder="https://www.yourwebsite.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        )}

        <FormField control={control} name="own_app" render={({ field }) => (
          <FormItem className="space-y-3 pt-4 border-t border-dashed">
            <FormLabel>Own App?</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} value={field.value} className="flex space-x-4">
                {["Yes", "No"].map((opt) => (
                  <FormItem key={opt} className="flex items-center space-x-2 space-y-0">
                    <FormControl><RadioGroupItem value={opt} /></FormControl>
                    <FormLabel className="font-normal cursor-pointer">{opt}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {ownApp === "Yes" && (
          <FormField control={control} name="app_link" render={({ field }) => (
            <FormItem className="pl-8 -mt-2">
              <FormControl>
                <Input type="url" placeholder="App Store or Play Store link..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        )}

      </div>
    </div>
  )
}
