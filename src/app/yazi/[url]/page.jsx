import React from "react";
import Blogs from "../../yazilar/page";
import moment from "moment";
import "moment/locale/tr";
import { getBlog } from "@/api/endpoints";

export async function generateMetadata({ params }) {
  const { url } = params;
  const data = await getBlog(url);
  const selectedData = data[0];

  if (!selectedData) {
    return {
      title: "Yazı bulunamadı",
      description: "Aradığınız yazı mevcut değil.",
    };
  }

  const { title, content, image } = selectedData;

  return {
    title: title,
    description: content.slice(0, 160),
    openGraph: {
      title: title,
      description: content.slice(0, 160),
      images: [image],
      url: `https://arzuyurci.com/yazi/${url}`,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: content.slice(0, 160),
      images: [image],
    },
  };
}

async function BlogDetail({ params }) {
  const param = await params;
  const url = param.url;
  const data = await getBlog(url);
  const selectedData = data[0];
  if (!selectedData) return;

  const { date, title, content, image } = selectedData;
  const turkishDate = moment(date).locale("tr").format("D MMMM, YYYY");

  return (
    <>
      <div className="mx-auto w-full max-w-4xl px-4 mb-12">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-slate-600">
            <time dateTime="2022-02-08" title="February 8th, 2022">
              {turkishDate}
            </time>
          </p>
          <h1 className="mb-4 text-2xl font-extrabold text-gray-900 lg:mb-6 lg:text-4xl">
            {title}
          </h1>
          <img
            className="w-full max-w-full lg:max-h-[400px] sm:max-h-[300px] max-h-[200px] object-cover rounded-md"
            src={image}
            alt={title}
          />
        </div>
        <div
          className="article-content mt-3"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      <Blogs isDetailPage={true} url={url} />
    </>
  );
}

export default BlogDetail;
