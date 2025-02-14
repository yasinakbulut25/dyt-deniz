import SectionTitle from "@/components/sections/SectionTitle";
import { UserIcon } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import Image from "next/image";
import CommentsSection from "@/components/sections/CommentsSection";
import { getUser } from "@/api/endpoints";
import { sectionKeys } from "@/routes";
import { BASE_URL } from "../layout";

export async function generateMetadata() {
  const data = await getUser();
  const selectedData = data.about;

  if (!selectedData) {
    return {
      title: "Yazı bulunamadı",
      description: "Aradığınız yazı mevcut değil.",
    };
  }

  const { content, image } = selectedData;

  const title = "Uzm. Diyetisyen Almina Meşin | Hakkımda";
  return {
    title: title,
    description: content.slice(0, 160),
    openGraph: {
      title: title,
      description: content.slice(0, 160),
      images: [image],
      url: `${BASE_URL}hakkimda`,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: content.slice(0, 160),
      images: [image],
    },
  };
}

async function AboutPage() {
  const data = await getUser();
  if (!data) return;

  const { content_long, image } = data.about;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        icon={<UserIcon className="w-4 h-4" color="#eab308" />}
        sectionKey={sectionKeys.about}
      />
      <div className="flex flex-col items-center gap-8 mb-12">
        <BlurFade delay={0.25} inView>
          <div
            className="article-content text-md text-black font-medium max-w-4xl text-pretty"
            dangerouslySetInnerHTML={{ __html: content_long }}
          />
        </BlurFade>
        <BlurFade delay={0.25} inView>
          <div className="relative mx-auto rounded-lg overflow-hidden">
            <Image
              className="object-contain w-full h-auto max-h-[550px]"
              src={image}
              alt="Uzm. Diyetisyen Almina Meşin"
              width={500}
              height={700}
            />
          </div>
        </BlurFade>
      </div>
      <CommentsSection />
    </div>
  );
}

export default AboutPage;
