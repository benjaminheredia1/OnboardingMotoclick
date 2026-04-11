import { useFormContext, useWatch, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OperatingHours } from "../OperatingHours";
import type { OnboardingFormValues } from "@/lib/schema";

export function SectionA() {
  const { control } = useFormContext<OnboardingFormValues>();
  const numLocations = useWatch({ control, name: "number_of_locations" });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "location_addresses",
  });

  useEffect(() => {
    const currentCount = fields.length;
    const targetCount = numLocations > 1 ? numLocations : 0;

    if (targetCount > currentCount) {
      for (let i = currentCount; i < targetCount; i++) {
        append({ 
          address: "", 
          hours: [{ id: Date.now() + i, days: [], open: "11:00", close: "22:00", valid_from: null, valid_to: null }] 
        });
      }
    } else if (targetCount < currentCount) {
      for (let i = currentCount; i > targetCount; i--) {
        remove(i - 1);
      }
    }
  }, [numLocations, fields.length, append, remove]);

  return (
    <div className="">
      <div className="bg-orange-600 text-white px-4 py-2 uppercase font-semibold text-sm rounded-t-md">
        A. Business Information
      </div>

      <div className="p-4 bg-white border border-t-0 rounded-b-md shadow-sm space-y-4">
        <FormField
          control={control}
          name="legal_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                LEGAL BUSINESS NAME <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. La Esquina Crioia LLC"
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
          name="business_logo"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>
                BUSINESS LOGO <span className="text-zinc-400 text-xs font-normal">(optional)</span>
              </FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const MAX_SIZE = 2 * 1024 * 1024; // 2 MB
                        if (file.size > MAX_SIZE) {
                          e.target.value = "";
                          onChange(undefined);
                          alert(`Image is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum size is 2 MB.`);
                          return;
                        }
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          onChange({
                            file: file,
                            preview: reader.result as string
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    {...fieldProps}
                  />
                  <p className="text-[11px] text-zinc-400">Max 2 MB · PNG, JPG, WEBP</p>
                  {value?.preview && (
                    <div className="mt-2 text-center p-2 border rounded-md bg-zinc-50">
                      <p className="text-[10px] text-zinc-500 uppercase font-bold mb-2">Logo Preview</p>
                      <img
                        src={value.preview}
                        alt="Logo Preview"
                        className="h-36 w-full max-w-sm mx-auto object-contain border bg-white rounded-md p-2"
                      />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="dba_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                DBA / TRADE NAME <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. La Esquina"
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
          name="primary_contact_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                PRIMARY CONTACT NAME <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Full name" maxLength={100} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="title_role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>TITLE / ROLE</FormLabel>
              <FormControl>
                <Input
                  placeholder="Owner / Manager / CEO"
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
          name="email_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                EMAIL ADDRESS <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="contact@restaurant.com"
                  type="email"
                  maxLength={100}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-[140px_1fr] gap-2">
          <FormField
            control={control}
            name="phone_prefix"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  CODE <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-2 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={field.value}
                    onChange={field.onChange}
                  >
                    {[
                      { code: "+1", label: "🇺🇸 US +1" },
                      { code: "+1", label: "🇨🇦 CA +1" },
                      { code: "+52", label: "🇲🇽 MX +52" },
                      { code: "+54", label: "🇦🇷 AR +54" },
                      { code: "+591", label: "🇧🇴 BO +591" },
                      { code: "+55", label: "🇧🇷 BR +55" },
                      { code: "+56", label: "🇨🇱 CL +56" },
                      { code: "+57", label: "🇨🇴 CO +57" },
                      { code: "+506", label: "🇨🇷 CR +506" },
                      { code: "+53", label: "🇨🇺 CU +53" },
                      { code: "+1809", label: "🇩🇴 DO +1809" },
                      { code: "+593", label: "🇪🇨 EC +593" },
                      { code: "+503", label: "🇸🇻 SV +503" },
                      { code: "+502", label: "🇬🇹 GT +502" },
                      { code: "+592", label: "🇬🇾 GY +592" },
                      { code: "+509", label: "🇭🇹 HT +509" },
                      { code: "+504", label: "🇭🇳 HN +504" },
                      { code: "+1876", label: "🇯🇲 JM +1876" },
                      { code: "+505", label: "🇳🇮 NI +505" },
                      { code: "+507", label: "🇵🇦 PA +507" },
                      { code: "+595", label: "🇵🇾 PY +595" },
                      { code: "+51", label: "🇵🇪 PE +51" },
                      { code: "+1787", label: "🇵🇷 PR +1787" },
                      { code: "+597", label: "🇸🇷 SR +597" },
                      { code: "+1868", label: "🇹🇹 TT +1868" },
                      { code: "+598", label: "🇺🇾 UY +598" },
                      { code: "+58", label: "🇻🇪 VE +58" },
                      { code: "+297", label: "🇦🇼 AW +297" },
                      { code: "+599", label: "🇨🇼 CW +599" },
                      { code: "+501", label: "🇧🇿 BZ +501" },
                      { code: "+34", label: "🇪🇸 ES +34" },
                      { code: "+33", label: "🇫🇷 FR +33" },
                      { code: "+44", label: "🇬🇧 GB +44" },
                      { code: "+49", label: "🇩🇪 DE +49" },
                      { code: "+39", label: "🇮🇹 IT +39" },
                      { code: "+351", label: "🇵🇹 PT +351" },
                      { code: "+31", label: "🇳🇱 NL +31" },
                      { code: "+32", label: "🇧🇪 BE +32" },
                      { code: "+41", label: "🇨🇭 CH +41" },
                      { code: "+43", label: "🇦🇹 AT +43" },
                      { code: "+46", label: "🇸🇪 SE +46" },
                      { code: "+47", label: "🇳🇴 NO +47" },
                      { code: "+45", label: "🇩🇰 DK +45" },
                      { code: "+48", label: "🇵🇱 PL +48" },
                      { code: "+380", label: "🇺🇦 UA +380" },
                      { code: "+7", label: "🇷🇺 RU +7" },
                      { code: "+90", label: "🇹🇷 TR +90" },
                      { code: "+972", label: "🇮🇱 IL +972" },
                      { code: "+971", label: "🇦🇪 AE +971" },
                      { code: "+966", label: "🇸🇦 SA +966" },
                      { code: "+91", label: "🇮🇳 IN +91" },
                      { code: "+92", label: "🇵🇰 PK +92" },
                      { code: "+86", label: "🇨🇳 CN +86" },
                      { code: "+81", label: "🇯🇵 JP +81" },
                      { code: "+82", label: "🇰🇷 KR +82" },
                      { code: "+63", label: "🇵🇭 PH +63" },
                      { code: "+66", label: "🇹🇭 TH +66" },
                      { code: "+84", label: "🇻🇳 VN +84" },
                      { code: "+62", label: "🇮🇩 ID +62" },
                      { code: "+60", label: "🇲🇾 MY +60" },
                      { code: "+65", label: "🇸🇬 SG +65" },
                      { code: "+61", label: "🇦🇺 AU +61" },
                      { code: "+64", label: "🇳🇿 NZ +64" },
                      { code: "+27", label: "🇿🇦 ZA +27" },
                      { code: "+234", label: "🇳🇬 NG +234" },
                      { code: "+254", label: "🇰🇪 KE +254" },
                      { code: "+20", label: "🇪🇬 EG +20" },
                      { code: "+212", label: "🇲🇦 MA +212" },
                    ].map((country) => (
                      <option key={country.label} value={country.code}>
                        {country.label}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  PHONE NUMBER <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="7185550000"
                    maxLength={30}
                    inputMode="numeric"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="city_borough"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                CITY / BOROUGH <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Brooklyn / Manhattan..."
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
          name="zip_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ZIP CODE</FormLabel>
              <FormControl>
                <Input placeholder="11201" maxLength={20} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="number_of_locations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                NUMBER OF LOCATIONS <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="avg_orders_per_location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                AVERAGE ORDERS / DAY PER BRANCH{" "}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 15" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {numLocations > 1 && fields.map((fieldArray, index) => (
          <div key={fieldArray.id} className="p-4 bg-zinc-50/50 border border-dashed rounded-lg space-y-4">
            <FormField
              control={control}
              name={`location_addresses.${index}.address`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ADDRESS OF BRANCH #{index + 1} <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`e.g. 123 Main St, Branch ${index + 1}`}
                      maxLength={200}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="pt-2">
              <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">
                Operating Hours for Branch #{index + 1}
              </label>
              <OperatingHours namePrefix={`location_addresses.${index}`} />
            </div>
          </div>
        ))}

        <FormField
          control={control}
          name="business_type"
          render={({ field }) => (
            <FormItem className="space-y-3 pt-4">
              <FormLabel>
                BUSINESS TYPE <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid grid-cols-2 gap-4"
                >
                  {[
                    "Restaurant",
                    "Bakery",
                    "Grocery",
                    "Dark Kitchen",
                    "Chain",
                    "Franchise",
                  ].map((type) => (
                    <FormItem
                      key={type}
                      className="flex items-center space-x-3 space-y-0 p-3 bg-zinc-50 border rounded-md cursor-pointer"
                    >
                      <FormControl>
                        <RadioGroupItem value={type} />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer flex-1">
                        {type}
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
          name="main_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                MAIN ADDRESS <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Street, City, State, ZIP"
                  maxLength={200}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-6">
          <label className="text-sm font-medium leading-none mb-4 block">
            OPERATING HOURS
          </label>
          <OperatingHours />
        </div>
      </div>
    </div>
  );
}
