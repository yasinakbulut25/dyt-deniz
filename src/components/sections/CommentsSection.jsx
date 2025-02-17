import Marquee from "@/components/ui/marquee";
import SectionTitle from "./SectionTitle";
import BlurFade from "@/components/ui/blur-fade";
import { Button } from "@nextui-org/react";
import { ChatDotsIcon } from "@/icons";
import Link from "next/link";
import CommentCard from "./CommentCard";
import { getComments, getSections } from "@/api/endpoints";
import { sectionKeys } from "@/routes";
import { PlusIcon } from "lucide-react";

async function CommentsSection({ isAddPage }) {
  const data = await getComments();
  const activeData = data.filter(
    (item) => Number(item.publish) === 1 && !item.deleted_at
  );

  const sections = await getSections();
  const section = sections.find(
    (section) =>
      section.sectionKey === sectionKeys.comments &&
      Number(section.publish) === 1
  );

  if (!data || !activeData || activeData.length === 0 || !section) return;

  return (
    <section className="mb-12" id="yorumlar">
      <SectionTitle
        icon={<ChatDotsIcon className="w-4 h-4" color="#eab308" />}
        sectionKey={sectionKeys.comments}
      />
      <BlurFade delay={0.5} inView>
        <div className="relative max-w-7xl mx-auto flex w-full gap-4 flex-wrap items-center justify-center overflow-hidden">
          {activeData.slice(0, 8).map((review, index) => (
            <CommentCard key={index} review={review} />
          ))}
          {/* <div className="pointer-events-none absolute left-0 bottom-0 w-full h-[200px] bg-gradient-to-t from-white"></div> */}
        </div>
      </BlurFade>
      <BlurFade
        delay={0.75}
        inView
        className="flex items-center justify-center mt-6 gap-4"
      >
        <Button
          className="bg-yellow-400 text-white"
          startContent={<ChatDotsIcon className="w-4 h-4" />}
          as={Link}
          href="/yorumlar"
        >
          Tüm Yorumları Gör
        </Button>
        {!isAddPage && (
          <Button
            className="bg-white border border-yellow-400 text-yellow-500 hover:bg-yellow-500 hover:text-white"
            startContent={<PlusIcon className="w-4 h-4" />}
            as={Link}
            href="/yorum-ekle"
          >
            Görüşlerinizi Ekleyin
          </Button>
        )}
      </BlurFade>
    </section>
  );
}

export default CommentsSection;
