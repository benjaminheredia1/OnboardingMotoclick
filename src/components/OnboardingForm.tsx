import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { onboardingSchema } from "@/lib/schema";

import { submitRegistration } from "@/lib/submit";

import { SectionA } from "./sections/SectionA";
import { SectionB } from "./sections/SectionB";
import { SectionC } from "./sections/SectionC";
import { SectionD } from "./sections/SectionD";
import { SectionE } from "./sections/SectionE";
import { SectionF } from "./sections/SectionF";
import { SectionG } from "./sections/SectionG";
import { SectionH } from "./sections/SectionH";

export function OnboardingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<any>({
    resolver: zodResolver(onboardingSchema) as any,
    defaultValues: {
      legal_name: "",
      dba_name: "",
      primary_contact_name: "",
      title_role: "",
      email_address: "",
      phone_number: "",
      phone_prefix: "+1",
      city_borough: "",
      zip_code: "",
      number_of_locations: 1,
      business_type: "Restaurant",
      main_address: "",
      operating_hours: [
        {
          id: 0,
          days: [],
          open: "11:00",
          close: "22:00",
          valid_from: null,
          valid_to: null,
        },
      ],

      avg_orders: 0,
      avg_ticket: null,
      peak_hours: "",
      own_drivers: "No",
      self_delivering: "No",
      using_3pl: "No",
      pain_points: "",

      delivery_platforms: [],
      pos_system: "",
      own_website: "No",
      own_app: "No",

      target_date: new Date(),
      main_problem: "",

      contract_name: "",
      ein_tax_id: "",
      billing_address: "",
      authorized_signatory: "",

      comm_channel: "Email",
      notes: "",

      uber_eats_user: "",
      uber_eats_pass: "",
      doordash_user: "",
      doordash_pass: "",
      grubhub_user: "",
      grubhub_pass: "",
      slice_user: "",
      slice_pass: "",
      delivery_com_user: "",
      delivery_com_pass: "",
      sharebites_user: "",
      sharebites_pass: "",
      other_platform_name: "",
      other_platform_user: "",
      other_platform_pass: "",

      pos_access_name: "",
      pos_access_user: "",
      pos_access_pass: "",
      pos_access_owner: "",
      pos_access_phone: "",
      pos_access_email: "",
    },
  });

  const onSubmit = async (values: any) => {
    setIsSubmitting(true);
    setError(null);
    try {
      if (!values.operating_hours || values.operating_hours.length === 0) {
        throw new Error("Please add at least one operating hours slot");
      }

      await submitRegistration(values);
      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="ios-app max-w-3xl mx-auto p-4 md:p-8 bg-zinc-50 min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-sm border text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            ✓
          </div>
          <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for completing the onboarding form. A Motoclick agent will
            contact you shortly.
          </p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Submit Another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="ios-app max-w-4xl mx-auto min-h-screen">
      <header className="ios-navbar flex flex-col items-center w-full mb-8 bg-white/80 backdrop-blur-md overflow-hidden rounded-b-2xl border-b-4 border-[#93683D]">
        <img
          src="/assets/header.png"
          alt="Motoclick Logo Banner"
          className="w-full h-auto object-cover bg-[#93683D]/10"
        />
        <div className="w-full py-3 text-center">
          <p className="text-sm text-gray-600 font-medium">
            Complete this form to activate your account
          </p>
        </div>
      </header>

      <main className="ios-content px-4 md:px-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
            <SectionA />
            <SectionB />
            <SectionC />
            <SectionD />
            <SectionE />
            <SectionF />
            <SectionG />
            <SectionH />

            <div className="form-footer mt-12 bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-sm border border-white/30">
              <p className="footer-note text-xs text-gray-500 mb-6 text-center">
                Once submitted, your Motoclick agent will contact you within 2
                hours - Discovery call within 24 hours - Proposal & contract
                within 48 hours
              </p>

              {error && (
                <div className="bg-red-50/80 backdrop-blur-sm text-red-600 p-3 rounded mb-4 text-sm border border-red-200">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-lg rounded-full text-white bg-[#FF6200] hover:bg-[#E66E00] disabled:opacity-100 transition-all shadow-lg shadow-[#FF7A00]/30"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
}
