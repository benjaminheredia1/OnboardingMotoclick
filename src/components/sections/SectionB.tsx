import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { OnboardingFormValues } from "@/lib/schema"

export function SectionB() {
  const { control } = useFormContext<OnboardingFormValues>()

  const painPointsOptions = [
    "Delays",
    "High costs",
    "Cancellations",
    "Support issues",
    "Multiple issues"
  ]

  const PEAK_HOURS_OPTIONS = [
    "Breakfast (6am - 10am)",
    "Lunch (11am - 3pm)",
    "Afternoon (3pm - 6pm)",
    "Dinner (6pm - 10pm)",
    "Late Night (10pm+)"
  ]

  return (
    <div className="space-y-6">
      <div className="bg-zinc-800 text-white px-4 py-2 uppercase font-semibold text-sm rounded-t-md">
        B. Operational Profile
      </div>
      
      <div className="p-4 bg-white border border-t-0 rounded-b-md shadow-sm space-y-4">
        
        <FormField control={control} name="avg_orders" render={({ field }) => (
          <FormItem>
            <FormLabel>Average Orders / Day <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input type="number" placeholder="e.g. 30" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="avg_ticket" render={({ field }) => (
          <FormItem>
            <FormLabel>Average Ticket ($)</FormLabel>
            <FormControl>
              <Input type="number" placeholder="e.g. 35" {...field} value={field.value ?? ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="peak_hours" render={({ field }) => {
          const selectedValues = field.value ? field.value.split(', ').filter(Boolean) : [];
          
          const toggleOption = (opt: string) => {
            if (selectedValues.includes(opt)) {
              field.onChange(selectedValues.filter(v => v !== opt).join(', '));
            } else {
              field.onChange([...selectedValues, opt].join(', '));
            }
          }

          return (
            <FormItem>
              <FormLabel>Peak Hours</FormLabel>
              <FormControl>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-white h-12">
                      {field.value ? field.value : <span className="text-gray-400">Select peak hours...</span>}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Select Peak Hours</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 gap-2 py-4">
                      {PEAK_HOURS_OPTIONS.map(opt => (
                        <label key={opt} className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-zinc-50">
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
          )
        }} />

        <FormField control={control} name="own_drivers" render={({ field }) => (
          <FormItem className="space-y-3 pt-4 border-t border-dashed">
            <FormLabel>Own Delivery Drivers? <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} value={field.value} className="flex space-x-4">
                {["Yes", "No", "Partially"].map((opt) => (
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

        <FormField control={control} name="self_delivering" render={({ field }) => (
          <FormItem className="space-y-3 pt-4 border-t border-dashed">
            <FormLabel>Currently Self-Delivering? <span className="text-red-500">*</span></FormLabel>
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

        <FormField control={control} name="using_3pl" render={({ field }) => (
          <FormItem className="space-y-3 pt-4 border-t border-dashed">
            <FormLabel>Using DSP or Last Mile Solution?</FormLabel>
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

        <FormField control={control} name="pain_points" render={() => (
          <FormItem className="space-y-3 pt-4 border-t border-dashed">
            <FormLabel>Current Pain Points</FormLabel>
            <div className="grid grid-cols-2 gap-3">
              {painPointsOptions.map((item) => (
                <FormField
                  key={item}
                  control={control}
                  name="pain_points"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...(field.value || []), item])
                                : field.onChange(field.value?.filter((value) => value !== item))
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal leading-tight bg-zinc-50 flex-1 p-2 rounded-md border cursor-pointer hover:bg-zinc-100">
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

      </div>
    </div>
  )
}
