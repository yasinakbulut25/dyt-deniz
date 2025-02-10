import SectionTitle from "./SectionTitle";
import { ImageIcon } from "@/icons";
import { sectionKeys } from "@/routes";
import GalleryImages from "./GalleryImages";
import { getGallery, getSections } from "@/api/endpoints";

async function Gallery() {
  const data = await getGallery();
  const activeData = data.filter((item) => !item.deleted_at);

  const sections = await getSections();
  const section = sections.find(
    (section) =>
      section.sectionKey === sectionKeys.gallery &&
      Number(section.publish) === 1
  );

  if (!activeData || activeData.length === 0 || !section) return null;

  const allImages = [];
  activeData.map((item) => allImages.push(item.image));

  return (
    <section className="w-full max-w-7xl mx-auto px-4 mb-12" id="galeri">
      <SectionTitle
        icon={<ImageIcon className="w-4 h-4" color="#eab308" />}
        sectionKey={sectionKeys.gallery}
      />
      <GalleryImages allImages={allImages} />
    </section>
  );
}

export default Gallery;
