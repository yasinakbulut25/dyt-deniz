import { Suspense } from "react";
import AboutSection from "@/components/sections/AboutSection";
import Loading from "@/components/loading";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import CommentsSection from "@/components/sections/CommentsSection";
import BlogsSection from "@/components/sections/BlogsSection";
import FaqsSection from "@/components/sections/FaqsSection";
import ContactSection from "@/components/sections/ContactSection";
import Gallery from "@/components/sections/GallerySection";
import BMISection from "@/components/sections/BMISection";

export const metadata = {
  title: "Uzm. Diyetisyen Almina Meşin | Kişiye Özel Beslenme Danışmanlığı",
  description:
    "Sağlıklı beslenme ve ideal kilo yönetimi için uzman desteği alın. Kişiye özel diyet programları, kilo verme, sağlıklı yaşam ve beslenme danışmanlığı hizmetleriyle yanınızdayız.",
};

export default function Page() {
  return (
    <div className="">
      <Suspense fallback={<Loading />}>
        <AboutSection />
        {/* <HeroSection /> */}
        <ServicesSection />
        <CommentsSection />
        <BlogsSection />
        <FaqsSection />
        <Gallery />
        <BMISection />
        <ContactSection />
      </Suspense>
    </div>
  );
}
