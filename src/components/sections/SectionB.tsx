import { useFormContext } from "react-hook-form";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { OnboardingFormValues } from "@/lib/schema";
import { useState } from "react";

export function SectionB() {
  const { control } = useFormContext<OnboardingFormValues>();
  const [useDeliverys, setUseDeliverys] = useState(false);

  const PEAK_HOURS_OPTIONS = [
    "Breakfast (6am - 10am)",
    "Lunch (11am - 3pm)",
    "Afternoon (3pm - 6pm)",
    "Dinner (6pm - 10pm)",
    "Late Night (10pm+)",
  ];

  return (
    <div className="">
      <div className="bg-zinc-800 text-white px-4 py-2 uppercase font-semibold text-sm rounded-t-md">
        B. Operational Profile
      </div>

      <div className="p-4 bg-white border border-t-0 rounded-b-md shadow-sm space-y-4">
        <FormField
          control={control}
          name="avg_orders"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                AVERAGE ORDERS / DAY <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g. 30"
                  maxLength={10}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={control}
          name="peak_hours"
          render={({ field }) => {
            const selectedValues = field.value
              ? field.value.split(", ").filter(Boolean)
              : [];

            const toggleOption = (opt: string) => {
              if (selectedValues.includes(opt)) {
                field.onChange(
                  selectedValues.filter((v) => v !== opt).join(", "),
                );
              } else {
                field.onChange([...selectedValues, opt].join(", "));
              }
            };

            return (
              <FormItem>
                <FormLabel>PEAK HOURS</FormLabel>
                <FormControl>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-white h-12"
                      >
                        {field.value ? (
                          field.value
                        ) : (
                          <span className="text-gray-400">
                            Select peak hours...
                          </span>
                        )}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Select Peak Hours</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-1 gap-2 py-4">
                        {PEAK_HOURS_OPTIONS.map((opt) => (
                          <label
                            key={opt}
                            className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-zinc-50"
                          >
                            <Checkbox
                              checked={selectedValues.includes(opt)}
                              onCheckedChange={() => toggleOption(opt)}
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={control}
          name="own_drivers"
          render={({ field }) => (
            <FormItem className="space-y-3 pt-4 border-t border-dashed">
              <FormLabel>
                OWN DELIVERY DRIVERS? <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex space-x-4"
                >
                  {["Yes", "No", "Partially"].map((opt) => (
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
          name="self_delivering"
          render={({ field }) => (
            <FormItem className="space-y-3 pt-4 border-t border-dashed">
              <FormLabel>
                CURRENTLY SELF-DELIVERING?{" "}
                <span className="text-red-500">*</span>
              </FormLabel>
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
          name="using_3pl"
          render={({ field }) => (
            <FormItem className="space-y-3 pt-4 border-t border-dashed">
              <FormLabel>
                DO YOU CURRENTLY USE A LOGISTICS COMPANY FOR YOUR DELIVERIES?
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                    setUseDeliverys(value === "Yes");
                  }}
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

        {useDeliverys && (
          <FormField
            control={control}
            name="using_3pl_use"
            render={({ field }) => (
              <FormItem className="space-y-3 pt-4 border-t border-dashed">
                <FormLabel>WHICH ONE DO YOU USE?</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Uber Eats"
                    {...field}
                    maxLength={100}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        
      </div>
    </div>
  );
}
