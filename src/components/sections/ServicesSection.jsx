import Image from "next/image";
import { BorderBeam } from "@/components/ui/border-beam";
import BlurFade from "@/components/ui/blur-fade";
import SectionTitle from "./SectionTitle";
import { getSections, getServices, getUser } from "@/api/endpoints";
import { sectionKeys } from "@/routes";
import Link from "next/link";
import { ChevronRight, WhatsappIcon } from "@/icons";
import SparklesText from "../ui/SparklesText";

async function ServicesSection({ isDetailPage, url }) {
  const data = await getServices();
  const sections = await getSections();
  const user = await getUser();
  
  if (!user) return;

  const { whatsappPhone } = user.admin;
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
      <div
        className={`grid ${
          isDetailPage ? "" : "lg:grid-cols-2"
        } w-full mx-auto gap-4 items-center`}
      >
        {!isDetailPage && (
          <div className="flex w-full h-full">
            <Image
              className="object-cover w-full max-h-[940px] rounded-lg -z-1"
              src="/uploads/images/almina-mesin-2.png"
              width={500}
              height={900}
              alt="Dyt. Almina Mesin"
            />
          </div>
        )}
        <div
          className={`grid ${
            isDetailPage ? "md:grid-cols-2" : "lg:grid-cols-1 md:grid-cols-2"
          } gap-4`}
        >
          {activeData.map((service, index) => (
            <div key={index}>
              <BlurFade className="mb-8" inView>
                <div className="relative w-full sm:max-w-full max-w-[400px] mx-auto bg-white shadow-lg hover:scale-105 duration-300 rounded-lg overflow-hidden">
                  <Link href={`/hizmet/${service.url}`}>
                    <Image
                      className="object-cover w-full max-h-[250px] -z-1"
                      src={service.image}
                      width={500}
                      height={250}
                      alt={service.title}
                    />
                    <div className="flex flex-col gap-3 py-4 px-6">
                      <SparklesText
                        className="lg:text-2xl md:text-xl text-lg font-bold text-black"
                        text={service.title}
                        sparklesCount={10}
                        colors={{ first: "#A07CFE", second: "#FE8FB5" }}
                      />
                      <p className="text-md text-gray-600 text-pretty">
                        {service.description}
                      </p>
                    </div>
                  </Link>
                  <div className="w-full flex items-center justify-between gap-2 pb-4 px-6">
                    <Link
                      href={`/hizmet/${service.url}`}
                      className="flex items-center gap-1 text-sm text-yellow-500"
                    >
                      Detaylı İncele
                      <span>
                        <ChevronRight width={12} className="text-yellow-500" />
                      </span>
                    </Link>
                    <Link
                      href={`https://wa.me/${whatsappPhone}`}
                      className="flex items-center gap-2 text-sm text-white py-1 px-2 rounded bg-green-500"
                    >
                      <WhatsappIcon width={14} className="text-white" />
                      İletişime Geç
                    </Link>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
