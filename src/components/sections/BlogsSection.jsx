import { PenIcon } from "@/icons";
import { Button } from "@nextui-org/react";
import React from "react";
import SectionTitle from "./SectionTitle";
import BlurFade from "@/components/ui/blur-fade";
import { getBlogs, getSections } from "@/api/endpoints";
import BlogCard from "./BlogCard";
import Link from "next/link";
import { sectionKeys } from "@/routes";

async function BlogsSection() {
  const data = await getBlogs();
  const activeData = data.filter(
    (item) => Number(item.publish) === 1 && !item.deleted_at
  );

  const sections = await getSections();
  const section = sections.find(
    (section) =>
      section.sectionKey === sectionKeys.blogs && Number(section.publish) === 1
  );

  if (!data || !activeData || activeData.length === 0 || !section) return;

  return (
    <section className="mx-auto max-w-7xl mb-12" id="yazilar">
      <SectionTitle
        icon={<PenIcon className="w-4 h-4" color="#eab308" />}
        sectionKey={sectionKeys.blogs}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 px-4">
        {activeData.slice(-6).map((post, index) => (
          <BlogCard key={index} post={post} index={index} />
        ))}
      </div>
      <BlurFade
        delay={0.75}
        inView
        className="flex items-center justify-center mt-6"
      >
        <Button
          className="bg-yellow-400 text-white"
          startContent={<PenIcon className="w-4 h-4" />}
          as={Link}
          href="/yazilar"
        >
          Tüm Yazıları Gör
        </Button>
      </BlurFade>
    </section>
  );
}

export default BlogsSection;
