import { useFieldArray, useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X } from "lucide-react"
import type { OnboardingFormValues } from "@/lib/schema"

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"))
const MINUTES = ["00", "15", "30", "45"]

export function OperatingHours({ namePrefix }: { namePrefix?: string }) {
  const { control, register } = useFormContext<OnboardingFormValues>()
  const fieldName = namePrefix ? `${namePrefix}.hours` : "operating_hours" as any;
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName
  })



  return (
    <div className="space-y-6">
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="p-4 bg-zinc-50 border rounded-lg space-y-4 relative">
            <div className="flex flex-wrap gap-2 mb-2">
              {DAYS.map(day => (
                <label key={day} className="flex items-center space-x-2 bg-white px-3 py-1.5 border rounded-full text-xs cursor-pointer hover:bg-zinc-100">
                  <input
                    type="checkbox"
                    className="accent-orange-600 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    value={day}
                    {...register(`${fieldName}.${index}.days` as any)}
                  />
                  <span>{day}</span>
                </label>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <div className="flex space-x-2 items-center bg-white p-2 rounded border">
                <span className="text-xs font-semibold uppercase text-gray-500 w-12">Open</span>
                <select
                  className="bg-transparent border-none text-sm outline-none w-14 appearance-none"
                  {...register(`${fieldName}.${index}.open` as any)}
                >
                  {HOURS.map(h => MINUTES.map(m => (
                    <option key={`${h}:${m}`} value={`${h}:${m}`}>{h}:{m}</option>
                  )))}
                </select>
              </div>

              <div className="flex space-x-2 items-center bg-white p-2 rounded border">
                <span className="text-xs font-semibold uppercase text-gray-500 w-12">Close</span>
                <select
                  className="bg-transparent border-none text-sm outline-none w-14 appearance-none"
                  {...register(`${fieldName}.${index}.close` as any)}
                >
                  {HOURS.map(h => MINUTES.map(m => (
                    <option key={`${h}:${m}`} value={`${h}:${m}`}>{h}:{m}</option>
                  )))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 font-semibold mb-1 block">Valid From</label>
                <Input type="date" {...register(`${fieldName}.${index}.valid_from` as any)} className="bg-white text-sm h-9" />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-semibold mb-1 block">Valid To</label>
                <Input type="date" {...register(`${fieldName}.${index}.valid_to` as any)} className="bg-white text-sm h-9" />
              </div>
            </div>

            {index > 0 && (
              <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)} className="absolute -top-3 -right-3 h-6 w-6 rounded-full p-0">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        )
      })}
      
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => append({ id: Date.now(), days: [], open: "11:00", close: "22:00", valid_from: null, valid_to: null })}
        className="w-full text-orange-600 border-orange-200 hover:bg-orange-50 bg-white"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Another Time Slot
      </Button>
    </div>
  )
}
