import { CalculatorIcon } from "lucide-react";
import React from "react";
import SectionTitle from "./SectionTitle";
import { sectionKeys } from "@/routes";
import BMIForm from "./BMIForm";
import { getSections } from "@/api/endpoints";

export default async function BMISection() {
  const sections = await getSections();
  const section = sections.find(
    (section) =>
      section.sectionKey === sectionKeys.bki && Number(section.publish) === 1
  );

  if (!section) return null;

  return (
    <section className="md:container mx-auto px-4 mb-12" id="bki">
      <SectionTitle
        icon={<CalculatorIcon className="w-4 h-4" color="#eab308" />}
        sectionKey={sectionKeys.bki}
      />
      <BMIForm />
    </section>
  );
}
