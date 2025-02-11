import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import moment from "moment";
import "moment/locale/tr";
import BlurFade from "@/components/ui/blur-fade";
import { ChevronRight } from "@/icons";

function BlogCard({ post, index }) {
  const turkishDate = moment(post.date).locale("tr").format("D MMMM, YYYY");

  return (
    <BlurFade inView>
      <Link href={`/yazi/${post.url}`}>
        <div className="group flex flex-col gap-3 p-5 rounded-3xl bg-white border border-gray-100 shadow-2xl shadow-gray-600/10">
          <div className="relative overflow-hidden rounded-xl">
            <Image
              src={post.image}
              alt="art cover"
              loading="lazy"
              width={350}
              height={250}
              className="max-h-[250px] h-auto w-full object-cover object-center transition duration-500 group-hover:scale-105"
            />
          </div>
          <h3 className="text-lg font-bold text-black group-hover:text-yellow-500 duration-300">
            {post.title}
          </h3>
          <div className="flex items-center justify-between gap-2">
            <span className="text-slate-500 text-sm">{turkishDate}</span>
            <Button
              className="bg-yellow-400 text-white"
              size="sm"
              endContent={<ChevronRight className="w-4 h-4" />}
            >
              Yazıyı Oku
            </Button>
          </div>
        </div>
      </Link>
    </BlurFade>
  );
}

export default BlogCard;
