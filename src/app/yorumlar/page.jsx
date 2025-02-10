import React from "react";
import { ChatDotsIcon } from "@/icons";
import CommentCard from "@/components/sections/CommentCard";
import SectionTitle from "@/components/sections/SectionTitle";
import BlurFade from "@/components/ui/blur-fade";
import FaqsSection from "@/components/sections/FaqsSection";
import { getComments } from "@/api/endpoints";
import { sectionKeys } from "@/routes";

export const metadata = {
  title: "Uzm. Diyetisyen Almina Meşin | Görüşler",
  description:
    "Kadın Hastalıkları ve Doğum, Tüp Bebek Uzmanı ile sağlığınıza önem verin. Gebelik takibi, kısırlık tedavisi ve tüp bebek uygulamalarında uzman destek alın. Sağlıklı bir gelecek için yanınızdayız.",
};

async function CommentsPage() {
  const data = await getComments();
  const activeData = data.filter(
    (item) => Number(item.publish) === 1 && !item.deleted_at
  );

  if (!data || !activeData || activeData.length === 0) return;

  return (
    <div className="max-w-7xl w-full mx-auto">
      <SectionTitle
        icon={<ChatDotsIcon className="w-4 h-4" color="#eab308" />}
        sectionKey={sectionKeys.comments}
      />
      <div className="lg:columns-4 md:columns-3 sm:columns-2 columns-1 gap-4 px-4 mb-12">
        {activeData.map((review, index) => (
          <BlurFade
            key={index}
            className="mb-4"
            delay={0.25 + index * 0.1}
            inView
          >
            <CommentCard key={index} review={review} isCommentsPage={true} />
          </BlurFade>
        ))}
      </div>
      <FaqsSection />
    </div>
  );
}

export default CommentsPage;
