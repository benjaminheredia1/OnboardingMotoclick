import { useFormContext, useWatch } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import type { OnboardingFormValues } from "@/lib/schema";

export function SectionC() {
  const { control } = useFormContext<OnboardingFormValues>();

  const platforms = ["Uber Eats", "DoorDash", "Grubhub", "Other", "None"];

  const selectedPlatforms = useWatch({
    control,
    name: "delivery_platforms",
  });

  const showOtherInput = selectedPlatforms?.includes("Other");

  return (
    <div className="">
      <div className="bg-zinc-800 text-white px-4 py-2 uppercase font-semibold text-sm rounded-t-md">
        C. Current Channels & Tech
      </div>

      <div className="p-4 bg-white border border-t-0 rounded-b-md shadow-sm space-y-6">
        <FormField
          control={control}
          name="delivery_platforms"
          render={() => (
            <FormItem className="space-y-3">
              <FormLabel>ACTIVE DELIVERY PLATFORMS</FormLabel>
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
                                  ? field.onChange([
                                      ...(field.value || []),
                                      item,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (val) => val !== item,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer flex-1 bg-zinc-50 border p-2 rounded-md hover:bg-zinc-100">
                            {item}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {showOtherInput && (
          <FormField
            control={control}
            name="other_platform_name"
            render={({ field }) => (
              <FormItem className="animate-in fade-in slide-in-from-top-2 duration-300">
                <FormLabel>NAME OF OTHER PLATFORM</FormLabel>
                <FormControl>
                  <Input placeholder="Enter platform name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={control}
          name="pos_system"
          render={({ field }) => (
            <FormItem className="space-y-3 pt-4 border-t border-dashed">
              <FormLabel>POS SYSTEM</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Toast, Square, Revel..."
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
          name="middleware_system"
          render={({ field }) => (
            <FormItem className="space-y-3 pt-4 border-t border-dashed">
              <FormLabel>MIDLAWARE SYSTEM</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. stream , kitchen hub , otter , Chowly..."
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
          name="own_website"
          render={({ field }) => (
            <FormItem className="space-y-3 pt-4 border-t border-dashed">
              <FormLabel>OWN WEBSITE WITH ORDERS?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex space-x-4"
                >
                  {["Yes", "No"].map((opt) => (
                    <FormItem
                      key={opt}
                      className="flex items-center space-x-2 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={opt} />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        {opt}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="own_app"
          render={({ field }) => (
            <FormItem className="space-y-3 pt-4 border-t border-dashed">
              <FormLabel>OWN APP?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex space-x-4"
                >
                  {["Yes", "No"].map((opt) => (
                    <FormItem
                      key={opt}
                      className="flex items-center space-x-2 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={opt} />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        {opt}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
