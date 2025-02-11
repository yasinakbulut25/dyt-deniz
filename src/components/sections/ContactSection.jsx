import { BellIcon } from "@/icons";
import SectionTitle from "./SectionTitle";
import { BorderBeam } from "@/components/ui/border-beam";
import ContactBoxes from "./ContactBoxes";
import ContactForm from "./ContactForm";
import { getSections, getUser } from "@/api/endpoints";
import { sectionKeys } from "@/routes";

async function ContactSection() {
  const data = await getUser();
  const sections = await getSections();
  const section = sections.find(
    (section) =>
      section.sectionKey === sectionKeys.contact &&
      Number(section.publish) === 1
  );

  if (!data || !section) return;

  const { map } = data.admin;
  return (
    <section className="mb-12 px-4" id="iletisim">
      <SectionTitle
        icon={<BellIcon className="w-4 h-4" color="#eab308" />}
        sectionKey={sectionKeys.contact}
      />
      <div className="relative max-w-7xl mx-auto bg-white md px-8 py-12 rounded-2xl mt-4">
        <ContactForm map={map} />
        <ContactBoxes />
        <BorderBeam
          colorFrom="#eab308"
          colorTo="#fff085"
          size={300}
          duration={10}
          delay={9}
        />
      </div>
    </section>
  );
}

export default ContactSection;
