import Image from "next/image";
import { BorderBeam } from "@/components/ui/border-beam";
import BlurFade from "@/components/ui/blur-fade";
import SectionTitle from "./SectionTitle";
import { getSections, getServices } from "@/api/endpoints";
import { sectionKeys } from "@/routes";
import Link from "next/link";
import { ChevronRight } from "@/icons";

async function ServicesSection({ isDetailPage, url }) {
  const data = await getServices();
  const sections = await getSections();
  const section = sections.find(
    (section) =>
      section.sectionKey === sectionKeys.services &&
      Number(section.publish) === 1
  );

  let activeData = data.filter(
    (item) => Number(item.publish) === 1 && !item.deleted_at
  );

  if (isDetailPage) {
    const filteredData = activeData.filter((item) => item.url !== url);
    if (filteredData.length <= 3) {
      activeData = filteredData;
    } else {
      activeData = [];
      while (activeData.length < 3) {
        const randomIndex = Math.floor(Math.random() * filteredData.length);
        const selected = filteredData[randomIndex];
        if (!activeData.includes(selected)) {
          activeData.push(selected);
        }
      }
    }
  }

  if (!data || !activeData || activeData.length === 0 || !section) return;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 mb-12" id="hizmetler">
      <SectionTitle sectionKey={sectionKeys.services} />
      <div className="columns-1 sm:columns-2 lg:columns-3">
        {activeData.map((service, index) => (
          <Link key={index} href={`/hizmet/${service.url}`}>
            <BlurFade className="mb-8" inView>
              <div className="relative w-full sm:max-w-full max-w-[400px] mx-auto bg-white shadow-lg hover:scale-105 duration-300 rounded-lg overflow-hidden">
                <Image
                  className="object-cover w-full max-h-[200px] -z-1"
                  src={service.image}
                  width={350}
                  height={200}
                  alt={service.title}
                />
                <div className="flex flex-col gap-3 py-4 px-6">
                  <h3 className="text-lg font-bold text-black">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 text-pretty">
                    {service.description}
                  </p>
                  <span className="flex items-center gap-1 text-xs text-yellow-500">
                    Detaylı İncele
                    <span>
                      <ChevronRight width={12} className="text-yellow-500" />
                    </span>
                  </span>
                </div>
                <BorderBeam
                  colorFrom="#eab308"
                  colorTo="#fff085"
                  size={150}
                  duration={10}
                  delay={9 + index * 1.5}
                />
              </div>
            </BlurFade>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ServicesSection;
