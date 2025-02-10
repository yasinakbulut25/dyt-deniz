import { ChevronRight, PenIcon } from "@/icons";
import { Button, Link } from "@nextui-org/react";
import Image from "next/image";
import BlurFade from "@/components/ui/blur-fade";
import SectionTitle from "@/components/sections/SectionTitle";
import { getBlogs } from "@/api/endpoints";
import BlogCard from "@/components/sections/BlogCard";
import { sectionKeys } from "@/routes";

export const metadata = {
  title: "Uzm. Diyetisyen Almina Meşin | Yazılar",
  description:
    "Kadın Hastalıkları ve Doğum, Tüp Bebek Uzmanı ile sağlığınıza önem verin. Gebelik takibi, kısırlık tedavisi ve tüp bebek uygulamalarında uzman destek alın. Sağlıklı bir gelecek için yanınızdayız.",
};

async function Blogs({ isDetailPage, url }) {
  const data = await getBlogs();
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

  if (!data || !activeData || activeData.length === 0) return;

  return (
    <section className="mx-auto max-w-7xl mb-12" id="yazilar">
      <SectionTitle
        icon={<PenIcon className="w-4 h-4" color="#eab308" />}
        sectionKey={sectionKeys.blogs}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 px-4">
        {activeData.map((post, index) => (
          <BlogCard key={index} post={post} index={index} />
        ))}
      </div>
    </section>
  );
}

export default Blogs;
