import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionTitle from "./SectionTitle";
import { QuestionCircleIcon } from "@/icons";
import BlurFade from "@/components/ui/blur-fade";
import { getQuestions, getSections } from "@/api/endpoints";
import { sectionKeys } from "@/routes";

export default async function FaqsSection() {
  const data = await getQuestions();
  const activeData = data.filter((item) => !item.deleted_at);

  const sections = await getSections();
  const section = sections.find(
    (section) =>
      section.sectionKey === sectionKeys.faqs && Number(section.publish) === 1
  );

  if (!activeData || activeData.length === 0 || !section) return null;

  return (
    <section className="md:container mx-auto px-4 mb-12" id="sss">
      <SectionTitle
        icon={<QuestionCircleIcon className="w-4 h-4" color="#eab308" />}
        sectionKey={sectionKeys.faqs}
      />
      <BlurFade delay={0.5} inView>
        <div className="max-w-3xl mx-auto">
          <Accordion type="multiple">
            {activeData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="[&[data-state=open]]:text-yellow-500">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </BlurFade>
    </section>
  );
}
