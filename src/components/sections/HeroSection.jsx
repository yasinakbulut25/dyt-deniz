import Image from "next/image";
import { cn } from "@/lib/utils";
import BlurFade from "@/components/ui/blur-fade";
import { DotPattern } from "@/components/ui/dot-pattern";
import { getUser } from "@/api/endpoints";

async function HeroSection() {
  const data = await getUser();
  if (!data) return;

  const { titleName, titleBlack, titlePurple, description, image } = data.hero;

  return (
    <section className="relative mb-12" id="ana-sayfa">
      <div className="relative pb-6 px-4 ml-auto">
        <div className="lg:w-2/3 text-center mx-auto flex flex-col md:gap-10 gap-6 items-center">
          <BlurFade delay={0.25} inView>
            <h1 className="text-gray-900 text-pretty font-bold text-2xl sm:text-4xl md:text-5xl xl:text-6xl">
              <span className="block text-purple-600 mb-5">{titleName}</span>
              {titleBlack}{" "}
              <span className="text-purple-600">{titlePurple}</span>
            </h1>
          </BlurFade>
          <BlurFade delay={0.5} inView>
            <p className="text-sm md:text-md text-pretty m-auto text-center max-w-2xl text-gray-700">
              {description}
            </p>
          </BlurFade>
          <BlurFade className="z-10" delay={0.75} inView>
            <Image
              className="rounded-lg shadow-lg mx-auto"
              src={image}
              alt={titleName}
              width={400}
              height={400}
            />
          </BlurFade>
          <DotPattern
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
            className={`z-0 ${cn(
              "[mask-image:linear-gradient(to_top,white,transparent,transparent)]"
            )}`}
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
