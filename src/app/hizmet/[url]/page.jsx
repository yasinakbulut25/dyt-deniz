import React from "react";
import { getService } from "@/api/endpoints";
import ServicesSection from "@/components/sections/ServicesSection";
import { BASE_URL } from "@/app/layout";

export async function generateMetadata({ params }) {
  const { url } = params;
  const data = await getService(url);
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
      url: `${BASE_URL}hizmet/${url}`,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: content.slice(0, 160),
      images: [image],
    },
  };
}

async function ServiceDetail({ params }) {
  const param = await params;
  const url = param.url;
  const data = await getService(url);
  const selectedData = data[0];
  if (!selectedData) return;

  const { title, description, content, image } = selectedData;

  return (
    <>
      <div className="flex flex-col gap-4 mx-auto w-full max-w-4xl px-4 mb-12">
        <div className="flex flex-col gap-1">
          <h1 className="mb-4 text-2xl font-extrabold text-gray-900 lg:mb-6 lg:text-4xl">
            {title}
          </h1>
          <img
            className="w-full max-w-full lg:max-h-[400px] sm:max-h-[300px] max-h-[200px] object-cover rounded-md"
            src={image}
            alt={title}
          />
        </div>
        <i className="border-l-2 border-yellow-400 pl-3 py-1 text-sm mt-3">
          {description}
        </i>
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      <ServicesSection isDetailPage={true} url={url} />
    </>
  );
}

export default ServiceDetail;
