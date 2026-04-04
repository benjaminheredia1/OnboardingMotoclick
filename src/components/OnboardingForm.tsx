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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function OnboardingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("Onboarding Form");
  const [description, setDescription] = useState("");
  const [showAlert, setShowAlert] = useState(false);

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
      middleware_system: "",
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
      other_accounts: [{ name: "", user: "", pass: "" }],
    },
  });

  const onSubmit = async (values: any) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await submitRegistration(values);
      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onValidationError = (errors: any) => {
    if (errors.operating_hours) {
      setTitle("Missing Operating Hours");
      setDescription("Please add at least one operating hours slot.");
    } else {
      setTitle("Incomplete Form");
      setDescription("Please check all required fields.");
    }
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center max-w-3xl min-h-screen p-4 mx-auto ios-app md:p-8 bg-zinc-50">
        <div className="max-w-md p-8 text-center bg-white border shadow-sm rounded-xl">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 text-3xl text-green-600 bg-green-100 rounded-full">
            ✓
          </div>
          <h2 className="mb-2 text-2xl font-bold">Application Submitted!</h2>
          <p className="mb-6 text-gray-600">
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
    <div className="max-w-4xl min-h-screen mx-auto ios-app border-x border-[#93683D]/10 bg-white/30">
      {showAlert && (
        <Alert className="fixed z-[100] w-[90%] max-w-sm left-1/2 top-4 -translate-x-1/2 shadow-2xl border-orange-200 bg-white/95 backdrop-blur-md animate-in fade-in zoom-in slide-in-from-top-4 duration-300">
          <AlertTitle className="font-bold text-[#FF6200] flex items-center gap-2">
            <span className="w-2 h-2 bg-[#FF6200] rounded-full animate-pulse" />
            {title}
          </AlertTitle>
          <AlertDescription className="text-gray-600">
            {description}
          </AlertDescription>
        </Alert>
      )}
      <header className="ios-navbar flex flex-col items-center w-full mb-8 bg-white/80 backdrop-blur-md overflow-hidden rounded-b-2xl border-b-4 border-[#93683D]">
        <img
          src="/assets/header.png"
          alt="Motoclick Logo Banner"
          className="w-full h-auto object-cover bg-[#93683D]/10"
        />
        <div className="w-full py-3 text-center">
          <p className="text-sm font-medium text-gray-600">
            Complete this form to activate your account
          </p>
        </div>
      </header>

      <main className="px-4 ios-content md:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onValidationError)}
            className="space-y-12"
          >
            <SectionA />
            <SectionB />
            <SectionC />
            <SectionD />
            <SectionE />
            <SectionF />
            <SectionG />
            <SectionH />

            <div className="p-6 mt-12 border shadow-sm form-footer bg-white/70 backdrop-blur-md rounded-xl border-white/30">
              <p className="mb-6 text-xs text-center text-gray-500 footer-note">
                Once submitted, your Motoclick agent will contact you within 2
                hours - Discovery call within 24 hours - Proposal & contract
                within 48 hours
              </p>

              {error && (
                <div className="p-3 mb-4 text-sm text-red-600 border border-red-200 rounded bg-red-50/80 backdrop-blur-sm">
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
